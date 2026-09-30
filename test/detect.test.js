import test from 'node:test';
import assert from 'node:assert/strict';
import { blueScore, OnsetDetector, pairEvents, summarize, acousticDelayMs, sensitivityToMinRise, matchEvents } from '../src/detect.js';

test('blueScore sees blue, ignores grey/white/red', () => {
  const px = (r, g, b) => [r, g, b, 255];
  assert.equal(blueScore(new Uint8ClampedArray([...px(20, 80, 230), ...px(20, 80, 230)])), 1);
  assert.equal(blueScore(new Uint8ClampedArray([...px(200, 200, 200), ...px(255, 255, 255), ...px(220, 30, 30), ...px(0, 0, 0)])), 0);
});

function run(det, samples) {
  const out = [];
  for (const [t, v] of samples) { const o = det.update(t, v); if (o !== null) out.push(o); }
  return out;
}

test('OnsetDetector finds one onset per pulse', () => {
  const samples = [];
  for (let t = 0; t < 3000; t += 33) {
    const inPulse = (t >= 1000 && t < 1100) || (t >= 2000 && t < 2100);
    samples.push([t, inPulse ? 0.05 : 0.0005 + (t % 7) * 0.0001]);
  }
  const onsets = run(new OnsetDetector(), samples);
  assert.equal(onsets.length, 2);
  assert.ok(onsets[0] >= 1000 && onsets[0] < 1050);
});

test('OnsetDetector ignores a steady loud signal after arming', () => {
  const samples = [];
  for (let t = 0; t < 2000; t += 10) samples.push([t, 0.001]);
  assert.equal(run(new OnsetDetector(), samples).length, 0);
});

test('pairEvents and summarize: audio late by ~80ms', () => {
  const flashes = [1000, 2000, 3000];
  const tones = [1078, 2082, 3080];
  const offsets = pairEvents(flashes, tones);
  assert.deepEqual(offsets, [78, 82, 80]);
  const s = summarize(offsets);
  assert.equal(s.median, 80);
  assert.equal(s.count, 3);
});

test('pairEvents skips unmatched events; early audio is negative', () => {
  assert.deepEqual(pairEvents([1000, 5000], [960]), [-40]);
  assert.equal(summarize([]), null);
});

test('acousticDelayMs: 3.43m is 10ms', () => {
  assert.ok(Math.abs(acousticDelayMs(3.43) - 10) < 1e-9);
});

test('minDurationMs rejects a short tap but keeps a sustained tone, reporting its start', () => {
  const mk = (pulseLen) => {
    const samples = [];
    for (let t = 0; t < 2000; t += 3) samples.push([t, t >= 1000 && t < 1000 + pulseLen ? 0.05 : 0.0005]);
    return run(new OnsetDetector({ minRise: 0.0005, minDurationMs: 30 }), samples);
  };
  assert.equal(mk(12).length, 0);
  const tone = mk(150);
  assert.equal(tone.length, 1);
  assert.ok(tone[0] >= 1000 && tone[0] < 1004);
});

test('sensitivityToMinRise: more sensitive means a lower threshold', () => {
  assert.ok(Math.abs(sensitivityToMinRise(0) - 0.01) < 1e-9);
  assert.ok(Math.abs(sensitivityToMinRise(100) - 0.00001) < 1e-12);
  assert.ok(sensitivityToMinRise(80) < sensitivityToMinRise(20));
});

test('matchEvents returns the flash, tone and offset of each pair', () => {
  assert.deepEqual(matchEvents([1000], [1075]), [{ flash: 1000, tone: 1075, offset: 75 }]);
});
