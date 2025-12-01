
import { getAllPosts } from "@/lib/blog";
import Link from "next/link";
import { ArrowRight, User, Calendar } from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function BlogPage() {
  const allPosts = getAllPosts();
  const heroPost = allPosts[0];
  const otherPosts = allPosts.slice(1);
  const authorImage = PlaceHolderImages.find(p => p.id === 'kirtan-avatar');
  const heroPostImage = PlaceHolderImages.find(p => p.id === 'cloudflare-outage-hero');

  return (
    <div className="container mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 sm:py-24">
      <header className="mb-16 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          The Blog
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Thoughts on design, technology, and everything in between.
        </p>
      </header>

      {heroPost && (
        <section className="mb-16">
          <Link href={`/blog/${heroPost.slug}`} className="group block">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
                {heroPostImage && (
                  <Image
                    src={heroPostImage.imageUrl}
                    alt={heroPost.metadata.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={heroPostImage.imageHint}
                  />
                )}
              </div>
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <Avatar>
                    {authorImage && <AvatarImage src={authorImage.imageUrl} alt="Kirtan Kalathiya" />}
                    <AvatarFallback>KK</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">Kirtan Kalathiya</p>
                    <p className="text-sm text-muted-foreground">
                      <time dateTime={heroPost.metadata.date}>
                        {format(new Date(heroPost.metadata.date), "MMMM d, yyyy")}
                      </time>
                    </p>
                  </div>
                </div>
                <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                  {heroPost.metadata.title}
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  {heroPost.metadata.excerpt}
                </p>
                <div className="mt-6 flex items-center gap-2 font-semibold text-primary">
                  <span>Read more</span>
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {otherPosts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {otherPosts.map((post) => {
             const postImage = PlaceHolderImages.find(p => p.id === 'cloudflare-outage-hero');
            return (
            <article
              key={post.slug}
              className="group relative flex flex-col transform-gpu transition-all duration-300 ease-in-out hover:-translate-y-2"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="relative aspect-video mb-4 rounded-lg overflow-hidden shadow-md">
                   {postImage && <Image src={postImage.imageUrl} alt={post.metadata.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint={postImage.imageHint} />}
                </div>
              </Link>
              <div className="flex flex-col flex-grow">
                 <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <User className="h-4 w-4" />
                    <span>{post.metadata.author}</span>
                    <span className="mx-1">·</span>
                    <Calendar className="h-4 w-4" />
                    <time dateTime={post.metadata.date}>
                      {format(new Date(post.metadata.date), "MMM d, yyyy")}
                    </time>
                  </div>
                <h2 className="font-headline text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                  {post.metadata.title}
                </h2>
                <p className="mt-2 text-muted-foreground text-sm flex-grow">
                  {post.metadata.excerpt}
                </p>
                <Link href={`/blog/${post.slug}`} className="mt-4 flex items-center gap-2 font-semibold text-primary text-sm">
                    <span>Read more</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          )})}
        </div>
      )}
    </div>
  );
}
