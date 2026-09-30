import { blueScore, OnsetDetector, matchEvents, summarize, acousticDelayMs, sensitivityToMinRise } from './detect.js';

const $ = (id) => document.getElementById(id);
const video = $('video'), probe = $('probe'), ctx2d = probe.getContext('2d', { willReadFrequently: true });

// Timestamps of detected events, all in the performance.now() clock (ms).
let flashes = [], tones = [], t0 = 0, loggedFlashes = new Set(), loggedTones = new Set(), loggedPairs = new Set();
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
  flashes = []; tones = []; loggedFlashes = new Set(); loggedTones = new Set(); loggedPairs = new Set();
  t0 = performance.now();
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
  // Log-scale meter: -100 dB..-20 dB, so quiet phones still show movement.
  const db = 20 * Math.log10(rms + 1e-6);
  $('ameter').value = Math.max(0, Math.min(1, (db + 100) / 80));
  if (now - lastStatus > 500) {
    lastStatus = now;
    $('audiostat').textContent = `audio: ${audioCtx.state}, ${Math.round(audioCtx.sampleRate)} Hz, ${db.toFixed(0)} dB`;
  }
  const onset = audioDet.update(perf, rms);
  if (onset !== null) { tones.push(onset); log(`🔊 beep at ${rel(onset)}`); render(); }
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
    if (onset !== null) { flashes.push(onset); log(`🔵 flash at ${rel(onset)}`); render(); }
    video.requestVideoFrameCallback(onFrame);
  };
  video.requestVideoFrameCallback(onFrame);
}

// Seconds since the current run started, so log times are readable.
const rel = (t) => `${((t - t0) / 1000).toFixed(3)} s`;

function log(text, cls = '') {
  const li = document.createElement('li');
  li.textContent = text;
  if (cls) li.className = cls;
  $('log').prepend(li);
}

const WINDOW_MS = 500;

// Log any pair that has just formed, and any event that never found a partner.
function logPairs(acoustic) {
  const adj = tones.map((t) => t - acoustic);
  matchEvents(flashes, adj, WINDOW_MS).forEach(({ flash, offset }, i) => {
    if (loggedPairs.has(flash)) return;
    loggedPairs.add(flash);
    const ms = Math.round(offset);
    const what = Math.abs(ms) <= 20 ? 'in sync' : ms > 0 ? 'audio late' : 'audio early';
    log(`⏱ pair ${loggedPairs.size}: ${ms > 0 ? '+' : ''}${ms} ms (${what})`, 'pair');
  });
  const now = performance.now();
  const paired = matchEvents(flashes, adj, WINDOW_MS);
  for (const f of flashes) {
    if (now - f > WINDOW_MS + 200 && !loggedFlashes.has(f) && !paired.some((m) => m.flash === f)) {
      loggedFlashes.add(f);
      log(`⚠ flash at ${rel(f)} had no beep within ${WINDOW_MS} ms`, 'warn');
    }
  }
  for (const [i, t] of adj.entries()) {
    const raw = tones[i];
    if (now - raw > WINDOW_MS + 200 && !loggedTones.has(raw) && !paired.some((m) => m.tone === t)) {
      loggedTones.add(raw);
      log(`⚠ beep at ${rel(raw)} had no flash within ${WINDOW_MS} ms`, 'warn');
    }
  }
}

setInterval(() => { if (running) logPairs(acousticDelayMs(parseFloat($('distance').value) || 0)); }, 400);

function render() {
  const verdict = $('verdict'), detail = $('detail');
  verdict.className = '';
  const acoustic = acousticDelayMs(parseFloat($('distance').value) || 0);
  const offsets = matchEvents(flashes, tones.map((t) => t - acoustic), WINDOW_MS).map((m) => m.offset);
  if (running) logPairs(acoustic);
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
    const saved = JSON.parse(localStorage.getItem('avsync.settings.v2') || '{}');
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
  try { localStorage.setItem('avsync.settings.v2', JSON.stringify({ sens, len })); } catch { /* ignore */ }
}
$('sens').addEventListener('input', applySettings);
$('len').addEventListener('input', applySettings);
loadSettings();
applySettings();
