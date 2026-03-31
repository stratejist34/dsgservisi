export interface HowToStep {
  name: string;
  text: string;
}

export interface HowToData {
  name: string;
  description: string;
  totalTime: string;
  estimatedCost?: { min: number; max: number; currency: string };
  steps: HowToStep[];
}

export const HOWTO_PAGES: Record<string, HowToData> = {
  "dsg-sanziman-yagi-degisimi": {
    name: "DSG Şanzıman Yağ Değişimi Nasıl Yapılır?",
    description:
      "DSG Şanzıman yağ değişimi adım adım profesyonel uygulama rehberi.",
    totalTime: "PT2H",
    estimatedCost: { min: 2500, max: 4500, currency: "TRY" },
    steps: [
      {
        name: "Arıza Tespiti",
        text: "OBD2 cihazıyla şanzıman hata kodları okunur.",
      },
      {
        name: "Yağ Boşaltma",
        text: "Şanzıman alttan drain plug açılarak eski yağ boşaltılır.",
      },
      {
        name: "Filtre Değişimi",
        text: "DSG filtresi ve contası değiştirilir.",
      },
      {
        name: "Yeni Yağ Dolumu",
        text: "Üretici onaylı DSG yağı hassas ölçüyle doldurulur.",
      },
      {
        name: "Adaptasyon",
        text: "VCDS/ODIS ile şanzıman adaptasyon sıfırlaması yapılır.",
      },
    ],
  },
};
