interface NoticiasPageProps { params: { slug: string }; }

export default function NoticiasSlugPage({ params }: NoticiasPageProps) {
  return (
    <main>
      <h1>Notícia: {params.slug}</h1>
      <p>Conteúdo da notícia com slug: {params.slug}</p>
    </main>
  );
}
