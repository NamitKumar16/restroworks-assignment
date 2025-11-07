'use client'

import type { CSSProperties, FC } from 'react'
import { useEffect, useMemo, useState } from 'react'

type HeroBlockProps = {
  block: {
    heading?: string
    subheading?: string
    backgroundImage?: {
      url?: string
    }
    ctaText?: string
    ctaLink?: string
  }
}

const HeroBlock: FC<HeroBlockProps> = ({ block }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsVisible(true), 50)
    return () => window.clearTimeout(timeout)
  }, [])

  const backgroundStyles = useMemo<CSSProperties | undefined>(() => {
    const url = block.backgroundImage?.url
    if (!url) return undefined

    return {
      backgroundImage: `url(${url})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }
  }, [block.backgroundImage?.url])

  const hasCta = block.ctaText && block.ctaLink

  return (
    <section className="relative isolate w-full overflow-hidden rounded-2xl shadow-md">
      <div
        style={backgroundStyles}
        className="relative flex min-h-[60vh] items-center justify-center bg-linear-to-br from-indigo-900/60 via-indigo-800/60 to-violet-900/70"
      >
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/50 to-black/70" />

        <div
          className={`relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 py-24 text-center text-white transition-all duration-700 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          {block.heading && (
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              {block.heading}
            </h1>
          )}

          {block.subheading && (
            <p className="max-w-2xl text-base text-gray-100/90 sm:text-lg">{block.subheading}</p>
          )}

          {hasCta && (
            <a
              href={block.ctaLink}
              className="inline-flex rounded-xl bg-linear-to-r from-indigo-500 to-violet-500 px-8 py-3 text-base font-semibold text-white shadow-md transition-all duration-200 ease-in-out hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-2 focus:ring-offset-transparent"
            >
              {block.ctaText}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}

export default HeroBlock
