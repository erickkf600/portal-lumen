import { Geist, Geist_Mono } from 'next/font/google'
import '../../public/styles/icomoon.css'
import './globals.css'
import { MSWProvider } from '@/components/MSWProvider'

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
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased bg-slate-950 text-slate-100 min-h-screen">
        <MSWProvider>{children}</MSWProvider>
      </body>
    </html>
  )
}
