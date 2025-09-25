export default function SamplePostPage() {
    return (
        <article className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 max-w-3xl">
            <header className="mb-8">
                <h1 className="font-headline text-5xl font-bold tracking-tighter">My First Blog Post</h1>
                <p className="mt-2 text-lg text-muted-foreground">A journey into MDX.</p>
            </header>
            <div className="prose prose-invert lg:prose-xl mx-auto">
                <p>
                    This is the content of my first blog post. I'm using a regular React component for this page right now.
                </p>
                <p>
                    Soon, I'll be able to write posts in MDX, which will allow me to mix Markdown with React components. This will make it much easier to write and format my blog posts.
                </p>
                <p>
                    For example, I could have code blocks:
                </p>
                <pre><code>{`
const greeting = "Hello, World!";
console.log(greeting);
                `}</code></pre>
                <p>
                    Or even embed custom components directly into my content. Stay tuned for more updates!
                </p>
            </div>
        </article>
    );
}
