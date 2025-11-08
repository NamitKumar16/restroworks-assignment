import Header from '@/components/Header'
import '../globals.css'
import Footer from '@/components/Footer'

export const metadata = {
  description: 'Restroworks modern frontend experience.',
  title: 'Restroworks',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-100 text-gray-900 antialiased">
        <Header />
        <main className="pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
