'use client'

import { useState } from 'react'
import { FaqData } from './faq.interface'

interface FaqProps {
  data: FaqData
}

export default function Faq({ data }: FaqProps) {
  const [activeId, setActiveId] = useState<string | null>(data.itens[0]?.id ?? null)

  function handleToggle(id: string) {
    setActiveId(current => (current === id ? null : id))
  }

  return (
    <section className="space-y-8 pb-16">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold text-[#111] whitespace-nowrap uppercase tracking-tight">{data.titulo}</h1>
        <div className="h-[2px] bg-neutral-200 w-full" />
      </div>

      <p className="max-w-3xl text-sm leading-relaxed text-neutral-500 md:text-base">{data.descricao}</p>

      <div className="space-y-3">
        {data.itens.map(item => {
          const isOpen = activeId === item.id

          return (
            <article key={item.id} className="overflow-hidden border border-neutral-200 bg-white shadow-sm">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-neutral-50"
                onClick={() => handleToggle(item.id)}
                aria-expanded={isOpen}
                aria-controls={`faq-content-${item.id}`}
              >
                <span className="text-sm font-bold leading-snug text-neutral-900 md:text-base">{item.pergunta}</span>
                <span className="text-xl font-light leading-none text-lumen-red">{isOpen ? '-' : '+'}</span>
              </button>

              {isOpen ? (
                <div
                  id={`faq-content-${item.id}`}
                  className="border-t border-neutral-100 px-5 py-4 text-sm leading-relaxed text-neutral-600 md:text-base"
                >
                  {item.resposta}
                </div>
              ) : null}
            </article>
          )
        })}
      </div>
    </section>
  )
}
