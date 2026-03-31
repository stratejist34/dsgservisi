export const BUSINESS_RATING = {
  ratingValue: 4.3,
  reviewCount: 77,
  bestRating: 5,
  worstRating: 1,
} as const;

export const FEATURED_REVIEWS = [
  {
    author: "İsmail Susam",
    datePublished: "2024-10-18",
    reviewBody:
      "Ben ilk defa geçen sene arabama bakım yaptırdım çok memnunum profesyonel ekip herkese tavsiye ediyorum.",
    ratingValue: 5,
  },
  {
    author: "Enzo Ferrari",
    datePublished: "2024-09-26",
    reviewBody:
      "Allah razı olsun motor inecek denilen üç dört tane servise götürüp hala düzelmeyen arabamı bir saat içinde tamir edip canavar gibi yaptı usta. Gönül rahatlığıyla tavsiye ederim.",
    ratingValue: 5,
  },
  {
    author: "Furkan Kaplan",
    datePublished: "2024-08-17",
    reviewBody:
      "Ömer usta ve Genç ekibine çok Teşekkür ediyorum. 1 saat içinde sorunu çözdüler. Yetkili servise gideceğime buraya giderim daha iyi. Muhasebedeki abladan tutun çıraklara kadar herkes çok güzel ilgilendi.",
    ratingValue: 5,
  },
  {
    author: "Ali Köse",
    datePublished: "2024-06-06",
    reviewBody:
      "Hiçbir tereddüt etmeden aracınızı ne sorunu olursa bırakacağınız, her zaman destek alabileceğiniz lüzumsuz şekilde iş yapmayan ne gerekiyorsa yapan bir ekip.",
    ratingValue: 5,
  },
] as const;
