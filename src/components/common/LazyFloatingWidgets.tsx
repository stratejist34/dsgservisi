import React, { useState, useEffect, Suspense } from 'react';

const PhoneButton = React.lazy(() => import('./PhoneButton'));
const WhatsAppButton = React.lazy(() => import('./WhatsAppButton'));

interface Props {
    pageId: string;
    phone: string;
    title: string;
    canonicalURL: string;
}

export default function LazyFloatingWidgets({ pageId, phone, title, canonicalURL }: Props) {
    const [shouldLoad, setShouldLoad] = useState(false);

    useEffect(() => {
        const handleLoad = () => {
            setShouldLoad(true);
        };

        // Listen for custom trigger or standard idle/timeout
        window.addEventListener('load-floating-widgets', handleLoad, { once: true });

        // Fallback if event is missed
        const timer = setTimeout(handleLoad, 8000);

        return () => {
            window.removeEventListener('load-floating-widgets', handleLoad);
            clearTimeout(timer);
        };
    }, []);

    if (!shouldLoad) return null;

    return (
        <Suspense fallback={null}>
            <PhoneButton pageId={pageId} phone={phone} />
            <WhatsAppButton
                pageId={pageId}
                message={`Merhaba, DSG servisi hakkında bilgi almak istiyorum. Bu sayfadan yazıyorum: ${title} - ${canonicalURL}`}
            />
        </Suspense>
    );
}
