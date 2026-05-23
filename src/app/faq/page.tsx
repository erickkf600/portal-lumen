import { Suspense } from 'react'
import { apiFetch } from '@/api'
import Skeleton from '@/core/components/Skeleton'
import Faq from '@/core/pages/Faq'
import { FaqData } from '@/core/pages/Faq/faq.interface'

export default async function FaqPage() {
  const faqData = await apiFetch<FaqData>('http://mock.api/faq')

  return (
    <Suspense fallback={<Skeleton text={5} />}>
      <Faq data={faqData} />
    </Suspense>
  )
}
