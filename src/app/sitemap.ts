
import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog';

const URL = 'https://kirtankalathiya.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const postUrls = posts.map((post) => ({
    url: `${URL}/blog/${post.slug}`,
    lastModified: new Date(post.metadata.date),
    priority: 0.64,
  }));

  return [
    {
      url: URL,
      lastModified: new Date(),
      priority: 1.00,
    },
    {
      url: `${URL}/blog`,
      lastModified: new Date(),
      priority: 0.80,
    },
    ...postUrls,
  ];
}
