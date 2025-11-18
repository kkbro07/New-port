import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "src/content/blog");

type PostMetadata = {
  title: string;
  date: string;
  author: string;
  excerpt?: string;
};

type Post = {
  slug: string;
  metadata: PostMetadata;
  content: string;
};

export function getPostBySlug(slug: string): Post | undefined {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
  
  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug: realSlug,
      metadata: data as PostMetadata,
      content,
    };
  } catch (err) {
    return undefined;
  }
}

export function getAllPosts(): Post[] {
  const slugs = fs.readdirSync(postsDirectory);
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== undefined)
    // Sort posts by date in descending order
    .sort((post1, post2) => {
      return new Date(post2.metadata.date) > new Date(post1.metadata.date) ? 1 : -1;
    });
  return posts;
}
