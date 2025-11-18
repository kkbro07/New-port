import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

export default function CloudflareOutagePost() {
  return (
    <>
      <p>Earlier today, a widespread outage tied to Cloudflare caused significant disruption across the internet—impacting major platforms and essential online services worldwide.</p>
      
      <h2>What Happened?</h2>
      <blockquote>
        Cloudflare confirmed that it is <strong>“aware of, and investigating an issue which potentially impacts multiple customers: widespread 500 errors, Cloudflare Dashboard and API also failing.”</strong>
      </blockquote>
      <p>Reports indicate that disruptions began around <strong>11:30 UTC (4:00–5:00 PM IST)</strong> on Tuesday. Many users attempting to access platforms such as <strong>X (formerly Twitter)</strong>, <strong>ChatGPT</strong>, and countless websites relying on Cloudflare infrastructure encountered error pages or partial service outages.</p>
      <p>Even outage‑tracking service <strong>Downdetector</strong> was affected, since it also uses Cloudflare’s network.</p>
      
      <h2>Why It Matters</h2>
      <p>Cloudflare is one of the world’s most widely‑used providers for content delivery, web security, and traffic management. Because so many platforms rely on it, a single fault can ripple across the internet. Today’s incident highlights the growing centralisation of global internet infrastructure.</p>
      
      <Alert className="my-8">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Key Takeaway</AlertTitle>
        <AlertDescription>
          A single point of failure in critical internet infrastructure can have a cascading effect, disrupting services for billions of users globally.
        </AlertDescription>
      </Alert>

      <h2>Status & Response</h2>
      <p>According to Cloudflare’s official status updates:</p>
      <ul>
        <li><strong>11:48 UTC:</strong> Cloudflare acknowledged the issue and began investigation.</li>
        <li><strong>~12:21 UTC:</strong> Cloudflare reported signs of recovery but warned of continued elevated error rates.</li>
        <li>Cloudflare has <strong>not yet released a full root‑cause analysis</strong>.</li>
      </ul>
      
      <h2>User Impact</h2>
      <p>Many users encountered “Internal server error on Cloudflare’s network” messages. Features such as feeds, messaging, and APIs were partially disrupted on some platforms. The outage had a global footprint, with significant reports from <strong>India</strong>, Europe, and the United States.</p>
      
      <h2>What to Watch For</h2>
      <ul>
        <li>A detailed post‑mortem explaining the cause — whether a hardware failure, software bug, or network‑level issue.</li>
        <li>Whether recovery is complete or if intermittent issues continue.</li>
        <li>Broader industry discussions on distributed architecture and avoiding single‑provider dependency.</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Today&apos;s Cloudflare outage is a reminder of how critical—and fragile—the modern web’s infrastructure can be. While services are largely recovering, the incident shows how a single point of failure can disrupt major platforms that billions rely on daily. Stay tuned for updates as Cloudflare continues its investigation.</p>
    </>
  );
}
