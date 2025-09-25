import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-16 text-center fade-in">
        <h1 className="font-headline text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl">
          Blog
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Thoughts on design, development, and everything in between.
        </p>
      </div>

      <div className="mx-auto max-w-3xl">
        <div className="space-y-12">
          <article className="fade-in-stagger opacity-0" style={{ animationDelay: '150ms' }}>
            <h2 className="font-headline text-3xl font-bold">
              <Link href="/blog/sample-post" className="hover:text-primary transition-colors">
                My First Blog Post
              </Link>
            </h2>
            <p className="mt-2 text-muted-foreground">
              This is a brief introduction to my first blog post. More content will be coming soon!
            </p>
            <p className="mt-4">
              <Link href="/blog/sample-post" className="text-primary hover:underline">
                Read more &rarr;
              </Link>
            </p>
          </article>
        </div>
      </div>
    </div>
  );
}
