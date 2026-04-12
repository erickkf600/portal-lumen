export interface HomeData {
  destaques: NewsItem[]
  principais: NewsItem[]
  webstories: NewsItem[]
  reviewSemana: NewsItem
}
export interface NewsItem {
  slug: string
  title: string
  excerpt?: string
  imageUrl: string
  imageAlt: string
  category?: string
  date?: string
}
