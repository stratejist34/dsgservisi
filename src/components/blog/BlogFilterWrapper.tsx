import { useState } from 'react';
import BlogFilter from './BlogFilter';
import type { CollectionEntry } from 'astro:content';

interface BlogFilterWrapperProps {
  posts: CollectionEntry<'blog'>[];
  onFilteredPostsChange: (posts: CollectionEntry<'blog'>[]) => void;
}

export default function BlogFilterWrapper({ posts, onFilteredPostsChange }: BlogFilterWrapperProps) {
  const [filteredPosts, setFilteredPosts] = useState<CollectionEntry<'blog'>[]>(posts);

  const handleFilterChange = (newFilteredPosts: CollectionEntry<'blog'>[]) => {
    setFilteredPosts(newFilteredPosts);
    onFilteredPostsChange(newFilteredPosts);
  };

  return <BlogFilter posts={posts} onFilterChange={handleFilterChange} />;
}








