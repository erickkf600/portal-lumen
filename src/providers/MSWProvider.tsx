'use client'

import Skeleton from '@/core/components/Skeleton'
import { PropsWithChildren, useEffect, useState } from 'react'

export function MswProvider({ children }: PropsWithChildren) {
  const [isMswReady, setIsMswReady] = useState(false)

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return

    const enableMocking = async () => {
      const { worker } = await import('@/mocks/browser')
      await worker.start({
        onUnhandledRequest: 'bypass',
      })
      setIsMswReady(true)
    }

    // @ts-expect-error msw not found
    if (!window.msw) {
      enableMocking()
    } else {
      setIsMswReady(true)
    }
  }, [])

  if (process.env.NODE_ENV !== 'development') return children

  if (!isMswReady) {
    console.log('loading msw worker...')
    return <Skeleton feature={1} cards={4} />
  }

  return <>{children}</>
}
