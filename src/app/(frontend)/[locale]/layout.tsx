import Footer from '@/components/Footer'
import Header from '@/components/Header'

type LocaleLayoutProps = {
  children: React.ReactNode
  params: Promise<{ locale?: string }>
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale = 'en' } = await params

  return (
    <div className="flex min-h-screen flex-col">
      <Header locale={locale} />
      <main className="flex-1 pt-20 sm:pt-24">{children}</main>
      <Footer locale={locale} />
    </div>
  )
}
