'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-transparent backdrop-blur-none'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo / Brand */}
        <Link href="/" className="text-xl font-semibold text-indigo-600">
          Restroworks
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className={`transition-all duration-200 ${
              pathname === '/'
                ? 'text-indigo-600 font-semibold'
                : 'text-gray-700 hover:text-indigo-600'
            }`}
          >
            Home
          </Link>

          <Link
            href="/contact"
            className={`rounded-xl px-4 py-2 text-sm font-semibold shadow-sm transition-all duration-200 ${
              pathname === '/contact'
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
