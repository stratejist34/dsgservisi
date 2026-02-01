import * as React from 'react';

export default function WhatsAppButton({
  phone = '905332623451',
  message = 'Merhaba, DSG servisi hakkında bilgi almak istiyorum.',
  className = '',
  pageId = 'diger_sayfalar'
}: { phone?: string; message?: string; className?: string; pageId?: string }) {
  const [mounted, setMounted] = React.useState(false);
  const [showTooltip, setShowTooltip] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [selection, setSelection] = React.useState<'inside' | 'outside' | null>(null);

  React.useEffect(() => {
    setMounted(true);

    // 6 saniye sonra "Randevu Al" balonunu göster (Telefon'dan sonra)
    const tooltipTimer = setTimeout(() => {
      setShowTooltip(true);
      // 5 saniye sonra balonu kapat
      setTimeout(() => setShowTooltip(false), 5000);
    }, 6000);

    return () => clearTimeout(tooltipTimer);
  }, []);

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowTooltip(false);
    setShowModal(true);
  };

  const handleConfirm = () => {
    if (selection === 'inside') {
      const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      setShowModal(false);
    } else {
      setShowModal(false);
    }
    setSelection(null);
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[55] flex flex-col items-center">
        {/* Tooltip / Balon */}
        {showTooltip && (
          <div
            className="absolute bottom-full mb-4 px-4 py-2 bg-[#25D366] text-white text-sm font-bold rounded-xl shadow-[0_10px_25px_rgba(37,211,102,0.4)] whitespace-nowrap pointer-events-none"
            style={{ animation: 'bounce-subtle 2s infinite ease-in-out' }}
          >
            <div className="relative text-center">
              Randevu Al
              <div className="absolute top-[calc(100%-1px)] left-1/2 -translate-x-1/2 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-[#25D366]"></div>
            </div>
          </div>
        )}

        <button
          id="floating-whatsapp"
          onClick={handleButtonClick}
          className={`
            relative
            flex items-center justify-center
            w-16 h-16 md:w-20 md:h-20
            rounded-full
            bg-[#25D366]
            text-white
            shadow-2xl
            transform transition-all duration-300
            hover:scale-110 hover:bg-[#1da851]
            active:scale-95
            ${className}
          `}
          style={{
            boxShadow: '0 10px 25px rgba(37, 211, 102, 0.4)',
          }}
          aria-label="WhatsApp ile İletişim Doğrulaması"
        >
          {/* Pulse Effect */}
          <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
          <div className="absolute -inset-2 rounded-full border-2 border-[#25D366]/30 animate-pulse opacity-40" />

          <svg
            className="relative w-8 h-8 md:w-10 md:h-10 z-10"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </button>

        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes bounce-subtle {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
          .animate-bounce-subtle {
            animation: bounce-subtle 2s infinite ease-in-out;
          }
        `}} />
      </div>

      {/* Verification Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => { setShowModal(false); setSelection(null); }}
          />
          <div className="relative w-full max-w-sm bg-[#1a1c20] border border-white/10 rounded-2xl shadow-2xl p-6 overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#25D366] shadow-[0_0_15px_rgba(37,211,102,0.5)]" />

            <div className="text-center mb-6 pt-2">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-[#25D366]/10 rounded-full mb-4 ring-1 ring-[#25D366]/30">
                <svg className="w-7 h-7 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Servis Bölgesi Onayı</h3>
              <p className="text-slate-400 text-sm leading-relaxed px-4">
                Bu servis <strong className="text-white">SADECE</strong> İstanbul Avrupa Yakası içindir.
              </p>
            </div>

            <div className="space-y-3 mb-8">
              <label
                className={`
                  flex items-center p-4 rounded-xl border-2 transition-all cursor-pointer
                  ${selection === 'inside' ? 'border-[#25D366] bg-[#25D366]/5 shadow-[0_0_15px_rgba(37,211,102,0.1)]' : 'border-white/5 bg-white/[0.02] hover:border-white/10'}
                `}
                onClick={() => setSelection('inside')}
              >
                <input
                  type="radio"
                  name="region"
                  className="sr-only"
                  checked={selection === 'inside'}
                  readOnly
                />
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${selection === 'inside' ? 'border-[#25D366]' : 'border-slate-600'}`}>
                  {selection === 'inside' && <div className="w-2.5 h-2.5 rounded-full bg-[#25D366]" />}
                </div>
                <span className={`text-sm font-semibold transition-colors ${selection === 'inside' ? 'text-[#25D366]' : 'text-slate-300'}`}>
                  İstanbul Avrupa Yakası’ndayım
                </span>
              </label>

              <label
                className={`
                  flex items-center p-4 rounded-xl border-2 transition-all cursor-pointer
                  ${selection === 'outside' ? 'border-red-500/50 bg-red-500/5' : 'border-white/5 bg-white/[0.02] hover:border-white/10'}
                `}
                onClick={() => setSelection('outside')}
              >
                <input
                  type="radio"
                  name="region"
                  className="sr-only"
                  checked={selection === 'outside'}
                  readOnly
                />
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${selection === 'outside' ? 'border-red-500/50' : 'border-slate-600'}`}>
                  {selection === 'outside' && <div className="w-2.5 h-2.5 rounded-full bg-red-500" />}
                </div>
                <span className={`text-sm font-semibold transition-colors ${selection === 'outside' ? 'text-red-400' : 'text-slate-300'}`}>
                  Değilim
                </span>
              </label>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleConfirm}
                disabled={!selection}
                className={`
                  w-full py-4 rounded-xl font-bold text-sm transition-all duration-300
                  ${selection === 'inside'
                    ? 'bg-[#25D366] text-white shadow-[0_10px_25px_rgba(37,211,102,0.3)] hover:scale-[1.02] active:scale-95'
                    : selection === 'outside'
                      ? 'bg-slate-700 text-white hover:bg-slate-600'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50'}
                `}
              >
                {selection === 'outside' ? 'Kapat' : (selection === 'inside' ? 'WhatsApp\'ı Aktif Et' : 'Seçim Yapın')}
              </button>
            </div>

            <p className="mt-4 text-[10px] text-center text-slate-500 uppercase tracking-widest font-medium">
              Friction Filter Active
            </p>
          </div>
        </div>
      )}
    </>
  );
}
