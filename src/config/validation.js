export const SEGMENTS = [
  { id: 'beleza', name: 'Beleza', shortName: 'Beleza', cta: 'Explorar beleza', tone: 'rose' },
  { id: 'saude', name: 'Saúde & Bem-estar', shortName: 'Saúde', cta: 'Explorar saúde', tone: 'olive' },
];

export const TONES = {
  olive: { light: '#8a9a74', dark: '#3f4a34' },
  ochre: { light: '#e2bd85', dark: '#b8813f' },
  rose:  { light: '#e0bdb5', dark: '#b98074' },
  ink:   { light: '#8b8270', dark: '#332a1d' },
};

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const PHONE_MZ_RE = /^(?:\+258|258)?\s?8[2-7]\d\s?\d{3}\s?\d{3}$/;
