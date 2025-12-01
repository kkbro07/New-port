import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

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
  content: any; // Updated to be compatible with serialized content
};

const postsDirectory = path.join(process.cwd(), 'src/app/blog/posts');

export async function getPostBySlug(slug: string): Promise<Post> {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const mdxSource = await serialize(content);

  return {
    slug: realSlug,
    metadata: data as PostMetadata,
    content: mdxSource,
  };
}

export function getAllPosts(): Omit<Post, 'content'>[] {
  const slugs = fs.readdirSync(postsDirectory);
  const posts = slugs
    .map((slug) => {
        const realSlug = slug.replace(/\.mdx$/, '');
        const fullPath = path.join(postsDirectory, slug);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);
        return {
            slug: realSlug,
            metadata: data as PostMetadata,
        }
    })
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.metadata.date > post2.metadata.date ? -1 : 1));
  return posts;
}
