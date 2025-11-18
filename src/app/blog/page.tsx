import { getAllPosts } from "@/lib/blog";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { format } from "date-fns";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="container mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 sm:py-24">
      <header className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          The Blog
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Thoughts on design, technology, and everything in between.
        </p>
      </header>

      <div className="grid gap-12">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="group relative transform-gpu transition-all duration-300 ease-in-out hover:-translate-y-2"
          >
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="absolute -inset-4 z-0 scale-95 rounded-lg bg-secondary/50 opacity-0 transition-all duration-300 ease-in-out group-hover:scale-100 group-hover:opacity-100 sm:-inset-6" />
              <div className="relative z-10">
                <p className="mb-2 text-sm text-muted-foreground">
                  <time dateTime={post.metadata.date}>
                    {format(new Date(post.metadata.date), "MMMM d, yyyy")}
                  </time>
                </p>
                <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                  {post.metadata.title}
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  {post.metadata.excerpt}
                </p>
                <div className="mt-6 flex items-center gap-2 font-semibold text-primary">
                  <span>Read more</span>
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
