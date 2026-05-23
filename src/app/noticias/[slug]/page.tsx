import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { apiFetch } from '@/api'
import { NoticiasData } from '@/core/pages/Noticias/noticias.interface'

type NoticiasSlugPageProps = {
  params: Promise<{ slug: string }>
}

const MONTHS = [
  'janeiro',
  'fevereiro',
  'marco',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro',
]

function formatLongDate(date: string) {
  const [year, month, day] = date.split('-').map(Number)

  if (!year || !month || !day || !MONTHS[month - 1]) {
    return date
  }

  return `${day} de ${MONTHS[month - 1]} de ${year}`
}

export default async function NoticiasSlugPage({ params }: NoticiasSlugPageProps) {
  const { slug } = await params
  const newsData = await apiFetch<NoticiasData>('http://mock.api/news?filter=todos&offset=0&limit=100')
  const noticiaAtual = newsData.noticias.find(noticia => noticia.slug === slug)

  if (!noticiaAtual) {
    notFound()
  }

  const related = newsData.noticias.filter(noticia => noticia.slug !== slug).slice(0, 3)

  return (
    <section className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
      <article className="max-w-4xl space-y-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-lumen-red">{noticiaAtual.category}</p>

        <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-neutral-900 md:text-5xl">
          {noticiaAtual.title}
        </h1>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-neutral-500">
          <span className="font-semibold text-neutral-700">Redacao Portal Lumen</span>
          <span>•</span>
          <span>{formatLongDate(noticiaAtual.date)}</span>
          <span>•</span>
          <span>5 min de leitura</span>
        </div>

        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm bg-neutral-100">
          <Image
            src={noticiaAtual.imageUrl}
            alt={noticiaAtual.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 900px"
            priority
          />
        </div>

        <p className="text-lg leading-relaxed text-neutral-700">{noticiaAtual.excerpt}</p>

        <div className="space-y-6 text-[17px] leading-8 text-neutral-800">
          <p>{noticiaAtual.content}</p>

          <h2 className="text-2xl font-bold leading-tight text-neutral-900">Mudancas no caching por padrao</h2>
          <p>
            Uma das mudancas mais relevantes envolve a forma como requisicoes e navegacao funcionam no novo ecossistema
            do App Router. Com comportamentos mais previsiveis, fica mais facil manter performance sem perder
            consistencia da experiencia.
          </p>

          <blockquote className="border-l-4 border-neutral-300 bg-neutral-100 px-6 py-5 text-xl italic leading-relaxed text-neutral-700">
            O Next.js 15 foca nao apenas em novas funcionalidades, mas em dar controle ao desenvolvedor sobre como os
            dados fluem na aplicacao.
          </blockquote>

          <h2 className="text-2xl font-bold leading-tight text-neutral-900">Suporte ao React 19</h2>
          <p>
            Alem dos ganhos em caching, o suporte mais completo ao React 19 habilita novas estrategias de composicao e
            renderizacao que beneficiam tanto projetos pequenos quanto plataformas de larga escala.
          </p>
        </div>

        <div className="flex items-center gap-2 border-t border-neutral-200 pt-4">
          <span className="rounded-full bg-neutral-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-500">
            nextjs
          </span>
          <span className="rounded-full bg-neutral-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-500">
            react
          </span>
          <span className="rounded-full bg-neutral-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-500">
            development
          </span>
        </div>
      </article>

      <aside className="space-y-4 lg:pt-2">
        <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-500">Leia tambem</h2>

        <div className="space-y-3">
          {related.map(item => (
            <Link key={item.slug} href={`/noticias/${item.slug}`} className="group flex gap-3">
              <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-sm bg-neutral-100">
                <Image
                  src={item.imageUrl}
                  alt={item.imageAlt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="96px"
                />
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-lumen-red">{item.category}</p>
                <p className="text-sm font-semibold leading-snug text-neutral-800 transition-colors group-hover:text-lumen-red">
                  {item.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </aside>
    </section>
  )
}
