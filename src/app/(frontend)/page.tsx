import CTABlock from '@/components/blocks/CTABlock'
import FeatureBlock from '@/components/blocks/FeatureBlock'
import HeroBlock from '@/components/blocks/HeroBlock'
import TestimonialBlock from '@/components/blocks/TestimonialBlock'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

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

const fetchHomePage = async (): Promise<PageDocument | null> => {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = (await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'home',
        },
      },
    })) as { docs?: PageDocument[] }

    return result?.docs?.[0] ?? null
  } catch (error) {
    console.error('Error fetching home page data:', error)
    return null
  }
}

const renderBlock = (block: PageBlock, index: number) => {
  const key = `${block?.blockType ?? 'unknown'}-${index}`
  const wrapperClasses =
    'w-full opacity-0 translate-y-10 animate-restroworks-fade-up motion-reduce:translate-y-0 motion-reduce:opacity-100'
  const animationDelay = { animationDelay: `${index * 120}ms` }

  let content: JSX.Element

  switch (block?.blockType) {
    case 'hero':
      content = <HeroBlock block={block as HeroLayoutBlock} />
      break
    case 'feature':
      content = <FeatureBlock block={block as FeatureLayoutBlock} />
      break
    case 'testimonial':
      content = <TestimonialBlock block={block as TestimonialLayoutBlock} />
      break
    case 'cta':
      content = <CTABlock block={block as CtaLayoutBlock} />
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

export default async function HomePage() {
  const page = await fetchHomePage()
  const blocks = page?.layout ?? []

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-20 md:py-24">
      <header className="mb-20 text-center">
        <h1 className="text-4xl font-semibold text-gray-900 md:text-5xl">Welcome to Restroworks</h1>
        <p className="mt-4 text-lg text-gray-600 md:text-xl">
          Crafting delightful restaurant experiences with modern technology.
        </p>
      </header>

      <div className="flex flex-col gap-20">
        {blocks.length > 0 ? (
          blocks.map((block, index) => renderBlock(block, index))
        ) : (
          <section className="w-full rounded-2xl bg-gray-100/80 p-10 text-center text-gray-700">
            <h2 className="text-xl font-semibold text-gray-900">No content yet</h2>
            <p className="mt-2 text-gray-600">
              Publish blocks for the home page in the Payload admin panel to see them here.
            </p>
          </section>
        )}
      </div>
    </main>
  )
}
