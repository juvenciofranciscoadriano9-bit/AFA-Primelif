# Arquitetura de manutenção — AFA PrimeLife

## Regra principal

Dados comerciais não devem ser misturados com a interface. Fotografias reais não devem ser embutidas como Base64 gigante em `productPhotos.js`; devem ser ficheiros em `src/assets/products/`.

## Produto

Edite `src/data/products.js` para nome, descrição, preço, categoria, benefícios, stock e `photo`.

## Fotografia

Edite `src/data/productPhotos.js` para associar uma chave a um ficheiro importado.

Exemplo:
```js
import cremeNovo from '../assets/products/creme-novo.jpg';

export const PRODUCT_PHOTOS = {
  cremeNovo,
};
```

No produto:
```js
{
  id: 'p-novo',
  name: 'Creme Novo',
  photo: 'cremeNovo',
  price: 1000,
  stock: true,
}
```

## Segurança contra imagens quebradas

`getProductPhoto(photoKey)` devolve `null` quando a chave não existe. O componente `ProductVisual` usa uma ilustração de fallback em vez de renderizar uma imagem com `src` inválido.

## Auditoria

O script `scripts/audit-product-images.mjs` verifica se:
- todas as chaves referenciadas pelos produtos existem;
- todos os imports apontam para ficheiros existentes;
- não há ficheiros de fotografia referenciados em falta.
