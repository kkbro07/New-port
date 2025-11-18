import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { format } from "date-fns";
import Image from 'next/image';

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

// This generates the routes for all blog posts at build time.
export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return {};
  }
  return {
    title: post.metadata.title,
    description: post.metadata.excerpt,
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const components = {
    Image,
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 sm:py-24">
      <header className="mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tighter leading-tight sm:text-5xl md:text-6xl">
          {post.metadata.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Posted by {post.metadata.author} on{" "}
          <time dateTime={post.metadata.date}>
            {format(new Date(post.metadata.date), "MMMM d, yyyy")}
          </time>
        </p>
      </header>

      <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-headline prose-headings:tracking-tighter prose-a:text-primary hover:prose-a:underline">
        <MDXRemote source={post.content} components={components} />
      </article>
    </div>
  );
}
