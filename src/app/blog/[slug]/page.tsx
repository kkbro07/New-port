
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { ArrowLeft, Calendar, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/shared/breadcrumb";

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

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const PostContent = post.component;
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://kirtankalathiya.com/blog/${post.slug}`,
    },
    'headline': post.metadata.title,
    'description': post.metadata.excerpt,
    'datePublished': post.metadata.date,
    'dateModified': post.metadata.date,
    'author': {
      '@type': 'Person',
      'name': post.metadata.author,
    },
    'publisher': {
      '@type': 'Person',
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
            <div className="mt-4 flex items-center space-x-6 text-sm text-muted-foreground">
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
    </>
  );
}
