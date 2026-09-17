export const AUTOPLAY_DELAY = 5000;

// Single clock drives both the progress bar and the slide change.
// Returning cleanup prevents orphan intervals after interaction or unmount.
export function startAutoplay({ onProgress, onAdvance }, clock = {
  now: () => performance.now(),
  every: callback => setInterval(callback, 100),
  cancel: id => clearInterval(id),
}) {
  const started = clock.now();
  let stopped = false;
  const id = clock.every(() => {
    if (stopped) return;
    const elapsed = Math.min(AUTOPLAY_DELAY, clock.now() - started);
    onProgress(elapsed);
    if (elapsed >= AUTOPLAY_DELAY) {
      stopped = true;
      clock.cancel(id);
      onAdvance();
    }
  });
  return () => { stopped = true; clock.cancel(id); };
}
