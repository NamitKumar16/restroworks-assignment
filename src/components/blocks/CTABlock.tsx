'use client'

import type { FC } from 'react'

type CTABlockProps = {
  block: {
    heading?: string
    subheading?: string
    buttonText?: string
    buttonLink?: string
  }
  locale?: string
}

const withLocalePrefix = (locale: string | undefined, href?: string) => {
  if (!href) return undefined
  if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:'))
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

const CTABlock: FC<CTABlockProps> = ({ block, locale }) => {
  const { heading, subheading, buttonText, buttonLink } = block
  const resolvedLink = withLocalePrefix(locale, buttonLink)

  return (
    <section className="relative overflow-hidden rounded-2xl bg-linear-to-r from-indigo-500 to-violet-500 px-6 py-12 text-white shadow-md sm:px-10">
      <div className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-white/5 opacity-40" />

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        {heading && <h2 className="text-3xl font-semibold sm:text-4xl">{heading}</h2>}
        {subheading && <p className="text-base text-white/90 sm:text-lg">{subheading}</p>}

        {buttonText && resolvedLink && (
          <a
            href={resolvedLink}
            className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-3 text-base font-semibold text-indigo-600 shadow-sm transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:ring-2 hover:ring-indigo-300/60 hover:ring-offset-2 hover:ring-offset-transparent"
          >
            {buttonText}
          </a>
        )}
      </div>
    </section>
  )
}

export default CTABlock
