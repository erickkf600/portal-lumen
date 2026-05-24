'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { apiFetch } from '@/api'
import { useAuthStore } from '@/core/stores/auth.store'

type ProfileResponse = {
  user: {
    id: string
    nomeCompleto: string
    email: string
    memberSince: string
    plano: 'Premium Anual' | 'Leitor Verificado'
    status: Array<'Assinante Premium' | 'Leitor Verificado'>
  }
  message: string
}

export default function MeuPerfil() {
  const router = useRouter()
  const { user, isAuthenticated, updateUser, logout } = useAuthStore(state => state)
  const [isHydrated, setIsHydrated] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [formValues, setFormValues] = useState({ nomeCompleto: '', email: '', senha: '' })

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setIsHydrated(true)
    })

    return () => {
      window.cancelAnimationFrame(frame)
    }
  }, [])

  if (!isHydrated) {
    return <section className="rounded-md border border-neutral-200 bg-white p-8">Carregando perfil...</section>
  }

  const startEditing = () => {
    if (!user) {
      return
    }

    setFeedback('')
    setFormValues({ nomeCompleto: user.nomeCompleto, email: user.email, senha: '' })
    setIsEditing(true)
  }

  const cancelEditing = () => {
    setIsEditing(false)
    setFeedback('')
    setFormValues({ nomeCompleto: '', email: '', senha: '' })
  }

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const handleSave = async () => {
    if (!formValues.nomeCompleto || !formValues.email) {
      setFeedback('Preencha nome e e-mail para salvar as alteracoes.')
      return
    }

    setIsSaving(true)
    setFeedback('')

    try {
      const response = await apiFetch<ProfileResponse>('http://mock.api/profile', {
        method: 'PUT',
        body: JSON.stringify(formValues),
      })

      updateUser(response.user)
      setFeedback(response.message)
      setIsEditing(false)
      setFormValues({ nomeCompleto: '', email: '', senha: '' })
    } catch {
      setFeedback('Nao foi possivel salvar agora. Tente novamente em instantes.')
    } finally {
      setIsSaving(false)
    }
  }

  if (!isAuthenticated || !user) {
    return (
      <section className="rounded-md border border-neutral-200 bg-white p-8 text-center space-y-4">
        <h1 className="text-3xl font-black text-[#111]">Meu perfil</h1>
        <p className="text-neutral-600">Voce precisa estar autenticado para acessar esta area.</p>
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/login"
            className="rounded-md bg-lumen-red px-5 py-3 text-xs font-bold uppercase tracking-wider text-white"
          >
            Fazer login
          </Link>
          <Link
            href="/registro"
            className="rounded-md border border-neutral-300 px-5 py-3 text-xs font-bold uppercase tracking-wider text-neutral-700"
          >
            Criar conta
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="space-y-10 pb-16">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold text-[#111] whitespace-nowrap uppercase tracking-tight font-inter">
          Meu Perfil
        </h1>
        <div className="h-[2px] bg-neutral-200 w-full" />
      </div>

      <article className="rounded-md border border-neutral-200 bg-white p-6 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <div className="relative h-32 w-32 overflow-hidden rounded-2xl border-2 border-neutral-200 bg-neutral-200 md:h-36 md:w-36">
            <div className="flex h-full items-center justify-center text-neutral-500">
              <i className="icon-user text-5xl" />
            </div>
            <button className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-xl border border-white bg-lumen-red text-white">
              <i className="icon-window text-sm" />
            </button>
          </div>

          <div className="space-y-3">
            <h1 className="text-xl font-black tracking-tight text-[#111] md:text-2xl">{user.nomeCompleto}</h1>
            <p className="text-sm text-neutral-600">Membro desde {user.memberSince}</p>
            <div className="flex flex-wrap gap-3">
              {user.status.map(tag => (
                <span
                  key={tag}
                  className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                    tag === 'Assinante Premium' ? 'bg-red-100 text-lumen-red' : 'bg-neutral-200 text-neutral-600'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="space-y-12 lg:col-span-12">
          <section className="space-y-5">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-[#111] whitespace-nowrap uppercase tracking-tight font-inter">
                Dados Pessoais
              </h2>
              <div className="h-[2px] bg-neutral-200 w-full" />
              <div className="flex items-center gap-3">
                {isEditing ? (
                  <>
                    <button
                      type="button"
                      onClick={cancelEditing}
                      className="text-xs font-bold uppercase tracking-widest text-neutral-500"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={handleSave}
                      disabled={isSaving}
                      className="text-xs font-bold uppercase tracking-widest text-lumen-red disabled:opacity-60"
                    >
                      {isSaving ? 'Salvando...' : 'Salvar'}
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={startEditing}
                    className="text-sm font-bold uppercase tracking-widest text-lumen-red"
                  >
                    Editar
                  </button>
                )}
              </div>
            </div>

            <div className="rounded-md border border-neutral-200 bg-white p-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">Nome completo</p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formValues.nomeCompleto}
                      onChange={event => setFormValues(current => ({ ...current, nomeCompleto: event.target.value }))}
                      className="w-full rounded-md border border-neutral-300 bg-neutral-100 px-4 py-3 text-base text-[#111] outline-none focus:border-lumen-red"
                    />
                  ) : (
                    <div className="rounded-md bg-neutral-100 px-4 py-3 text-base text-[#111] md:text-lg">
                      {user.nomeCompleto}
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">E-mail</p>
                  {isEditing ? (
                    <input
                      type="email"
                      value={formValues.email}
                      onChange={event => setFormValues(current => ({ ...current, email: event.target.value }))}
                      className="w-full rounded-md border border-neutral-300 bg-neutral-100 px-4 py-3 text-base text-[#111] outline-none focus:border-lumen-red"
                    />
                  ) : (
                    <div className="rounded-md bg-neutral-100 px-4 py-3 text-base text-[#111] md:text-lg">
                      {user.email}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">Senha</p>
                {isEditing ? (
                  <input
                    type="password"
                    value={formValues.senha}
                    onChange={event => setFormValues(current => ({ ...current, senha: event.target.value }))}
                    placeholder="Nova senha (opcional)"
                    className="w-full rounded-md border border-neutral-300 bg-neutral-100 px-4 py-3 text-base text-[#111] outline-none focus:border-lumen-red"
                  />
                ) : (
                  <div className="flex items-center justify-between rounded-md bg-neutral-100 px-4 py-3 text-base text-[#111] md:text-lg">
                    ************
                    <i className="icon-search text-neutral-500" />
                  </div>
                )}
              </div>

              {feedback ? <p className="mt-4 text-sm text-neutral-600">{feedback}</p> : null}
            </div>
          </section>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-md border border-neutral-300 px-5 py-3 text-xs font-bold uppercase tracking-widest text-neutral-700 transition hover:border-lumen-red hover:text-lumen-red"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
