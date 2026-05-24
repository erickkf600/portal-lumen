import { Geist, Geist_Mono } from 'next/font/google'
import { Suspense } from 'react'
import '../../public/styles/icomoon.css'
import './globals.css'
import Header from '@/core/components/Header'
import Footer from '@/core/components/Footer'
import { MswProvider } from '@/providers/MSWProvider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata = {
  title: 'Portal Lumen | Notícias de Verdade',
  description: 'Acompanhe as últimas notícias sobre política, economia, tecnologia e muito mais.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="antialiased bg-[#f5f5f5] min-h-screen flex flex-col" suppressHydrationWarning>
        <MswProvider>
          <Suspense fallback={<div className="h-16 border-b border-neutral-200 bg-[#0a0a0a]" />}>
            <Header />
          </Suspense>
          <main className="flex-grow py-8">
            <div className="container">{children}</div>
          </main>
          <Footer />
        </MswProvider>
      </body>
    </html>
  )
}
