type FetchConfig = RequestInit & {
  next?: {
    revalidate?: number
    tags?: string[]
  }
}

export async function apiFetch<T>(url: string, config?: FetchConfig): Promise<T> {
  const defaultConfig: FetchConfig = {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const res = await fetch(url, {
    ...defaultConfig,
    ...config,
    headers: {
      ...defaultConfig.headers,
      ...config?.headers,
    },
  })

  if (!res.ok) {
    throw new Error(`Erro na requisição: ${res.status}`)
  }

  return res.json()
}
