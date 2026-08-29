import { Leaf, ShieldCheck, Truck, Headphones } from 'lucide-react';

export const CATEGORIES = [
  { id: 'cremes', segment: 'beleza', name: 'Cremes', desc: 'Hidratação profunda para o dia a dia', variant: 'jar', tone: 'olive' },
  { id: 'serums', segment: 'beleza', name: 'Séruns', desc: 'Fórmulas concentradas de alta performance', variant: 'dropper', tone: 'ochre' },
  { id: 'oleos', segment: 'beleza', name: 'Óleos', desc: 'Nutrição intensa com ativos naturais', variant: 'dropper', tone: 'rose' },
  { id: 'facial', segment: 'beleza', name: 'Cuidados Faciais', desc: 'Rituais de limpeza e renovação', variant: 'pump', tone: 'ink' },
  { id: 'kits', segment: 'beleza', name: 'Kits', desc: 'Rotinas completas, prontas a oferecer', variant: 'kit', tone: 'olive' },
  { id: 'corporais', segment: 'beleza', name: 'Cuidados Corporais', desc: 'Loções e leites corporais para todo o corpo', variant: 'pump', tone: 'ochre' },
  { id: 'oral', segment: 'beleza', name: 'Higiene Oral', desc: 'Cremes dentais e cuidados para o sorriso', variant: 'pump', tone: 'rose' },
  { id: 'vitaminas', segment: 'saude', name: 'Vitaminas', desc: 'Multivitamínicos e vitaminas isoladas', variant: 'bottle', tone: 'olive' },
  { id: 'proteinas', segment: 'saude', name: 'Proteínas', desc: 'Proteínas e aminoácidos para recuperação', variant: 'bottle', tone: 'ink' },
  { id: 'bem-estar', segment: 'saude', name: 'Bem-estar', desc: 'Suplementos para equilíbrio do dia a dia', variant: 'bottle', tone: 'ochre' },
  { id: 'energia', segment: 'saude', name: 'Energia & Recuperação', desc: 'Apoio nutricional para desempenho físico', variant: 'bottle', tone: 'rose' },
];

export const REVIEWS = [
  { name: 'Ana Machava', initials: 'AM', rating: 5, comment: 'A minha pele nunca esteve tão hidratada. Os produtos são leves e o aroma é maravilhoso.', tone: 'olive' },
  { name: 'Beatriz Sitoe', initials: 'BS', rating: 5, comment: 'Entrega rápida e o creme de noite fez mesmo diferença em duas semanas de uso.', tone: 'ochre' },
  { name: 'Carlos Nhantumbo', initials: 'CN', rating: 4, comment: 'Comprei o kit para oferecer e a apresentação é muito elegante. Recomendo.', tone: 'rose' },
  { name: 'Filomena Tembe', initials: 'FT', rating: 5, comment: 'O sérum de vitamina C uniformizou o meu tom de pele em pouco tempo. Já é rotina.', tone: 'ink' },
  { name: 'Sara Cossa', initials: 'SC', rating: 4, comment: 'O multivitamínico já faz parte da minha rotina diária. Atendimento sempre atencioso.', tone: 'olive' },
  { name: 'Júlio Massinga', initials: 'JM', rating: 5, comment: 'Óleo corporal com um aroma discreto e a pele fica sedosa o dia todo.', tone: 'ochre' },
];

export const BENEFITS = [
  { icon: Leaf, title: 'Produtos selecionados', desc: 'Fórmulas de beleza e saúde escolhidas com critério.' },
  { icon: ShieldCheck, title: 'Compra segura', desc: 'Os seus dados e pagamento sempre protegidos.' },
  { icon: Truck, title: 'Entrega rápida', desc: 'Receba os seus produtos onde estiver, com rapidez.' },
  { icon: Headphones, title: 'Atendimento ao cliente', desc: 'Estamos disponíveis para o que precisar.' },
];
