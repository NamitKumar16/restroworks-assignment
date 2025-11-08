'use client'

import Image from 'next/image'
import type { CSSProperties, FC } from 'react'
import { useEffect, useMemo, useState } from 'react'

type HeroBlockProps = {
  block: {
    heading?: string
    subheading?: string
    backgroundImage?: {
      url?: string | null
    } | string | null
    ctaText?: string
    ctaLink?: string
  }
  locale?: string
}

const withLocalePrefix = (locale: string | undefined, href?: string) => {
  if (!href) return undefined
  if (
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:')
  )
    return href

  const normalized = href.startsWith('/') ? href : `/${href}`
  if (!locale) return normalized

  const sanitizedLocale = locale.trim()
  if (!sanitizedLocale) return normalized
  if (normalized === `/${sanitizedLocale}` || normalized.startsWith(`/${sanitizedLocale}/`)) {
    return normalized
  }

  return `/${sanitizedLocale}${normalized}`
}

const resolveMediaUrl = (media: HeroBlockProps['block']['backgroundImage']): string | undefined => {
  if (!media) return undefined

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? ''

  if (typeof media === 'string') {
    if (media.startsWith('http://') || media.startsWith('https://')) return media
    if (media.startsWith('/')) return `${baseUrl}${media}`
    return `${baseUrl}/media/${media}`
  }

  if (media.url) {
    if (media.url.startsWith('http://') || media.url.startsWith('https://')) return media.url
    if (media.url.startsWith('/')) return `${baseUrl}${media.url}`
    return `${baseUrl}/${media.url}`
  }

  return undefined
}

const HeroBlock: FC<HeroBlockProps> = ({ block, locale }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timeout = globalThis.setTimeout(() => setIsVisible(true), 50)
    return () => globalThis.clearTimeout(timeout)
  }, [])

  const backgroundUrl = useMemo(() => {
    const resolved = resolveMediaUrl(block.backgroundImage)
    return resolved ? encodeURI(resolved) : undefined
  }, [block.backgroundImage])

  const backgroundStyles = useMemo<CSSProperties | undefined>(() => {
    if (!backgroundUrl) return undefined
    return {
      backgroundImage: `url("${backgroundUrl}")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }
  }, [backgroundUrl])

  const hasBackground = Boolean(backgroundUrl)
  const resolvedCtaLink = withLocalePrefix(locale, block.ctaLink)
  const hasCta = Boolean(block.ctaText && resolvedCtaLink)

  return (
    <section className="relative isolate w-full overflow-hidden">
      {backgroundUrl && (
        <Image
          src={backgroundUrl}
          alt={block.heading ?? 'Hero background'}
          width={1600}
          height={900}
          priority
          sizes="(max-width: 768px) 100vw, 1600px"
          className="sr-only"
        />
      )}
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

        {hasCta && resolvedCtaLink && (
          <a
            href={resolvedCtaLink}
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
