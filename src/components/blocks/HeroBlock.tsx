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
    const timeout = globalThis.setTimeout(() => setIsVisible(true), 50)
    return () => globalThis.clearTimeout(timeout)
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

  const hasBackground = Boolean(block.backgroundImage?.url)
  const hasCta = block.ctaText && block.ctaLink

  return (
    <section className="relative isolate w-full overflow-hidden">
      <div
        style={backgroundStyles}
        className={`absolute inset-0 h-full w-full ${hasBackground ? '' : 'bg-linear-to-br from-indigo-900 via-indigo-800 to-violet-900'}`}
      />
      <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/60 to-black/80" />

      <div
        className={`relative z-10 mx-auto flex min-h-[90vh] w-full max-w-5xl flex-col items-center justify-center px-6 py-28 text-center text-white transition-all duration-700 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        {block.heading && (
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            {block.heading}
          </h1>
        )}

        {block.subheading && (
          <p className="mt-6 max-w-3xl text-base text-white/85 sm:text-lg md:text-xl">
            {block.subheading}
          </p>
        )}

        {hasCta && (
          <a
            href={block.ctaLink}
            className="mt-10 inline-flex items-center justify-center rounded-xl bg-linear-to-r from-indigo-500 to-violet-500 px-10 py-3 text-base font-semibold text-white shadow-lg transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0_15px_40px_-15px_rgba(139,92,246,0.7)] focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-2 focus:ring-offset-transparent"
          >
            {block.ctaText}
          </a>
        )}
      </div>
    </section>
  )
}

export default HeroBlock
