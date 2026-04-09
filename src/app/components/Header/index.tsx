'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const MAIN_LINKS = [
  { label: 'Home', href: '/home' },
  { label: 'Noticias', href: '/noticias/next-js-15-lancamento' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contato', href: '/contatos' },
]

const CATEGORY_LINKS = [
  { label: 'Mercado', href: '/noticias/mercado-aneel-enel' },
  { label: 'Tecnologia', href: '/noticias/next-js-15-lancamento' },
  { label: 'Politica', href: '/noticias/politica-reforma-tributaria' },
  { label: 'Esportes', href: '/noticias/copa-fifa-transferencia-jogos' },
  { label: 'Cultura', href: '/noticias/oscar-dicaprio-vittoria-ceretti' },
  { label: 'Agro', href: '/noticias/soja-safra-recorde' },
]

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-[#0a0a0a] shadow-[0px_4px_20px_rgba(45,52,53,0.04)]">
      <div className="container flex h-16 items-center justify-between gap-[50px]">
        <Link href="/home" className="text-lg font-semibold uppercase tracking-tight text-white sm:text-xl">
          Portal <span className="text-lumen-red">Notícias</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex mr-auto">
          {MAIN_LINKS.map(link => {
            const active = pathname?.startsWith(link.href)

            return (
              <Link
                key={link.label}
                href={link.href}
                className={`flex h-16 items-center border-b-2 text-xs font-bold uppercase tracking-wide transition-colors font-semibold ${
                  active
                    ? 'border-lumen-red text-lumen-red'
                    : 'border-transparent text-white hover:border-lumen-red/70 hover:text-lumen-red'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Buscar"
            className="rounded-md p-2 text-white transition-colors hover:text-lumen-red cursor-pointer"
          >
            <i className="icon-search text-md" />
          </button>
          <button
            type="button"
            aria-label="Perfil"
            className="rounded-md p-2 text-white transition-colors hover:text-lumen-red cursor-pointer"
          >
            <i className="icon-user text-lg" />
          </button>
        </div>
      </div>

      <nav className="border-t border-neutral-100 bg-neutral-50">
        <div className="container flex items-center justify-center gap-3 overflow-x-auto py-3 sm:gap-8">
          {CATEGORY_LINKS.map(link => {
            const active = pathname === link.href

            return (
              <Link
                key={link.label}
                href={link.href}
                className={`whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.16em] transition-colors ${
                  active ? 'text-lumen-red' : 'text-neutral-600 hover:text-lumen-red'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
      </nav>
    </header>
  )
}
