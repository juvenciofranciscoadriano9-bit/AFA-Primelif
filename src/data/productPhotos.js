/* Fotografias dos produtos — ficheiros reais versionados no projeto. */

import kojicAcidSadoer from '../assets/products/kojic-acid-sadoer.jpg';
import arbutinSadoer from '../assets/products/arbutin-sadoer.jpg';
import glutathioneSadoer from '../assets/products/glutathione-sadoer.jpg';
import goatMilkKormesic from '../assets/products/goat-milk-kormesic.jpg';
import propolisMintSadoer from '../assets/products/propolis-mint-sadoer.jpg';
import gingerSpearmintSadoer from '../assets/products/ginger-spearmint-sadoer.jpg';
import seaSaltBakingSoda from '../assets/products/sea-salt-baking-soda.jpg';
import lineOneVitaminC from '../assets/products/line-one-vitamin-c.jpg';
import multivitaminWomenLineOne from '../assets/products/multivitamin-women-line-one.jpg';
import acneBenzoylKormesic from '../assets/products/acne-benzoyl-kormesic.jpg';
import royalParya from '../assets/products/royal-parya.jpg';
import calciumD3Tahoe from '../assets/products/calcium-d3-tahoe.jpg';
import calciumMagnesiumZincNewLeaf from '../assets/products/calcium-magnesium-zinc-new-leaf.jpg';
import spirulinaChlorellaVitalVibe from '../assets/products/spirulina-chlorella-vital-vibe.jpg';
import quercetinZincElderberryDrLexMoss from '../assets/products/quercetin-zinc-elderberry-dr-lex-moss.jpg';
import Omega3FishOil from  '../assets/products/Omega-3 Fish Oil.jpg';
import PremiumProbioticSupplement300BillionCFU  from '../assets/products/Premium Probiotic Supplement 300 Billion CFU.jpg';

export const PRODUCT_PHOTOS = {
  kojicAcidSadoer: kojicAcidSadoer,
  arbutinSadoer: arbutinSadoer,
  glutathioneSadoer: glutathioneSadoer,
  goatMilkKormesic: goatMilkKormesic,
  propolisMintSadoer: propolisMintSadoer,
  gingerSpearmintSadoer: gingerSpearmintSadoer,
  seaSaltBakingSoda: seaSaltBakingSoda,
  lineOneVitaminC: lineOneVitaminC,
  multivitaminWomenLineOne: multivitaminWomenLineOne,
  acneBenzoylKormesic: acneBenzoylKormesic,
  royalParya: royalParya,
  calciumD3Tahoe: calciumD3Tahoe,
  calciumMagnesiumZincNewLeaf: calciumMagnesiumZincNewLeaf,
  spirulinaChlorellaVitalVibe: spirulinaChlorellaVitalVibe,
  quercetinZincElderberryDrLexMoss: quercetinZincElderberryDrLexMoss,
  Omega3FishOil: Omega3FishOil,
 PremiumProbioticSupplement300BillionCFU: PremiumProbioticSupplement300BillionCFU
};

export function getProductPhoto(photoKey) {
  if (!photoKey) return null;
  return PRODUCT_PHOTOS[photoKey] || null;
}

export function hasProductPhoto(photoKey) {
  return Boolean(getProductPhoto(photoKey));
}
