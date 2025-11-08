import '../app/globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-100 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  )
}
