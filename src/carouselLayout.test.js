import test from "node:test";
import assert from "node:assert/strict";
import { trackPosition } from "./carouselLayout.js";

test("desktop: three full products and no blank space at the end", () => {
  const width = 1200, gap = 24, card = (width - gap * 2) / 3;
  const step = card + gap, maximum = card * 7 + gap * 6 - width;
  assert.equal(card * 3 + gap * 2, width);
  assert.equal(trackPosition(4, step, maximum), maximum);
  assert.equal(trackPosition(6, step, maximum), maximum);
  assert.equal(trackPosition(0, step, maximum), 0);
});
test("tablet: two full products", () => {
  const width = 800, gap = 24, card = (width - gap) / 2;
  assert.equal(card * 2 + gap, width);
  assert.equal(trackPosition(5, card + gap, card * 7 + gap * 6 - width), 2060);
});
test("mobile: one full product, next preview and final offset clamped", () => {
  const width = 350, gap = 12, card = width * .86;
  const preview = (width - card - gap) / card;
  assert.ok(preview >= .08 && preview <= .15);
  const maximum = card * 7 + gap * 6 - width;
  assert.equal(trackPosition(6, card + gap, maximum), maximum);
});
