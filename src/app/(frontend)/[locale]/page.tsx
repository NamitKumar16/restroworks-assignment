import CTABlock from '@/components/blocks/CTABlock'
import FeatureBlock from '@/components/blocks/FeatureBlock'
import HeroBlock from '@/components/blocks/HeroBlock'
import TestimonialBlock from '@/components/blocks/TestimonialBlock'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { translations, SupportedLocale, DEFAULT_LOCALE, isSupportedLocale } from '@/lib/i18n'

export const dynamic = 'force-dynamic'

type HeroLayoutBlock = {
  blockType: 'hero'
  heading?: string
  subheading?: string
  backgroundImage?: {
    url?: string
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

type UnknownLayoutBlock = {
  blockType?: string
}

type PageBlock =
  | HeroLayoutBlock
  | FeatureLayoutBlock
  | TestimonialLayoutBlock
  | CtaLayoutBlock
  | UnknownLayoutBlock

type PageDocument = {
  layout?: PageBlock[]
}

type PayloadLocale = SupportedLocale | 'all'

const fetchHomePage = async (locale: PayloadLocale): Promise<PageDocument | null> => {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'home' } },
      locale,
    })

    return (result?.docs?.[0] as PageDocument | undefined) ?? null
  } catch (error) {
    console.error(`Error fetching home page for locale "${locale}":`, error)
    return null
  }
}

const renderBlock = (block: PageBlock, index: number, locale: SupportedLocale) => {
  const key = `${block?.blockType ?? 'unknown'}-${index}`
  const wrapperClasses =
    'w-full opacity-0 translate-y-10 animate-restroworks-fade-up motion-reduce:translate-y-0 motion-reduce:opacity-100'
  const animationDelay = { animationDelay: `${index * 120}ms` }

  let content: React.ReactNode

  switch (block?.blockType) {
    case 'hero':
      content = <HeroBlock block={block as HeroLayoutBlock} locale={locale} />
      break
    case 'feature':
      content = <FeatureBlock block={block as FeatureLayoutBlock} locale={locale} />
      break
    case 'testimonial':
      content = <TestimonialBlock block={block as TestimonialLayoutBlock} />
      break
    case 'cta':
      content = <CTABlock block={block as CtaLayoutBlock} locale={locale} />
      break
    default:
      content = (
        <section className="w-full rounded-2xl bg-gray-100/80 p-10 text-center text-gray-700">
          <h2 className="text-xl font-semibold text-gray-900">Unsupported block</h2>
          <p className="mt-2 text-gray-600">
            This block type is not yet handled. Please update the frontend to support it.
          </p>
        </section>
      )
      break
  }

  return (
    <div key={key} className={wrapperClasses} style={animationDelay}>
      {content}
    </div>
  )
}

export default async function HomePage({ params }: { params: { locale?: string } }) {
  const localeParam = params?.locale
  const locale: SupportedLocale = isSupportedLocale(localeParam) ? localeParam : DEFAULT_LOCALE
  const page = await fetchHomePage(locale)
  const blocks = page?.layout ?? []
  const t = translations[locale]

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-20 md:py-24">
      <header className="mb-20 text-center">
        <h1 className="text-4xl font-semibold text-gray-900 md:text-5xl">{t.homepage.title}</h1>
        <p className="mt-4 text-lg text-gray-600 md:text-xl">{t.homepage.subtitle}</p>
      </header>

      <div className="flex flex-col gap-20">
        {blocks.length > 0 ? (
          blocks.map((block, index) => renderBlock(block, index, locale))
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
