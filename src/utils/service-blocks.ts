export interface ServiceBlockData {
  symptoms: string[];
  risks: string[];
  duration: string;
  partType: string;
}

export const serviceBlocksData: Record<string, ServiceBlockData> = {
  'araclarda-selenoid-valf-ariza-belirtileri': {
    symptoms: [
      'Vites geçişlerinde vuruntu',
      '2\'den 1\'e düşerken sarsıntı',
      'Şanzıman veya motor arıza lambası',
      'Devir artarken çekişin azalması'
    ],
    risks: [
      'Kavrama balatalarının yanması',
      'Mekatronik elektronik kart zorlanması',
      'Yüksek ısınma ve maliyet artışı'
    ],
    duration: 'Ortalama 1 İş Günü\nErken teşhiste aynı gün onarım.',
    partType: 'Orijinal OEM Selenoid\nYalnızca seri numaralı garantili parçalar.'
  },
  'dsg-anahtar-isareti': {
    symptoms: [
      'Göstergede anahtar işareti yanıp sönüyor',
      'Tek veya çift viteslere kilitlenme',
      'Araç sadece 2-4-6 viteslerde gidiyor',
      'P17BF veya P189C hata kodları'
    ],
    risks: [
      'Hidrolik basınç pompasının yanması',
      'Elektronik beynin sigorta attırması',
      'Basit kasa probleminin 3 kat masraf açması'
    ],
    duration: 'Ortalama 2-3 Saat\n(Erken müdahalede kiti ile anında onarım)',
    partType: 'Güçlendirilmiş Flanş Onarım Kiti\nOrijinalinden daha dayanıklı cnc yapım.'
  },
  '7-ileri-dsg-sanziman-sorunlari': {
    symptoms: [
      'Kalkışlarda belirgin titreme',
      'Sürüş esnasında vites kararsızlığı',
      'Rölantide metalik şıngırtı sesi',
      'Geri (R) vitese geç kalma'
    ],
    risks: [
      'Volantın kalıcı hasar görmesi',
      'İtici çubukların tolerans dışına çıkması',
      'Yolda veya yokuşta N konumuna düşme'
    ],
    duration: 'Ortalama 1-2 İş Günü\n(Kavrama adaptasyonu ve mekanik revizyon)',
    partType: 'LUK veya Sachs Orijinal\nSet halinde 12 ay garantili değişim.'
  },
  'dsg-sanziman-ariza-isigi': {
    symptoms: [
      'Sarı veya kırmızı şanzıman uyarısı',
      'Aracın korumaya (emniyet moduna) geçmesi',
      'Tek veya çift viteslerde kilitli kalma',
      'P konumunda yanıp sönen anahtar işareti'
    ],
    risks: [
      'Kartın kısa devre yapması',
      'Ciddi tüp patlaması ve yolda kalma',
      'Arıza lambasıyla zorlamada şanzıman kitlenmesi'
    ],
    duration: 'Ortalama 3 Saat ile 2 İş Günü\n(Arızanın kaynağına göre değişir)',
    partType: 'Güçlendirilmiş Flanş veya Orijinal Parça\nMekatronik ve TCU garantili hizmet.'
  },
  '7-ileri-dsg-sanziman-yag-degisimi-fiyati': {
    symptoms: [
      'Vites geçişlerinde sertlik/kararsızlık',
      'Geçiş sırasında hafif metalik sesler',
      'Yağ renginin koyulaşması ve yanık kokusu',
      '60.000 KM periyodunun dolmuş olması'
    ],
    risks: [
      'Mekatronik içindeki valflerin tıkanması',
      'Kavrama balatalarının aşırı ısınması',
      'Şanzıman ömrünün yarı yarıya azalması'
    ],
    duration: 'Ortalama 1-2 Saat\n(Filtre değişimi ve adaptasyon dahil)',
    partType: 'G052182 Özel DSG Yağı\nYalnızca orijinal OEM sıvı kullanımı.'
  },
  'dsg-p-yanip-sonuyor-araba-calismiyor': {
    symptoms: [
      'Göstergedeki (P) harfinin yanıp sönmesi',
      'Kontak açıkken marşın hiç basmaması',
      'Vites kolunun kilitlenmesi',
      'Geri vites veya D konumuna geçememe'
    ],
    risks: [
      'TCU (Elektronik Beyin) çipinin yanması',
      'Marşı zorlayarak motora zarar verme',
      'Aracın hiçbir vitesi algılamaması'
    ],
    duration: 'Ortalama 1-3 İş Günü\n(Kart tamiri gerekiyorsa uzayabilir)',
    partType: 'Garantili TCU / Sensör Tamiri\nRevizyonlu orijinal kart uygulaması.'
  },
  'dsg-sanziman-fiyati': {
    symptoms: [
      'Ağır mekanik kırılma veya sürtme sesi',
      'Yetkili servisten çok yüksek değişim faturası',
      'İkinci elde kronik komple arıza şüphesi',
      'Aracın D veya R konumunda hareketsiz kalması'
    ],
    risks: [
      'Gereksiz yere komple şanzıman değişimi maliyeti',
      'Yanlış VIN kodlu çıkma şanzıman takılması',
      'Uygunsuz yazılımdan dolayı beyin arızası'
    ],
    duration: '1 İş Günü (Revizyon) - 5 Gün (Sıfır)\n(Parça koduna ve duruma özeldir)',
    partType: 'Öncelikli Revizyon veya Garantili Sıfır\nÖnce sorunu en düşük maliyetle çözeriz.'
  },
  'dsg-2-den-1-e-gecerken-vuruntu': {
    symptoms: [
      'Yavaşlarken arkadan vurma hissi',
      '2. vitesten 1. vitese geçerken sarsılma',
      'Kırmızı ışıkta durmaya yakın öne yığılma',
      'Yokuş aşağı inişlerde sert vites düşüşü'
    ],
    risks: [
      'Kavrama balatalarında dengesiz yassılaşma',
      'K1 (Birinci Kavrama) dişlisine aşırı yük',
      'Mekatronik gövdede mikro çatlak oluşumu'
    ],
    duration: '1 Saat (Yazılımsal) - 2 İş Günü (Mekanik)\n(Genellikle temel adaptasyonla çözülür)',
    partType: 'Orijinal Yazılım veya LUK OEM Set\nÖncelik her zaman adaptasyondur.'
  },
  'dsg-mekatronik-arizasi-belirtileri': {
    symptoms: [
      'Vites geçişlerinde ciddi gecikme',
      'Ekranda gösterilen anahtar işareti',
      'Aracın tek viteste (emniyet modu) kalması',
      'Kalkışta pütürlü ve güçsüz his'
    ],
    risks: [
      'Elektronik kartın aşırı ısınıp yanması',
      'Kavramaya yetersiz basınçtan dolayı zarar',
      'Şanzımanın tamamen kilitlenmesi'
    ],
    duration: 'Ön Teşhis 1 Saat - Tamir 2 İş Günü\n(Basınç tüpü revizyonu ile çözülebilir)',
    partType: 'CNC Hidrolik Basınç Tüpü\nOrijinal yedek parçalarla 1 yıl garantili.'
  },
  'dsg-mekatronik-tamiri': {
    symptoms: [
      'Vites küçültmeme / büyütmeme',
      'Yarım debriyajda silkemele',
      'Kaput altından yanık yağ kokusu',
      'D D konumunda dahi ilerlememe'
    ],
    risks: [
      'Yeni komple mekatronik faturası (50b+ TL)',
      'Şanzıman içi mekanik parçaların kırılması',
      'Çekici çağırmak zorunda kalınması'
    ],
    duration: '1 - 3 İş Günü\n(Elektronik kart klonlaması vs mekanik tüp değişimi)',
    partType: 'Revizyonlu Valf veya Fabrika Tüpü\nAğır faturalardan kurtaran garantili tamir.'
  },
  'dsg-kavrama-degisimi': {
    symptoms: [
      'Kalkışlarda gırç-gırç veya metalik ses',
      'Yokuşlarda titreme ve silkeleme',
      'Vites yükseltilirken boşa düşme (devir dalgalanması)',
      '60.000+ KM periyodunun dolması'
    ],
    risks: [
      'Çift kütleli volantın da yanması',
      'Mekatronik çatalının eğilmesi',
      'Sürüş güvenliğinde ciddi risk (boşa düşme)'
    ],
    duration: '1 - 2 İş Günü\n(Orijinal kit montajı ve online kalibrasyon)',
    partType: 'LUK / SACHS Orijinal OEM Kit\nKusursuz şimşek hızında vites geçişleri.'
  },
  'dsg-1-3-5-7-gecmiyor': {
    symptoms: [
      '1, 3, 5, 7. viteslerin tamamen kaybolması',
      'Aracın direkt 2. vitesle kalkış yapması',
      'Sadece çift viteslerde (2-4-6) sürüş',
      'P189C (K1 valf arızası) uyarısı'
    ],
    risks: [
      'Mekatroniğin tamamen susması',
      'Birinci kavrama disklerinin yanması',
      'Şanzıman yağının kirlenip kartı bozması'
    ],
    duration: '4 Saat - 2 İş Günü\n(Sorunun valfte veya kavramada olmasına göre)',
    partType: 'Orijinal K1 Selenoid veya LUK OEM Kavrama\nŞanzıman inmeden mekatronik üzerinden %60 kazançlı.'
  },
  'buyukcekmece-dsg-servisi': {
    symptoms: [
      'Büyükçekmece trafiğinde titreme',
      'Yokuşlarda geri kaçırma',
      'Vites geçişlerinde sert vuruntular',
      'Mekatronik uyarı lambası'
    ],
    risks: [
      'Gereksiz komple şanzıman faturaları',
      'Yolda kalarak çekici çağırma',
      'Volant dişlisine zarar verme'
    ],
    duration: 'Aynı Gün Teşhis ve 1-2 Günde Onarım\n(İstanbul Beykent Sanayi Sitesinde)',
    partType: 'Orijinal OEM Parçalar ve CNC Revizyon\nLUK, Sachs ve Güçlendirilmiş Flanşlar.'
  },
  'beylikduzu-dsg-servisi': {
    symptoms: [
      'Beylikdüzü yokuşlarında silkeleme',
      'İlk kalkışta 1. vitesi kavrayamama',
      'Hararet yükselince şanzıman arızası',
      'Göstergede anahtar işareti'
    ],
    risks: [
      'Mekatronik elektronik kartın yanması',
      'Kavramanın tamamen biterek yolda koyması',
      'Yetkili servisin çok ağır faturaları'
    ],
    duration: '1 İş Günü (Mekatronik) - 2 İş Günü (Kavrama)\n(Sorun aynı gün cihazla hatasız bulunur)',
    partType: 'Garantili Orijinal Revizyon ve Sıfır Kit\nGereksiz değişim yok, nokta atışı çözüm.'
  },
  'esenyurt-dsg-servisi': {
    symptoms: [
      'Esenyurt dur-kalk trafiğinde gırç sesi',
      'Sadece tek veya çift viteslere geçmesi',
      'Aracın D konumuna geçmemesi',
      'P konumunda takılı kalması'
    ],
    risks: [
      'Solenoid valflerin kısa devre yapması',
      'Kavrama baskı yaylarının kırılması',
      'Şanzıman yağının kirlenip kartı bozması'
    ],
    duration: 'Hızlı Ön Teşhis ve 1-2 Günde Teslimat\n(En yoğun arızalarda bile kısa süre)',
    partType: '1 Yıl Garantili DSG Beyin Onarımı\nMaliyet odaklı orijinal laboratuvar revizyonu.'
  }
};
