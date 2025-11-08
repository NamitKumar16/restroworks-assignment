'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

type HeaderProps = {
  locale?: string
}

const Header = ({ locale = 'en' }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(globalThis.scrollY > 10)
    globalThis.addEventListener('scroll', handleScroll)
    return () => globalThis.removeEventListener('scroll', handleScroll)
  }, [])

  const { homeHref, contactHref, isHomeActive, isContactActive } = useMemo(() => {
    const sanitizedLocale = locale?.trim() ?? ''
    const localePrefix = sanitizedLocale ? `/${sanitizedLocale}` : ''
    const home = localePrefix || '/'
    const contact = `${localePrefix}/contact`

    const normalize = (path: string) => path.replace(/\/+$/, '')
    const current = normalize(pathname ?? '')
    const homeNormalized = normalize(home)
    const contactNormalized = normalize(contact)

    return {
      homeHref: home,
      contactHref: contact,
      isHomeActive: current === homeNormalized,
      isContactActive: current === contactNormalized,
    }
  }, [locale, pathname])

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-transparent backdrop-blur-none'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href={homeHref} className="text-xl font-semibold text-indigo-600">
          Restroworks
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href={homeHref}
            className={`transition-all duration-200 ${
              isHomeActive ? 'text-indigo-600 font-semibold' : 'text-gray-700 hover:text-indigo-600'
            }`}
          >
            Home
          </Link>

          <Link
            href={contactHref}
            className={`rounded-xl px-4 py-2 text-sm font-semibold shadow-sm transition-all duration-200 ${
              isContactActive
                ? 'bg-linear-to-r from-indigo-600 to-violet-600 text-white'
                : 'bg-linear-to-r from-indigo-500 to-violet-500 text-white hover:opacity-90'
            }`}
          >
            Contact
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Header
