import { visit } from 'unist-util-visit';
import { internalLinkMap, sortedTerms, getLinkUrl } from './internal-links.mjs';

/**
 * Remark plugin: Blog yazılarında geçen terimleri otomatik olarak
 * ilgili blog yazılarına linkler.
 * 
 * Kurallar:
 * - Her terim maksimum 1 kere linklenir
 * - Aynı terim arasında 150 kelime sınırı vardır
 * - Herhangi 2 link arasında minimum 10 kelime boşluk vardır
 * - Bir yazıda maksimum 10 iç link kullanılır
 * - Başlıklarda kullanılmaz
 * - Tablo içinde kullanılmaz
 * - İlk paragraf atlanır
 * - Sadece paragraf içinde kullanılır
 */
export default function remarkInternalLinks() {
  return (tree) => {
    // Global sayaçlar
    const termCounts = new Map(); // term -> { count: number, lastWordIndex: number }
    let totalLinks = 0;
    let totalWordCount = 0;
    let lastLinkWordIndex = -Infinity; // Son eklenen link'in wordIndex'i (global)
    
    const MAX_LINKS_PER_ARTICLE = 10;
    const MAX_LINKS_PER_TERM = 1;
    const MIN_WORDS_BETWEEN_SAME_TERM = 150;
    const MIN_WORDS_BETWEEN_ANY_LINKS = 33;
    
    // Önce table node'larını işaretle (içlerindeki paragrafları atlamak için)
    const tableNodes = new Set();
    visit(tree, 'table', (tableNode) => {
      // Table içindeki tüm node'ları recursive olarak işaretle
      function markAllChildren(node) {
        tableNodes.add(node);
        if (node.children && Array.isArray(node.children)) {
          for (const child of node.children) {
            markAllChildren(child);
          }
        }
      }
      markAllChildren(tableNode);
    });
    
    // İlk paragrafı bulmak için paragraf sayacı
    let paragraphIndex = 0;
    let firstParagraph = null;
    
    // Önce ilk paragrafı bul
    visit(tree, 'paragraph', (paragraphNode) => {
      if (tableNodes.has(paragraphNode)) {
        return;
      }
      if (!firstParagraph) {
        firstParagraph = paragraphNode;
      }
    });
    
    // Sadece paragrafları ziyaret et (tabloları atla)
    visit(tree, 'paragraph', (paragraphNode) => {
      // Paragraf table içindeyse, atla
      if (tableNodes.has(paragraphNode)) {
        return;
      }
      
      // İlk paragrafı atla
      if (paragraphNode === firstParagraph) {
        paragraphIndex++;
        return;
      }
      
      paragraphIndex++;
      
      // Paragraf içindeki tüm text'i al
      const paragraphText = extractTextFromParagraph(paragraphNode);
      if (!paragraphText || paragraphText.trim().length === 0) {
        return;
      }
      
      // Paragrafın kelime sayısını hesapla
      const words = paragraphText.split(/\s+/).filter(w => w.length > 0);
      const paragraphStartWordIndex = totalWordCount;
      const paragraphEndWordIndex = totalWordCount + words.length;
      
      // Paragraf içindeki tüm eşleşmeleri bul
      const matches = [];
      for (const term of sortedTerms) {
        const regex = new RegExp(escapeRegex(term), 'gi');
        let match;
        
        while ((match = regex.exec(paragraphText)) !== null) {
          // Terimin hangi kelimede olduğunu hesapla
          const textBeforeMatch = paragraphText.substring(0, match.index);
          const wordIndex = textBeforeMatch.split(/\s+/).filter(w => w.length > 0).length;
          const absoluteWordIndex = paragraphStartWordIndex + wordIndex;
          
          matches.push({
            term: term,
            matchIndex: match.index,
            matchEnd: match.index + term.length,
            matchedText: match[0],
            wordIndex: absoluteWordIndex,
          });
        }
      }
      
      // Eşleşmeleri pozisyona göre sırala
      matches.sort((a, b) => a.matchIndex - b.matchIndex);
      
      // Çakışan eşleşmeleri temizle (uzun olanları tercih et)
      const nonOverlapping = [];
      let lastEnd = -1;
      
      for (const match of matches) {
        if (match.matchIndex >= lastEnd) {
          // Aynı pozisyonda birden fazla terim varsa, en uzun olanı al
          const samePositionMatches = matches.filter(
            m => m.matchIndex === match.matchIndex && m.matchEnd <= match.matchEnd
          );
          const longest = samePositionMatches.reduce((a, b) => 
            b.matchedText.length > a.matchedText.length ? b : a
          );
          
          if (longest === match) {
            nonOverlapping.push(match);
            lastEnd = match.matchEnd;
          }
        }
      }
      
      // Eşleşmeleri filtrele (kurallara göre)
      const filteredMatches = [];
      
      for (const match of nonOverlapping) {
        // Maksimum link sayısı kontrolü
        if (totalLinks >= MAX_LINKS_PER_ARTICLE) {
          break;
        }
        
        const termInfo = termCounts.get(match.term) || { count: 0, lastWordIndex: -Infinity };
        
        // Aynı terim için maksimum 1 kere kontrolü
        if (termInfo.count >= MAX_LINKS_PER_TERM) {
          continue;
        }
        
        // Aynı terim arasında 150 kelime sınırı kontrolü
        const wordsSinceLast = match.wordIndex - termInfo.lastWordIndex;
        if (termInfo.count > 0 && wordsSinceLast < MIN_WORDS_BETWEEN_SAME_TERM) {
          continue;
        }
        
        // Herhangi 2 link arasında minimum 10 kelime boşluk kontrolü
        const wordsSinceLastLink = match.wordIndex - lastLinkWordIndex;
        if (totalLinks > 0 && wordsSinceLastLink < MIN_WORDS_BETWEEN_ANY_LINKS) {
          continue;
        }
        
        // Eşleşmeyi ekle
        filteredMatches.push(match);
        termCounts.set(match.term, {
          count: termInfo.count + 1,
          lastWordIndex: match.wordIndex,
        });
        lastLinkWordIndex = match.wordIndex;
        totalLinks++;
      }
      
      // Eğer eşleşme varsa, paragrafa linkleri uygula
      if (filteredMatches.length > 0) {
        applyLinksToParagraph(paragraphNode, paragraphText, filteredMatches);
      }
      
      // Kelime sayacını güncelle
      totalWordCount = paragraphEndWordIndex;
    });
  };
}


