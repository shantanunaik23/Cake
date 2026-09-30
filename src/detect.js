// Pure detection helpers: no DOM, so they can be unit tested in Node.

/** Fraction of pixels in RGBA `data` that look like the test's blue dot. */
export function blueScore(data) {
  let hits = 0;
  const n = data.length / 4;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    if (b > 110 && b > r * 1.6 && b > g * 1.25) hits++;
  }
  return n ? hits / n : 0;
}

/**
 * Detects rising edges in a noisy signal. Baseline is the median of recent
 * quiet samples; an onset fires when the value clears baseline by `minRise`
 * and `factor`, then re-arms once the signal falls back down.
 */
export class OnsetDetector {
  constructor({ minRise = 0.002, factor = 3, refractoryMs = 400, history = 45, minDurationMs = 0 } = {}) {
    Object.assign(this, { minRise, factor, refractoryMs, history, minDurationMs });
    this.pending = null;
    this.quiet = [];
    this.armed = true;
    this.lastOnset = -Infinity;
  }

  baseline() {
    if (!this.quiet.length) return 0;
    const s = [...this.quiet].sort((a, b) => a - b);
    return s[s.length >> 1];
  }

  /** Feed a sample; returns the onset timestamp (ms) if one just started. */
  update(t, value) {
    const base = this.baseline();
    const high = value > base * this.factor + this.minRise;
    if (high && this.armed && t - this.lastOnset > this.refractoryMs && this.quiet.length >= 10) {
      // Must stay high for minDurationMs (rejects taps/bumps); report when it began.
      if (this.pending === null) this.pending = t;
      if (t - this.pending >= this.minDurationMs) {
        const start = this.pending;
        this.pending = null;
        this.armed = false;
        this.lastOnset = start;
        return start;
      }
      return null;
    }
    if (!high) {
      this.pending = null;
      this.armed = true;
      this.quiet.push(value);
      if (this.quiet.length > this.history) this.quiet.shift();
    }
    return null;
  }
}

/**
 * Pair each flash with the nearest tone within `windowMs`.
 * Offset = tone - flash, so positive means audio arrives AFTER video.
 */
export function pairEvents(flashes, tones, windowMs = 500) {
  const offsets = [];
  const used = new Set();
  for (const f of flashes) {
    let best = -1;
    for (let i = 0; i < tones.length; i++) {
      if (used.has(i)) continue;
      const d = Math.abs(tones[i] - f);
      if (d <= windowMs && (best < 0 || d < Math.abs(tones[best] - f))) best = i;
    }
    if (best >= 0) {
      used.add(best);
      offsets.push(tones[best] - f);
    }
  }
  return offsets;
}

export function summarize(offsets) {
  if (!offsets.length) return null;
  const s = [...offsets].sort((a, b) => a - b);
  const median = s.length % 2 ? s[s.length >> 1] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2;
  const spread = s[s.length - 1] - s[0];
  return { median, spread, count: s.length };
}

export const SPEED_OF_SOUND_M_PER_S = 343;
/** Time sound takes to reach the phone, which we subtract from tone times. */
export function acousticDelayMs(distanceM) {
  return (distanceM / SPEED_OF_SOUND_M_PER_S) * 1000;
}
