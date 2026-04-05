export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f4f4f4]">
      <div className="relative flex items-center justify-center">
        {/* Outer spinning ring */}
        <div className="absolute w-16 h-16 border-4 border-[#cc0000] border-t-transparent rounded-full animate-spin"></div>
        {/* Inner pulsing core */}
        <div className="w-10 h-10 bg-[#cc0000] rounded-full animate-pulse opacity-40"></div>
      </div>
      <p className="mt-10 text-xl font-medium text-[#111111] font-inter tracking-tight animate-pulse">
        Carregando informações...
      </p>
    </div>
  )
}
