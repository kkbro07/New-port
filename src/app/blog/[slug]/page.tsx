
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import Link from "next/link";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MDXContent } from "@/components/mdx-components";

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
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return {};
  }
  return {
    title: post.metadata.title,
    description: post.metadata.excerpt,
    authors: [{ name: post.metadata.author }],
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.excerpt,
      type: 'article',
      publishedTime: post.metadata.date,
      authors: [post.metadata.author],
    }
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts();
  const recentPosts = allPosts.filter(p => p.slug !== params.slug).slice(0, 2);

  const postImage = PlaceHolderImages.find(p => p.id === post.metadata.imageId);
  const authorImage = PlaceHolderImages.find(p => p.id === 'kirtan-avatar');
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://kirtankalathiya.com/blog/${post.slug}`,
    },
    'headline': post.metadata.title,
    'description': post.metadata.excerpt,
    'image': postImage?.imageUrl,
    'datePublished': post.metadata.date,
    'dateModified': post.metadata.date,
    'author': {
      '@type': 'Person',
      'name': post.metadata.author,
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Kirtan Kalathiya',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://kirtankalathiya.com/kirtan-avatar.png'
      }
    }
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Blog",
      "item": "https://kirtankalathiya.com/blog"
    },{
      "@type": "ListItem",
      "position": 2,
      "name": post.metadata.title
    }]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="fade-in bg-background">
        <div className="container mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 sm:py-24">
          <header className="mb-12">
            <Breadcrumb
              className="mb-8"
              items={[
                { label: "Home", href: "/" },
                { label: "Blog", href: "/blog" },
                { label: post.metadata.title },
              ]}
            />
            <h1 className="font-headline text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
              {post.metadata.title}
            </h1>
            <div className="mt-6 flex items-center space-x-4 text-sm text-muted-foreground">
                <Avatar>
                  {authorImage && <AvatarImage src={authorImage.imageUrl} alt="Kirtan Kalathiya" />}
                  <AvatarFallback>KK</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-foreground">
                    by {post.metadata.author}
                  </p>
                  <p className="text-muted-foreground">
                    Published on{" "}
                    <time dateTime={post.metadata.date}>
                      {format(new Date(post.metadata.date), "MMMM d, yyyy")}
                    </time>
                  </p>
                </div>
            </div>
          </header>

          <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-headline prose-headings:tracking-tighter prose-headings:text-foreground prose-a:text-primary hover:prose-a:underline prose-blockquote:border-primary prose-blockquote:text-muted-foreground prose-strong:text-foreground">
            <MDXContent source={post.content} />
          </article>
          
          {recentPosts.length > 0 && (
            <aside className="mt-16 pt-12 border-t">
              <h2 className="font-headline text-3xl font-bold tracking-tight text-center mb-8">
                Recent Posts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {recentPosts.map((recentPost) => {
                  const recentPostImage = PlaceHolderImages.find(p => p.id === recentPost.metadata.imageId);
                  return (
                  <Link key={recentPost.slug} href={`/blog/${recentPost.slug}`} className="group block">
                    <div className="relative aspect-video mb-4 rounded-lg overflow-hidden shadow-md">
                      {recentPostImage && <Image src={recentPostImage.imageUrl} alt={recentPost.metadata.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint={recentPostImage.imageHint} />}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Avatar className="h-6 w-6">
                        {authorImage && <AvatarImage src={authorImage.imageUrl} alt="Kirtan Kalathiya" />}
                        <AvatarFallback>KK</AvatarFallback>
                      </Avatar>
                      <span>{recentPost.metadata.author}</span>
                      <span className="mx-1">·</span>
                      <time dateTime={recentPost.metadata.date}>
                        {format(new Date(recentPost.metadata.date), "MMM d, yyyy")}
                      </time>
                    </div>
                    <h3 className="font-headline text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                      {recentPost.metadata.title}
                    </h3>
                  </Link>
                )})}
              </div>
            </aside>
          )}

        </div>
      </div>
    </>
  );
}
