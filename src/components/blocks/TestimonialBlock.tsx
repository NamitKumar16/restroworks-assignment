'use client'

import Image from 'next/image'
import type { FC } from 'react'

type TestimonialBlockProps = {
  block: {
    quote?: string
    authorName?: string
    authorRole?: string
    authorImage?: {
      url?: string
    }
  }
}

const TestimonialBlock: FC<TestimonialBlockProps> = ({ block }) => {
  const { quote, authorName, authorRole, authorImage } = block

  return (
    <section className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-md">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-linear-to-r from-indigo-500 to-violet-500" />

      <div className="relative flex flex-col items-center gap-6">
        {quote && (
          <blockquote className="text-xl italic text-gray-900 sm:text-2xl">“{quote}”</blockquote>
        )}

        <div className="flex flex-col items-center gap-4">
          {authorImage?.url && (
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-indigo-100 bg-indigo-50">
              <Image
                src={authorImage.url}
                alt={authorName ?? 'Author portrait'}
                width={64}
                height={64}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          {(authorName || authorRole) && (
            <div className="flex flex-col items-center">
              {authorName && (
                <span className="text-lg font-semibold text-gray-900">{authorName}</span>
              )}
              {authorRole && <span className="text-sm text-gray-500">{authorRole}</span>}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default TestimonialBlock
