import { ContactForm } from "./contact-form";

export default function ContactPage() {
  return (
    <div className="fade-in">
      <div className="container mx-auto max-w-3xl px-4 py-32 sm:px-6 lg:px-8">
        <section className="mb-12 text-center">
          <h1 className="font-headline text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl">
            Get in Touch
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Let’s create something special. Have a project in mind or just want to say hello? I'd love to hear from you.
          </p>
        </section>

        <section className="grid grid-cols-1 gap-12">
          <div className="max-w-xl mx-auto w-full">
            <ContactForm />
          </div>
        </section>
      </div>
    </div>
  );
}
