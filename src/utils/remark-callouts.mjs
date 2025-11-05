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
          return;
        }

        // Google Maps embed: :::map{src="<embed-url>" height="360"}
        if (name === 'map' || name === 'gmap') {
          node.data ||= {};
          node.data.hName = 'iframe';
          node.data.hProperties ||= {};
          const attrs = (node.attributes || {});
          const src = attrs.src || attrs.url || '';
          const height = attrs.height || '360';
          Object.assign(node.data.hProperties, {
            className: 'map-embed',
            src,
            loading: 'lazy',
            referrerpolicy: 'no-referrer-when-downgrade',
            allowfullscreen: true,
            height,
            width: '100%'
          });
        }
      }
    });
  };
}
