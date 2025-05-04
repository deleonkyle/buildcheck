import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Buildcheck',
  description: 'Created with Next.js and Tailwind CSS',
  generator: 'vercel',
  applicationName: 'Buildcheck',
  referrer: 'origin-when-cross-origin',
  keywords: ['Next.js', 'Tailwind CSS', 'Buildcheck'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
