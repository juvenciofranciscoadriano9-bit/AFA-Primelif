# Organização do projeto

A aplicação separa interface, dados, configuração e fotografias reais.

- `src/data/products.js` — catálogo, preços, descrições, stock e demais dados comerciais.
- `src/data/productPhotos.js` — mapa de chaves para os ficheiros de fotografia.
- `src/assets/products/` — fotografias reais dos produtos, versionadas com o projeto.
- `src/data/siteData.js` — categorias, avaliações e benefícios.
- `src/config/site.js` — configuração da loja.
- `src/config/validation.js` — validações e tokens de apresentação.
- `src/assets/siteAssets.js` — logótipo e outros assets institucionais.
- `src/components/admin/ProductImageManager.jsx` — ferramenta auxiliar para preparar novos produtos/fotografias.
- `src/App.jsx` — interface e lógica principal.

## Regra de imagens

Cada fotografia deve existir fisicamente em `src/assets/products/`, ser importada em `src/data/productPhotos.js` e ser referenciada no produto através de `photo: 'chaveDaFoto'`.

O frontend utiliza `getProductPhoto()` e apresenta uma ilustração de fallback quando uma fotografia não existe ou falha ao carregar. Isso evita `src=undefined` e imagens quebradas.

`node_modules` não deve ser incluído no pacote final. Execute `npm install` no ambiente de destino.
