'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f4f4f4] px-6 text-center">
      <div className="max-w-xl w-full">
        <div className="mb-8 inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-[#cc0000]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-[#111111] font-manrope mb-4 tracking-tight">
          Ops! Algo deu errado.
        </h1>

        <p className="text-lg md:text-xl text-[#6b7280] font-inter mb-10 leading-relaxed max-w-md mx-auto">
          Não foi possível carregar o conteúdo desta página agora. Estamos trabalhando para resolver.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto px-10 py-4 bg-[#cc0000] text-white font-bold rounded-xl hover:bg-[#a80000] transition-all duration-300 shadow-xl shadow-red-900/10 active:scale-[0.98]"
          >
            Tentar novamente
          </button>

          <button
            onClick={() => (window.location.href = '/')}
            className="w-full sm:w-auto px-10 py-4 bg-white text-[#111111] font-bold rounded-xl border-2 border-[#e5e7eb] hover:bg-gray-50 transition-all duration-300 active:scale-[0.98]"
          >
            Voltar ao Início
          </button>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <div className="mt-16 p-6 bg-red-50/50 border border-red-100 rounded-2xl text-left">
            <h3 className="text-red-800 font-bold mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              Debug Info (Dev Only):
            </h3>
            <div className="bg-white/80 p-4 rounded-lg font-mono text-xs text-red-900 overflow-auto max-h-40 shadow-inner">
              {error.message || 'Erro desconhecido'}
              {error.stack && <pre className="mt-2 text-[10px] opacity-60">{error.stack}</pre>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
