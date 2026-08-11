import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

type LexicalNode = {
  type?: string
  text?: string
  children?: LexicalNode[]
}

/** Convert plain text into a minimal Lexical editor state (for seeds / migrations). */
export function lexicalFromText(text: string): DefaultTypedEditorState {
  const paragraphs = text.split(/\n+/).filter((p) => p.trim().length > 0)
  const children =
    paragraphs.length > 0
      ? paragraphs.map((paragraph) => ({
          type: 'paragraph',
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: paragraph,
              version: 1,
            },
          ],
          direction: 'ltr' as const,
          format: '' as const,
          indent: 0,
          textFormat: 0,
          version: 1,
        }))
      : [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: '',
                version: 1,
              },
            ],
            direction: 'ltr' as const,
            format: '' as const,
            indent: 0,
            textFormat: 0,
            version: 1,
          },
        ]

  return {
    root: {
      type: 'root',
      children,
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  } as DefaultTypedEditorState
}

/** Flatten Lexical JSON to plain text (search / filters). */
export function richTextToPlainText(data: unknown): string {
  if (!data) return ''
  if (typeof data === 'string') return data

  const walk = (node: LexicalNode | undefined): string => {
    if (!node) return ''
    if (typeof node.text === 'string') return node.text
    if (!Array.isArray(node.children)) return ''
    return node.children.map(walk).join(node.type === 'paragraph' ? ' ' : '')
  }

  if (typeof data === 'object' && data !== null && 'root' in data) {
    return walk((data as { root: LexicalNode }).root).replace(/\s+/g, ' ').trim()
  }

  return ''
}
