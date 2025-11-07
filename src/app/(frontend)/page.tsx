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
  const baseClasses =
    'rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-200 ease-in-out'

  switch (block?.blockType) {
    case 'hero':
      return <HeroBlock key={`${block.blockType}-${index}`} block={block as HeroLayoutBlock} />
    case 'feature':
      return (
        <FeatureBlock key={`${block.blockType}-${index}`} block={block as FeatureLayoutBlock} />
      )
    case 'testimonial':
      return (
        <TestimonialBlock
          key={`${block.blockType}-${index}`}
          block={block as TestimonialLayoutBlock}
        />
      )
    case 'cta':
      return <CTABlock key={`${block.blockType}-${index}`} block={block as CtaLayoutBlock} />
    default:
      return (
        <section key={`unknown-${index}`} className={`${baseClasses} text-gray-900`}>
          <h2 className="text-xl font-semibold">Unsupported block</h2>
          <p className="mt-2 text-gray-600">This block type is not yet handled.</p>
        </section>
      )
  }
}

export default async function HomePage() {
  const page = await fetchHomePage()
  const blocks = page?.layout ?? []

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
      <header className="mb-16 text-center">
        <h1 className="text-4xl font-semibold text-gray-900 md:text-5xl">Welcome to Restroworks</h1>
        <p className="mt-4 text-lg text-gray-600 md:text-xl">
          Crafting delightful restaurant experiences with modern technology.
        </p>
      </header>

      <div className="flex flex-col gap-16 md:gap-24">
        {blocks.length > 0 ? (
          blocks.map((block, index) => renderBlock(block, index))
        ) : (
          <section className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-700 shadow-sm">
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
