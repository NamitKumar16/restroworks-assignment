'use client'

import Image from 'next/image'
import type { FC } from 'react'

type FeatureBlockProps = {
  block: {
    title?: string
    description?: string
    icon?: {
      url?: string
    }
    linkLabel?: string
    linkUrl?: string
  }
}

const FeatureBlock: FC<FeatureBlockProps> = ({ block }) => {
  const showLink = Boolean(block.linkLabel && block.linkUrl)

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-md transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-lg">
      <div className="absolute inset-0 bg-linear-to-br from-indigo-500/5 via-transparent to-violet-500/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

      <div className="relative z-10 flex flex-col gap-4">
        {block.icon?.url && (
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-500 to-violet-500 p-3 shadow-sm">
            <Image
              src={block.icon.url}
              alt={block.title ?? 'Feature icon'}
              width={56}
              height={56}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        {block.title && <h3 className="text-2xl font-semibold text-gray-900">{block.title}</h3>}

        {block.description && <p className="text-gray-600">{block.description}</p>}

        {showLink && (
          <a
            href={block.linkUrl}
            className="inline-flex w-fit items-center gap-2 rounded-xl bg-linear-to-r from-indigo-500 to-violet-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 ease-in-out hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-2 focus:ring-offset-white"
          >
            {block.linkLabel}
            <span aria-hidden className="text-white/80">
              →
            </span>
          </a>
        )}
      </div>
    </article>
  )
}

export default FeatureBlock
