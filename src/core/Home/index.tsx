import Link from 'next/link'
import Card from '@/app/components/Card'

const PRINCIPAIS_NOTICIAS = [
  {
    categoria: 'Inteligência Artificial',
    titulo: 'Pesquisa da Meta revela avanços em modelos de IA generativa',
    desc: 'Llama 4 promete revolucionar a forma como interagimos com as redes sociais.',
  },
  {
    categoria: 'Hardware',
    titulo: 'Novos processadores prometem 40% mais eficiência energética',
    desc: 'Arquitetura de 2nm chega ao mercado consumidor no próximo semestre.',
  },
  {
    categoria: 'Mercado',
    titulo: 'Startups brasileiras captam recorde de investimentos em Q3',
    desc: 'Setor de fintechs lidera o crescimento no cenário nacional.',
  },
  {
    categoria: 'Data Science',
    titulo: 'O impacto da análise de dados nas decisões governamentais',
    desc: 'Como políticas públicas estão sendo moldadas por algoritmos preditivos.',
  },
]

const WEBSTORIES = [
  {
    titulo: 'iPhone 16: O que esperar do lançamento',
    imagem: '',
  },
  {
    titulo: 'Carros elétricos: Autonomia é o foco',
    imagem: '',
  },
  {
    titulo: 'Metaverso: Realidade ou Ficção?',
    imagem: '',
  },
  {
    titulo: 'Top 10 Frameworks para 2025',
    imagem: '',
  },
  {
    titulo: 'Podcast: A era da atenção',
    imagem: '',
  },
  {
    titulo: 'Carreira: Soft Skills em alta',
    imagem: '',
  },
]

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero e Lateral */}
      <section className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Hero Principal */}
          <div className="md:col-span-8 bg-black text-white p-8 md:p-12 min-h-[350px] flex flex-col justify-end group cursor-pointer relative overflow-hidden">
            <div className="relative z-10 space-y-4">
              <span className="inline-block bg-lumen-red text-white text-[10px] md:text-xs font-bold px-2 py-1 uppercase tracking-wider">
                Tecnologia
              </span>
              <h2 className="text-lg md:text-3xl font-bold leading-tight group-hover:text-lumen-red transition-colors line-clamp-3">
                Next.js 15: O futuro do <br className="hidden md:block" /> desenvolvimento web agora
              </h2>
              <p className="text-[#a0a0a0] text-sm md:text-base max-w-2xl">
                A nova versão traz melhorias significativas em performance e experiência do desenvolvedor com suporte a
                React 19.
              </p>
            </div>
          </div>

          {/* Coluna Lateral */}
          <div className="md:col-span-4 flex flex-col gap-6">
            {/* Card 1 */}
            <Link
              href="/noticias/material-ui-v6"
              className="bg-white p-6 border-l-4 border-lumen-red shadow-sm hover:shadow-md transition-shadow group"
            >
              <span className="text-lumen-red text-[10px] font-bold uppercase tracking-wider mb-2 block">Destaque</span>
              <h3 className="text-xl font-bold text-[#111] mb-2 group-hover:text-lumen-red transition-colors">
                Material UI v6: Design systems escaláveis
              </h3>
              <p className="text-neutral-500 text-sm">
                Descubra as novidades na biblioteca de componentes mais popular do ecossistema React.
              </p>
            </Link>

            {/* Card 2 */}
            <Link
              href="/noticias/acessibilidade-web-2024"
              className="bg-white p-6 shadow-sm hover:shadow-md transition-shadow group"
            >
              <span className="text-lumen-red text-[10px] font-bold uppercase tracking-wider mb-2 block">
                Acessibilidade
              </span>
              <h3 className="text-xl font-bold text-[#111] mb-2 group-hover:text-lumen-red transition-colors">
                Acessibilidade na web: Práticas essenciais para 2024
              </h3>
              <p className="text-neutral-500 text-sm">
                Como garantir que seu produto digital seja inclusivo para todos os usuários.
              </p>
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
          {PRINCIPAIS_NOTICIAS.map(noticia => (
            <Card key={noticia.titulo} noticia={noticia} />
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
          {WEBSTORIES.map(story => (
            <div
              key={story.titulo}
              className="group relative flex aspect-[9/16] min-w-[160px] cursor-pointer flex-col justify-end overflow-hidden rounded-lg bg-black p-4 snap-start md:min-w-0"
            >
              <div className="relative z-10">
                <h4 className="text-xs font-bold leading-tight text-white group-hover:text-lumen-red transition-colors">
                  {story.titulo}
                </h4>
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
            <span className="text-lumen-red text-xs font-bold uppercase tracking-widest">Review da semana</span>
            <h2 className="text-2xl md:text-4xl font-bold text-[#111] leading-tight">
              Review: O que os famosos estão usando para produzir conteúdo
            </h2>
            <p className="text-neutral-500 text-sm md:text-base leading-relaxed max-w-xl">
              Testamos os equipamentos que se tornaram o novo padrão de ouro para criadores de alto nível.
            </p>
            <Link
              href="#"
              className="inline-block self-start bg-[#5c5c5c] text-white px-6 py-3 text-sm font-bold hover:bg-black transition-colors"
            >
              Leia a análise completa
            </Link>
          </div>

          <div className="bg-black w-full" />
        </div>
      </section>
    </div>
  )
}
