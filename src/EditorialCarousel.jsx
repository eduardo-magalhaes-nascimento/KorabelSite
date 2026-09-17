import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { swipeDirection, twoDigits, wrapSlide } from "./carouselUtils";
import { startAutoplay } from "./carouselAutoplay";
import { trackPosition } from "./carouselLayout";
import { siteAsset } from "./siteAsset";
import "./editorial-carousel.css";

// Original photos only: transparent campaign assets are intentionally not used.
const photo = product => product.photo || `/images/${product.image}.jpg`;

export default function EditorialCarousel({ products, modalOpen = false }) {
  const viewport = useRef(null);
  const track = useRef(null);
  const touchStart = useRef(null);
  const [index, setIndex] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [geometry, setGeometry] = useState({ step: 0, maxOffset: 0, last: 0 });
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(() => document.hidden);
  useEffect(() => {
    const update = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  useEffect(() => {
    const node = viewport.current;
    const row = track.current;
    if (!node || !row || !row.firstElementChild) return;
    const measure = () => {
      const gap = parseFloat(getComputedStyle(row).columnGap) || 0;
      const step = row.firstElementChild.getBoundingClientRect().width + gap;
      const maxOffset = Math.max(0, row.scrollWidth - node.clientWidth);
      const last = Math.max(0, Math.ceil((maxOffset - 1) / step));
      setGeometry({ step, maxOffset, last });
      setIndex(current => Math.min(current, last));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [products.length]);
  const running = geometry.last > 0 && !focused && !hidden && !modalOpen;
  useEffect(() => {
    if (!running) return;
    return startAutoplay({
      onProgress: () => {},
      onAdvance: () => {
        setIndex(current => wrapSlide(current + 1, geometry.last + 1));
        setCycle(current => current + 1);
      },
    });
  }, [cycle, running, geometry.last]);
  const select = next => {
    setIndex(wrapSlide(next, geometry.last + 1));
    setCycle(current => current + 1);
  };
  if (!products.length) return null;
  return <section className="curated-section" aria-roledescription="carrossel" aria-label="Curadoria Korabel"
    onFocusCapture={event => setFocused(event.target.matches(":focus-visible"))}
    onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
    onKeyDown={event => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      const keys = { ArrowLeft: index - 1, ArrowRight: index + 1, Home: 0, End: geometry.last };
      if (event.key in keys) { event.preventDefault(); setFocused(true); select(keys[event.key]); }
    }}>
    <div className="curated-container">
      <div className="curated-heading">
        <span className="curated-eyebrow">CURADORIA KORABEL</span>
        <h2>Escolhas para o <em>seu momento.</em></h2>
        <p>Looks que acompanham cada versão de você.</p>
      </div>
      <div ref={viewport} className="curated-viewport" tabIndex={0} aria-label="Vitrine: use as setas do teclado para navegar"
        onTouchStart={event => { touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }}
        onTouchCancel={() => { touchStart.current = null; }}
        onTouchEnd={event => {
          const start = touchStart.current; touchStart.current = null;
          if (!start) return;
          const direction = swipeDirection(event.changedTouches[0].clientX - start.x, event.changedTouches[0].clientY - start.y);
          if (direction) select(index + direction);
        }}>
        <div ref={track} className="curated-track" style={{ transform: `translateX(-${trackPosition(index, geometry.step, geometry.maxOffset)}px)` }}>
          {products.map((product, itemIndex) => <article className="curated-item" key={product.id}>
            <div className="curated-photo">
              <img src={siteAsset(photo(product))} alt={product.alt || `${product.name} — ${product.color}, vista de frente`}
                style={{ objectPosition: product.objectPosition || "center top" }} loading="lazy" draggable="false" width="1080" height="1350"/>
            </div>
            <div className="curated-meta">
              <span className="curated-category">{product.category}</span>
              <h3>{product.name}</h3>
              <span className="curated-item-number">{twoDigits(itemIndex + 1)}</span>
            </div>
          </article>)}
        </div>
      </div>
      <div className="curated-controls">
        <div className="curated-position">
          <div className="curated-progress" role="progressbar" aria-label="Posição na coleção" aria-valuemin={1} aria-valuemax={products.length} aria-valuenow={index + 1}>
            <span style={{ width: `${((index + 1) / products.length) * 100}%` }}/>
          </div>
          <span className="curated-counter">{twoDigits(index + 1)} / {twoDigits(products.length)}</span>
        </div>
        <div className="curated-navigation">
          <button type="button" disabled={!geometry.last} onClick={() => select(index - 1)} aria-label="Ver produtos anteriores"><ChevronLeft size={22}/></button>
          <button type="button" disabled={!geometry.last} onClick={() => select(index + 1)} aria-label="Ver próximos produtos"><ChevronRight size={22}/></button>
        </div>
      </div>
      <span className="sr-only" aria-live={running ? "off" : "polite"}>Primeiro produto em exibição: {products[index]?.name}</span>
    </div>
  </section>;
}