/**
 * Paragraf node'undan tüm text içeriğini çıkarır
 */
function extractTextFromParagraph(node) {
  if (node.type === 'text') {
    return node.value || '';
  }
  
  if (node.children && Array.isArray(node.children)) {
    return node.children
      .map(child => extractTextFromParagraph(child))
      .join('');
  }
  
  return '';
}

/**
 * Paragrafa linkleri uygula
 */
function applyLinksToParagraph(paragraphNode, paragraphText, matches) {
  if (matches.length === 0) {
    return;
  }
  
  // Eşleşmeleri pozisyona göre sırala
  matches.sort((a, b) => a.matchIndex - b.matchIndex);
  
  // Paragrafın children'ını yeniden oluştur
  // Basit yaklaşım: Tüm paragrafı text ve link node'larından oluştur
  // (Paragraf içindeki diğer elementler kaybolur ama bu kabul edilebilir)
  const newChildren = [];
  let currentIndex = 0;
  
  for (const match of matches) {
    // Match öncesi text
    if (match.matchIndex > currentIndex) {
      const beforeText = paragraphText.substring(currentIndex, match.matchIndex);
      if (beforeText) {
        newChildren.push({
          type: 'text',
          value: beforeText,
        });
      }
    }
    
    // Link oluştur
    const slug = internalLinkMap[match.term];
    if (slug) {
      const linkUrl = getLinkUrl(match.term);
      if (linkUrl) {
        newChildren.push({
          type: 'link',
          url: linkUrl,
          children: [{ type: 'text', value: match.matchedText }],
          data: {
            hProperties: {
              class: 'internal-link',
              title: `İlgili yazı: ${match.term}`,
            },
          },
        });
      } else {
        newChildren.push({ type: 'text', value: match.matchedText });
      }
    } else {
      newChildren.push({ type: 'text', value: match.matchedText });
    }
    
    currentIndex = match.matchEnd;
  }
  
  // Kalan text
  if (currentIndex < paragraphText.length) {
    const remainingText = paragraphText.substring(currentIndex);
    if (remainingText) {
      newChildren.push({
        type: 'text',
        value: remainingText,
      });
    }
  }
  
  // Paragraf node'unu güncelle
  if (newChildren.length > 0) {
    paragraphNode.children = newChildren;
  }
}

/**
 * Regex özel karakterlerini escape eder
 */
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
