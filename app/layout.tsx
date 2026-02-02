
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Atomic Sales Dashboard',
  description: 'Sales dashboard (2022–2024) built with Next.js, Tailwind and Recharts using Atomic Design.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="container py-8">
          {children}
        </main>
      </body>
    </html>
  )
}
