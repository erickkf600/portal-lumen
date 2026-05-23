import { http, HttpResponse } from 'msw'
import home from './data/lumen-home.json'
import noticias from './data/lumen-news.json'
import faq from './data/lumen-faq.json'

const DEFAULT_NEWS_LIMIT = 6

function normalizeString(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

export const handlers = [
  http.get('*/home', ({}) => HttpResponse.json(home)),
  http.get('*/faq', ({}) => HttpResponse.json(faq)),
  http.get('*/news', ({ request }) => {
    const url = new URL(request.url)

    const filter = (url.searchParams.get('filter') || 'todos').toLowerCase()
    const offset = Math.max(0, Number.parseInt(url.searchParams.get('offset') || '0', 10) || 0)
    const limit = Math.max(1, Number.parseInt(url.searchParams.get('limit') || String(DEFAULT_NEWS_LIMIT), 10) || 1)

    const allNoticias = noticias.noticias
    const noticiasFiltradas =
      filter === 'todos'
        ? allNoticias
        : allNoticias.filter(noticia => normalizeString(noticia.category) === normalizeString(filter))

    const noticiasPaginadas = noticiasFiltradas.slice(offset, offset + limit)

    return HttpResponse.json({
      filtros: noticias.filtros,
      noticias: noticiasPaginadas,
      total: noticiasFiltradas.length,
      hasMore: offset + limit < noticiasFiltradas.length,
      offset,
      limit,
      filtroAtual: filter,
    })
  }),
]
