import * as React from 'react';

export default function WhatsAppButton({
  phone = '905332623451',
  message = 'Merhaba, İstanbul Avrupa Yakası’ndayım ve servis talebi için yazıyorum.',
  className = '',
  pageId = 'diger_sayfalar'
}: { phone?: string; message?: string; className?: string; pageId?: string }) {
  const [mounted, setMounted] = React.useState(false);
  const [showTooltip, setShowTooltip] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [selection, setSelection] = React.useState<'inside' | 'outside' | null>(null);
  const [isLocked, setIsLocked] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);

    // Check if user already confirmed as outside
    const regionalStatus = localStorage.getItem('user-regional-status');
    if (regionalStatus === 'outside') {
      setIsLocked(true);
    }

    // 6 saniye sonra "Randevu Al" balonunu göster (Telefon'dan sonra)
    const tooltipTimer = setTimeout(() => {
      // Don't show tooltip if locked or already selected
      if (!isLocked && !localStorage.getItem('user-regional-status')) {
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 5000);
      }
    }, 6000);

    return () => clearTimeout(tooltipTimer);
  }, [isLocked]);

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isLocked) return;

    // Skip modal if already confirmed as inside
    const regionalStatus = localStorage.getItem('user-regional-status');
    if (regionalStatus === 'inside') {
      const finalMessage = `${message}\n\n(Not: Avrupa Yakası dışı talepler yanıtlanmamaktadır.)`;
      const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(finalMessage)}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    // Track Initial Intent
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'whatsapp_button_click', {
        'event_category': 'conversion',
        'source_page': window.location.pathname,
        'click_location': 'floating_widget'
      });
    }

    setShowTooltip(false);
    setShowModal(true);
  };

  const handleConfirm = () => {
    if (selection === 'inside') {
      localStorage.setItem('user-regional-status', 'inside');
      // Dispatch event to show other CTAs if needed
      window.dispatchEvent(new CustomEvent('regional-confirmed'));

      // Track Confirmation
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'whatsapp_confirmed', {
          'event_category': 'conversion',
          'source_page': window.location.pathname
        });
      }

      const finalMessage = `${message}\n\n(Not: Avrupa Yakası dışı talepler yanıtlanmamaktadır.)`;
      const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(finalMessage)}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      setShowModal(false);
    } else if (selection === 'outside') {
      localStorage.setItem('user-regional-status', 'outside');
      setIsLocked(true);
      setShowModal(false);
      // Optional: hide the floating button after few seconds
    }
  };

  if (!mounted || (isLocked && !showModal)) {
    // Hidden if locked (Fitts's Law / V2 Stage 4)
    return null;
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[55] flex flex-col items-center">
        {/* Tooltip / Balon */}
        {showTooltip && (
          <div
            className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-4 py-3 bg-[#25D366] text-white text-sm font-bold rounded-xl shadow-[0_10px_25px_rgba(37,211,102,0.4)] whitespace-nowrap pointer-events-none z-[60]"
            style={{ animation: 'bounce-x-left-subtle 2s infinite ease-in-out' }}
          >
            <div className="relative text-center">
              Randevu Al
              <div className="absolute left-[calc(100%+15px)] top-1/2 -translate-y-1/2 border-t-[6px] border-b-[6px] border-l-[8px] border-t-transparent border-b-transparent border-l-[#25D366]"></div>
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
            ${isLocked ? 'grayscale opacity-50 cursor-not-allowed' : ''}
            ${className}
          `}
          style={{
            boxShadow: '0 10px 25px rgba(37, 211, 102, 0.4)',
          }}
          aria-label="WhatsApp ile İletişim Doğrulaması"
          disabled={isLocked}
        >
          {/* Pulse Effect - REMOVED for calmer look */}

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
          @keyframes bounce-x-left-subtle {
            0%, 100% { transform: translateX(0) translateY(-50%); }
            50% { transform: translateX(-5px) translateY(-50%); }
          }
          .animate-bounce-subtle {
            animation: bounce-subtle 2s infinite ease-in-out;
          }
        `}} />
      </div>

      {/* Verification Modal V2 - Hard Filter */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/90 backdrop-blur-md animate-in fade-in duration-300"
            onClick={() => { setShowModal(false); setSelection(null); }}
          />
          <div className="relative w-full max-w-sm bg-[#0f172a] border-2 border-red-900/30 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] p-8 overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.5)]" />

            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600/10 rounded-full mb-4 ring-1 ring-red-600/30">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-black text-red-600 mb-2 uppercase tracking-tight">SERVİS BÖLGESİ KONTROLÜ</h3>
              <p className="text-slate-300 text-sm leading-relaxed px-2">
                Bu numara sadece <strong className="text-white">İstanbul Avrupa Yakası</strong> servis talepleri içindir. Avrupa Yakası dışı aramalar yanıtlanmaz.
              </p>
            </div>

            <div className="space-y-3 mb-8">
              <label
                className={`
                  flex items-center p-5 rounded-2xl border-2 transition-all cursor-pointer
                  ${selection === 'inside' ? 'border-green-500 bg-green-500/5 shadow-[0_0_20px_rgba(34,197,94,0.1)]' : 'border-white/5 bg-white/[0.03] hover:border-white/10'}
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
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 ${selection === 'inside' ? 'border-green-500' : 'border-slate-700'}`}>
                  {selection === 'inside' && <div className="w-3 h-3 rounded-full bg-green-500" />}
                </div>
                <span className={`text-sm font-bold transition-colors ${selection === 'inside' ? 'text-green-400' : 'text-slate-300'}`}>
                  İstanbul Avrupa Yakası’ndayım
                </span>
              </label>

              <label
                className={`
                  flex items-center p-5 rounded-2xl border-2 transition-all cursor-pointer
                  ${selection === 'outside' ? 'border-red-600 bg-red-600/5' : 'border-white/5 bg-white/[0.03] hover:border-white/10'}
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
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 ${selection === 'outside' ? 'border-red-600' : 'border-slate-700'}`}>
                  {selection === 'outside' && <div className="w-3 h-3 rounded-full bg-red-600" />}
                </div>
                <span className={`text-sm font-bold transition-colors ${selection === 'outside' ? 'text-red-500' : 'text-slate-300'}`}>
                  Değilim
                </span>
              </label>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleConfirm}
                disabled={!selection}
                className={`
                  w-full py-5 rounded-2xl font-black text-sm transition-all duration-300 uppercase letter-spacing-1
                  ${selection === 'inside'
                    ? 'bg-[#334155] border-2.5 border-green-600 text-white shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:bg-[#1e293b] active:scale-95'
                    : selection === 'outside'
                      ? 'bg-[#334155] text-red-500 border-2.5 border-red-900 shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:bg-[#1e293b]'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50'}
                `}
                style={selection ? { borderWidth: '2.5px' } : {}}
              >
                {selection === 'outside' ? 'BU KANAL KAPALI – ÇIKIŞ' : (selection === 'inside' ? (
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-black tracking-tight">BÖLGE ŞARTINI KABUL EDİYORUM</span>
                    <span className="text-[0.65rem] opacity-50 font-medium tracking-normal mt-0.5 lowercase leading-none">WhatsApp başlatılır</span>
                  </div>
                ) : 'Bölgenizi Seçin')}
              </button>

              {selection === 'outside' && (
                <p className="text-[11px] text-red-500 font-bold text-center mt-2 animate-pulse uppercase tracking-widest">
                  Bu kanal Avrupa Yakası dışı için kapalıdır.
                </p>
              )}
            </div>

            <p className="mt-6 text-[10px] text-center text-slate-600 uppercase tracking-[0.2em] font-black">
              BÖLGE FİLTRESİ AKTİF
            </p>
          </div>
        </div>
      )}
    </>
  );
}
