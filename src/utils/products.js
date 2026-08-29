import { PRODUCTS } from '../data/products.js';
import { SITE } from '../config/site.js';

export function formatMT(value) {
  const amount = Number(value) || 0;
  return `${amount.toLocaleString('pt-PT')} ${SITE.currency}`;
}

export function getProduct(id) {
  return PRODUCTS.find((product) => product.id === id);
}
