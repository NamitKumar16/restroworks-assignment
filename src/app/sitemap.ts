import configPromise from '@payload-config'
import { getPayload } from 'payload'

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    limit: 100,
  })

  const pages = result?.docs ?? []

  // produce entries for each locale
  const locales = ['en', 'hi']
  const urls = pages.flatMap((p: any) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/${p.slug}`,
      lastModified: p?.updatedAt || new Date().toISOString(),
    })),
  )

  return urls
}
