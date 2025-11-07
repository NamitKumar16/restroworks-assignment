import HeroBlock from '@/components/blocks/HeroBlock'
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
}

type TestimonialLayoutBlock = {
  blockType: 'testimonial'
}

type CtaLayoutBlock = {
  blockType: 'cta'
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
        <section key={`${block.blockType}-${index}`} className={`${baseClasses} text-gray-900`}>
          <h2 className="text-xl font-semibold">Feature block</h2>
          <p className="mt-2 text-gray-600">Feature highlights will be showcased here.</p>
        </section>
      )
    case 'testimonial':
      return (
        <section
          key={`${block.blockType}-${index}`}
          className={`${baseClasses} bg-linear-to-r from-indigo-50 to-violet-50 text-gray-900`}
        >
          <h2 className="text-xl font-semibold">Testimonial block</h2>
          <p className="mt-2 text-gray-600">
            Client testimonials will be displayed in this section.
          </p>
        </section>
      )
    case 'cta':
      return (
        <section
          key={`${block.blockType}-${index}`}
          className={`${baseClasses} bg-linear-to-r from-indigo-500 to-violet-500 text-white shadow-md`}
        >
          <h2 className="text-xl font-semibold">CTA block</h2>
          <p className="mt-2 opacity-90">A compelling call-to-action will appear here.</p>
        </section>
      )
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
    <main className="mx-auto mt-12 max-w-4xl px-6 pb-16">
      <header className="text-center">
        <h1 className="text-3xl font-semibold text-gray-900">Welcome to Restroworks</h1>
        <p className="mt-3 text-lg text-gray-600">
          Crafting delightful restaurant experiences with modern technology.
        </p>
      </header>

      <div className="mt-10 grid gap-6">
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
