export interface FaqItem {
  id: string
  pergunta: string
  resposta: string
}

export interface FaqData {
  titulo: string
  descricao: string
  itens: FaqItem[]
}
