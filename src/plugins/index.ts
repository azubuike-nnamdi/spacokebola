import { seoPlugin } from '@payloadcms/plugin-seo'
import { Plugin } from 'payload'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'

import { getServerSideURL } from '@/utilities/getURL'

const generateTitle: GenerateTitle = ({ doc }) => {
  return doc?.title ? `${doc.title} | Oke Bola Archdeaconry` : 'Oke Bola Archdeaconry'
}

const generateURL: GenerateURL = ({ doc }) => {
  const url = getServerSideURL()
  return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  seoPlugin({
    generateTitle,
    generateURL,
  }),
]
