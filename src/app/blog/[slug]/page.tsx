import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { Calendar, User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
      <div className="container mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 sm:py-24">
        <div className="lg:grid lg:grid-cols-4 lg:gap-12">
          <div className="lg:col-span-1">
            <div className="sticky top-24">
                <div className="mb-8">
                    <Link href="/blog">
                        <Button variant="ghost">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Blog
                        </Button>
                    </Link>
                </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                    <User className="h-5 w-5 text-secondary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Author
                    </p>
                    <p className="font-semibold text-foreground">
                      {post.metadata.author}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                    <Calendar className="h-5 w-5 text-secondary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Published
                    </p>
                    <p className="font-semibold text-foreground">
                      <time dateTime={post.metadata.date}>
                        {format(new Date(post.metadata.date), "MMMM d, yyyy")}
                      </time>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 mt-12 lg:mt-0">
            <header className="mb-12">
              <h1 className="font-headline text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
                {post.metadata.title}
              </h1>
            </header>

            <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-headline prose-headings:tracking-tighter prose-headings:text-foreground prose-a:text-primary hover:prose-a:underline prose-blockquote:border-primary prose-blockquote:text-muted-foreground prose-strong:text-foreground">
              <PostContent />
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
