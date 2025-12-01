import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type PostMetadata = {
  title: string;
  date: string;
  author: string;
  excerpt?: string;
  imageId: string;
};

export type Post = {
  slug: string;
  metadata: PostMetadata;
  content: string;
};

const postsDirectory = path.join(process.cwd(), 'src/app/blog/posts');

export function getPostBySlug(slug: string): Post {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    metadata: data as PostMetadata,
    content,
  };
}

export function getAllPosts(): Post[] {
  const slugs = fs.readdirSync(postsDirectory);
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.metadata.date > post2.metadata.date ? -1 : 1));
  return posts;
}
