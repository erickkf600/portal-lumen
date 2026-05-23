'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { apiFetch } from '@/api'
import { AuthUser, useAuthStore } from '@/core/stores/auth.store'

type RegisterResponse = {
  user: AuthUser
}

export default function Registro() {
  const router = useRouter()
  const setUser = useAuthStore(state => state.setUser)

  const [nomeCompleto, setNomeCompleto] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [aceitaTermos, setAceitaTermos] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    if (senha !== confirmarSenha) {
      setError('As senhas precisam ser iguais para continuar.')
      return
    }

    setIsLoading(true)

    try {
      const response = await apiFetch<RegisterResponse>('http://mock.api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ nomeCompleto, email, senha, aceitaTermos }),
      })

      setUser(response.user)
      router.push('/meu-perfil')
    } catch {
      setError('Nao foi possivel concluir o cadastro neste momento.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="py-6 md:py-10">
      <div className="mx-auto max-w-3xl rounded-md border border-neutral-200 bg-white p-6 md:p-10">
        <div className="mb-8 text-center space-y-3">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-lumen-red">Join our community</p>
          <h1 className="text-4xl font-black tracking-tight text-[#111]">Criar Conta</h1>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="nome" className="text-xs font-bold uppercase tracking-wider text-neutral-600">
              Nome completo
            </label>
            <input
              id="nome"
              type="text"
              required
              minLength={4}
              value={nomeCompleto}
              onChange={event => setNomeCompleto(event.target.value)}
              placeholder="Ex: Maria Silva"
              className="w-full rounded-md border border-neutral-300 bg-neutral-100 px-4 py-3 text-neutral-700 outline-none transition focus:border-lumen-red"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-neutral-600">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={event => setEmail(event.target.value)}
              placeholder="nome@exemplo.com"
              className="w-full rounded-md border border-neutral-300 bg-neutral-100 px-4 py-3 text-neutral-700 outline-none transition focus:border-lumen-red"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="senha" className="text-xs font-bold uppercase tracking-wider text-neutral-600">
                Senha
              </label>
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

            <div className="space-y-2">
              <label htmlFor="confirmar-senha" className="text-xs font-bold uppercase tracking-wider text-neutral-600">
                Confirmar senha
              </label>
              <input
                id="confirmar-senha"
                type="password"
                required
                minLength={6}
                value={confirmarSenha}
                onChange={event => setConfirmarSenha(event.target.value)}
                placeholder="******"
                className="w-full rounded-md border border-neutral-300 bg-neutral-100 px-4 py-3 text-neutral-700 outline-none transition focus:border-lumen-red"
              />
            </div>
          </div>

          <label className="flex items-start gap-3 text-neutral-600">
            <input
              type="checkbox"
              required
              checked={aceitaTermos}
              onChange={event => setAceitaTermos(event.target.checked)}
              className="mt-1 h-5 w-5 rounded border-neutral-300"
            />
            <span>
              I agree to the <span className="text-lumen-red">Terms and Conditions</span> and the Privacy Policy.
            </span>
          </label>

          {error ? <p className="text-sm font-medium text-lumen-red">{error}</p> : null}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-md bg-lumen-red px-5 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? 'Criando conta...' : 'Criar conta'}
          </button>
        </form>

        <div className="mt-8 border-t border-neutral-200 pt-8 text-center text-lg text-neutral-600">
          Ja tem uma conta?{' '}
          <Link href="/login" className="font-bold text-lumen-red">
            Entrar
          </Link>
        </div>
      </div>
    </section>
  )
}
