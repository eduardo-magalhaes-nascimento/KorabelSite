import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  ArrowRight,
  Instagram,
  MessageCircle,
  Menu,
  X,
  Heart,
  Sparkles,
  ShoppingBag,
} from "lucide-react";
import "./styles.css";
import "./refinements.css";
import "./hero.css";
import "./collection.css";
import "./about.css";
import { ProductCard, ProductDetails, LookCarousel } from "./ShoppingExperience";
import usePresentation from "./usePresentation";

const whatsapp = "https://wa.me/message/UYRBMHAN7V52O1";
const instagram = "https://www.instagram.com/usekorabel/";
const products = [
  {
    "id": "amarelo",
    "needsTransparentImage": true,
    "name": "Vestido ombro a ombro",
    "color": "Amarelo",
    "category": "Vestidos",
    "photo": "/images/roupas/amarelo-frente.jpeg",
    "gallery": [
      "/images/roupas/amarelo-frente.jpeg",
      "/images/roupas/amarelo-lado.jpeg",
      "/images/roupas/amarelo-costa.jpeg"
    ],
    "swatch": "#ead98d",
    "description": "Vestido amarelo com decote ombro a ombro, mangas longas e detalhes franzidos.",
    "post": "Dbs6ITkDgYw"
  },
  {
    "id": "nude",
    "needsTransparentImage": false,
    "carouselPhoto": "/images/roupas/vestido-nude-transparente.png",
    "name": "Vestido de um ombro só",
    "color": "Nude",
    "category": "Vestidos",
    "photo": "/images/roupas/vestidinho-fretne.jpeg",
    "gallery": [
      "/images/roupas/vestidinho-fretne.jpeg",
      "/images/roupas/vestidinho-lado.jpeg",
      "/images/roupas/vestidinho-costa.jpeg"
    ],
    "swatch": "#dec2b2",
    "description": "Vestido nude de um ombro só, com franzidos, detalhe dourado e faixa lateral.",
    "post": "Dbs6d8WDk7L"
  },
  {
    "id": "preto",
    "needsTransparentImage": true,
    "name": "Look frente única",
    "color": "Preto",
    "category": "Conjuntos",
    "photo": "/images/roupas/preto-frente.jpeg",
    "gallery": [
      "/images/roupas/preto-frente.jpeg",
      "/images/roupas/preto-lado.jpeg",
      "/images/roupas/preto-costa.jpeg"
    ],
    "swatch": "#262323",
    "description": "Look preto com frente única, amarração e parte inferior com volume.",
    "post": "Dbs5uYeDjld"
  },
  {
    "id": "azul",
    "needsTransparentImage": true,
    "name": "Look azul com recortes",
    "color": "Azul",
    "category": "Conjuntos",
    "photo": "/images/roupas/azul-frente.jpeg",
    "gallery": [
      "/images/roupas/azul-frente.jpeg",
      "/images/roupas/azul-esquerdo.jpeg",
      "/images/roupas/azul-costa.jpeg"
    ],
    "swatch": "#203455",
    "description": "Look azul com mangas longas, recortes na cintura e parte inferior franzida.",
    "post": null
  },
  {
    "id": "marrom",
    "needsTransparentImage": true,
    "name": "Look marrom com drapeado",
    "color": "Marrom",
    "category": "Conjuntos",
    "photo": "/images/roupas/marrom-frente.jpeg",
    "gallery": [
      "/images/roupas/marrom-frente.jpeg",
      "/images/roupas/marrom-esquerda.jpeg",
      "/images/roupas/marrom-costa.jpeg"
    ],
    "swatch": "#82593d",
    "description": "Look marrom com decote drapeado, amarração no pescoço e detalhe dourado.",
    "post": null
  },
  {
    "id": "vestido-marrom",
    "needsTransparentImage": true,
    "name": "Vestido marrom de alças",
    "color": "Marrom",
    "category": "Vestidos",
    "photo": "/images/roupas/vestidinhoMarrom-frente.jpeg",
    "gallery": [
      "/images/roupas/vestidinhoMarrom-frente.jpeg",
      "/images/roupas/vestidinhoMarrom-lado.jpeg",
      "/images/roupas/vestidinhoMarrom-costa.jpeg"
    ],
    "swatch": "#a17d6d",
    "description": "Vestido marrom de alças finas, com detalhe franzido no busto e saia de caimento solto.",
    "post": null
  },
  {
    "id": "pink",
    "needsTransparentImage": true,
    "name": "Vestido com franzido",
    "color": "Pink",
    "category": "Vestidos",
    "photo": "/images/modelo-pink.jpeg",
    "gallery": [
      "/images/modelo-pink.jpeg",
      "/images/06775c687ea9d759.jpg"
    ],
    "post": "Dbs6uLTDpGk",
    "description": "Look pink de alças finas com detalhes franzidos.",
    "swatch": "#a72966"
  }
];
const photo = (p) => p.photo || `/images/${p.image}.jpg`;
function Brand() {
  return (
    <a className="brand" href="#inicio" aria-label="Korabel — início">
      <img src="/images/logo-restaurada.png" alt="Korabel Modas" width="66" height="66" />
      <span>
        KORABEL<small>M O D A S</small>
      </span>
    </a>
  );
}
function WhatsLink({ children, className = "" }) {
  return (
    <a
      className={className}
      aria-label={
        className.includes("nav-cta")
          ? "Falar com a Korabel no WhatsApp"
          : undefined
      }
      href={whatsapp}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
function App() {
  const [menu, setMenu] = useState(false);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("Todos");
  usePresentation(filter);
  return (
    <>
      <header className="editorial-header" onKeyDown={(event) => { if (event.key === "Escape") setMenu(false); }}>
        <div className="nav-wrap">
          <Brand />
          <nav id="primary-navigation" aria-label="Menu principal" className={menu ? "open" : ""}>
            {[
              ["Início", "inicio"],
              ["Coleção", "looks"],
              ["A Korabel", "sobre"],
              ["Como comprar", "como-comprar"],
            ].map(([label, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>
                {label}
              </a>
            ))}
          </nav>
          <WhatsLink className="nav-cta btn-outline">
            <MessageCircle size={18} />
            <span>Fale com a gente</span>
          </WhatsLink>
          <button
            className="menu-toggle"
            aria-label={menu ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menu}
            aria-controls="primary-navigation"
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main>
        <section className="hero editorial-hero" id="inicio" aria-labelledby="hero-title">
          <img className="editorial-image" src="/images/hero-editorial.png"
            alt="Modelo sentada com vestido vinho em um cenário editorial de arcos rosados"
            fetchPriority="high" width="1672" height="941" />
          <div className="editorial-inner">
            <div className="editorial-copy">
              <div className="eyebrow">MODA FEMININA • KORABEL</div>
              <h1 id="hero-title">
                <span>Vista o que faz</span>
                <span>você se sentir</span>
                <em>ainda mais você.</em>
              </h1>
              <p>Peças escolhidas para valorizar sua beleza, acompanhar seus momentos e revelar seu estilo.</p>
              <div className="editorial-actions">
                <a className="btn-primary" href="#looks">Ver os looks <ArrowRight size={21} /></a>
                <WhatsLink className="editorial-contact">Falar no WhatsApp</WhatsLink>
              </div>
              <div className="editorial-note">Curadoria feminina <span aria-hidden="true">•</span> Atendimento personalizado</div>
            </div>
          </div>
        </section>
        <LookCarousel products={products} onSelect={setSelected} modalOpen={Boolean(selected)}/>
        <div className="benefits-band">
        <div className="benefits container">
          <div>
            <Sparkles />
            <div>
              <h3>Moda com personalidade</h3>
              <small>Looks que expressam seu estilo</small>
            </div>
          </div>
          <div>
            <MessageCircle />
            <div>
              <h3>Vamos conversar?</h3>
              <small>Atendimento pelo WhatsApp</small>
            </div>
          </div>
          <div>
            <ShoppingBag />
            <div>
              <h3>Sua escolha, do seu jeito</h3>
              <small>Consulte detalhes antes de pedir</small>
            </div>
          </div>
        </div>
        </div>
        <section className="collection collection-editorial" id="looks" aria-labelledby="collection-title">
          <div className="collection-inner">
          <div className="section-top">
            <div>
              <span className="eyebrow">CURADORIA KORABEL</span>
              <h2 id="collection-title">
                Escolhas para <em>cada versão de você.</em>
              </h2>
              <p>Peças selecionadas para acompanhar seus momentos com elegância, personalidade e confiança.</p>
            </div>
            <div className="collection-aside">
              <p>Do delicado ao marcante.</p>
              <span>Encontre o look que traduz o seu momento.</span>
            </div>
          </div>
          <div className="filters" aria-label="Filtrar peças">
            {["Todos", "Vestidos", "Conjuntos"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={filter === f ? "active" : ""}
              >
                {f}
              </button>
            ))}
            <a className="collection-instagram" href={instagram} target="_blank" rel="noopener noreferrer">
              Novidades no Instagram <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="products">
            {products
              .filter((p) => filter === "Todos" || p.category === filter)
              .map((p, index) => (
                <ProductCard key={p.id} product={p} index={index} onSelect={setSelected} />
              ))}
          </div>
          </div>
        </section>
        <section className="about-section" id="sobre" aria-labelledby="about-title">
          <div className="about container">
          <div className="about-picture">
            <img
              src={photo(products.find(p => p.id === "amarelo"))}
              alt="Look amarelo ombro a ombro da coleção Korabel"
              loading="lazy"
              width="1086"
              height="1003"
            />
            <div className="about-tag">
              mais que um look,
              <br />
              <em>uma forma de se expressar.</em>
            </div>
          </div>
          <div className="about-copy">
            <span className="eyebrow">PRAZER, SOMOS A KORABEL</span>
            <h2 id="about-title">
              A beleza de
              <br />
              ser <em>você mesma.</em>
            </h2>
            <p>
              Tem dias que pedem leveza. Outros, uma dose extra de atitude. Na
              Korabel, a moda feminina é um convite para explorar todas as suas
              versões.
            </p>
            <p>
              Entre cores, detalhes e diferentes estilos, encontre aquele look
              que tem a sua cara. Conheça nossas peças por aqui e converse com a
              gente para escolher a sua.
            </p>
            <a
              className="text-link btn-ghost"
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              Vem conhecer nosso universo <Instagram size={18} />
            </a>
            <div className="signature">Com carinho, Korabel ♡</div>
          </div>
          </div>
        </section>
        <section className="how-section" id="como-comprar">
          <div className="container">
            <span className="eyebrow">DO PRIMEIRO OLHAR AO SEU LOOK</span>
            <h2>
              Se apaixonou? <em>É simples.</em>
            </h2>
            <div className="steps">
              <div>
                <span className="step-number">01</span>
                <h3>Encontre seu favorito</h3>
                <p>
                  Explore a vitrine e escolha a peça que combina com o seu
                  momento.
                </p>
              </div>
              <div>
                <span className="step-number">02</span>
                <h3>Chame no WhatsApp</h3>
                <p>
                  Copie a mensagem da peça e envie na conversa. Consulte valor,
                  tamanho e disponibilidade.
                </p>
              </div>
              <div>
                <span className="step-number">03</span>
                <h3>Combine os detalhes</h3>
                <p>
                  Confirme pagamento e opções de recebimento diretamente com a
                  Korabel.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="final-cta">
          <div className="container">
          <span className="eyebrow">SEU PRÓXIMO LOOK COMEÇA AQUI</span>
          <h2>
            Vamos encontrar o seu <em>favorito?</em>
          </h2>
          <p>
            Conte pra gente o que você procura. A conversa continua no WhatsApp.
          </p>
          <WhatsLink className="button btn-primary">
            <MessageCircle size={19} /> Falar com a Korabel{" "}
            <ArrowUpRight size={18} />
          </WhatsLink>
          </div>
        </section>
      </main>
      <footer>
        <div className="container footer-main">
          <div>
            <Brand />
            <p>
              Moda feminina com estilo e atitude.
              <br />
              Looks para viver sua melhor versão.
            </p>
          </div>
          <div>
            <h3>Explore</h3>
            <a href="#looks">Nossos looks</a>
            <a href="#sobre">Sobre a Korabel</a>
            <a href="#como-comprar">Como comprar</a>
          </div>
          <div>
            <h3>Fique por perto</h3>
            <a href={instagram} target="_blank" rel="noopener noreferrer">
              <Instagram size={16} /> @usekorabel
            </a>
            <WhatsLink>
              <MessageCircle size={16} /> Atendimento no WhatsApp
            </WhatsLink>
            <span className="online-note">Vendas online</span>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Korabel Modas.</span>
          <span>Seu estilo. Sua essência.</span>
        </div>
      </footer>
      {selected && <ProductDetails key={selected.id} product={selected} onClose={() => setSelected(null)}/>}
      <WhatsLink className="floating-whatsapp">
        <span>Vamos conversar?</span>
        <MessageCircle size={27} />
        <span className="sr-only">Abrir WhatsApp da Korabel</span>
      </WhatsLink>
    </>
  );
}
createRoot(document.getElementById("root")).render(<App />);
