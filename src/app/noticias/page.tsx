import { Suspense } from 'react'
import { apiFetch } from '@/api'
import Skeleton from '@/core/components/Skeleton'
import Noticias from '@/core/pages/Noticias'
import { NoticiasData } from '@/core/pages/Noticias/noticias.interface'

export default async function NoticiasPage() {
  const noticiasData = await apiFetch<NoticiasData>('http://mock.api/news')

  return (
    <Suspense fallback={<Skeleton cards={6} />}>
      <Noticias data={noticiasData} />
    </Suspense>
  )
}
