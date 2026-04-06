import { http, HttpResponse } from 'msw'
import { noticias } from './data'

export const handlers = [
  // Endpoint para buscar todas as notícias
  http.get('*/news', ({ request }) => {
    const url = new URL(request.url)
    const slug = url.searchParams.get('slug')

    if (slug) {
      const noticia = noticias.find(n => n.slug === slug)
      if (noticia) {
        return HttpResponse.json([noticia])
      }
      return HttpResponse.json([], { status: 404 })
    }

    return HttpResponse.json(noticias)
  }),

  // Endpoint para buscar uma notícia específica por slug (se o projeto usar /news/:slug)
  http.get('*/news/:slug', ({ params }) => {
    const { slug } = params
    const noticia = noticias.find(n => n.slug === slug)

    if (noticia) {
      return HttpResponse.json(noticia)
    }

    return new HttpResponse(null, { status: 404 })
  }),

  // Simulando o endpoint de 'home' que o json-server tinha
  http.get('*/home', () => {
    // Adaptando os novos dados para o formato que a home esperava (baseado no db.json antigo se necessário)
    // No db.json antigo, 'home' tinha hero, secondary, featuredGrid, etc.
    // Vou retornar uma estrutura compatível com o que a aplicação espera.

    const hero = noticias.find(n => n.section === 'destaque') || noticias[0]
    const secondary = noticias.find(n => n.section === 'money') || noticias[1]
    const featuredGrid = noticias.filter(n => n.section === 'geral').slice(0, 4)
    const webstories = noticias.filter(n => n.section === 'webstory').slice(0, 3)
    const review = noticias.filter(n => n.section === 'review').slice(0, 2)

    return HttpResponse.json({
      hero: {
        slug: hero.slug,
        category: hero.category,
        title: hero.title,
        excerpt: hero.excerpt,
        image: hero.imageUrl,
        publishedAt: hero.date,
      },
      secondary: {
        slug: secondary.slug,
        category: secondary.category,
        title: secondary.title,
        excerpt: secondary.excerpt,
        image: secondary.imageUrl,
        publishedAt: secondary.date,
      },
      live: {
        isLive: true,
        title: 'Programação ao vivo do Portal de Notícias',
        videoUrl: 'https://youtube.com/live/example',
      },
      featuredGrid: featuredGrid.map(n => ({
        slug: n.slug,
        title: n.title,
        image: n.imageUrl,
        category: n.category,
        publishedAt: n.date,
      })),
      webstories: webstories.map(n => ({
        slug: n.slug,
        title: n.title,
        image: n.imageUrl,
        category: n.category,
        publishedAt: n.date,
      })),
      review: review.map(n => ({
        slug: n.slug,
        title: n.title,
        image: n.imageUrl,
        category: n.category,
        publishedAt: n.date,
      })),
      latestNews: noticias.slice(0, 9).map(n => ({
        slug: n.slug,
        title: n.title,
        image: n.imageUrl,
        category: n.category,
        publishedAt: n.date,
      })),
    })
  }),
]
