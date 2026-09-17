import test from 'node:test';
import assert from 'node:assert/strict';
import { startAutoplay, AUTOPLAY_DELAY } from './carouselAutoplay.js';

test('autoplay advances once at five seconds and synchronizes progress', () => {
  let time = 0, tick, advances = 0, progress = 0, cancellations = 0;
  const clock = { now: () => time, every: fn => { tick = fn; return 1; }, cancel: () => cancellations++ };
  startAutoplay({ onProgress: n => progress = n, onAdvance: () => advances++ }, clock);
  time = 2500; tick(); assert.equal(progress, 2500); assert.equal(advances, 0);
  time = AUTOPLAY_DELAY; tick(); assert.equal(progress, 5000); assert.equal(advances, 1);
  time = 10000; tick(); assert.equal(advances, 1); assert.equal(cancellations, 1);
});
test('manual restart cancels old interval and receives a full five seconds', () => {
  let time = 0, advances = 0; const callbacks = [];
  const clock = { now: () => time, every: fn => callbacks.push(fn), cancel: () => {} };
  const options = { onProgress: () => {}, onAdvance: () => advances++ };
  const stop = startAutoplay(options, clock);
  time = 3000; stop(); startAutoplay(options, clock);
  time = 5000; callbacks.forEach(fn => fn()); assert.equal(advances, 0);
  time = 8000; callbacks.forEach(fn => fn()); assert.equal(advances, 1);
});
