import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { interestUrl, wrapSlide, slideProgress, swipeDirection, twoDigits } from "./carouselUtils.js";

test("setas circulares, limites e contador", () => {
  assert.equal(wrapSlide(-1, 7), 6);
  assert.equal(wrapSlide(7, 7), 0);
  assert.equal(wrapSlide(0, 0), 0);
  for (let i = 0; i < 7; i++) {
    assert.equal(wrapSlide(i, 7), i);
    assert.equal(twoDigits(i + 1), "0" + (i + 1));
    assert.equal(slideProgress(i, 7), ((i + 1) / 7) * 100);
  }
});
test("swipe horizontal, sem capturar rolagem vertical ou toques curtos", () => {
  assert.equal(swipeDirection(-90, 10), 1);
  assert.equal(swipeDirection(90, 10), -1);
  assert.equal(swipeDirection(20, 0), 0);
  assert.equal(swipeDirection(60, 110), 0);
});
test("produtos preservados, imagens existentes e mensagens exatas", () => {
  const source = fs.readFileSync(new URL("./main.jsx", import.meta.url), "utf8");
  const products = JSON.parse(source.match(/const products = (\[[\s\S]*?\n\]);/)[1]);
  assert.equal(products.length, 7);
  assert.equal(new Set(products.map(p => p.id)).size, 7);
  for (const product of products) {
    const url = new URL(interestUrl(product.name));
    assert.equal(url.pathname, "/5595991652421");
    assert.equal(url.searchParams.get("text"), `Olá! Vi a peça ${product.name} no site da Korabel e gostaria de mais informações.`);
    for (const image of product.gallery) assert.ok(fs.existsSync(new URL("../public" + image, import.meta.url)));
  }
});
