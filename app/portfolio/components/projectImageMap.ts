// Map project slugs to local image paths
export const projectImageMap: Record<string, string> = {
  'masseria-donna-menga': '/Cataldo\'s projects/Donna-Menga.webp',
  'masseria-montelauro': '/Cataldo\'s projects/masseria montelauro.jpeg',
  'hotel-basiliani': '/Cataldo\'s projects/Basiliani.jpg',
  'voi-alimini-resort': '/Cataldo\'s projects/VOI Alimini Resort.jpg',
  'baglioni-masseria-muzza': '/Cataldo\'s projects/baglioni_masseria_muzza.jpg',
  'torre-matta': '/Cataldo\'s projects/Torre Matta.jpg',
  'hypogeum-otranto': '/Cataldo\'s projects/Blue_Otranto.jpg',
  'palazzo-ducale-alessano': '/Cataldo\'s projects/Palazzo Spinola Gallipoli.jpg',
  'hotel-pietra-verde': '/Cataldo\'s projects/hotel petraria cannole.jpg',
  'hotel-petraria': '/Cataldo\'s projects/petraria-hotel-resort1.jpg',
  'hotel-bellavista': '/Cataldo\'s projects/Hotel-Bellavista.webp',
  'le-cale-otranto': '/Cataldo\'s projects/Le Cale d\'Otranto Beach Resort.jpg',
  'dimora-san-giuseppe': '/Cataldo\'s projects/dimora san giuseppe.jpg',
  'hotel-haethey': '/Cataldo\'s projects/hotel haethey otranto.jpg',
  'masseria-furca': '/Cataldo\'s projects/masseria-furca.jpg',
  'country-club-alimini': '/Cataldo\'s projects/country club alimini.jpg',
  'nohasi-palace': '/Cataldo\'s projects/nohasi palace.jpg',
  'bellaria-giurdignano': '/Cataldo\'s projects/bellaria_giurdignano.jpg',
  'hotel-torcito': '/Cataldo\'s projects/hotel torcito resort cannole.jpeg',
  'camping-mulino': '/Cataldo\'s projects/camping mulino d\'acqua otranto.jpg'
}

export const getProjectImage = (slug: string): string => {
  return projectImageMap[slug] || '/Cataldo\'s projects/Hotel-Bellavista.webp'
}