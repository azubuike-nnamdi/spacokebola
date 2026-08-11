import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'
import React from 'react'

import { cn } from '@/lib/utils'

type Props = {
  data: DefaultTypedEditorState | null | undefined
  className?: string
  /** Remove the default container wrapper */
  disableContainer?: boolean
}

export function RichText({ data, className, disableContainer }: Props) {
  if (!data) return null

  return (
    <LexicalRichText
      data={data}
      disableContainer={disableContainer}
      className={cn(
        'prose prose-neutral max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0',
        className,
      )}
    />
  )
}
