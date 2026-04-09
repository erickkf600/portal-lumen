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
    <article className="group cursor-pointer flex flex-col gap-4">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
        {noticia.imagem && (
          <Image
            src={noticia.imagem}
            alt={noticia.alt ?? noticia.titulo}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-0" // Opacidade 0 para simular apenas fundo preto conforme pedido
          />
        )}
      </div>

      <div className="space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-lumen-red">{noticia.categoria}</span>
        <h3 className="text-lg font-bold leading-tight text-[#111] group-hover:text-lumen-red transition-colors line-clamp-2">
          {noticia.titulo}
        </h3>
        {noticia.data && <p className="text-[10px] font-medium text-neutral-400 uppercase">{noticia.data}</p>}
        <p className="text-sm leading-relaxed text-neutral-500 line-clamp-3">{noticia.desc}</p>
      </div>
    </article>
  )
}
