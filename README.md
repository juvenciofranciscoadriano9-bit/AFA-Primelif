# AFA PrimeLife MZ — Loja Online

Projeto React + Vite. A organização foi feita de forma conservadora: a lógica visual e as funcionalidades existentes permanecem no `App.jsx`; dados e configurações que estavam misturados foram separados para facilitar manutenção.

## Arquitetura
```
src/
├── App.jsx                 # composição e lógica principal do site
├── main.jsx                # entrada React
├── index.css               # estilos globais
├── config/
│   └── site.js             # dados da loja/empresa
├── data/
│   ├── products.js         # produtos, preços e descrições
│   ├── productPhotos.js    # fotografias/Base64
│   └── siteData.js         # categorias, benefícios e avaliações
├── utils/
│   ├── products.js         # procura de produtos e formatação de preço
│   └── whatsapp.js         # criação segura dos links WhatsApp
└── ProductImageManager.jsx # ferramenta para preparar novas imagens/produtos
```

## Onde editar
- **Nome, descrição, preço, categoria e dados do produto:** `src/data/products.js`
- **Fotografias:** `src/data/productPhotos.js`
- **Nome da loja, contactos, moeda, entrega:** `src/config/site.js`
- **Categorias, benefícios e avaliações:** `src/data/siteData.js`

## Imagens
O projeto mantém o sistema atual de fotografias em Base64. O `ProductImageManager.jsx` ajuda a converter uma imagem escolhida pelo utilizador e gerar os blocos de código necessários, sem precisar procurar Base64 dentro do `App.jsx`.

## Verificação
O código-fonte foi analisado e foram corrigidas referências que estavam a ser usadas sem definição (`SITE` e `buildWhatsAppUrl`). A pasta `node_modules` não faz parte do pacote de entrega; deve ser recriada no computador/terminal com `npm install`.

## Executar
```bash
npm install
npm run dev
```

Para produção:
```bash
npm run build
```
"AFA-Primelif" 
