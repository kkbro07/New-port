import Link from "next/link";

const posts = [
  {
    slug: 'sample-post',
    title: 'My First Blog Post',
    description: 'This is a brief introduction to my first blog post. More content will be coming soon!',
  },
  {
    slug: 'the-perfect-tech-stack-for-modern-web-apps',
    title: 'Choosing the Perfect Tech Stack for Modern Web Apps',
    description: 'A deep dive into the pros and cons of popular frontend and backend technologies in 2024.',
  },
  {
    slug: 'seo-for-developers',
    title: 'SEO for Developers: A Practical Guide',
    description: 'Learn how to boost your site\'s visibility without being a marketing guru. Technical SEO tips for developers.',
  },
  {
    slug: 'state-management-in-react',
    title: 'The State of State Management in React',
    description: 'From Context API to Redux and Zustand, we explore the best ways to manage state in your React applications.',
  },
  {
    slug: 'content-marketing-for-saas',
    title: 'Content Marketing Strategies That Convert for SaaS',
    description: 'How to create valuable content that attracts and retains customers for your software-as-a-service business.',
  },
  {
    slug: 'serverless-architecture-explained',
    title: 'Serverless Architecture Explained: The Future of Backend?',
    description: 'Understanding the benefits and drawbacks of going serverless with providers like AWS Lambda and Vercel Functions.',
  },
  {
    slug: 'the-art-of-conversion-rate-optimization',
    title: 'The Art of Conversion Rate Optimization (CRO)',
    description: 'Turn more visitors into customers with these data-driven design and marketing techniques.',
  },
  {
    slug: 'building-design-systems',
    title: 'Building a Design System That Scales',
    description: 'A step-by-step guide to creating a consistent and reusable component library for your projects.',
  },
  {
    slug: 'email-marketing-automation',
    title: 'Mastering Email Marketing Automation',
    description: 'Set up powerful email funnels that nurture leads and drive sales on autopilot.',
  },
  {
    slug: 'api-design-best-practices',
    title: 'REST vs GraphQL: API Design Best Practices',
    description: 'Learn when to use REST and when GraphQL is a better choice for your application\'s data layer.',
  },
  {
    slug: 'growth-hacking-for-startups',
    title: '10 Growth Hacking Tactics for Early-Stage Startups',
    description: 'Creative, low-cost strategies to acquire and retain your first users.',
  },
];


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
          {posts.map((post, index) => (
            <article key={post.slug} className="fade-in-stagger opacity-0" style={{ animationDelay: `${index * 150}ms` }}>
              <h2 className="font-headline text-3xl font-bold">
                <Link href={`/blog/sample-post`} className="hover:text-primary transition-colors">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-2 text-muted-foreground">
                {post.description}
              </p>
              <p className="mt-4">
                <Link href={`/blog/sample-post`} className="text-primary hover:underline">
                  Read more &rarr;
                </Link>
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
