import { Suspense } from 'react'
import { apiFetch } from '@/api'
import Skeleton from '@/core/components/Skeleton'
import Noticias from '@/core/pages/Noticias'
import { NoticiasData } from '@/core/pages/Noticias/noticias.interface'

type NoticiasPageProps = {
  searchParams: Promise<{ search?: string }>
}

export default async function NoticiasPage({ searchParams }: NoticiasPageProps) {
  const { search = '' } = await searchParams
  const params = new URLSearchParams()

  if (search.trim()) {
    params.set('search', search.trim())
  }

  const query = params.toString()
  const noticiasData = await apiFetch<NoticiasData>(`http://mock.api/news${query ? `?${query}` : ''}`)

  return (
    <Suspense fallback={<Skeleton cards={6} />}>
      <Noticias data={noticiasData} />
    </Suspense>
  )
}
