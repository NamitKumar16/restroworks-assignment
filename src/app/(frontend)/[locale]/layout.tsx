import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Restroworks',
  description:
    'Crafting delightful restaurant experiences with modern technology — powered by Next.js and PayloadCMS.',
  openGraph: {
    title: 'Restroworks',
    description:
      'Modern digital experiences for restaurants. Built using Next.js 14 and PayloadCMS.',
    type: 'website',
    url: 'https://yourdomain.com',
    siteName: 'Restroworks',
  },
  alternates: {
    languages: {
      en: '/en',
      hi: '/hi',
    },
  },
  robots: {
    index: true,
    follow: true,
  },
}

type LocaleLayoutProps = {
  children: React.ReactNode
  params: Promise<{ locale?: string }>
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const resolvedParams = await params
  const locale = resolvedParams?.locale || 'en'

  return (
    <html lang={locale}>
      <head>
        <link
          rel="preload"
          as="image"
          href="http://localhost:3000/api/media/file/photo-1555396273-367ea4eb4db5%20(1).jpg"
          fetchPriority="high"
          type="image/webp"
        />
      </head>
      <body className="flex min-h-screen flex-col bg-linear-to-b from-gray-50 via-white to-gray-100 text-gray-900 antialiased">
        <Header locale={locale} />
        <main className="flex-1 pt-20 sm:pt-24">{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  )
}
