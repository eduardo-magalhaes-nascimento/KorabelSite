import { useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowDown, ArrowRight, ArrowUpRight, Heart, Instagram, Menu, MessageCircle, Sparkles, X } from "lucide-react";
import "./styles.css";
import { products, store } from "./data";
import { WhatsLink } from "./Contact";
import { ProductDetails } from "./ShoppingExperience";
import LookCarousel from "./LookCarousel";

function Brand() {
  return <a className="brand" href="#inicio" aria-label="Korabel Modas — início">
    <img src="/images/logo-restaurada.png" alt="" width="64" height="64"/>
    <span>KORABEL<small>MODAS</small></span>
  </a>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef(null);
  return <header>
    <div className="container nav-wrap">
      <Brand/>
      <nav id="main-menu" aria-label="Menu principal" className={open ? "open" : ""}
        onKeyDown={e => { if (e.key === "Escape") { setOpen(false); toggle.current.focus(); } }}>
        {[["Destaques", "looks"], ["Coleções", "categorias"], ["A Korabel", "sobre"], ["Como comprar", "como-comprar"]].map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}
      </nav>
      <WhatsLink className="header-contact" aria-label="Falar com a Korabel no WhatsApp"><MessageCircle size={18}/><span>Fale com a gente</span></WhatsLink>
      <button ref={toggle} className="menu-toggle" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-controls="main-menu" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
    </div>
  </header>;
}

function Hero() {
  return <section className="hero container" id="inicio">
    <div className="hero-copy">
      <span className="eyebrow">Moda feminina · Korabel</span>
      <h1>Vista a sua<br/><em>essência.</em></h1>
      <p>Peças para se reconhecer no espelho.<br/>Encontre seu próximo look e viva seus momentos com mais leveza.</p>
      <WhatsLink className="btn-primary">Encontre seu estilo <ArrowUpRight size={18}/></WhatsLink>
      <a className="hero-explore text-link" href="#looks">Explore a seleção <ArrowDown size={16}/></a>
    </div>
    <figure className="hero-image">
      <img src="/images/modelo-preto.jpeg" alt="Modelo com vestido preto de um ombro só e detalhe dourado" width="2048" height="2048" fetchPriority="high"/>
      <figcaption><span>O seu jeito de ser.</span><span>KORABEL MODAS</span></figcaption>
    </figure>
    <span className="hero-side-note" aria-hidden="true">FEMININA. LEVE. SUA.</span>
  </section>;
}

function Benefits() {
  return <div className="benefits container" aria-label="A experiência Korabel">
    <div><Heart/><span>Peças para o seu estilo</span></div>
    <div><MessageCircle/><span>Conversa pelo WhatsApp</span></div>
    <div><Sparkles/><span>Inspiração em cada detalhe</span></div>
  </div>;
}

function Categories({ onFilter }) {
  const categories = [
    { name: "Vestidos", label: "Do leve ao marcante", image: "/images/83e8c4aef71bcaff.jpg", filter: "Vestidos" },
    { name: "Conjuntos", label: "Seu look, por inteiro", image: "/images/7f5372a4e051bb4e.jpg", filter: "Conjuntos" },
    { name: "Looks para sair", label: "Para os seus momentos", image: "/images/modelo-pink.jpeg", filter: "Todos" },
    { name: "Novidades", label: "Acompanhe no Instagram", image: "/images/4dfbb7aa933bbe95.jpg", href: store.instagram },
  ];
  return <section className="categories container section-space" id="categorias">
    <div className="section-heading"><div><span className="eyebrow">Qual é o seu momento?</span><h2>Encontre o seu <em>estilo.</em></h2></div><p>Uma escolha que tem a sua cara.</p></div>
    <div className="category-grid">{categories.map(category => <a key={category.name} className="category" href={category.href || "#looks"}
      onClick={() => { if (category.filter) onFilter(category.filter); }} target={category.href ? "_blank" : undefined} rel={category.href ? "noopener noreferrer" : undefined}>
      <div className="category-image"><img src={category.image} alt={`Inspiração Korabel: ${category.name}`} loading="lazy" width="600" height="700"/></div>
      <div className="category-name"><h3>{category.name}</h3><ArrowUpRight size={18}/></div><p>{category.label}</p>
    </a>)}</div>
  </section>;
}

function Manifesto() {
  return <section className="manifesto container section-space" id="sobre">
    <figure><img src="/images/modelo-pink.jpeg" alt="Look pink com alças finas e detalhes franzidos" loading="lazy" width="2048" height="2048"/><figcaption>Para se sentir você, em cada detalhe.</figcaption></figure>
    <div className="manifesto-copy"><span className="eyebrow">Muito prazer, Korabel</span><h2>Looks para acompanhar seus <em>melhores momentos.</em></h2>
      <p>A gente acredita que se vestir também é uma forma de se encontrar. Tem dias de delicadeza, outros de atitude. Todos podem ter um pouco de você.</p>
      <p>Explore nossas peças, escolha o que combina com o seu momento e converse com a gente. Seu próximo favorito pode estar aqui.</p>
      <WhatsLink className="text-link">Vamos encontrar o seu? <ArrowUpRight size={17}/></WhatsLink>
      <span className="signature">Com carinho, Korabel.</span>
    </div>
  </section>;
}

