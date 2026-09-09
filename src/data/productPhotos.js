import kojicAcidSadoer from '../assets/products/kojic-acid-sadoer.jpg';
import arbutinSadoer from '../assets/products/arbutin-sadoer.jpg';
import glutathioneSadoer from '../assets/products/glutathione-sadoer.jpg';

import goatMilkKormesic from '../assets/products/goat-milk-kormesic.jpg';
import propolisMintSadoer from '../assets/products/propolis-mint-sadoer.jpg';
import gingerSpearmintSadoer from '../assets/products/ginger-spearmint-sadoer.jpg';
import seaSaltBakingSoda from '../assets/products/sea-salt-baking-sodaer.jpg';
import lineOneVitaminC from '../assets/products/line-one-vitamin-c.jpg';
import multivitaminWomenLineOne from '../assets/products/multivitamin-women-line-one.jpg';
import acneBenzoylKormesic from '../assets/products/acne-benzoyl-kormesic.jpg';
import royalParya from '../assets/products/royal-parya (2).jpg';
import calciumD3Tahoe from '../assets/products/calcium-d3-tahoe.jpg';
import calciumMagnesiumZincNewLeaf from '../assets/products/calcium-magnesium-zinc-new-leaf.jpg';
import spirulinaChlorellaVitalVibe from '../assets/products/spirulina-chlorella-vital-vibe.jpg';
import quercetinZincElderberryDrLexMoss from '../assets/products/quercetin-zinc-elderberry-dr-lex-moss.jpg';
import Omega3FishOil from '../assets/products/Omega-3 Fish Oil.jpg';
import PremiumProbioticSupplement300BillionCFU from '../assets/products/Premium Probiotic Supplement 300 Billion CFU.jpg';

// Imagens auxiliares ou faltantes
import sadoerPrincipal from '../assets/products/1788778068208.jpg';
import perfectWaveBodyLotion from '../assets/products/1788778147520.jpg';
import styxVitaminaEBodyLotion from '../assets/products/1788001290194.jpg';
import royalParyaBodyLotion from '../assets/products/royal-parya (2).jpg';

export const PRODUCT_PHOTOS = {
  // SADOER
  kojicAcidSadoer,
  arbutinSadoer,
  glutathioneSadoer,

  // Outros produtos
  goatMilkKormesic,
  propolisMintSadoer,
  gingerSpearmintSadoer,
  seaSaltBakingSoda,
  lineOneVitaminC,
  multivitaminWomenLineOne,
  acneBenzoylKormesic,
  royalParya,
  calciumD3Tahoe,
  calciumMagnesiumZincNewLeaf,
  spirulinaChlorellaVitalVibe,
  quercetinZincElderberryDrLexMoss,
  Omega3FishOil,
  PremiumProbioticSupplement300BillionCFU,
  perfectWaveBodyLotion,
  styxVitaminaEBodyLotion,
  royalParyaBodyLotion
};

/**
 * Obtém a fotografia através da photoKey.
 */
export function getProductPhoto(photoKey) {
  if (!photoKey) return null;

  return PRODUCT_PHOTOS[photoKey] || null;
}

/**
 * Verifica se existe fotografia para determinada photoKey.
 */
export function hasProductPhoto(photoKey) {
  return Boolean(getProductPhoto(photoKey));
}