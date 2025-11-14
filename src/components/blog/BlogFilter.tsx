import { useState, useEffect, useMemo } from 'react';
import type { CollectionEntry } from 'astro:content';

interface BlogFilterProps {
  posts: CollectionEntry<'blog'>[];
  onFilterChange?: (filteredPosts: CollectionEntry<'blog'>[]) => void;
}

export default function BlogFilter({ posts, onFilterChange }: BlogFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: number | null; max: number | null }>({
    min: null,
    max: null,
  });

  // Kategorileri ve tag'leri topla
  const categories = useMemo(() => {
    const cats = new Set<string>();
    posts.forEach(post => {
      if (post.data.category) {
        cats.add(post.data.category);
      }
    });
    return Array.from(cats).sort();
  }, [posts]);

  const tags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach(post => {
      post.data.tags?.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [posts]);

  // Filtreleme mantığı
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      // Kategori filtresi
      if (selectedCategory !== 'all' && post.data.category !== selectedCategory) {
        return false;
      }

      // Tag filtresi
      if (selectedTags.length > 0) {
        const postTags = post.data.tags?.map(t => t.toLowerCase()) || [];
        const hasSelectedTag = selectedTags.some(selectedTag =>
          postTags.includes(selectedTag.toLowerCase())
        );
        if (!hasSelectedTag) {
          return false;
        }
      }

      // Fiyat filtresi
      const postPrice = post.data.price || post.data.lowPrice;
      if (priceRange.min !== null && postPrice !== undefined && postPrice < priceRange.min) {
        return false;
      }
      if (priceRange.max !== null && postPrice !== undefined && postPrice > priceRange.max) {
        return false;
      }
      if (post.data.highPrice !== undefined) {
        if (priceRange.min !== null && post.data.highPrice < priceRange.min) {
          return false;
        }
        if (priceRange.max !== null && post.data.highPrice > priceRange.max) {
          return false;
        }
      }

      return true;
    });
  }, [posts, selectedCategory, selectedTags, priceRange]);

  // Filtre değiştiğinde parent'a bildir ve DOM'u güncelle
  useEffect(() => {
    if (onFilterChange) {
      onFilterChange(filteredPosts);
    }
    
    // DOM'u güncelle
    const container = document.getElementById('filtered-posts-container');
    if (container) {
      // PostGridPattern component'ini yeniden render etmek için
      // Bu basit bir yaklaşım, daha iyi bir çözüm için React kullanılabilir
      const event = new CustomEvent('filteredPostsChanged', { 
        detail: { posts: filteredPosts } 
      });
      window.dispatchEvent(event);
    }
  }, [filteredPosts, onFilterChange]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedTags([]);
    setPriceRange({ min: null, max: null });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-display font-bold text-navy">Filtrele</h2>
        <button
          onClick={clearFilters}
          className="text-sm text-primary hover:text-urgent transition-colors"
        >
          Filtreleri Temizle
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Kategori Filtresi */}
        <div>
          <label className="block text-sm font-semibold text-navy mb-2">Kategori</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          >
            <option value="all">Tüm Kategoriler</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Tag Filtresi */}
        <div>
          <label className="block text-sm font-semibold text-navy mb-2">Etiketler</label>
          <div className="max-h-32 overflow-y-auto border border-gray-300 rounded-lg p-2">
            {tags.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      selectedTags.includes(tag)
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">Etiket bulunamadı</p>
            )}
          </div>
        </div>

        {/* Fiyat Filtresi */}
        <div>
          <label className="block text-sm font-semibold text-navy mb-2">Fiyat Aralığı (₺)</label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Min"
              value={priceRange.min || ''}
              onChange={(e) => setPriceRange(prev => ({
                ...prev,
                min: e.target.value ? Number(e.target.value) : null
              }))}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
            <input
              type="number"
              placeholder="Max"
              value={priceRange.max || ''}
              onChange={(e) => setPriceRange(prev => ({
                ...prev,
                max: e.target.value ? Number(e.target.value) : null
              }))}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Sonuç Sayısı */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-navy">{filteredPosts.length}</span> yazı bulundu
        </p>
      </div>
    </div>
  );
}

