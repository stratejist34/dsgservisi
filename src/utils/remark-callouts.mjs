import { visit } from 'unist-util-visit';

export default function remarkCallouts() {
  return (tree) => {
    visit(tree, (node) => {
      if (
        node.type === 'containerDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'textDirective'
      ) {
        const name = node.name || '';
        const classMap = {
          tip: 'uzman-tavsiyesi',
          note: 'note',
          cta: 'glass-cta',
        };

        if (classMap[name]) {
          node.data ||= {};
          node.data.hName = 'div';
          node.data.hProperties ||= {};
          node.data.hProperties.className = classMap[name];

          // CTA içeriği: Emojileri temizle ve Linklere buton sınıfları ekle
          if (name === 'cta') {
            const transformNodes = (nodes) => {
              nodes.forEach(child => {
                // Linkleri bul ve emojileri temizle
                if (child.type === 'link') {
                  child.children.forEach(linkChild => {
                    if (linkChild.type === 'text') {
                      let text = linkChild.value || '';

                      const url = child.url || '';
                      const isPhone = url.startsWith('tel:') || /[📞\u{1F4DE}]/u.test(text);
                      const isWhatsapp = url.includes('whatsapp') || url.includes('api.whatsapp.com') || /[💬\u{1F4AC}]/u.test(text);

                      if (isPhone || isWhatsapp) {
                        // Tüm emojileri sil (metni temizle)
                        text = text.replace(/[📞💬\u{1F4DE}\u{1F4AC}]/gu, '').trim();
                        linkChild.value = text;

                        let classes = ['cta-btn'];
                        if (isPhone) classes.push('cta-phone');
                        if (isWhatsapp) classes.push('cta-whatsapp');

                        child.data ||= {};
                        child.data.hProperties ||= {};
                        child.data.hProperties.className = classes.join(' ');
                      }
                    }
                  });
                }
                if (child.children) transformNodes(child.children);
              });
            };
            transformNodes(node.children);
          }
          return;
        }

        // Google Maps embed
        if (name === 'map' || name === 'gmap') {
          node.data ||= {};
          node.data.hName = 'div';
          node.data.hProperties ||= {};
          node.data.hProperties.className = 'map-embed';

          const iframeNode = {
            type: 'element',
            tagName: 'iframe',
            properties: {
              src: (node.attributes || {}).src || (node.attributes || {}).url || '',
              width: '100%',
              height: (node.attributes || {}).height || '360',
              style: 'border:0;',
              loading: 'lazy',
              referrerpolicy: 'no-referrer-when-downgrade',
              allowfullscreen: true,
            },
            children: []
          };

          node.children = [iframeNode];
        }
      }
    });
  };
}
