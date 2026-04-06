import Image from 'next/image'

type CardNoticiaData = {
  categoria: string
  titulo: string
  data: string
  desc: string
  imagem: string
  alt?: string
}

type CardProps = {
  noticia: CardNoticiaData
}

export default function Card({ noticia }: CardProps) {
  return (
    <article className="w-full max-w-[557px] overflow-hidden rounded-[14px] bg-white shadow-[0px_4px_16px_rgba(45,52,53,0.12)]">
      <Image
        src={noticia.imagem}
        alt={noticia.alt ?? noticia.titulo}
        width={557}
        height={300}
        className="h-[300px] w-full object-cover object-top"
      />

      <div className="space-y-3 px-5 py-5 sm:px-6">
        <p className="text-sm font-semibold text-lumen-red">{noticia.categoria}</p>
        <h2 className="text-[2rem] font-semibold leading-tight text-[#111827]">{noticia.titulo}</h2>
        <p className="text-xs font-semibold text-[#9aa1a8]">{noticia.data}</p>
        <p className="text-[0.93rem] leading-relaxed text-[#5c6771]">{noticia.desc}</p>
      </div>
    </article>
  )
}
