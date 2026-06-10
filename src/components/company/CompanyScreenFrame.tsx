import { ReactNode } from 'react'

type StatItem = {
  label: string
  value: string
  hint?: string
}

type CompanyScreenFrameProps = {
  eyebrow: string
  title: string
  description: string
  actions?: ReactNode
  stats?: StatItem[]
  children: ReactNode
  className?: string
}

function CompanyScreenFrame({
  eyebrow,
  title,
  description,
  actions,
  stats = [],
  children,
  className = '',
}: CompanyScreenFrameProps) {
  return (
    <div className={`min-h-full bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.16),_transparent_28%),linear-gradient(180deg,#fffaf3_0%,#ffffff_48%,#f8f6f1_100%)] ${className}`}>
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-200 via-orange-300 to-indigo-400" />
      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-6 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/85 p-5 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-8">
          <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-gradient-to-br from-amber-200/40 to-orange-300/10 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-10 h-28 w-28 rounded-full bg-indigo-200/20 blur-3xl" />
          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-400">
                {eyebrow}
              </p>
              <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl leading-tight text-slate-900 sm:text-4xl">
                {title}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                {description}
              </p>
            </div>
            {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
          </div>

          {stats.length ? (
            <div className="relative mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-slate-200/70 bg-white/90 px-4 py-3 shadow-sm"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                    {stat.label}
                  </p>
                  <p className="mt-1 font-[family-name:var(--font-display)] text-2xl text-slate-900">
                    {stat.value}
                  </p>
                  {stat.hint ? <p className="mt-1 text-xs text-slate-500">{stat.hint}</p> : null}
                </div>
              ))}
            </div>
          ) : null}
        </section>

        <div className="relative mt-6">{children}</div>
      </div>
    </div>
  )
}

export default CompanyScreenFrame
