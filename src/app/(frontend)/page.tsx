import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

const SUPPORTED_LOCALES = ['en', 'hi']
const DEFAULT_LOCALE = 'en'

const detectPreferredLocale = async () => {
  const accepted = (await headers()).get('accept-language') ?? ''
  const parsed = accepted
    .split(',')
    .map((segment) => segment.trim().split(';')[0]?.toLowerCase())
    .filter(Boolean)

  const matched = parsed.find((locale) =>
    SUPPORTED_LOCALES.some((supported) => locale === supported || locale.startsWith(`${supported}-`)),
  )

  return matched ? matched.split('-')[0] : DEFAULT_LOCALE
}

export default async function RootRedirect() {
  const locale = await detectPreferredLocale()
  redirect(`/${locale}`)
}
