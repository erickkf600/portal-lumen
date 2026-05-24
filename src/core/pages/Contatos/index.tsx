'use client'

import { FormEvent, useMemo, useState } from 'react'
import { z } from 'zod'
import * as yup from 'yup'

type ContactFormValues = {
  nome: string
  email: string
  mensagem: string
}

type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>

const zodSchema = z.object({
  nome: z.string().trim().min(3, 'Digite seu nome completo.'),
  email: z.string().trim().email('Informe um e-mail valido.'),
  mensagem: z.string().trim().min(20, 'A mensagem precisa ter pelo menos 20 caracteres.'),
})

const yupSchema: yup.ObjectSchema<ContactFormValues> = yup
  .object({
    nome: yup.string().required('Nome e obrigatorio.').max(80, 'Nome deve ter no maximo 80 caracteres.'),
    email: yup.string().required('E-mail e obrigatorio.').max(120, 'E-mail muito longo.'),
    mensagem: yup.string().required('Mensagem e obrigatoria.').max(1200, 'Mensagem muito longa.'),
  })
  .required()

const initialValues: ContactFormValues = {
  nome: '',
  email: '',
  mensagem: '',
}

export default function Contatos() {
  const [values, setValues] = useState<ContactFormValues>(initialValues)
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [successMessage, setSuccessMessage] = useState('')

  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors])

  const validateField = async (field: keyof ContactFormValues, value: string) => {
    const nextValues = { ...values, [field]: value }
    const zodResult = zodSchema.safeParse(nextValues)

    try {
      if (!zodResult.success) {
        const fieldIssue = zodResult.error.issues.find(issue => issue.path[0] === field)

        if (fieldIssue) {
          setErrors(prev => ({ ...prev, [field]: fieldIssue.message }))
          return
        }
      }

      await yupSchema.validateAt(field, nextValues)

      setErrors(prev => {
        const nextErrors = { ...prev }
        delete nextErrors[field]
        return nextErrors
      })
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, [field]: error.issues[0]?.message ?? 'Valor invalido.' }))
        return
      }

      if (error instanceof yup.ValidationError) {
        setErrors(prev => ({ ...prev, [field]: error.message }))
      }
    }
  }

  const handleChange = (field: keyof ContactFormValues, value: string) => {
    setValues(prev => ({ ...prev, [field]: value }))
    setSuccessMessage('')
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const zodResult = zodSchema.safeParse(values)

    if (!zodResult.success) {
      const nextErrors: ContactFormErrors = {}

      zodResult.error.issues.forEach(issue => {
        const key = issue.path[0] as keyof ContactFormValues
        nextErrors[key] = issue.message
      })

      setErrors(nextErrors)
      return
    }

    try {
      await yupSchema.validate(zodResult.data, { abortEarly: false })
      setErrors({})
      setSuccessMessage('Mensagem enviada com sucesso! Nossa redacao respondera em breve.')
      setValues(initialValues)
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const nextErrors: ContactFormErrors = {}

        error.inner.forEach(item => {
          if (!item.path) {
            return
          }

          const key = item.path as keyof ContactFormValues

          if (!nextErrors[key]) {
            nextErrors[key] = item.message
          }
        })

        setErrors(nextErrors)
      }
    }
  }

  return (
    <section className="space-y-10">
      <header className="space-y-4">
        <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-neutral-500">
          <span>Home</span>
          <i className="icon-chevron-right text-[10px]" />
          <span className="text-lumen-red">Contato</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-[#111] tracking-tight">Contato</h1>

        <p className="max-w-3xl text-lg leading-relaxed text-neutral-600">
          Tem uma sugestao de pauta, critica ou duvida? Nossa equipe de redacao esta pronta para ouvir voce. Preencha o
          formulario abaixo e retornaremos o mais breve possivel.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <form
          className="rounded-md border border-neutral-200 bg-white p-6 md:p-8 lg:col-span-8 space-y-5"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="space-y-2">
            <label htmlFor="nome" className="text-xs font-bold uppercase tracking-wider text-neutral-600">
              Nome
            </label>
            <input
              id="nome"
              name="nome"
              type="text"
              value={values.nome}
              onChange={event => handleChange('nome', event.target.value)}
              onBlur={event => validateField('nome', event.target.value)}
              placeholder="Seu nome completo"
              className="w-full rounded-md border border-neutral-300 bg-neutral-50 px-4 py-3 text-neutral-700 outline-none transition focus:border-lumen-red"
            />
            {errors.nome && <p className="text-sm text-lumen-red">{errors.nome}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-neutral-600">
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={event => handleChange('email', event.target.value)}
              onBlur={event => validateField('email', event.target.value)}
              placeholder="exemplo@email.com"
              className="w-full rounded-md border border-neutral-300 bg-neutral-50 px-4 py-3 text-neutral-700 outline-none transition focus:border-lumen-red"
            />
            {errors.email && <p className="text-sm text-lumen-red">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="mensagem" className="text-xs font-bold uppercase tracking-wider text-neutral-600">
              Mensagem
            </label>
            <textarea
              id="mensagem"
              name="mensagem"
              value={values.mensagem}
              onChange={event => handleChange('mensagem', event.target.value)}
              onBlur={event => validateField('mensagem', event.target.value)}
              placeholder="Como podemos ajudar?"
              className="min-h-44 w-full rounded-md border border-neutral-300 bg-neutral-50 px-4 py-3 text-neutral-700 outline-none transition focus:border-lumen-red"
            />
            {errors.mensagem && <p className="text-sm text-lumen-red">{errors.mensagem}</p>}
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-lumen-red px-5 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:brightness-95 cursor-pointer"
          >
            Enviar mensagem
          </button>

          {successMessage && <p className="text-sm font-medium text-green-700">{successMessage}</p>}
          {hasErrors && !successMessage && (
            <p className="text-sm text-neutral-500">Revise os campos destacados antes de enviar.</p>
          )}
        </form>

        <aside className="rounded-md border border-neutral-200 bg-neutral-100 p-6 md:p-8 lg:col-span-4">
          <h2 className="mb-8 border-l-4 border-lumen-red pl-4 text-2xl font-black uppercase leading-tight text-[#111]">
            Informacoes institucionais
          </h2>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-white text-lumen-red shadow-sm">
                <i className="icon-globe text-lg" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">Sede editorial</p>
                <p className="mt-2 text-lg text-[#111] leading-relaxed">Av. da Imprensa, 1200 - Centro</p>
                <p className="text-lg text-[#111]">Sao Paulo, SP - Brasil</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-white text-lumen-red shadow-sm">
                <i className="icon-user text-lg" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">Redacao</p>
                <p className="mt-2 text-lg text-[#111]">+55 (11) 4004-9000</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-white text-lumen-red shadow-sm">
                <i className="icon-file-text text-lg" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">Comercial</p>
                <p className="mt-2 break-words text-lg text-[#111]">anuncie@portallumen.com.br</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
