import CTABlock from '@/components/blocks/CTABlock'
import FeatureBlock from '@/components/blocks/FeatureBlock'
import HeroBlock from '@/components/blocks/HeroBlock'
import TestimonialBlock from '@/components/blocks/TestimonialBlock'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { translations, SupportedLocale, DEFAULT_LOCALE, isSupportedLocale } from '@/lib/i18n'

export async function generateMetadata({ params }: { params: Promise<{ locale?: string }> }) {
  const { locale: localeParam } = await params
  const locale: PayloadLocale = isSupportedLocale(localeParam) ? localeParam : DEFAULT_LOCALE
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home-page' } },
    locale,
    limit: 1,
    depth: 2,
  })

  const page = result?.docs?.[0] ?? null

  const title = page?.seoTitle ?? page?.title ?? 'Restroworks'
  const description =
    page?.seoDescription ?? 'Crafting delightful restaurant experiences with modern technology.'

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'
  const pageUrl = `${baseUrl}/${locale}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: 'Restroworks',
      images: [
        {
          url: `${baseUrl}/og-image.png`, // create an OG image in public/
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale,
      type: 'website',
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        en: `${baseUrl}/en`,
        hi: `${baseUrl}/hi`,
      },
    },
  }
}

export const dynamic = 'force-dynamic'
export const revalidate = 3600

type HeroLayoutBlock = {
  blockType: 'hero'
  heading?: string
  subheading?: string
  backgroundImage?:
    | string
    | {
        url?: string | null
      }
  ctaText?: string
  ctaLink?: string
}

type FeatureLayoutBlock = {
  blockType: 'feature'
  title?: string
  description?: string
  icon?: {
    url?: string
  }
  linkLabel?: string
  linkUrl?: string
}

type TestimonialLayoutBlock = {
  blockType: 'testimonial'
  quote?: string
  authorName?: string
  authorRole?: string
  authorImage?: {
    url?: string
  }
}

type CtaLayoutBlock = {
  blockType: 'cta'
  heading?: string
  subheading?: string
  buttonText?: string
  buttonLink?: string
}

type UnknownLayoutBlock = { blockType?: string }

type PageBlock =
  | HeroLayoutBlock
  | FeatureLayoutBlock
  | TestimonialLayoutBlock
  | CtaLayoutBlock
  | UnknownLayoutBlock

type PageDocument = { layout?: PageBlock[] }

type PayloadLocale = SupportedLocale | 'all'

const fetchHomePage = async (locale: PayloadLocale): Promise<PageDocument | null> => {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'home-page' } },
      locale,
      depth: 2,
    })
    return (result?.docs?.[0] as PageDocument | undefined) ?? null
  } catch (error) {
    console.error(`Error fetching home page for locale "${locale}":`, error)
    return null
  }
}

export default async function HomePage({ params }: { params: Promise<{ locale?: string }> }) {
  const { locale: localeParam } = await params
  const locale: SupportedLocale = isSupportedLocale(localeParam) ? localeParam : DEFAULT_LOCALE
  const page = await fetchHomePage(locale)
  const blocks = page?.layout ?? []
  const t = translations[locale]

  // Group all consecutive feature blocks together
  const groupedBlocks: (PageBlock | FeatureLayoutBlock[])[] = []
  let tempFeatureGroup: FeatureLayoutBlock[] = []

  for (const block of blocks) {
    if (block.blockType === 'feature') {
      tempFeatureGroup.push(block as FeatureLayoutBlock)
    } else {
      if (tempFeatureGroup.length > 0) {
        groupedBlocks.push(tempFeatureGroup)
        tempFeatureGroup = []
      }
      groupedBlocks.push(block)
    }
  }

  if (tempFeatureGroup.length > 0) groupedBlocks.push(tempFeatureGroup)

  const renderBlock = (block: PageBlock | FeatureLayoutBlock[], index: number) => {
    const wrapperClasses =
      'w-full opacity-0 translate-y-10 animate-restroworks-fade-up motion-reduce:translate-y-0 motion-reduce:opacity-100'
    const animationDelay = { animationDelay: `${index * 120}ms` }

    if (Array.isArray(block)) {
      return (
        <section key={`features-${index}`} className="w-full bg-[#f9fafb] py-16">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 px-6 sm:grid-cols-2 xl:grid-cols-3">
            {block.map((feature, i) => (
              <FeatureBlock key={`feature-${index}-${i}`} block={feature} locale={locale} />
            ))}
          </div>
        </section>
      )
    }

    // ✅ Handle single blocks
    switch (block?.blockType) {
      case 'hero':
        return (
          <div key={`hero-${index}`} className={wrapperClasses} style={animationDelay}>
            <HeroBlock block={block as HeroLayoutBlock} locale={locale} />
          </div>
        )
      case 'testimonial':
        return (
          <div key={`testimonial-${index}`} className={wrapperClasses} style={animationDelay}>
            <TestimonialBlock block={block as TestimonialLayoutBlock} />
          </div>
        )
      case 'cta':
        return (
          <div key={`cta-${index}`} className={wrapperClasses} style={animationDelay}>
            <CTABlock block={block as CtaLayoutBlock} locale={locale} />
          </div>
        )
      default:
        return (
          <section
            key={`unsupported-${index}`}
            className="w-full rounded-2xl bg-gray-100/80 p-10 text-center text-gray-700"
          >
            <h2 className="text-xl font-semibold text-gray-900">Unsupported block</h2>
            <p className="mt-2 text-gray-600">
              This block type is not yet handled. Please update the frontend to support it.
            </p>
          </section>
        )
    }
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-20 md:py-24">
      <header className="mb-20 text-center">
        <h1 className="text-4xl font-semibold text-gray-900 md:text-5xl">{t.homepage.title}</h1>
        <p className="mt-4 text-lg text-gray-600 md:text-xl">{t.homepage.subtitle}</p>
      </header>

      <div className="flex flex-col gap-20">
        {groupedBlocks.length > 0 ? (
          groupedBlocks.map((block, index) => renderBlock(block, index))
        ) : (
          <section className="w-full rounded-2xl bg-gray-100/80 p-10 text-center text-gray-700">
            <h2 className="text-xl font-semibold text-gray-900">{t.homepage.noContentTitle}</h2>
            <p className="mt-2 text-gray-600">{t.homepage.noContentMessage}</p>
          </section>
        )}
      </div>
    </main>
  )
}
