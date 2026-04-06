export type NewsCategory = 'Tecnologia' | 'Política' | 'Esportes' | 'Money' | 'Mundo' | 'Agro' | 'Cultura'

export type NewsSection = 'destaque' | 'geral' | 'webstory' | 'politica' | 'esportes' | 'money' | 'review'

export interface News {
  slug: string
  title: string
  excerpt: string
  content: string
  imageUrl: string
  imageAlt: string
  category: NewsCategory
  date: string
  section: NewsSection
}

export type NavCategory =
  | 'Ao vivo'
  | 'Política'
  | 'Money'
  | 'Mundo'
  | 'Agro'
  | 'Infra'
  | 'Esportes'
  | 'Viagem & Gastronomia'
