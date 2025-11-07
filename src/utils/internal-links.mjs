/**
 * İç Linkleme Terim Eşleştirmeleri
 * 
 * Bu dosya, blog yazılarında geçen terimlerin hangi blog yazılarına
 * otomatik olarak linkleneceğini belirler.
 * 
 * Format: { terim: slug }
 * - Terim: Yazıda geçen terim (case-insensitive, Türkçe karakter duyarlı)
 * - Slug: Linklenecek blog yazısının slug'ı
 */

export const internalLinkMap = {
  // Mercedes Terimleri
  '7G-Tronic': 'mercedes-ozel-servis',
  '7G-TRONIC': 'mercedes-ozel-servis',
  '7G Tronic': 'mercedes-ozel-servis',
  '9G-Tronic': 'mercedes-ozel-servis',
  '9G-TRONIC': 'mercedes-ozel-servis',
  '9G Tronic': 'mercedes-ozel-servis',
  'Airmatic': 'mercedes-ozel-servis',
  'AIRMATIC': 'mercedes-ozel-servis',
  'Mercedes periyodik bakım': 'mercedes-periyodik-bakim-fiyatlari-2025',
  'Mercedes Periyodik Bakım': 'mercedes-periyodik-bakim-fiyatlari-2025',
  'Mercedes özel servis': 'mercedes-ozel-servis',
  'Mercedes Özel Servis': 'mercedes-ozel-servis',
  'Mercedes servis': 'mercedes-ozel-servis',
  'Mercedes Servis': 'mercedes-ozel-servis',
  'C Serisi': 'mercedes-ozel-servis',
  'E Serisi': 'mercedes-ozel-servis',
  'S Serisi': 'mercedes-ozel-servis',
  'GLC': 'mercedes-ozel-servis',
  'GLE': 'mercedes-ozel-servis',
  'GLS': 'mercedes-ozel-servis',
  'CLA': 'mercedes-ozel-servis',
  'CLS': 'mercedes-ozel-servis',
  'OM651': 'mercedes-ozel-servis',
  'OM654': 'mercedes-ozel-servis',
  'M254': 'mercedes-ozel-servis',
  'M274': 'mercedes-ozel-servis',
  
  // DSG Terimleri
  'DSG': 'dsg-sanziman-tamiri',
  'DSG şanzıman': 'dsg-sanziman-tamiri',
  'DSG Şanzıman': 'dsg-sanziman-tamiri',
  'DSG tamiri': 'dsg-sanziman-tamiri',
  'DSG Tamiri': 'dsg-sanziman-tamiri',
  'DSG mekatronik': 'dsg-mekatronik-tamiri',
  'DSG Mekatronik': 'dsg-mekatronik-tamiri',
  'mekatronik': 'dsg-mekatronik-tamiri',
  'Mekatronik': 'dsg-mekatronik-tamiri',
  'DSG yağ değişimi': 'dsg-sanziman-yagi-degisimi',
  'DSG Yağ Değişimi': 'dsg-sanziman-yagi-degisimi',
  'DSG volant': 'dsg-volant-degisimi',
  'DSG Volant': 'dsg-volant-degisimi',
  'DSG kavrama': 'dsg-kavrama-degisimi',
  'DSG Kavrama': 'dsg-kavrama-degisimi',
  'DQ200': 'dsg-sanziman-tamiri',
  'DQ250': 'dsg-sanziman-tamiri',
  'DQ381': 'dsg-sanziman-tamiri',
  'DQ500': 'dsg-sanziman-tamiri',
  '7-ileri DSG': '7-ileri-dsg-sanziman-sorunlari',
  '7 İleri DSG': '7-ileri-dsg-sanziman-sorunlari',
  '6-ileri DSG': 'dsg-sanziman-tamiri',
  '6 İleri DSG': 'dsg-sanziman-tamiri',
  
  // Volkswagen Terimleri
  'Volkswagen periyodik bakım': 'volkswagen-periyodik-bakim-fiyatlari-2025',
  'Volkswagen Periyodik Bakım': 'volkswagen-periyodik-bakim-fiyatlari-2025',
  'Volkswagen özel servis': 'volkswagen-ozel-servis',
  'Volkswagen Özel Servis': 'volkswagen-ozel-servis',
  'Volkswagen servis': 'volkswagen-ozel-servis',
  'Volkswagen Servis': 'volkswagen-ozel-servis',
  'Golf': 'volkswagen-golf-gti-dsg-arizasi',
  'Passat': 'passat-sanziman-hatasi',
  'Polo': 'polo-sanziman-tamiri-fiyati',
  'Tiguan': 'volkswagen-ozel-servis',
  'Jetta': 'jetta-mekatronik-fiyati',
  
  // Audi Terimleri
  'Audi periyodik bakım': 'audi-periyodik-bakim-fiyatlari-2025',
  'Audi Periyodik Bakım': 'audi-periyodik-bakim-fiyatlari-2025',
  'Audi özel servis': 'audi-ozel-servis',
  'Audi Özel Servis': 'audi-ozel-servis',
  'Audi servis': 'audi-ozel-servis',
  'Audi Servis': 'audi-ozel-servis',
  'S-Tronic': 'audi-ozel-servis',
  'S-TRONIC': 'audi-ozel-servis',
  'S Tronic': 'audi-ozel-servis',
  
  // BMW Terimleri
  'BMW periyodik bakım': 'bmw-periyodik-bakim-fiyatlari-2025',
  'BMW Periyodik Bakım': 'bmw-periyodik-bakim-fiyatlari-2025',
  'BMW özel servis': 'bmw-ozel-servis',
  'BMW Özel Servis': 'bmw-ozel-servis',
  'BMW servis': 'bmw-ozel-servis',
  'BMW Servis': 'bmw-ozel-servis',
  'ZF şanzıman': 'zf-sanziman-yagi-degisimi',
  'ZF Şanzıman': 'zf-sanziman-yagi-degisimi',
  'ZF': 'zf-sanziman-yagi-degisimi',
  
  // Skoda Terimleri
  'Skoda periyodik bakım': 'skoda-periyodik-bakim-fiyatlari-2025',
  'Skoda Periyodik Bakım': 'skoda-periyodik-bakim-fiyatlari-2025',
  'Skoda özel servis': 'skoda-ozel-servis',
  'Skoda Özel Servis': 'skoda-ozel-servis',
  'Skoda servis': 'skoda-ozel-servis',
  'Skoda Servis': 'skoda-ozel-servis',
  'Octavia': 'skoda-octavia-dsg-mekatronik-tamiri',
  'Superb': 'skoda-ozel-servis',
  'Kodiaq': 'skoda-ozel-servis',
  
  // Seat Terimleri
  'Seat periyodik bakım': 'seat-periyodik-bakim-fiyatlari-2025',
  'Seat Periyodik Bakım': 'seat-periyodik-bakim-fiyatlari-2025',
  'Seat özel servis': 'seat-ozel-servis',
  'Seat Özel Servis': 'seat-ozel-servis',
  'Seat servis': 'seat-ozel-servis',
  'Seat Servis': 'seat-ozel-servis',
  'Leon': 'seat-leon-dsg-mekatronik-tamiri',
  'Ibiza': 'seat-ozel-servis',
  
  // Porsche Terimleri
  'Porsche periyodik bakım': 'porsche-periyodik-bakim-fiyatlari-2025',
  'Porsche Periyodik Bakım': 'porsche-periyodik-bakim-fiyatlari-2025',
  'Porsche özel servis': 'porsche-ozel-servis',
  'Porsche Özel Servis': 'porsche-ozel-servis',
  'Porsche servis': 'porsche-ozel-servis',
  'Porsche Servis': 'porsche-ozel-servis',
  'PDK': 'porsche-ozel-servis',
  
  // Land Rover Terimleri
  'Land Rover periyodik bakım': 'land-rover-periyodik-bakim-fiyatlari-2025',
  'Land Rover Periyodik Bakım': 'land-rover-periyodik-bakim-fiyatlari-2025',
  'Land Rover özel servis': 'land-rover-ozel-servis',
  'Land Rover Özel Servis': 'land-rover-ozel-servis',
  'Land Rover servis': 'land-rover-ozel-servis',
  'Land Rover Servis': 'land-rover-ozel-servis',
  'Range Rover': 'range-rover-servis-avrupa-yakasi',
  
  // Genel Terimler
  'periyodik bakım': 'volkswagen-periyodik-bakim-fiyatlari-2025',
  'Periyodik Bakım': 'volkswagen-periyodik-bakim-fiyatlari-2025',
  'şanzıman tamiri': 'dsg-sanziman-tamiri',
  'Şanzıman Tamiri': 'dsg-sanziman-tamiri',
  'otomatik şanzıman': 'otomatik-sanziman-tamiri-ne-kadar-tutar',
  'Otomatik Şanzıman': 'otomatik-sanziman-tamiri-ne-kadar-tutar',
  'şanzıman yağ değişimi': 'otomatik-sanziman-yagi-degisimi-fiyati-2025',
  'Şanzıman Yağ Değişimi': 'otomatik-sanziman-yagi-degisimi-fiyati-2025',
  'DPF': 'mercedes-ozel-servis',
  'DPF temizleme': 'mercedes-ozel-servis',
  'DPF Temizleme': 'mercedes-ozel-servis',
  'AdBlue': 'mercedes-ozel-servis',
  'timing zincir': 'mercedes-ozel-servis',
  'Timing Zincir': 'mercedes-ozel-servis',
  'selenoid valf': 'otomatik-vites-selenoid-valf-arizasi-nasil-anlasilir',
  'Selenoid Valf': 'otomatik-vites-selenoid-valf-arizasi-nasil-anlasilir',
  'şanzıman keçesi': 'sanziman-kecesi-degisimi-fiyati',
  'Şanzıman Keçesi': 'sanziman-kecesi-degisimi-fiyati',
  'yağ kaçağı': 'otomatik-sanziman-yag-kacagi-tamiri-fiyat',
  'Yağ Kaçağı': 'otomatik-sanziman-yag-kacagi-tamiri-fiyat',
  'Beylikdüzü': 'beylikduzu-volkswagen-servis',
  'Esenyurt': 'volkswagen-servis-avrupa-yakasi',
  'Büyükçekmece': 'volkswagen-servis-avrupa-yakasi',
  'Başakşehir': 'volkswagen-servis-avrupa-yakasi',
  'geri kaçırma': 'dsg-geri-kacirma',
  'solenoid değişimi': 'araclarda-selenoid-valf-arizasi-belirtileri',
  'uyarı lambası': 'dsg-sanziman-ariza-isigi',
  'adaptasyon': 'dsg-optimizasyon-fiyat',
  'kalibrasyon': 'dsg-optimizasyon-fiyat',
  

  
  // Ana Sayfa Linkleri
  'DSG Servis': '__homepage__',
  'DSG servis': '__homepage__',
  'dsg servis': '__homepage__',
  'DSG Servisi': '__homepage__',
  'DSG servisi': '__homepage__',
  'dsg servisi': '__homepage__',
  'Yıldızlar Grup': '__homepage__',
  'yıldızlar grup': '__homepage__',
  'Yıldızlar Grup DSG Servisi': '__homepage__',
  'yıldızlar grup dsg servisi': '__homepage__',
};

/**
 * Terimleri öncelik sırasına göre sıralar (uzun terimler önce)
 * Bu sayede "DSG şanzıman" önce kontrol edilir, "DSG" sonra
 */
export const sortedTerms = Object.keys(internalLinkMap)
  .sort((a, b) => b.length - a.length);

/**
 * Bir terimin linklenip linklenmeyeceğini kontrol eder
 */
export function shouldLinkTerm(term, context = {}) {
  // Eğer terim zaten bir link içindeyse, tekrar linkleme
  if (context.isInLink) {
    return false;
  }
  
  // Eğer terim bir başlık içindeyse, linkleme (opsiyonel - istenirse kaldırılabilir)
  if (context.isInHeading) {
    return false;
  }
  
  return true;
}

/**
 * Terim için link URL'ini döndürür
 */
export function getLinkUrl(term) {
  const slug = internalLinkMap[term];
  if (!slug) return null;
  
  // Ana sayfa için özel kontrol
  if (slug === '__homepage__') {
    return '/';
  }
  
  // Slug'a göre URL oluştur
  // Eğer slug blog/ altındaysa: /blog/slug
  // Değilse: /slug
  return `/${slug}`;
}

