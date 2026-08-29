# Relatório — correção das fotografias dos produtos

## Problema encontrado

O catálogo usava `src/data/productPhotos.js` para armazenar fotografias inteiras em Base64. Embora os dados fossem válidos como JPEG, esta organização deixava o catálogo pesado e dificultava a manutenção das imagens.

Além disso, `App.jsx` testava apenas `product.photo`. Quando uma chave não existisse ou uma imagem falhasse, podia ser renderizado um `<img>` com `src` inválido.

## Correção aplicada

- As 16 fotografias existentes em `productPhotos.js` foram extraídas para ficheiros JPEG reais em `src/assets/products/`.
- `src/data/productPhotos.js` passou a usar imports Vite reais.
- Foi criado `getProductPhoto()` para devolver `null` quando a chave não existir.
- Foi criado `ProductVisual` em `src/App.jsx` para centralizar a renderização da fotografia e o fallback ilustrado.
- Cards, detalhe do produto e carrinho passaram a usar essa proteção.
- `ProductImageManager.jsx` deixou de incentivar Base64 gigante e passou a orientar a colocação da fotografia em `src/assets/products/`.
- O rascunho do gestor não guarda URLs `blob:` inválidas no `localStorage`.
- Foi criado `scripts/audit-product-images.mjs` e o comando `npm run audit:images`.
- A documentação em `docs/ORGANIZACAO.md` e `docs/ARQUITETURA.md` foi atualizada.

## Auditorias realizadas

- 16 imports de fotografias encontrados.
- 16 chaves de fotografias encontradas.
- 15 chaves distintas são usadas atualmente por produtos.
- 0 referências de fotografia inexistentes.
- 0 imagens JPEG inválidas entre as 16 fotografias existentes.
- 0 ocorrências `data:image` em `src/data/productPhotos.js`.
- `App.jsx`, `ProductImageManager.jsx`, `products.js` e `productPhotos.js` foram analisados com parser JavaScript/JSX e não apresentaram erro de sintaxe.

## Produto s16 / Ómega-3 Fish Oil

O produto `s16` existe no catálogo, mas o ZIP fornecido não contém uma fotografia correspondente nem a chave `omega3FishOil`. Não foi inventada nem reutilizada uma fotografia de outro produto. O sistema apresenta o fallback ilustrado até que a fotografia correta seja adicionada.

## Build

`npm run build` não pôde ser concluído neste ambiente porque o `node_modules` incluído no ZIP foi instalado para outra plataforma e não contém os binários nativos Linux necessários. Uma tentativa de reinstalação via npm também excedeu o tempo disponível do ambiente.

No computador de destino, executar:

```bash
npm install
npm run audit:images
npm run build
npm run dev
```

O ZIP final não inclui `node_modules`, conforme a prática normal de projetos Vite.
