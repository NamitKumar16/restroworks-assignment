import Link from 'next/link'

type FooterProps = {
  locale?: string
}

const Footer = ({ locale = 'en' }: FooterProps) => {
  const currentYear = new Date().getFullYear()
  const sanitizedLocale = locale?.trim() ?? ''
  const localePrefix = sanitizedLocale ? `/${sanitizedLocale}` : ''
  const homeHref = localePrefix || '/'
  const contactHref = `${localePrefix}/contact`

  return (
    <footer className="relative mt-16 bg-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-linear-to-r from-indigo-500 to-violet-500" />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 text-gray-700 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-center sm:text-left">
          <span className="text-xl font-semibold text-gray-900">Restroworks</span>
          <p className="mt-1 text-sm text-gray-500">
            Crafting vibrant digital experiences for modern restaurants.
          </p>
        </div>

        <nav className="flex justify-center gap-6 text-sm font-medium text-gray-600 sm:justify-end">
          <Link
            href={homeHref}
            className="transition-colors duration-200 hover:text-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            Home
          </Link>
          <Link
            href={contactHref}
            className="transition-colors duration-200 hover:text-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            Contact
          </Link>
        </nav>
      </div>

      <div className="border-t border-gray-100 bg-gray-50">
        <p className="mx-auto max-w-6xl px-6 py-4 text-center text-xs text-gray-500 sm:text-left">
          © {currentYear} Restroworks. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
