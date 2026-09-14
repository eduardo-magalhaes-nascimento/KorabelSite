import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, X, MessageCircle, Copy, Check, Play, Pause } from "lucide-react";

const whatsapp = "https://wa.me/message/UYRBMHAN7V52O1";
export const productPhoto = p => p.photo || `/images/${p.image}.jpg`;

export function ProductCard({ product, onSelect }) {
  return <article className="product">
    <button className="product-photo" onClick={() => onSelect(product)} aria-label={`Ver detalhes de ${product.name}`}>
      <img src={productPhoto(product)} alt={`${product.name} — ${product.color}`} loading="lazy" width="559" height="640"/>
      <span className="photo-label">CONHEÇA OS DETALHES</span><span className="photo-arrow"><ArrowUpRight size={20}/></span>
    </button>
    <div className="product-meta"><span>{product.category}</span><span><i style={{background:product.swatch}}/>{product.color}</span></div>
    <h3><button onClick={() => onSelect(product)}>{product.name}</button></h3>
    <div className="product-bottom"><span>Valor sob consulta</span><button onClick={() => onSelect(product)}>Ver peça <ArrowUpRight size={17}/></button></div>
  </article>;
}

export function LookCarousel({ products, onSelect, modalOpen = false }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(!document.hidden);
  const [reducedMotion, setReducedMotion] = useState(() => matchMedia("(prefers-reduced-motion: reduce)").matches);
  const section = useRef(null);
  const touchStart = useRef(null);
  const playing = !paused && !hovered && visible && pageVisible && !reducedMotion && !modalOpen;

  useEffect(() => {
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(motion.matches);
    const updateVisibility = () => setPageVisible(!document.hidden);
    motion.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateVisibility);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.25 });
    observer.observe(section.current);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(() => setIndex(i => (i + 1) % products.length), 6500);
    return () => clearTimeout(timer);
  }, [playing, index, products.length]);

  function select(next) {
    setPaused(true);
    setIndex((next + products.length) % products.length);
  }

  return <section ref={section} className="look-carousel container" aria-roledescription="carrossel" aria-label="Looks em destaque"
    onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    onFocusCapture={e => { if (!e.target.closest(".carousel-play") || e.target.matches(":focus-visible")) setPaused(true); }}>
    <div className="carousel-heading"><span className="eyebrow">UM OLHAR NA COLEÇÃO</span><h2>Encontre sua <em>inspiração.</em></h2><p>Peças que merecem um lugar nos seus próximos momentos.</p></div>
    <div className="carousel-toolbar">
      <span>Uma seleção para se apaixonar</span>
      {!reducedMotion && <button className="carousel-play" onClick={() => setPaused(p => !p)} aria-label={paused ? "Reproduzir carrossel" : "Pausar carrossel"}>
        {paused ? <Play size={15}/> : <Pause size={15}/>} {paused ? "Reproduzir" : "Pausar"}
      </button>}
    </div>
    <div className="carousel-slides"
      onTouchStart={e => { touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; }}
      onTouchEnd={e => {
        const start = touchStart.current;
        touchStart.current = null;
        if (!start) return;
        const dx = e.changedTouches[0].clientX - start.x;
        const dy = e.changedTouches[0].clientY - start.y;
        if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy)) select(index + (dx < 0 ? 1 : -1));
      }}>
      {products.map((product, i) => <div key={product.post}
        className={`carousel-stage carousel-slide ${index === i ? "is-active" : ""}`}
        role="group" aria-roledescription="slide" aria-label={`${i + 1} de ${products.length}: ${product.name}`}
        aria-hidden={index !== i} ref={element => { if (element) element.toggleAttribute("inert", index !== i); }}>
        <button className="carousel-photo" onClick={() => { setPaused(true); onSelect(product); }} aria-label={`Conhecer ${product.name}`}>
          <img src={productPhoto(product)} alt={`${product.name} na cor ${product.color}`} loading="lazy" draggable="false"/>
        </button>
        <div className="carousel-copy">
          <span className="carousel-count">{String(i+1).padStart(2,"0")} <span>/ {String(products.length).padStart(2,"0")}</span></span>
          <span className="eyebrow">{product.category} · {product.color}</span>
          <h3>{product.name}</h3><p>{product.description}</p>
          <button className="btn-ghost" onClick={() => { setPaused(true); onSelect(product); }}>Quero conhecer essa peça <ArrowUpRight size={20}/></button>
        </div>
      </div>)}
    </div>
    <div className="carousel-controls">
      <button onClick={() => select(index - 1)} aria-label="Look anterior"><ArrowLeft size={20}/></button>
      <div className="carousel-dots" role="group" aria-label="Escolher look">{products.map((p,i)=><button key={p.post}
        aria-label={`Mostrar look ${i+1}: ${p.name}`} aria-pressed={index===i} onClick={()=>select(i)}/>)}</div>
      <button onClick={() => select(index + 1)} aria-label="Próximo look"><ArrowRight size={20}/></button>
    </div>
    <span className="sr-only" aria-live={playing ? "off" : "polite"} aria-atomic="true">{index + 1} de {products.length}: {products[index].name}</span>
  </section>;
}

