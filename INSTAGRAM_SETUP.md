# Instagram Feed Kurulumu

## Şu Anki Durum
Feed şu an **placeholder görseller** (picsum.photos) ile çalışıyor ve test edilebilir.

## Gerçek Instagram Fotoğraflarını Eklemek İçin:

### Seçenek 1: Manuel Yükleme (En Kolay)
1. Instagram'dan son 11 postu telefonunuzdan indirin
2. `public/images/instagram/` klasörüne `1.jpg`, `2.jpg`, ... `11.jpg` olarak kaydedin
3. `src/components/home/InstagramFeed.tsx` dosyasında image URL'lerini değiştirin:
   ```typescript
   { id: '1', image: '/images/instagram/1.jpg', alt: 'Post açıklaması' }
   ```

### Seçenek 2: Instagram'dan Otomatik Çekme (Gelişmiş)
Instagram API artık **Facebook Developer** hesabı ve **Access Token** gerektiriyor:

#### Adımlar:
1. **Facebook Developer** hesabı açın: https://developers.facebook.com/
2. **Instagram Basic Display API** kurun
3. **Access Token** alın (60 gün geçerli)
4. `.env` dosyasına ekleyin:
   ```
   INSTAGRAM_ACCESS_TOKEN=your_token_here
   ```
5. Astro'da API endpoint oluşturun veya build-time'da çekin

#### Alternatif Servisler:
- **InstagramFeed.js** (ücretsiz widget)
- **EmbedSocial** (ücretli)
- **Juicer** (ücretli)

## Önerilen Çözüm
👉 **Manuel yükleme** en pratik ve sorunsuz çözümdür. 
- Instagram'dan her hafta 11 fotoğraf güncelleyin
- Veya constants.ts'den yönetin

## Fotoğraf Özellikleri
- **Format:** JPG veya WebP
- **Boyut:** 1080x1080px (kare)
- **Optimize:** Max 200KB
- **İsimler:** 1.jpg, 2.jpg, 3.jpg, ..., 11.jpg

