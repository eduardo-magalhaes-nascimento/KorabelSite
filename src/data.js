// Dados confirmados ficam centralizados aqui. Não preencher com números ou preços fictícios.
export const store = {
  name: "Korabel Modas",
  instagram: "https://www.instagram.com/usekorabel/",
  whatsapp: "https://wa.me/message/UYRBMHAN7V52O1",
  whatsappPhone: "5595991652421", // Confirmado pelo responsável pelo projeto.
  whatsappDisplay: "(95) 99165-2421",
  location: "", // Preencher com localização aprovada pela loja.
  hours: "", // Preencher com horários reais de atendimento.
};

export const products = [
  {
    name: "Vestido com franzido", color: "Pink", category: "Vestidos",
    image: "06775c687ea9d759", photo: "/images/modelo-pink.jpeg",
    gallery: ["/images/modelo-pink.jpeg", "/images/06775c687ea9d759.jpg"],
    post: "Dbs6uLTDpGk", swatch: "#a72966", price: null,
    description: "Alças finas e detalhes franzidos em um pink cheio de personalidade. Para os dias em que você quer deixar a sua marca.",
  },
  {
    name: "Vestido de um ombro só", color: "Nude", category: "Vestidos",
    image: "83e8c4aef71bcaff", post: "Dbs6d8WDk7L", swatch: "#dec2b2", price: null,
    description: "Decote de um ombro só, tom nude e franzidos delicados. Detalhes que transformam uma produção simples em um momento especial.",
  },
  {
    name: "Vestido ombro a ombro", color: "Amarelo", category: "Vestidos",
    image: "4dfbb7aa933bbe95", post: "Dbs6ITkDgYw", swatch: "#ead98d", price: null,
    description: "Ombros à mostra, mangas longas e um amarelo suave. Uma combinação leve para acompanhar seus momentos favoritos.",
  },
  {
    name: "Look frente única", color: "Preto", category: "Conjuntos",
    image: "7f5372a4e051bb4e", post: "Dbs5uYeDjld", swatch: "#262323", price: null,
    description: "Frente única com amarração e parte inferior de volume leve. Uma proposta em preto para compor um look com atitude.",
  },
];

export const productPhoto = product => product.photo || `/images/${product.image}.jpg`;
export const productMessage = product => `Olá! Vi a peça ${product.name} no site da Korabel e gostaria de mais informações.`;
export function whatsappUrl(product) {
  const phone = store.whatsappPhone.replace(/\D/g, "");
  if (!phone) return store.whatsapp;
  const text = product ? productMessage(product) : "Olá! Conheci a Korabel pelo site e gostaria de mais informações.";
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
