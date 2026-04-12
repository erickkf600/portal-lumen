interface SkeletonBaseProps {
  className?: string
}

const SkeletonItem = ({ className }: SkeletonBaseProps) => (
  <div className={`animate-pulse bg-neutral-200 rounded ${className || ''}`} />
)

interface SkeletonProps {
  feature?: number
  cards?: number
  text?: number
}

export default function Skeleton({ feature, cards, text }: SkeletonProps) {
  if (!feature && !cards && !text) return null

  return (
    <div className="space-y-16 py-8">
      {feature
        ? Array.from({ length: feature }).map((_, i) => (
            <div key={`feature-${i}`} className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-8 bg-neutral-200 animate-pulse min-h-[350px] relative overflow-hidden rounded">
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-300/50 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 space-y-4">
                  <SkeletonItem className="w-24 h-4 bg-neutral-300" />
                  <SkeletonItem className="w-3/4 h-8 bg-neutral-300" />
                  <SkeletonItem className="w-1/2 h-4 bg-neutral-300" />
                </div>
              </div>
              <div className="md:col-span-4 flex flex-col gap-6">
                <div className="bg-white p-6 border-l-4 border-neutral-200 shadow-sm space-y-3">
                  <SkeletonItem className="w-20 h-3" />
                  <SkeletonItem className="w-full h-6" />
                  <SkeletonItem className="w-full h-4" />
                </div>
                <div className="bg-white p-6 shadow-sm space-y-3">
                  <SkeletonItem className="w-20 h-3" />
                  <SkeletonItem className="w-full h-6" />
                  <SkeletonItem className="w-full h-4" />
                </div>
              </div>
            </div>
          ))
        : null}

      {cards ? (
        <section>
          <div className="flex items-center gap-4 mb-8">
            <SkeletonItem className="w-48 h-8" />
            <div className="h-[2px] bg-neutral-100 w-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {Array.from({ length: cards }).map((_, i) => (
              <div key={`card-${i}`} className="space-y-4">
                <SkeletonItem className="aspect-[16/10] w-full" />
                <div className="p-2 space-y-3">
                  <SkeletonItem className="w-20 h-3" />
                  <SkeletonItem className="w-full h-5" />
                  <SkeletonItem className="w-full h-4" />
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {text ? (
        <div className="space-y-4">
          {Array.from({ length: text }).map((_, i) => (
            <div key={`text-${i}`} className="space-y-2">
              <SkeletonItem className="w-full h-4" />
              <SkeletonItem className="w-5/6 h-4" />
              <SkeletonItem className="w-4/6 h-4" />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export const CardSkeleton = Skeleton
