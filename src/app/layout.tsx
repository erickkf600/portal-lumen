import { Geist, Geist_Mono } from 'next/font/google'
import '../../public/styles/icomoon.css'
import './globals.css'
import { MSWProvider } from '@/components/MSWProvider'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'

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
        <MSWProvider>
          <Header />
          <main className="flex-grow py-8">
            <div className="container">{children}</div>
          </main>
          <Footer />
        </MSWProvider>
      </body>
    </html>
  )
}
