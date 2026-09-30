import { blueScore, OnsetDetector, pairEvents, summarize, acousticDelayMs, sensitivityToMinRise } from './detect.js';

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
  audioDet = new OnsetDetector({ factor: 3, refractoryMs: 400, history: 400 });
  applySettings();
  render();
}

async function getStream() {
  const videoC = { facingMode: 'environment', frameRate: { ideal: 60 }, width: { ideal: 1280 } };
  // Raw audio: processing would smear or delay the onset of the tone.
  const audioC = { echoCancellation: false, noiseSuppression: false, autoGainControl: false, channelCount: 1 };
  try {
    return await navigator.mediaDevices.getUserMedia({ video: videoC, audio: audioC });
  } catch (e) {
    if (e.name !== 'NotAllowedError') throw e;
    // Find out which device is blocked so the message can say so.
    const blocked = [];
    for (const [name, c] of [['camera', { video: true }], ['microphone', { audio: true }]]) {
      try { (await navigator.mediaDevices.getUserMedia(c)).getTracks().forEach((t) => t.stop()); }
      catch { blocked.push(name); }
    }
    const inFrame = window.self !== window.top;
    const err = new Error(
      (blocked.length ? `${blocked.join(' and ')} blocked. ` : 'Permission was refused. ') +
      (inFrame ? 'This page is inside a frame; open it directly in your browser. ' :
        'Tap the lock/site-settings icon in the address bar, set Camera and Microphone to Allow, then reload. ' +
        'On iPhone also check Settings → Safari → Camera/Microphone.'));
    err.name = 'NotAllowedError';
    throw err;
  }
}

async function start() {
  if (!navigator.mediaDevices?.getUserMedia) throw new Error('Needs HTTPS (or localhost) and a modern browser.');
  // Must be created inside the tap gesture or iOS leaves it suspended.
  audioCtx = new AudioContext({ latencyHint: 'interactive' });
  audioCtx.resume();
  stream = await getStream();
  video.srcObject = stream;
  await video.play();
  $('placeholder').parentElement.classList.add('live');

  const url = URL.createObjectURL(new Blob([WORKLET], { type: 'text/javascript' }));
  await audioCtx.audioWorklet.addModule(url);
  const node = new AudioWorkletNode(audioCtx, 'rms');
  audioCtx.createMediaStreamSource(new MediaStream(stream.getAudioTracks())).connect(node);
  node.port.onmessage = onAudio;
  await audioCtx.resume();

  clockOffset = Infinity;
  resetDetectors();
  running = true;
  $('start').disabled = true;
  $('reset').disabled = false;
  watchFrames();
}

// getOutputTimestamp() is unreliable on Safari, so learn the clock offset from
// worklet messages instead. The smallest (now - audioTime) seen is the one with
// the least message-delivery delay.
let clockOffset = Infinity, lastStatus = 0;

function onAudio({ data: { t, rms } }) {
  const now = performance.now();
  clockOffset = Math.min(clockOffset, now - t * 1000);
  const perf = t * 1000 + clockOffset - (audioCtx.baseLatency || 0) * 1000;
  // Log-scale meter: -60 dB..0 dB, so quiet phones still show movement.
  const db = 20 * Math.log10(rms + 1e-6);
  $('ameter').value = Math.max(0, Math.min(1, (db + 60) / 60));
  if (now - lastStatus > 500) {
    lastStatus = now;
    $('audiostat').textContent = `audio: ${audioCtx.state}, ${Math.round(audioCtx.sampleRate)} Hz, ${db.toFixed(0)} dB`;
  }
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
  $('detail').textContent = e.name === 'NotAllowedError' ? e.message : `${e.name}: ${e.message}`;
}));
$('reset').addEventListener('click', () => { $('log').textContent = ''; resetDetectors(); });
$('distance').addEventListener('input', render);

// Tone detection settings, remembered between visits when storage is available.
function loadSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem('avsync.settings') || '{}');
    if (saved.sens != null) $('sens').value = saved.sens;
    if (saved.len != null) $('len').value = saved.len;
  } catch { /* storage unavailable: use defaults */ }
}

function applySettings() {
  const sens = +$('sens').value, len = +$('len').value;
  const minRise = sensitivityToMinRise(sens);
  $('sensout').textContent = `${sens} (trigger > ${(20 * Math.log10(minRise)).toFixed(0)} dB)`;
  $('lenout').textContent = `${len} ms`;
  if (audioDet) { audioDet.minRise = minRise; audioDet.minDurationMs = len; }
  try { localStorage.setItem('avsync.settings', JSON.stringify({ sens, len })); } catch { /* ignore */ }
}
$('sens').addEventListener('input', applySettings);
$('len').addEventListener('input', applySettings);
loadSettings();
applySettings();
