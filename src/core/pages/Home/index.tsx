import Link from 'next/link'
import Image from 'next/image'
import Card from '@/core/components/Card'
import { HomeData } from './home.interface'

interface HomeProps {
  data: HomeData
}

export default function Home({ data }: HomeProps) {
  const primeiroDestaque = data?.destaques[0]
  const segundaDestaque = data?.destaques[1]
  const terceiraDestaque = data?.destaques[2]

  return (
    <div className="space-y-16">
      {/* Hero e Lateral */}
      <section className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Hero Principal */}
          <div className="md:col-span-8 relative min-h-[350px] flex flex-col justify-end group cursor-pointer overflow-hidden">
            <div className="absolute inset-0 bg-black/60 z-10" />
            <Image
              src={primeiroDestaque.imageUrl}
              alt={primeiroDestaque.imageAlt || primeiroDestaque.title}
              fill
              sizes="(max-md:100vw) 66vw"
              className="object-cover z-0"
              priority
            />
            <div className="relative z-20 text-white p-8 md:p-12 space-y-4">
              <span className="inline-block bg-lumen-red text-white text-[10px] md:text-xs font-bold px-2 py-1 uppercase tracking-wider">
                {primeiroDestaque.category}
              </span>
              <h2 className="text-lg md:text-3xl font-bold leading-tight group-hover:text-lumen-red transition-colors line-clamp-3">
                {primeiroDestaque.title}
              </h2>
              <p className="text-[#a0a0a0] text-sm md:text-base max-w-2xl">{primeiroDestaque.excerpt}</p>
            </div>
          </div>

          {/* Coluna Lateral */}
          <div className="md:col-span-4 flex flex-col gap-6">
            {/* Card 1 */}
            <Link
              href={`/noticias/${segundaDestaque.slug}`}
              className="bg-white p-6 border-l-4 border-lumen-red shadow-sm hover:shadow-md transition-shadow group"
            >
              <span className="text-lumen-red text-[10px] font-bold uppercase tracking-wider mb-2 block">Destaque</span>
              <h3 className="text-xl font-bold text-[#111] mb-2 group-hover:text-lumen-red transition-colors">
                {segundaDestaque.title}
              </h3>
              <p className="text-neutral-500 text-sm">{segundaDestaque.excerpt}</p>
            </Link>

            {/* Card 2 */}
            <Link
              href={`/noticias/${terceiraDestaque.slug}`}
              className="bg-white p-6 shadow-sm hover:shadow-md transition-shadow group"
            >
              <span className="text-lumen-red text-[10px] font-bold uppercase tracking-wider mb-2 block">
                {terceiraDestaque.category}
              </span>
              <h3 className="text-xl font-bold text-[#111] mb-2 group-hover:text-lumen-red transition-colors">
                {terceiraDestaque.title}
              </h3>
              <p className="text-neutral-500 text-sm">{terceiraDestaque.excerpt}</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Principais Notícias */}
      <section>
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-2xl font-bold text-[#111] whitespace-nowrap uppercase tracking-tight font-inter">
            Principais Notícias
          </h2>
          <div className="h-[2px] bg-neutral-200 w-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {data.principais.map(noticia => (
            <Card
              key={noticia.slug}
              noticia={{
                categoria: noticia.category || '',
                titulo: noticia.title,
                desc: noticia.excerpt || '',
                imagem: noticia.imageUrl,
                alt: noticia.imageAlt,
              }}
            />
          ))}
        </div>
      </section>

      {/* WEBSTORIES */}
      <section>
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-2xl font-bold text-[#111] whitespace-nowrap uppercase tracking-tight font-inter">
            Webstories
          </h2>
          <div className="h-[2px] bg-neutral-200 w-full" />
        </div>

        <div
          className="no-scrollbar -mx-4 flex snap-x snap-mandatory overflow-x-auto gap-4 pb-4 px-4 scroll-smooth md:mx-0 md:grid md:grid-cols-6 md:px-0 lg:gap-6"
          style={{ scrollPaddingLeft: '1rem', scrollPaddingRight: '1rem' }}
        >
          {data.webstories.map(story => (
            <div
              key={story.slug}
              className="group relative flex aspect-[9/16] min-w-[160px] cursor-pointer flex-col justify-end overflow-hidden rounded-lg bg-black p-4 snap-start md:min-w-0"
            >
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition-colors z-10" />
              <Image
                src={story.imageUrl}
                alt={story.imageAlt || story.title}
                fill
                sizes="160px"
                className="object-cover z-0"
              />
              <div className="relative z-20">
                <h4 className="text-xs font-bold leading-tight text-white">{story.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* REVIEW DA SEMANA */}
      <section className="pb-16">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-2xl font-bold text-[#111] whitespace-nowrap uppercase tracking-tight font-inter">
            Review da Semana
          </h2>
          <div className="h-[2px] bg-neutral-200 w-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 bg-white shadow-sm overflow-hidden">
          <div className="p-8 md:p-12 space-y-6 flex flex-col justify-center">
            <span className="text-lumen-red text-xs font-bold uppercase tracking-widest">
              {data.reviewSemana.category}
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-[#111] leading-tight">{data.reviewSemana.title}</h2>
            <p className="text-neutral-500 text-sm md:text-base leading-relaxed max-w-xl">
              {data.reviewSemana.excerpt}
            </p>
            <Link
              href={`/noticias/${data.reviewSemana.slug}`}
              className="inline-block self-start bg-[#5c5c5c] text-white px-6 py-3 text-sm font-bold hover:bg-black transition-colors"
            >
              Leia a análise completa
            </Link>
          </div>

          <div className="relative bg-black w-full min-h-[300px]">
            <Image
              src={data.reviewSemana.imageUrl}
              alt={data.reviewSemana.imageAlt || data.reviewSemana.title}
              fill
              sizes="(max-md:100vw) 50vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>
    </div>
  )
}
