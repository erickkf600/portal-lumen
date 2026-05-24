export interface NoticiasFiltro {
  label: string
  value: string
}

export interface NoticiaItem {
  slug: string
  title: string
  excerpt: string
  content: string
  imageUrl: string
  imageAlt: string
  category: string
  date: string
  section?: string
}

export interface NoticiasData {
  filtros: NoticiasFiltro[]
  noticias: NoticiaItem[]
  total: number
  hasMore: boolean
  offset: number
  limit: number
  filtroAtual: string
  buscaAtual?: string
}
