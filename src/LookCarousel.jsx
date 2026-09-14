import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ProductCard } from "./ShoppingExperience";

// Rolagem nativa: swipe, trackpad e teclado, sem timer ou biblioteca adicional.
export default function LookCarousel({ products, onSelect }) {
  const track = useRef(null);
  const [position, setPosition] = useState(0);
  const [pages, setPages] = useState(1);
  const offsets = useRef([0]);

  useEffect(() => {
    const element = track.current;
    function sync() {
      const items = [...element.children];
      const max = Math.max(0, element.scrollWidth - element.clientWidth);
      const start = items[0]?.offsetLeft || 0;
      offsets.current = [...new Set(items.map(item => Math.min(max, item.offsetLeft - start)))];
      if (!offsets.current.length) offsets.current = [0];
      setPages(offsets.current.length);
      let closest = 0;
      offsets.current.forEach((offset, i) => {
        if (Math.abs(offset - element.scrollLeft) < Math.abs(offsets.current[closest] - element.scrollLeft)) closest = i;
      });
      setPosition(closest);
    }
    const observer = new ResizeObserver(sync);
    observer.observe(element);
    element.addEventListener("scroll", sync, { passive: true });
    sync();
    return () => { observer.disconnect(); element.removeEventListener("scroll", sync); };
  }, [products]);

  function goTo(page) {
    const next = Math.max(0, Math.min(page, offsets.current.length - 1));
    track.current.scrollTo({ left: offsets.current[next], behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  return <div className="editorial-carousel" role="region" aria-roledescription="carrossel" aria-label="Peças em destaque">
    <div ref={track} id="highlight-track" className="look-track" tabIndex={0} aria-label="Vitrine. Use as setas para navegar."
      onKeyDown={e => {
        if (e.target !== e.currentTarget || e.ctrlKey || e.metaKey || e.altKey) return;
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") { e.preventDefault(); goTo(position + (e.key === "ArrowRight" ? 1 : -1)); }
        if (e.key === "Home" || e.key === "End") { e.preventDefault(); goTo(e.key === "Home" ? 0 : pages - 1); }
      }}>
      {products.map(product => <ProductCard key={product.post} product={product} onSelect={onSelect}/>)}
    </div>
    <div className="carousel-controls">
      <span className="carousel-hint">Encontre o seu favorito</span>
      {pages > 1 && <div className="carousel-navigation">
        <button className="round-button" aria-label="Looks anteriores" aria-controls="highlight-track" disabled={position === 0} onClick={() => goTo(position - 1)}><ArrowLeft size={18}/></button>
        <div className="carousel-dots" aria-label="Páginas da vitrine">{Array.from({ length: pages }, (_, i) => <button key={i} aria-label={`Ir para página ${i + 1}`} aria-pressed={position === i} onClick={() => goTo(i)}/>)}</div>
        <button className="round-button" aria-label="Próximos looks" aria-controls="highlight-track" disabled={position === pages - 1} onClick={() => goTo(position + 1)}><ArrowRight size={18}/></button>
      </div>}
      <span className="sr-only" aria-live="polite">Página {position + 1} de {pages}</span>
    </div>
  </div>;
}
