# Revisão da vitrine Korabel

## Análise anterior às alterações

A aplicação usava React 19, Vite 6, Tailwind 4 e lucide-react. O catálogo e as seções estavam concentrados em main.jsx; ShoppingExperience.jsx reunia cards, carrossel automático e detalhes. styles.css e refinements.css competiam por especificidade, inclusive com seletores iniciados por body. A paleta era rosé/vinho, com fundos em gradiente, molduras e tratamento de mistura nas fotos do hero.

O carrossel mostrava uma peça por vez em um painel de duas colunas: foto e descrição longa. A sobreposição dos slides gerava altura determinada pelo maior conteúdo e um efeito visual de caixa. A apresentação automática acrescentava estado para foco, hover, visibilidade e timers que não ajudavam a experiência de uma vitrine com várias peças.

Os filtros, o dialog nativo, a troca de fotos, os links para Instagram e o botão flutuante eram úteis e foram preservados. O mecanismo usePresentation escondia textos até serem observados, com risco de deixar conteúdo temporariamente invisível. Ele foi retirado junto da folha de sobreposições; os estilos foram consolidados.

O diretório de imagens contém duas fotos de modelos em 2048 × 2048, logo restaurada e fotos menores de Instagram. As fotos menores têm cortes e marca-d'água incorporados. Foram mantidos os originais locais, com dimensões declaradas, carregamento prioritário no hero e lazy loading nas demais imagens. Não há novas dependências.

## Implementação

O novo visual usa off-white, lavanda e roxo, com dourado restrito à identidade e à assinatura. A página reúne hero editorial, faixa de diferenciais sem promessas não confirmadas, destaques, categorias, manifesto, orientações de compra, galeria de Instagram, CTA roxo e rodapé. Localização e horários têm placeholders explícitos.

O catálogo e os dados da loja ficam em data.js. O número +55 (95) 99165-2421 foi confirmado durante a revisão. Todos os CTAs comerciais utilizam o mesmo gerador de links; os interesses incluem o nome exato da peça na mensagem. Não há envio automático de mensagens nem checkout.

O carrossel é um componente separado com rolagem nativa e scroll-snap. Mostra três peças no desktop, duas em larguras intermediárias e uma com prévia parcial no mobile. Setas pequenas, paginação e teclado controlam a posição; swipe e trackpad usam a rolagem do navegador. A quantidade de páginas se ajusta à largura e aos filtros. Sem autoplay; movimento reduzido é respeitado. Os controles ficam fora do recorte.

## Conteúdo pendente

Os nomes são descritivos e os preços continuam sob consulta. A loja precisa aprovar nomes, detalhes, disponibilidade, seleção semanal, fotos, história, política de atendimento e informações de localização/horário. A categoria Novidades direciona ao Instagram, sem afirmar frequência de lançamentos. A galeria é local e não se apresenta como feed atualizado automaticamente. A lista operacional completa está no README.

O arquivo referencias-visuais.md registra uma versão anterior; não descreve o carrossel atual.

## Validação

- Layout conferido em 320, 390, 768 e 1440 px, sem overflow horizontal da página.
- Vitrine com três peças no desktop, duas no tablet e prévia da próxima no celular.
- Setas, paginação, filtro Conjuntos, restauração de Todos e tecla End conferidos no navegador.
- Dialog conferido no desktop e no celular, com troca de foto, Escape e retorno do foco à peça.
- URLs dos quatro interesses conferidas: número confirmado e mensagem específica de cada produto. Nenhuma mensagem foi enviada.
- `npm run build`: concluído; 1582 módulos, CSS 20,80 kB e JavaScript 246,03 kB antes de gzip. A primeira tentativa final encontrou uma restrição de leitura do ambiente; a repetição autorizada passou.
- `git diff --check`: sem erros de whitespace.
