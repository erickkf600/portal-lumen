import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#1a1a1a] text-[#a0a0a0] py-8 px-4 md:px-8 border-t border-[#333]">
      <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm font-medium">&copy; {currentYear} Portal Lumen. Todos os direitos reservados.</div>

        <nav>
          <ul className="flex flex-wrap justify-center gap-6 text-sm font-medium">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/noticias" className="hover:text-white transition-colors">
                Notícias
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-white transition-colors">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/contato" className="hover:text-white transition-colors">
                Contato
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}