function HowToBuy() {
  return <section className="how-section container section-space" id="como-comprar">
    <span className="eyebrow">Da inspiração à conversa</span><h2>Gostou? Vamos <em>conversar.</em></h2>
    <div className="steps">
      {[["01", "Escolha sua peça", "Explore a vitrine e abra os detalhes do seu look favorito."], ["02", "Toque em “Tenho interesse”", "O WhatsApp abre com uma mensagem pronta sobre a peça escolhida."], ["03", "Combine com a Korabel", "Confirme valor, tamanhos, pagamento e opções de recebimento."]].map(([number, title, text]) => <div key={number}><span className="step-number">{number}</span><h3>{title}</h3><p>{text}</p></div>)}
    </div>
  </section>;
}

function InstagramGallery() {
  return <section className="instagram-section section-space">
    <div className="container">
      <div className="section-heading"><div><span className="eyebrow">Mais perto, todos os dias</span><h2>Nosso universo, <em>seu feed.</em></h2></div><a className="text-link" href={store.instagram} target="_blank" rel="noopener noreferrer"><Instagram size={17}/> @usekorabel <ArrowUpRight size={16}/></a></div>
      <div className="instagram-grid">{products.map(p => <a key={p.post} href={`https://www.instagram.com/p/${p.post}/`} target="_blank" rel="noopener noreferrer" aria-label={`Ver ${p.name} no Instagram`}>
        <img src={`/images/${p.image}.jpg`} alt={`${p.name} — publicação da Korabel`} width="600" height="600" loading="lazy"/><Instagram size={20}/></a>)}</div>
      <p className="instagram-note">Inspirações, detalhes e as próximas novidades. Acompanhe a Korabel.</p>
    </div>
  </section>;
}

function Footer() {
  return <footer>
    <div className="container footer-main">
      <div className="footer-brand"><Brand/><p>Moda feminina para viver<br/>o seu jeito de ser.</p></div>
      <div><h3>Explore</h3><a href="#looks">Destaques da semana</a><a href="#categorias">Encontre seu estilo</a><a href="#sobre">A Korabel</a></div>
      <div><h3>Vamos conversar</h3><a href={store.instagram} target="_blank" rel="noopener noreferrer"><Instagram size={16}/> @usekorabel</a><WhatsLink><MessageCircle size={16}/> {store.whatsappDisplay}</WhatsLink><a href="#como-comprar">Como comprar</a></div>
      <div className="footer-info"><h3>Informações da loja</h3><p>{store.location || "Localização: a confirmar"}</p><p>{store.hours || "Horários: a confirmar"}</p></div>
    </div>
    <div className="container footer-bottom"><span>© {new Date().getFullYear()} Korabel Modas.</span><span>Seu estilo. Sua essência.</span></div>
  </footer>;
}

function App() {
  const [filter, setFilter] = useState("Todos");
  const [selected, setSelected] = useState(null);
  const visibleProducts = filter === "Todos" ? products : products.filter(p => p.category === filter);
  return <>
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <div className="announcement">Um novo olhar para o seu estilo <span aria-hidden="true">✧</span></div>
    <Header/>
    <main id="conteudo" tabIndex={-1}>
      <Hero/><Benefits/>
      <section className="highlights container section-space" id="looks">
        <div className="section-heading"><div><span className="eyebrow">A seleção Korabel</span><h2>Destaques da <em>semana.</em></h2></div><p>Um olhar, uma escolha.<br/>Encontre a peça que combina com você.</p></div>
        <div className="filters" aria-label="Filtrar peças">{["Todos", "Vestidos", "Conjuntos"].map(f => <button key={f} aria-pressed={filter === f} onClick={() => setFilter(f)}>{f}</button>)}</div>
        <LookCarousel key={filter} products={visibleProducts} onSelect={setSelected}/>
      </section>
      <Categories onFilter={setFilter}/><Manifesto/><HowToBuy/><InstagramGallery/>
      <section className="final-cta"><div className="container"><span className="eyebrow">O próximo favorito é seu</span><h2>Seu estilo merece<br/>um <em>novo capítulo.</em></h2><p>Conte pra gente o que você procura.<br/>A conversa continua no WhatsApp.</p><WhatsLink className="btn-light">Fale com a Korabel <ArrowRight size={18}/></WhatsLink></div></section>
    </main>
    <Footer/>
    {selected && <ProductDetails key={selected.post} product={selected} onClose={() => setSelected(null)}/>}
    <WhatsLink className="floating-whatsapp" aria-label="Abrir WhatsApp da Korabel"><MessageCircle size={25}/></WhatsLink>
  </>;
}
createRoot(document.getElementById("root")).render(<App/>);
