import { useState } from "react";
import { ArrowUpRight, X, Check } from "lucide-react";
import { productPhoto } from "./data";
import { WhatsLink, useDialog } from "./Contact";

export function ProductCard({ product, onSelect }) {
  return <article className="product">
    <button className="product-photo" onClick={() => onSelect(product)} aria-label={`Ver detalhes de ${product.name}`}>
      <img src={productPhoto(product)} alt={`${product.name} na cor ${product.color}`} loading="lazy" width="600" height="800" draggable="false"/>
      <span className="photo-detail">Ver detalhes <ArrowUpRight size={16}/></span>
    </button>
    <div className="product-meta"><span>{product.category}</span><span>{product.color}</span></div>
    <h3><button onClick={() => onSelect(product)}>{product.name}</button></h3>
    <p className="product-price">{product.price ? new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(product.price) : "Valor sob consulta"}</p>
    <WhatsLink product={product} className="interest-link" aria-label={`Tenho interesse em ${product.name}`}>Tenho interesse <ArrowUpRight size={16}/></WhatsLink>
  </article>;
}

export function ProductDetails({ product, onClose }) {
  const ref = useDialog(onClose);
  const [photoIndex, setPhotoIndex] = useState(0);
  const gallery = product.gallery || [productPhoto(product)];
  return <dialog ref={ref} className="product-dialog" aria-labelledby="product-title" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
    <div className="details-layout">
      <button className="dialog-close" aria-label="Fechar detalhes" onClick={onClose}><X size={21}/></button>
      <div className="details-gallery">
        <img className="details-main-photo" src={gallery[photoIndex]} alt={`${product.name} — foto ${photoIndex + 1}`}/>
        {gallery.length > 1 && <div className="thumbnails">{gallery.map((src, i) => <button key={src} onClick={() => setPhotoIndex(i)} aria-label={`Ver foto ${i + 1}`} aria-pressed={i === photoIndex}><img src={src} alt=""/></button>)}</div>}
      </div>
      <div className="details-copy">
        <span className="eyebrow">Korabel · {product.category}</span>
        <h2 id="product-title">{product.name}</h2>
        <p>{product.description}</p>
        <div className="variant-group">
          <h3>Cor apresentada</h3>
          <span className="color-option"><i style={{ background: product.swatch }}/>{product.color}<Check size={15}/></span>
          <p>Consulte outras cores, tamanhos e disponibilidade com a nossa equipe.</p>
        </div>
        <p className="detail-price">Valor sob consulta</p>
        <WhatsLink product={product} className="btn-primary">Tenho interesse <ArrowUpRight size={18}/></WhatsLink>
        <a className="text-link original-post" href={`https://www.instagram.com/p/${product.post}/`} target="_blank" rel="noopener noreferrer">Ver no Instagram <ArrowUpRight size={16}/></a>
      </div>
    </div>
  </dialog>;
}
