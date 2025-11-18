import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { Calendar, User } from "lucide-react";

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

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
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const PostContent = post.component;

  return (
    <div className="fade-in bg-background">
      <div className="container mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 sm:py-24">
        <header className="mb-12">
          <h1 className="font-headline text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl">
            {post.metadata.title}
          </h1>
          <div className="mt-4 flex items-center space-x-6 text-base text-muted-foreground">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>{post.metadata.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.metadata.date}>
                {format(new Date(post.metadata.date), "MMMM d, yyyy")}
              </time>
            </div>
          </div>
        </header>

        <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-headline prose-headings:tracking-tighter prose-headings:text-foreground prose-a:text-primary hover:prose-a:underline prose-blockquote:border-primary prose-blockquote:text-muted-foreground prose-strong:text-foreground">
          <PostContent />
        </article>
      </div>
    </div>
  );
}
