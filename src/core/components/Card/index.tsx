'use client'

import Image from 'next/image'

type CardNoticiaData = {
  categoria: string
  titulo: string
  data?: string
  desc: string
  imagem?: string
  alt?: string
}

type CardProps = {
  noticia: CardNoticiaData
}

export default function Card({ noticia }: CardProps) {
  return (
    <article className="group cursor-pointer flex flex-col bg-white overflow-hidden shadow-sm hover:shadow-md transition-all">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
        {noticia.imagem && (
          <Image
            src={noticia.imagem}
            alt={noticia.alt ?? noticia.titulo}
            fill
            sizes="(max-sm:100vw) (max-lg:50vw) 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            quality={75}
          />
        )}
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="space-y-3 flex-grow">
          <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-lumen-red leading-none">
            {noticia.categoria}
          </span>
          <h3 className="text-xl font-bold leading-tight text-[#111] group-hover:text-lumen-red transition-colors line-clamp-3">
            {noticia.titulo}
          </h3>
          <p className="text-sm leading-relaxed text-neutral-500 line-clamp-3">{noticia.desc}</p>
        </div>

        <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
            {noticia.data || '12 Mai 2024'}
          </span>
        </div>
      </div>
    </article>
  )
}
