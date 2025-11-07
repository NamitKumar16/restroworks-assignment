'use client'

import type { FC } from 'react'

type CTABlockProps = {
  block: {
    heading?: string
    subheading?: string
    buttonText?: string
    buttonLink?: string
  }
}

const CTABlock: FC<CTABlockProps> = ({ block }) => {
  const { heading, subheading, buttonText, buttonLink } = block

  return (
    <section className="relative overflow-hidden rounded-2xl bg-linear-to-r from-indigo-500 to-violet-500 px-6 py-12 text-white shadow-md sm:px-10">
      <div className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-white/5 opacity-40" />

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        {heading && <h2 className="text-3xl font-semibold sm:text-4xl">{heading}</h2>}
        {subheading && <p className="text-base text-white/90 sm:text-lg">{subheading}</p>}

        {buttonText && buttonLink && (
          <a
            href={buttonLink}
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
