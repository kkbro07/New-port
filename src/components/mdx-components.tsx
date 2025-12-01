
"use client"

import { compile, run } from '@mdx-js/mdx'
import { useMDXComponents as useDefaultMDXComponents } from '@mdx-js/react'
import * as provider from '@mdx-js/react'
import { Fragment, useEffect, useState } from 'react'

const useMDXComponents = (components: any) => {
    const defaultComponents = useDefaultMDXComponents()
    return { ...defaultComponents, ...components }
}

const mdxr = (code:any, components:any) => {
  const scope = {
    ...provider,
    components,
    useMDXComponents,
  }

  const { result } = run(code, scope)
  return result
}


export function MDXContent({ source }: { source: string }) {
    const [mdx, setMdx] = useState<any>()

    useEffect(() => {
        async function run() {
            const file = await compile(source)
            const code = String(file)
            setMdx(code)
        }
        run()
    }, [source])

    if (!mdx) {
        return null
    }
    
    const components = useMDXComponents({})
    const MDX = mdxr(mdx, components)

    return (
        <provider.MDXProvider components={components}>
            <MDX />
        </provider.MDXProvider>
    )
}

