import '../globals.css'

export const metadata = {
  description: 'Restroworks modern frontend experience.',
  title: 'Restroworks',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
