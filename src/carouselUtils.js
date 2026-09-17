// Número confirmado pela loja nesta conversa; links legados das outras seções são preservados.
export const carouselWhatsappPhone = "5595991652421";
export const wrapSlide = (index, total) => total ? ((index % total) + total) % total : 0;
export const slideProgress = (index, total) => total ? ((index + 1) / total) * 100 : 0;
export const twoDigits = value => String(value).padStart(2, "0");
export const interestUrl = name => {
  const message = `Olá! Vi a peça ${name} no site da Korabel e gostaria de mais informações.`;
  return `https://wa.me/${carouselWhatsappPhone}?text=${encodeURIComponent(message)}`;
};
export function swipeDirection(dx, dy) {
  return Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) ? (dx < 0 ? 1 : -1) : 0;
}
