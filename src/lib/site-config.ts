export const SITE_CONFIG = {
  name: "DSG Servisi",
  url: "https://dsgservisi.com",
  telephone: "[GERÇEK_TELEFON]",
  telephoneDisplay: "[GÖRÜNTÜ_FORMATINDA]",
  whatsapp: "[WHATSAPP_NUMARASI]",
  email: "[EMAIL]",
  streetAddress: "[ADRES]",
  district: "Beylikdüzü",
  city: "İstanbul",
  postalCode: "[POSTA_KODU]",
  country: "TR",
  geo: {
    latitude: "[GERÇEK_ENLEM]",
    longitude: "[GERÇEK_BOYLAM]",
  },
  openingHours: ["Mo-Sa 09:00-18:00"],
  priceRange: "₺₺",
  sameAs: [
    "https://www.google.com/maps/place/[GERÇEK_URL]",
    "https://www.instagram.com/dsgservisi",
    "https://www.facebook.com/dsgservisi",
  ],
  serviceAreas: [
    "Beylikdüzü",
    "Esenyurt",
    "Avcılar",
    "Küçükçekmece",
    "Büyükçekmece",
    "Bakırköy",
    "İstanbul",
  ],
  author: {
    id: "https://dsgservisi.com/#author",
    name: "[TEKNIK_SORUMLU_ADI]",
    jobTitle: "DSG Şanzıman Uzmanı",
    url: "https://dsgservisi.com/hakkimizda",
  },
} as const;

export type SiteConfig = typeof SITE_CONFIG;
