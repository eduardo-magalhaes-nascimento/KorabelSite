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
import { ProductCard, ProductDetails, LookCarousel } from "./ShoppingExperience";
import usePresentation from "./usePresentation";

const whatsapp = "https://wa.me/message/UYRBMHAN7V52O1";
const instagram = "https://www.instagram.com/usekorabel/";
const products = [
  {
    name: "Vestido com franzido",
    color: "Pink",
    category: "Vestidos",
    image: "06775c687ea9d759",
    photo: "/images/modelo-pink.jpeg",
    gallery: ["/images/modelo-pink.jpeg", "/images/06775c687ea9d759.jpg"],
    post: "Dbs6uLTDpGk",
    description: "O pink ganha destaque com alças finas e detalhes franzidos. Uma escolha marcante para compor um look cheio de personalidade.",
    swatch: "#a72966",
  },
  {
    name: "Vestido de um ombro só",
    color: "Nude",
    category: "Vestidos",
    image: "83e8c4aef71bcaff",
    post: "Dbs6d8WDk7L",
    description: "Decote de um ombro só, tom nude e franzidos que valorizam os detalhes. Uma proposta delicada para diferentes ocasiões.",
    swatch: "#dec2b2",
  },
  {
    name: "Vestido ombro a ombro",
    color: "Amarelo",
    category: "Vestidos",
    image: "4dfbb7aa933bbe95",
    post: "Dbs6ITkDgYw",
    description: "Ombros à mostra, mangas longas e um amarelo suave. Uma combinação de linhas delicadas e presença.",
    swatch: "#ead98d",
  },
  {
    name: "Look frente única",
    color: "Preto",
    category: "Conjuntos",
    image: "7f5372a4e051bb4e",
    post: "Dbs5uYeDjld",
    description: "Frente única com amarração e parte inferior de volume leve. O preto traz contraste para uma produção com atitude.",
    swatch: "#262323",
  },
];
const photo = (p) => `/images/${p.image}.jpg`;
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
      <div className="announcement">
        Looks para viver sua melhor versão <span>♡</span>
        <a href={instagram} target="_blank" rel="noopener noreferrer">
          Conheça @usekorabel <ArrowUpRight size={13} />
        </a>
      </div>
      <header>
        <div className="nav-wrap">
          <Brand />
          <nav aria-label="Menu principal" className={menu ? "open" : ""}>
            {[
              ["Início", "inicio"],
              ["Nossos looks", "looks"],
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
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main>
        <section className="hero" id="inicio">
          <div className="hero-inner">
            <div className="hero-copy">
              <div className="eyebrow">MODA FEMININA · KORABEL</div>
              <h1>
                Seu estilo.
                <br />
                Sua essência.
                <br />
                <em>Sua melhor versão.</em>
              </h1>
              <p>
                Looks que acompanham quem você é.
                <br />
                Descubra peças para se sentir linda,
                <br className="desktop-break" /> confiante e do seu jeito.
              </p>
              <a className="button btn-primary" href="#looks">
                Encontre seu próximo look <ArrowRight size={18} />
              </a>
              <div className="hero-note">
                <Heart size={16} /> Um toque de charme em cada escolha.
              </div>
            </div>
            <div className="hero-visual">
              <div className="model-composition"><img className="model-primary" src="/images/modelo-preto.jpeg" alt="Modelo com vestido preto de um ombro só" fetchPriority="high"/><img className="model-secondary" src="/images/modelo-pink.jpeg" alt="Modelo com look pink franzido"/></div>
              <span className="collection-note">
                feito para
                <br />
                <em>ser você.</em>
              </span>
              <a className="hero-caption" href="#looks">
                Explore a seleção <ArrowUpRight size={20} />
              </a>
            </div>
          </div>
          <div className="hero-bottom">
            <span>ESTILO QUE ENCANTA. ATITUDE QUE INSPIRA.</span>
            <span>
              DESCUBRA A KORABEL <ArrowRight size={16} />
            </span>
          </div>
        </section>
        <LookCarousel products={products} onSelect={setSelected} modalOpen={Boolean(selected)}/>
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
        <section className="collection container" id="looks">
          <div className="section-top">
            <div>
              <span className="eyebrow">ESCOLHA O SEU FAVORITO</span>
              <h2>
                Um look. <em>Mil possibilidades.</em>
              </h2>
            </div>
            <p>
              Do delicado ao marcante.
              <br />
              Qual combina com você hoje?
            </p>
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
            <span>
              Direto do nosso Instagram <Instagram size={15} />
            </span>
          </div>
          <div className="products">
            {products
              .filter((p) => filter === "Todos" || p.category === filter)
              .map((p) => (
                <ProductCard key={p.post} product={p} onSelect={setSelected} />
              ))}
          </div>
          <p className="collection-foot">
            Gostou de uma peça? Confirme valor, tamanhos e disponibilidade com a
            gente.
          </p>
        </section>
        <section className="about container" id="sobre">
          <div className="about-picture">
            <img
              src={photo(products[2])}
              alt="Look amarelo ombro a ombro da coleção Korabel"
              loading="lazy"
              width="559"
              height="640"
            />
            <div className="about-tag">
              mais que um look,
              <br />
              <em>uma forma de se expressar.</em>
            </div>
          </div>
          <div className="about-copy">
            <span className="eyebrow">PRAZER, SOMOS A KORABEL</span>
            <h2>
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
        <section className="final-cta container">
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
      {selected && <ProductDetails key={selected.post} product={selected} onClose={() => setSelected(null)}/>}
      <WhatsLink className="floating-whatsapp">
        <span>Vamos conversar?</span>
        <MessageCircle size={27} />
        <span className="sr-only">Abrir WhatsApp da Korabel</span>
      </WhatsLink>
    </>
  );
}
createRoot(document.getElementById("root")).render(<App />);
