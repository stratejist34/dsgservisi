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
          node.data.hName = 'div';
          node.data.hProperties ||= {};
          node.data.hProperties.className = 'map-embed';
          
          // Create iframe element as child
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
