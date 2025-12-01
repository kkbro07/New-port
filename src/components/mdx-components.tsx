'use client';
import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote';
import Image from 'next/image';

// Custom components
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const components = {
  Alert: (props: any) => <Alert {...props} />,
  AlertTitle: (props: any) => <AlertTitle {...props} />,
  AlertDescription: (props: any) => <AlertDescription {...props} />,
  Image: (props: any) => <Image {...props} />,
  // Add other custom components you want to use in MDX here
};

export function MDXContent({ source }: { source: MDXRemoteProps }) {
    return <MDXRemote {...source} components={components} />
}
