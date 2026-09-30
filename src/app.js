import { blueScore, OnsetDetector, pairEvents, summarize, acousticDelayMs } from './detect.js';

const $ = (id) => document.getElementById(id);
const video = $('video'), probe = $('probe'), ctx2d = probe.getContext('2d', { willReadFrequently: true });

// Timestamps of detected events, all in the performance.now() clock (ms).
let flashes = [], tones = [];
let videoDet, audioDet, stream, audioCtx, running = false;

// Runs on the audio thread: one RMS value per 128-sample block (~2.7 ms).
const WORKLET = `
class Rms extends AudioWorkletProcessor {
  process(inputs) {
    const ch = inputs[0][0];
    if (ch) {
      let s = 0;
      for (let i = 0; i < ch.length; i++) s += ch[i] * ch[i];
      this.port.postMessage({ t: currentTime, rms: Math.sqrt(s / ch.length) });
    }
    return true;
  }
}
registerProcessor('rms', Rms);`;

function resetDetectors() {
  flashes = []; tones = [];
  videoDet = new OnsetDetector({ minRise: 0.002, factor: 3, refractoryMs: 400, history: 45 });
  audioDet = new OnsetDetector({ minRise: 0.02, factor: 4, refractoryMs: 400, history: 200 });
  render();
}

async function start() {
  stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: 'environment', frameRate: { ideal: 60 }, width: { ideal: 1280 } },
    // Raw audio: processing would smear or delay the onset of the tone.
    audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false, channelCount: 1 },
  });
  video.srcObject = stream;
  await video.play();
  $('placeholder').parentElement.classList.add('live');

  audioCtx = new AudioContext({ latencyHint: 'interactive' });
  const url = URL.createObjectURL(new Blob([WORKLET], { type: 'text/javascript' }));
  await audioCtx.audioWorklet.addModule(url);
  const node = new AudioWorkletNode(audioCtx, 'rms');
  audioCtx.createMediaStreamSource(new MediaStream(stream.getAudioTracks())).connect(node);
  node.port.onmessage = onAudio;
  await audioCtx.resume();

  resetDetectors();
  running = true;
  $('start').disabled = true;
  $('reset').disabled = false;
  watchFrames();
}

function onAudio({ data: { t, rms } }) {
  // Map audio-context time onto the performance clock, less input-path latency.
  const ts = audioCtx.getOutputTimestamp();
  const perf = ts.performanceTime + (t - ts.contextTime) * 1000 - (audioCtx.baseLatency || 0) * 1000;
  $('ameter').value = Math.min(1, rms * 4);
  const onset = audioDet.update(perf, rms);
  if (onset !== null) { tones.push(onset); log('tone', onset); render(); }
}

function watchFrames() {
  const onFrame = (now, meta) => {
    if (!running) return;
    ctx2d.drawImage(video, 0, 0, probe.width, probe.height);
    const score = blueScore(ctx2d.getImageData(0, 0, probe.width, probe.height).data);
    $('vmeter').value = Math.min(1, score * 10);
    // captureTime is when the camera sensor grabbed the frame, when available.
    const t = meta.captureTime ?? now;
    const onset = videoDet.update(t, score);
    if (onset !== null) { flashes.push(onset); log('flash', onset); render(); }
    video.requestVideoFrameCallback(onFrame);
  };
  video.requestVideoFrameCallback(onFrame);
}

function log(kind, t) {
  const li = document.createElement('li');
  li.textContent = `${kind} @ ${t.toFixed(1)} ms`;
  $('log').prepend(li);
}

function render() {
  const verdict = $('verdict'), detail = $('detail');
  verdict.className = '';
  const acoustic = acousticDelayMs(parseFloat($('distance').value) || 0);
  const offsets = pairEvents(flashes, tones.map((t) => t - acoustic));
  const s = summarize(offsets);
  if (!running) { verdict.textContent = 'Waiting to start…'; detail.textContent = ''; return; }
  if (!s || s.count < 3) {
    verdict.textContent = 'Listening…';
    detail.textContent = `${flashes.length} flashes, ${tones.length} tones, ${offsets.length} matched. Need at least 3 matches.`;
    return;
  }
  const ms = Math.round(s.median), abs = Math.abs(ms);
  verdict.className = abs <= 40 ? 'ok' : abs <= 100 ? 'warn' : 'bad';
  verdict.textContent = abs <= 20 ? 'In sync' :
    ms > 0 ? `Audio is ${abs} ms late` : `Audio is ${abs} ms early`;
  detail.textContent = `${s.count} matches, spread ${Math.round(s.spread)} ms. ` +
    (abs <= 20 ? '' : ms > 0 ? `Delay the picture or reduce audio delay by ~${abs} ms.` : `Add ~${abs} ms of audio delay.`);
}

$('start').addEventListener('click', () => start().catch((e) => {
  $('verdict').className = 'bad';
  $('verdict').textContent = 'Could not start';
  $('detail').textContent = `${e.name}: ${e.message}. Camera needs HTTPS (or localhost) and permission.`;
}));
$('reset').addEventListener('click', () => { $('log').textContent = ''; resetDetectors(); });
$('distance').addEventListener('input', render);
