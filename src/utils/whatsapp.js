import { SITE } from '../config/site.js';

export function buildWhatsAppUrl(message = '') {
  const phone = String(SITE.whatsapp || SITE.phone || '').replace(/\D/g, '');
  if (!phone) return '#';
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
