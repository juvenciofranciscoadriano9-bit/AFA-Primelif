import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const photosFile = path.join(root, 'src/data/productPhotos.js');
const productsFile = path.join(root, 'src/data/products.js');
const assetsDir = path.join(root, 'src/assets/products');

const photosSource = fs.readFileSync(photosFile, 'utf8');
const productsSource = fs.readFileSync(productsFile, 'utf8');

const imports = [...photosSource.matchAll(/import\s+([A-Za-z0-9_]+)\s+from\s+['"]\.\.\/assets\/products\/([^'"]+)['"];?/g)];
const photoKeys = [...photosSource.matchAll(/^\s{2}([A-Za-z0-9_]+):\s*([A-Za-z0-9_]+),?\s*$/gm)].map((m) => ({ key: m[1], variable: m[2] }));
const productPhotos = [...productsSource.matchAll(/photo:\s*['"]([^'"]+)['"]/g)].map((m) => m[1]);

const errors = [];
const importedVars = new Set(imports.map((m) => m[1]));
const importedFiles = new Map(imports.map((m) => [m[1], m[2]]));

for (const { variable, key } of photoKeys) {
  if (!importedVars.has(variable)) errors.push(`Chave ${key} usa o import ${variable}, mas esse import não existe.`);
}

for (const [variable, file] of importedFiles) {
  const filePath = path.join(assetsDir, file);
  if (!fs.existsSync(filePath)) errors.push(`Imagem em falta: src/assets/products/${file}`);
}

const photoKeySet = new Set(photoKeys.map((item) => item.key));
for (const key of productPhotos) {
  if (!photoKeySet.has(key)) errors.push(`Produto referencia fotografia inexistente: ${key}`);
}

if (!fs.existsSync(assetsDir)) errors.push('A pasta src/assets/products não existe.');

console.log(`Fotografias importadas: ${imports.length}`);
console.log(`Chaves de fotografia: ${photoKeys.length}`);
console.log(`Produtos com fotografia: ${new Set(productPhotos).size}`);

if (errors.length) {
  console.error('\nERROS ENCONTRADOS:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('OK — todas as referências de fotografias apontam para ficheiros existentes.');
