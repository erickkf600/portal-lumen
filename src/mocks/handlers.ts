import { http, HttpResponse } from 'msw'
import home from './data/lumen-home.json'
import noticias from './data/lumen-news.json'
import faq from './data/lumen-faq.json'
import profile from './data/lumen-profile.json'

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
  http.post('*/auth/login', async ({ request }) => {
    const body = (await request.json()) as { email?: string; senha?: string }

    if (!body.email || !body.senha || body.senha.length < 6) {
      return HttpResponse.json({ message: 'Credenciais invalidas.' }, { status: 401 })
    }

    return HttpResponse.json({
      user: {
        id: 'user-001',
        nomeCompleto: 'Maria Silva',
        email: body.email,
        memberSince: '12 de Fevereiro de 2023',
        plano: 'Premium Anual',
        status: ['Assinante Premium', 'Leitor Verificado'],
      },
    })
  }),
  http.post('*/auth/register', async ({ request }) => {
    const body = (await request.json()) as {
      nomeCompleto?: string
      email?: string
      senha?: string
      aceitaTermos?: boolean
    }

    if (!body.nomeCompleto || !body.email || !body.senha || !body.aceitaTermos) {
      return HttpResponse.json({ message: 'Dados de cadastro invalidos.' }, { status: 400 })
    }

    return HttpResponse.json({
      user: {
        id: 'user-002',
        nomeCompleto: body.nomeCompleto,
        email: body.email,
        memberSince: '23 de Maio de 2026',
        plano: 'Leitor Verificado',
        status: ['Leitor Verificado'],
      },
    })
  }),
  http.put('*/profile', async ({ request }) => {
    const body = (await request.json()) as {
      nomeCompleto?: string
      email?: string
      senha?: string
    }

    if (!body.nomeCompleto || !body.email) {
      return HttpResponse.json({ message: 'Dados invalidos para atualizacao.' }, { status: 400 })
    }

    return HttpResponse.json({
      user: {
        id: 'user-001',
        nomeCompleto: body.nomeCompleto,
        email: body.email,
        memberSince: '12 de Fevereiro de 2023',
        plano: 'Premium Anual',
        status: ['Assinante Premium', 'Leitor Verificado'],
      },
      message: body.senha ? 'Perfil e senha atualizados com sucesso.' : 'Perfil atualizado com sucesso.',
    })
  }),
  http.get('*/profile/saved', ({}) => HttpResponse.json({ items: profile.saved })),
  http.get('*/news', ({ request }) => {
    const url = new URL(request.url)

    const filter = (url.searchParams.get('filter') || 'todos').toLowerCase()
    const search = (url.searchParams.get('search') || '').trim()
    const offset = Math.max(0, Number.parseInt(url.searchParams.get('offset') || '0', 10) || 0)
    const limit = Math.max(1, Number.parseInt(url.searchParams.get('limit') || String(DEFAULT_NEWS_LIMIT), 10) || 1)

    const allNoticias = noticias.noticias
    const noticiasPorFiltro =
      filter === 'todos'
        ? allNoticias
        : allNoticias.filter(noticia => normalizeString(noticia.category) === normalizeString(filter))

    const noticiasFiltradas =
      search.length === 0
        ? noticiasPorFiltro
        : noticiasPorFiltro.filter(noticia => normalizeString(noticia.title).includes(normalizeString(search)))

    const noticiasPaginadas = noticiasFiltradas.slice(offset, offset + limit)

    return HttpResponse.json({
      filtros: noticias.filtros,
      noticias: noticiasPaginadas,
      total: noticiasFiltradas.length,
      hasMore: offset + limit < noticiasFiltradas.length,
      offset,
      limit,
      filtroAtual: filter,
      buscaAtual: search,
    })
  }),
]