export function ProductDetails({ product, onClose }) {
  const ref = useRef(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);
  const gallery = product.gallery || [productPhoto(product)];
  const message = `Olá, Korabel! Tenho interesse no ${product.name.toLowerCase()} (${product.color}). Gostaria de saber o valor, tamanhos e outras cores disponíveis. https://www.instagram.com/usekorabel/p/${product.post}/`;
  useEffect(() => {
    const dialog = ref.current;
    const focused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => { dialog.close(); document.body.style.overflow = previousOverflow; focused?.focus(); };
  }, []);
  async function copy() {
    try { await navigator.clipboard.writeText(message); setCopied(true); setError(false); }
    catch { setError(true); }
  }
  return <dialog ref={ref} className="product-dialog" aria-labelledby="product-title" onCancel={onClose} onClick={e=>{if(e.target===e.currentTarget) onClose();}}>
    <div className="details-layout"><button className="dialog-close" aria-label="Fechar detalhes" onClick={onClose}><X/></button>
      <div className="details-gallery"><img className="details-main-photo" src={gallery[photoIndex]} alt={`${product.name} — foto ${photoIndex+1}`}/>{gallery.length>1&&<div className="thumbnails">{gallery.map((src,i)=><button key={src} onClick={()=>setPhotoIndex(i)} aria-label={`Ver foto ${i+1}`} aria-pressed={i===photoIndex}><img src={src} alt=""/></button>)}</div>}</div>
      <div className="details-copy"><span className="eyebrow">KORABEL · {product.category}</span><h2 id="product-title">{product.name}</h2><p>{product.description}</p><div className="variant-group"><h3>Cor apresentada</h3><button className="color-option" aria-pressed="true"><i style={{background:product.swatch}}/>{product.color}<Check size={16}/></button><p>Outras cores e tamanhos: consulte nossa equipe.</p></div><div className="availability"><span>Feito para a sua escolha</span><p>Confirme valor e disponibilidade pelo WhatsApp.</p></div><a className="btn-primary" href={whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={20}/>Consultar esta peça <ArrowUpRight size={18}/></a><button className="details-copy-button btn-ghost" onClick={copy}>{copied?<Check size={16}/>:<Copy size={16}/>}<span aria-live="polite">{copied?"Mensagem copiada — cole no WhatsApp":"Copiar mensagem com a referência"}</span></button>{error&&<textarea aria-label="Mensagem da peça para copiar" readOnly value={message} onFocus={e=>e.target.select()}/>}<a className="original-post" href={`https://www.instagram.com/usekorabel/p/${product.post}/`} target="_blank" rel="noopener noreferrer">Ver publicação no Instagram <ArrowUpRight size={14}/></a></div>
    </div>
  </dialog>;
}
