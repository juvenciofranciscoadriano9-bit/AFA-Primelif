import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

const assetsDir = path.join(root, 'src', 'assets', 'products');
const physicalFiles = fs.readdirSync(assetsDir);

console.log('=== 1. PHYSICAL FILES IN src/assets/products ===');
console.log(`Total physical files: ${physicalFiles.length}`);
physicalFiles.forEach(f => console.log(' -', f));

const photosPath = path.join(root, 'src', 'data', 'productPhotos.js');
const photosContent = fs.readFileSync(photosPath, 'utf8');

const importRegex = /import\s+([A-Za-z0-9_]+)\s+from\s+['"]\.\.\/assets\/products\/([^'"]+)['"];?/g;
let match;
const importsMap = new Map();
const importsList = [];

while ((match = importRegex.exec(photosContent)) !== null) {
  importsMap.set(match[1], match[2]);
  importsList.push({ varName: match[1], fileRel: match[2] });
}

console.log('\n=== 2. IMPORTS IN productPhotos.js ===');
console.log(`Total imports: ${importsList.length}`);
importsList.forEach(imp => {
  const fullPath = path.join(assetsDir, imp.fileRel);
  const exists = fs.existsSync(fullPath);
  const exactMatch = exists && physicalFiles.includes(imp.fileRel);
  if (!exists || !exactMatch) {
    console.log(`BROKEN/CASE MISMATCH IMPORT: ${imp.varName} -> ${imp.fileRel} (exists: ${exists}, exactCase: ${exactMatch})`);
  } else {
    console.log(` OK: ${imp.varName} -> ${imp.fileRel}`);
  }
});

const photosExportMatch = photosContent.match(/export\s+const\s+PRODUCT_PHOTOS\s*=\s*\{([^}]+)\}/s);
const keysInProductPhotos = new Map();
if (photosExportMatch) {
  const body = photosExportMatch[1];
  body.split('\n').forEach(line => {
    const clean = line.replace(/\/\/.*/, '').trim();
    if (!clean) return;
    clean.split(',').forEach(p => {
      p = p.trim();
      if (!p) return;
      if (p.includes(':')) {
        const [k, v] = p.split(':').map(s => s.trim());
        keysInProductPhotos.set(k, v);
      } else {
        keysInProductPhotos.set(p, p);
      }
    });
  });
}

console.log('\n=== PRODUCT_PHOTOS KEYS ===');
console.log(`Keys defined in PRODUCT_PHOTOS: ${keysInProductPhotos.size}`);

const productsPath = path.join(root, 'src', 'data', 'products.js');
let productsContent = fs.readFileSync(productsPath, 'utf8');

const evalContent = productsContent.replace(/export\s+const\s+PRODUCTS\s*=\s*/, 'const PRODUCTS = ') + '\n; PRODUCTS;';
const PRODUCTS = eval(evalContent);

console.log('\n=== 3. PRODUCTS AUDIT ===');
console.log(`Total products: ${PRODUCTS.length}`);

const idCounts = {};
let totalVariants = 0;
const photoKeyUsage = {};
for (const k of keysInProductPhotos.keys()) photoKeyUsage[k] = 0;

const productsWithoutImage = [];
const variantsWithInvalidImage = [];
const invalidPhotoKeys = [];

PRODUCTS.forEach((p) => {
  idCounts[p.id] = (idCounts[p.id] || 0) + 1;

  if (!p.photo) {
    productsWithoutImage.push({ id: p.id, name: p.name, reason: 'photo field missing or empty/null' });
  } else if (keysInProductPhotos.has(p.photo)) {
    photoKeyUsage[p.photo] = (photoKeyUsage[p.photo] || 0) + 1;
  } else {
    invalidPhotoKeys.push({ id: p.id, name: p.name, photoKey: p.photo });
    productsWithoutImage.push({ id: p.id, name: p.name, reason: `photo key '${p.photo}' not found in PRODUCT_PHOTOS` });
  }

  if (p.variants && Array.isArray(p.variants)) {
    totalVariants += p.variants.length;
    p.variants.forEach((v) => {
      if (!v.photo) {
        variantsWithInvalidImage.push({ productId: p.id, productName: p.name, variantId: v.id, variantName: v.name, reason: 'variant photo missing or empty' });
      } else if (keysInProductPhotos.has(v.photo)) {
        photoKeyUsage[v.photo] = (photoKeyUsage[v.photo] || 0) + 1;
      } else {
        variantsWithInvalidImage.push({ productId: p.id, productName: p.name, variantId: v.id, variantName: v.name, photoKey: v.photo, reason: `photo key '${v.photo}' not in PRODUCT_PHOTOS` });
      }
    });
  }
});

console.log(`Total variants: ${totalVariants}`);
console.log('\n=== 4. DUPLICATE IDS ===', Object.entries(idCounts).filter(([_, c]) => c > 1));
console.log('\n=== 5. UNUSED PHOTO KEYS ===', Object.entries(photoKeyUsage).filter(([_, c]) => c === 0).map(([k]) => k));
console.log('\n=== 6. INVALID PHOTO KEYS IN PRODUCTS ===', invalidPhotoKeys);
console.log('\n=== 7. PRODUCTS WITHOUT IMAGE ===', productsWithoutImage);
console.log('\n=== 8. VARIANTS WITH INVALID IMAGE ===', variantsWithInvalidImage);

console.log('\n=== 9. UNIMPORTED PHYSICAL ASSET FILES ===');
const importedFilesSet = new Set(importsList.map(i => i.fileRel));
physicalFiles.filter(f => !importedFilesSet.has(f)).forEach(f => console.log(' Unimported file:', f));


