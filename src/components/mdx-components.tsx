import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote'
import Image from 'next/image';

// Custom components
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const components: MDXRemoteProps['components'] = {
  Alert: (props) => <Alert {...props} />,
  AlertTitle: (props) => <AlertTitle {...props} />,
  AlertDescription: (props) => <AlertDescription {...props} />,
  Image: (props: any) => <Image {...props} />,
  // Add other custom components you want to use in MDX here
};

export function MDXContent({ source }: { source: any }) {
    return <MDXRemote {...source} components={components} />
}
