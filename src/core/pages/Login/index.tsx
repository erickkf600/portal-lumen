'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { apiFetch } from '@/api'
import { AuthUser, useAuthStore } from '@/core/stores/auth.store'

type LoginResponse = {
  user: AuthUser
}

export default function Login() {
  const router = useRouter()
  const setUser = useAuthStore(state => state.setUser)

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [manterConectado, setManterConectado] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await apiFetch<LoginResponse>('http://mock.api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, senha, manterConectado }),
      })

      setUser(response.user)
      router.push('/meu-perfil')
    } catch {
      setError('Nao foi possivel autenticar com os dados informados.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="py-6 md:py-10">
      <div className="mx-auto max-w-2xl rounded-md border border-neutral-200 bg-white p-6 md:p-10">
        <div className="mb-8 space-y-3">
          <h1 className="text-4xl font-black tracking-tight text-[#111]">Acesso ao Portal</h1>
          <p className="max-w-xl text-lg leading-relaxed text-neutral-600">
            Seja bem-vindo novamente. Entre com suas credenciais para continuar lendo seu conteudo curado.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-neutral-600">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={event => setEmail(event.target.value)}
              placeholder="exemplo@editorial.com"
              className="w-full rounded-md border border-neutral-300 bg-neutral-100 px-4 py-3 text-neutral-700 outline-none transition focus:border-lumen-red"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="senha" className="text-xs font-bold uppercase tracking-wider text-neutral-600">
                Senha
              </label>
              <button type="button" className="text-xs font-bold uppercase tracking-wider text-lumen-red">
                Esqueceu a senha?
              </button>
            </div>
            <input
              id="senha"
              type="password"
              required
              minLength={6}
              value={senha}
              onChange={event => setSenha(event.target.value)}
              placeholder="******"
              className="w-full rounded-md border border-neutral-300 bg-neutral-100 px-4 py-3 text-neutral-700 outline-none transition focus:border-lumen-red"
            />
          </div>

          <label className="flex items-center gap-3 text-neutral-600">
            <input
              type="checkbox"
              checked={manterConectado}
              onChange={event => setManterConectado(event.target.checked)}
              className="h-5 w-5 rounded border-neutral-300"
            />
            Mantenha-me conectado neste dispositivo
          </label>

          {error ? <p className="text-sm font-medium text-lumen-red">{error}</p> : null}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-md bg-lumen-red px-5 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? 'Entrando...' : 'Entrar no portal'}
          </button>
        </form>

        <div className="mt-8 border-t border-neutral-200 pt-8 text-center text-lg text-neutral-600">
          Nao tem uma conta?{' '}
          <Link href="/registro" className="font-bold text-lumen-red">
            Cadastre-se
          </Link>
        </div>
      </div>
    </section>
  )
}
