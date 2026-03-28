// Environment variables'dan oku, yoksa default değerleri kullan
const getEnv = (key: string, defaultValue: string = '') => {
  return import.meta.env[key] || defaultValue;
};

const DEFAULT_PHONE = '0533 262 34 51';
const DEFAULT_PHONE_FORMATTED = '+90 533 262 34 51';
const sanitizePhone = (value: string) => value.replace(/\D/g, '');
const rawPhone = getEnv('PUBLIC_PHONE', DEFAULT_PHONE);
const formattedPhone = getEnv('PUBLIC_PHONE_FORMATTED', DEFAULT_PHONE_FORMATTED);
const telPhone = getEnv('PUBLIC_PHONE_TEL', sanitizePhone(rawPhone));

export const SITE_CONFIG = {
  name: getEnv('PUBLIC_SITE_NAME', 'Yıldızlar Grup DSG Servisi'),
  shortName: getEnv('PUBLIC_SITE_NAME', 'DSG Servisi').split('-')[0].trim(),
  description: getEnv('PUBLIC_SITE_DESCRIPTION', '15 yıldır VW, Audi, Seat, Skoda, BMW, Mercedes, Porsche ve Land Rover araçlarında uzman DSG şanzıman ve mekatronik tamiri. İstanbul Büyükçekmece\'de güvenilir servis.'),
  phone: rawPhone,
  phoneFormatted: formattedPhone,
  phoneTel: telPhone,
  whatsapp: getEnv('PUBLIC_WHATSAPP', '+90 532 261 48 86'),
  email: getEnv('PUBLIC_EMAIL', 'yildizlarvolkswagen@gmail.com'),
  address: {
    street: getEnv('PUBLIC_ADDRESS', 'Beykent Sanayi Sitesi Meriç Sk. No: 179-180'),
    city: getEnv('PUBLIC_DISTRICT', 'Büyükçekmece'),
    state: getEnv('PUBLIC_CITY', 'İstanbul'),
    postalCode: getEnv('PUBLIC_POSTAL_CODE', '34520'),
    country: 'Türkiye',
  },
  coordinates: {
    latitude: 41.0195,
    longitude: 28.5949,
  },
  socialMedia: {
    instagram: 'https://instagram.com/dsgservisi',
    facebook: 'https://facebook.com/dsgservisi',
  },
  workingHours: {
    weekdays: 'Pazartesi - Cumartesi: 09:00 - 18:00',
    weekend: 'Pazar: Kapalı',
  },
  guarantee: {
    duration: '6 Ay',
    description: '6 ay işçilik ve parça garantisi',
  },
  serviceAreas: [
    'İstanbul Avrupa Yakası',
    'Büyükçekmece',
    'Beylikdüzü',
    'Esenyurt',
    'Avcılar',
    'Silivri',
    'Çatalca'
  ],
  stats: {
    experience: 15,
    customers: 6500,
    brands: 8,
    models: 44,
  },
  brands: [
    { name: 'Audi', logo: '/images/logos/audi-logo.webp', url: 'https://dsgservisi.com/audi-ozel-servis/' },
    { name: 'BMW', logo: '/images/logos/bmw-logo.webp', url: 'https://dsgservisi.com/bmw-ozel-servis/' },
    { name: 'DSG', logo: '/images/logos/dsg.png', url: '#' },
    { name: 'Land Rover', logo: '/images/logos/land-rover-logo.webp', url: 'https://dsgservisi.com/land-rover-ozel-servis/' },
    { name: 'Mercedes', logo: '/images/logos/mercedes-logo.webp', url: 'https://dsgservisi.com/mercedes-ozel-servis/' },
    { name: 'Porsche', logo: '/images/logos/porsche-logo.webp', url: 'https://dsgservisi.com/porsche-ozel-servis/' },
    { name: 'Seat', logo: '/images/logos/seat-logo.webp', url: 'https://dsgservisi.com/seat-ozel-servis/' },
    { name: 'Skoda', logo: '/images/logos/skoda-logo.webp', url: 'https://dsgservisi.com/skoda-ozel-servis/' },
    { name: 'Volkswagen', logo: '/images/logos/volkswagen-logo.webp', url: 'https://dsgservisi.com/volkswagen-ozel-servis/' },
  ],
  google: {
    rating: 4.3,
    reviewCount: 77,
    placeId: 'ChIJy1zf2BiLyhQRapm5RRrXYWo',
    mapUrl: 'https://maps.app.goo.gl/vmZyp6qu3pCgE8vRA',
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.3402005679377!2d28.631132100000002!3d41.0178125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cabb185ddf5cbb%3A0x6a61d71a45b9906a!2sY%C4%B1ld%C4%B1zlar%20Grup%20Volkswagen%2C%20Audi%2C%20Porsche%2C%20Bmw%20%C3%96zel%20Servis!5e0!3m2!1str!2str!4v1760658181515!5m2!1str!2str',
  },
  instagram: {
    username: 'asyildizlar',
    url: 'https://www.instagram.com/asyildizlar/',
    // Manuel olarak Instagram'dan fotoğraf URL'lerini buraya ekleyin
    // Her yeni post eklendiğinde bu listeyi güncelleyin
    posts: [
      'https://instagram.com/p/SAMPLE1',
      'https://instagram.com/p/SAMPLE2',
      'https://instagram.com/p/SAMPLE3',
      'https://instagram.com/p/SAMPLE4',
      'https://instagram.com/p/SAMPLE5',
      'https://instagram.com/p/SAMPLE6',
      'https://instagram.com/p/SAMPLE7',
      'https://instagram.com/p/SAMPLE8',
      'https://instagram.com/p/SAMPLE9',
      'https://instagram.com/p/SAMPLE10',
      'https://instagram.com/p/SAMPLE11',
    ],
  },
};

