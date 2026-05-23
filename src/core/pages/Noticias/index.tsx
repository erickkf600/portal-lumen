'use client'

import { useState } from 'react'
import Card from '@/core/components/Card'
import { apiFetch } from '@/api'
import { NoticiasData } from './noticias.interface'

interface NoticiasProps {
  data: NoticiasData
}

const PAGE_SIZE = 6

const MONTHS = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ']

function formatDate(date: string) {
  const [year, month, day] = date.split('-').map(Number)

  if (!year || !month || !day || !MONTHS[month - 1]) {
    return date
  }

  return `${String(day).padStart(2, '0')} ${MONTHS[month - 1]} ${year}`
}

function buildNewsUrl(filter: string, offset: number, limit: number) {
  const params = new URLSearchParams({
    filter,
    offset: String(offset),
    limit: String(limit),
  })

  return `http://mock.api/news?${params.toString()}`
}

export default function Noticias({ data }: NoticiasProps) {
  const [filtroSelecionado, setFiltroSelecionado] = useState(data.filtroAtual || 'todos')
  const [listaNoticias, setListaNoticias] = useState(data.noticias)
  const [hasMore, setHasMore] = useState(data.hasMore)
  const [isLoading, setIsLoading] = useState(false)

  async function handleFiltroChange(filter: string) {
    if (filter === filtroSelecionado || isLoading) {
      return
    }

    setIsLoading(true)

    try {
      const response = await apiFetch<NoticiasData>(buildNewsUrl(filter, 0, PAGE_SIZE))

      setFiltroSelecionado(filter)
      setListaNoticias(response.noticias)
      setHasMore(response.hasMore)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleVerMaisNoticias() {
    if (!hasMore || isLoading) {
      return
    }

    setIsLoading(true)

    try {
      const response = await apiFetch<NoticiasData>(buildNewsUrl(filtroSelecionado, listaNoticias.length, PAGE_SIZE))

      setListaNoticias(current => [...current, ...response.noticias])
      setHasMore(response.hasMore)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="space-y-8 pb-16">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold text-[#111] whitespace-nowrap uppercase tracking-tight font-inter">
          Notícias
        </h1>
        <div className="h-[2px] bg-neutral-200 w-full" />
      </div>

      <div className="flex flex-wrap gap-2 md:gap-3">
        {data.filtros.map(filtro => {
          const isActive = filtroSelecionado === filtro.value

          return (
            <button
              key={filtro.value}
              type="button"
              onClick={() => handleFiltroChange(filtro.value)}
              className={`px-4 py-2 text-[11px] font-bold uppercase tracking-wider transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${
                isActive
                  ? 'bg-lumen-red text-white'
                  : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200 hover:text-neutral-700'
              }`}
              disabled={isLoading}
            >
              {filtro.label}
            </button>
          )
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
        {listaNoticias.map(noticia => (
          <Card
            key={noticia.slug}
            noticia={{
              categoria: noticia.category,
              titulo: noticia.title,
              desc: noticia.excerpt,
              imagem: noticia.imageUrl,
              alt: noticia.imageAlt,
              data: formatDate(noticia.date),
              href: `/noticias/${noticia.slug}`,
            }}
          />
        ))}
      </div>

      {hasMore ? (
        <div className="flex justify-center">
          <button
            type="button"
            className="bg-[#5c5c5c] text-white px-8 py-3 text-xs font-bold tracking-wider uppercase hover:bg-black transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            onClick={handleVerMaisNoticias}
            disabled={isLoading}
          >
            {isLoading ? 'Carregando...' : 'Ver mais notícias'}
          </button>
        </div>
      ) : null}
    </section>
  )
}
