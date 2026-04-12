import { Suspense } from 'react'
import { apiFetch } from '@/api'
import Home from '@/core/pages/Home'
import { HomeData } from '@/core/pages/Home/home.interface'
import Skeleton from '@/core/components/Skeleton'

export default async function HomePage() {
  const homeData = await apiFetch<HomeData>('http://mock.api/home')
  return (
    <Suspense fallback={<Skeleton feature={1} cards={4} />}>
      <Home data={homeData} />
    </Suspense>
  )
}