export const SERVICES = [
  {
    title: 'Periyodik Bakımlar',
    description: 'Yağ Değişimi, hava ve yakıt filtreleri gibi 10-15 bin km içinde yenilenmesi gereken parçalar.',
    icon: '🛢️',
    image: '/images/services/bakim.webp',
  },
  {
    title: 'DSG Şanzıman Tamiri',
    description: 'DSG şanzımanların yağ değişimi, revizyon ve yenileme işlemleri servisimizde yapılır.',
    icon: '⚙️',
    image: '/images/services/sanziman.webp',
  },
  {
    title: 'Fren Tamiri',
    description: 'Fren sistemi problemlerinizi hızlı arıza tanları ile hızlı müdahale.',
    icon: '🔧',
    image: '/images/services/fren.webp',
  },
  {
    title: 'Ön Takım & Süspansiyon',
    description: 'Aracınız rot, rut, balans, rotil kolu, rotil gibi parçalardan oluşan süspansiyon sistemi tamiri.',
    icon: '🔩',
    image: '/images/services/suspansiyon.webp',
  },
  {
    title: 'Triger Değişimi',
    description: 'Motor triger kayışı ve triger seti değişimi ile motorunuzun zamanlamasını koruyun.',
    icon: '⚙️',
    image: '/images/blog/audi-triger-degisimi-fiyatlari-650.webp',
  },
  {
    title: 'Hava Soğutma Sistemi',
    description: 'Aracınızın soğutma sistemi arızaları tanı ve tamir çözümleri.',
    icon: '❄️',
    image: '/images/services/sogutma.webp',
  },
  {
    title: 'Elektrik Sistemi',
    description: 'Marş ve Şarj dinamosu arızaları, elektrik hatlarındaki arızalar, müşürler.',
    icon: '⚡',
    image: '/images/services/elektrik.webp',
  },
  {
    title: 'Motor Tamiri',
    description: 'Motor arızalarında tamir, yenileme ve bakım servisleri verilir.',
    icon: '🔧',
    image: '/images/services/motor.webp',
  },
];

export const WHY_US = [
  {
    icon: 'speed',
    title: 'Hızlı Servis Anlayışı',
    description: 'Yoğun iş akımını aksatmamak için servis hızımızı maksimum düzeyde tutuyoruz.',
  },
  {
    icon: 'chat',
    title: 'İletişim',
    description: 'Aracınızın servis sürecindeki her aşamasında iletişim kurarak bilgilendiriyoruz.',
  },
  {
    icon: 'diagnostic',
    title: 'Bilgisayarlı Tanı',
    description: 'Son teknoloji arıza tanı sistemlerimiz ile nokta atışı arıza tespitleri.',
  },
  {
    icon: 'roadside',
    title: 'Yol Yardım Servisi',
    description: 'Yolda mı kaldınız? Endişe Etmeyin Yıldızlar Özel Servis Yanınızda. Bize Ulaşın.',
  },
  {
    icon: 'parts',
    title: 'Yedek Parça Desteği',
    description: 'Aracınızın özel olduğunun farkındayız, yedek parça konusunda aynı hassasiyeti gösteriyoruz.',
  },
  {
    icon: 'experts',
    title: 'İşinde Uzman Ustalar',
    description: 'Ustalarımız yılların tecrübe, bilgi birikimi ile arıza tanısı ve çözüm sürecindeki pratik ve hızlarıyla bilinmektedir.',
  },
];

