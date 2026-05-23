'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const MAIN_LINKS = [
  { label: 'Home', href: '/home' },
  { label: 'Noticias', href: '/noticias' },
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
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isNoticiasPage = pathname?.startsWith('/noticias')

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-[#0a0a0a] shadow-[0px_4px_20px_rgba(45,52,53,0.04)]">
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* Lado Esquerdo: Mobile Menu Button / Desktop Logo */}
        <div className="flex items-center gap-4">
          <button type="button" className="p-2 text-white md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <i className="icon-menu text-xl" />
          </button>

          <Link
            href="/home"
            className="hidden text-xl font-semibold uppercase tracking-tight text-white md:block lg:text-2xl"
          >
            Portal <span className="text-lumen-red">Lumen</span>
          </Link>
        </div>

        {/* Lado Esquerdo/Centro: Mobile Logo */}
        <Link href="/home" className="text-lg font-semibold uppercase tracking-tight text-white md:hidden">
          Portal <span className="text-lumen-red">Lumen</span>
        </Link>

        {/* Centro: Links de Navegação (Desktop) */}
        <nav className="hidden items-center gap-8 md:flex">
          {MAIN_LINKS.map(link => {
            const active = pathname === link.href

            return (
              <Link
                key={link.label}
                href={link.href}
                className={`flex h-16 items-center text-[11px] font-bold uppercase tracking-wider transition-colors ${
                  active ? 'text-lumen-red' : 'text-white hover:text-lumen-red'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Lado Direito: Search e User */}
        <div className="flex items-center gap-4">
          {/* Search Input (Desktop) */}
          <div className="relative hidden md:block">
            <i className="icon-search absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-sm" />
            <input
              type="text"
              placeholder="Buscar..."
              className="w-[200px] rounded-lg bg-[#333232] py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-lumen-red lg:w-[280px]"
            />
          </div>

          <Link
            href="/meu-perfil"
            aria-label="Perfil"
            className={`cursor-pointer p-2 transition-colors ${
              pathname === '/meu-perfil' ? 'text-lumen-red' : 'text-white hover:text-lumen-red'
            }`}
          >
            <i className="icon-user text-lg md:text-md" />
          </Link>
        </div>
      </div>

      {/* Categorias (Condicional: Desktop e Mobile, apenas em /noticias) */}
      {isNoticiasPage && (
        <nav className="border-t border-neutral-800 bg-[#fff]">
          <div className="container flex items-center justify-center gap-3 overflow-x-auto py-3 no-scrollbar sm:gap-8">
            {CATEGORY_LINKS.map(link => {
              const active = pathname === link.href

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.16em] transition-colors ${
                    active ? 'text-lumen-red' : 'text-neutral-400 hover:text-lumen-red'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>
        </nav>
      )}

      {/* Menu Mobile Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 z-[100] bg-black p-6 md:hidden">
          <div className="flex flex-col gap-8">
            {/* Search Input (Mobile) */}
            <div className="relative">
              <i className="icon-search absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Buscar..."
                className="w-full rounded-lg bg-[#1a1a1a] py-3 pl-12 pr-4 text-white focus:outline-none"
              />
            </div>

            {/* Links Mobile */}
            <nav className="flex flex-col gap-6">
              {MAIN_LINKS.map(link => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-lg font-bold uppercase tracking-wider hover:text-lumen-red ${pathname === link.href ? 'text-lumen-red' : 'text-white'}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
