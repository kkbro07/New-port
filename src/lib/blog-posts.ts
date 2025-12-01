import { default as CloudflareOutage } from '@/app/blog/posts/cloudflare-outage';
import { default as SeoBasics } from '@/app/blog/posts/seo-basics';
import { default as DigitalMarketingIntro } from '@/app/blog/posts/digital-marketing-intro';
import { default as VoiceSearchOptimization } from '@/app/blog/posts/voice-search-optimization';

export type PostMetadata = {
  title: string;
  date: string;
  author: string;
  excerpt?: string;
  imageId: string;
};

export type Post = {
  slug: string;
  metadata: PostMetadata;
  component: React.ComponentType;
};

export const posts: Post[] = [
  {
    slug: 'cloudflare-outage',
    metadata: {
      title: "Major Cloudflare Outage Disrupts Key Internet Platforms, Investigation Underway",
      date: "2025-11-18",
      author: "kk",
      excerpt: "Earlier today, a widespread outage tied to Cloudflare caused significant disruption across the internet—impacting major platforms and essential online services worldwide.",
      imageId: "cloudflare-outage-hero",
    },
    component: CloudflareOutage,
  },
  {
    slug: 'seo-basics',
    metadata: {
      title: "SEO Basics: A Beginner's Guide to Ranking Higher",
      date: "2025-11-20",
      author: "kk",
      excerpt: "A foundational guide to Search Engine Optimization, covering the core principles of on-page, off-page, and technical SEO to help you improve your website's visibility.",
      imageId: "seo-basics-hero",
    },
    component: SeoBasics,
  },
  {
    slug: 'digital-marketing-intro',
    metadata: {
      title: "An Introduction to Digital Marketing",
      date: "2025-11-22",
      author: "kk",
      excerpt: "A comprehensive overview of digital marketing, exploring the various channels and strategies that businesses use to connect with customers online.",
      imageId: "digital-marketing-hero",
    },
    component: DigitalMarketingIntro,
  },
  {
    slug: 'voice-search-optimization',
    metadata: {
      title: "Voice Search Optimization in 2025: The New SEO Frontier",
      date: "2025-08-27",
      author: "Kirtan Kalathiya",
      excerpt: "Voice search is rapidly changing how users discover content online. By 2025, over half of all online searches could be voice-driven. Learn how to optimize for this new frontier.",
      imageId: "voice-search-hero",
    },
    component: VoiceSearchOptimization,
  },
];

    