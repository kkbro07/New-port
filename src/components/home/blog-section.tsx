
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const posts = [
    {
        slug: 'sample-post',
        title: 'Quick start with Magic Portfolio',
        author: 'Kirtan Kalathiya',
        date: 'April 23, 2025',
        category: 'Magic Portfolio',
        avatarId: 'kirtan-avatar',
    },
    {
        slug: 'the-perfect-tech-stack-for-modern-web-apps',
        title: 'Enable or disable pages for your portfolio',
        author: 'Kirtan Kalathiya',
        date: 'April 22, 2025',
        category: 'Magic Portfolio',
        avatarId: 'kirtan-avatar',
    },
];

export function BlogSection() {
    const kirtanAvatar = PlaceHolderImages.find(img => img.id === 'kirtan-avatar');

    return (
        <section className="py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
                    <div className="md:col-span-1">
                        <h2 className="font-headline text-3xl sm:text-4xl font-bold tracking-tighter">
                            Latest from the blog
                        </h2>
                    </div>
                    <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {posts.map((post) => (
                            <article key={post.slug} className="group flex flex-col space-y-4 rounded-lg bg-secondary/50 p-6 transition-colors hover:bg-secondary">
                                <div className="flex items-center gap-3">
                                    {kirtanAvatar && (
                                        <Image
                                            src={kirtanAvatar.imageUrl}
                                            alt={post.author}
                                            width={40}
                                            height={40}
                                            className="rounded-full"
                                            data-ai-hint={kirtanAvatar.imageHint}
                                        />
                                    )}
                                    <div>
                                        <p className="text-sm font-medium">{post.author}</p>
                                        <p className="text-xs text-muted-foreground">{post.date}</p>
                                    </div>
                                </div>
                                <div className="flex-grow">
                                    <h3 className="font-headline text-xl font-bold mb-2">
                                        <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                                            {post.title}
                                        </Link>
                                    </h3>
                                    <p className="text-sm text-muted-foreground">{post.category}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
