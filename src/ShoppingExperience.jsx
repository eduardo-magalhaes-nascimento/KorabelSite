import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X, MessageCircle, Copy, Check } from "lucide-react";

const whatsapp = "https://wa.me/message/UYRBMHAN7V52O1";
export const productPhoto = p => p.photo || `/images/${p.image}.jpg`;

export function ProductCard({ product, index = 0, onSelect }) {
  return <article className="product">
    <button className="product-photo" onClick={() => onSelect(product)} aria-label={`Ver detalhes de ${product.name}`}>
      <img src={productPhoto(product)} alt={product.alt || `${product.name} na cor ${product.color}, vista de frente`} style={{objectPosition: product.objectPosition || "center top"}} loading="lazy" width="1080" height="1350"/>
    </button>
    <span className="collection-item-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
    <div className="product-meta"><span>{product.category}</span><span><i aria-hidden="true" style={{background:product.swatch}}/>{product.color}</span></div>
    <h3><button onClick={() => onSelect(product)}>{product.name}</button></h3>
    <div className="product-bottom"><button onClick={() => onSelect(product)} aria-label={`Consultar peça: ${product.name}`}>Consultar peça <ArrowUpRight size={17}/></button></div>
  </article>;
}

export { default as LookCarousel } from "./EditorialCarousel";

export function ProductDetails({ product, onClose }) {
  const ref = useRef(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);
  const gallery = product.gallery || [productPhoto(product)];
  const message = `Olá, Korabel! Tenho interesse no ${product.name.toLowerCase()} (${product.color}). Gostaria de saber o valor, tamanhos e outras cores disponíveis.${product.post ? ` https://www.instagram.com/usekorabel/p/${product.post}/` : ""}`;
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
      <div className="details-copy"><span className="eyebrow">KORABEL · {product.category}</span><h2 id="product-title">{product.name}</h2><p>{product.description}</p><div className="variant-group"><h3>Cor apresentada</h3><button className="color-option" aria-pressed="true"><i style={{background:product.swatch}}/>{product.color}<Check size={16}/></button><p>Outras cores e tamanhos: consulte nossa equipe.</p></div><div className="availability"><span>Feito para a sua escolha</span><p>Confirme valor e disponibilidade pelo WhatsApp.</p></div><a className="btn-primary" href={whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={20}/>Consultar esta peça <ArrowUpRight size={18}/></a><button className="details-copy-button btn-ghost" onClick={copy}>{copied?<Check size={16}/>:<Copy size={16}/>}<span aria-live="polite">{copied?"Mensagem copiada — cole no WhatsApp":"Copiar mensagem com a referência"}</span></button>{error&&<textarea aria-label="Mensagem da peça para copiar" readOnly value={message} onFocus={e=>e.target.select()}/>}{product.post && <a className="original-post" href={`https://www.instagram.com/usekorabel/p/${product.post}/`} target="_blank" rel="noopener noreferrer">Ver publicação no Instagram <ArrowUpRight size={14}/></a>}</div>
    </div>
  </dialog>;
}
