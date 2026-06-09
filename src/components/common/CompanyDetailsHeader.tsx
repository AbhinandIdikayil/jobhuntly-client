import { formatDateToThree } from "src/utils/formateDate";

function CompanyDetailsHeader({ data }: { data: any }) {
  return (
    <div className="relative overflow-hidden rounded-[32px] border border-zinc-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.06)] sm:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.10),_transparent_34%),radial-gradient(circle_at_bottom_left,_rgba(16,185,129,0.08),_transparent_32%)]" />
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-zinc-200 bg-slate-50 shadow-sm">
            {data?.images ? (
              <img
                loading="lazy"
                src={data?.images}
                className="h-full w-full object-contain p-2"
              />
            ) : (
              <span className="text-2xl font-bold text-indigo-600">
                {data?.name?.charAt(0) ?? 'C'}
              </span>
            )}
          </div>

          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                {data?.name}
              </h1>
              <span className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700">
                Company profile
              </span>
            </div>
            <a
              href={data?.website}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-700"
            >
              {data?.website}
            </a>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              Explore the company profile, workplace footprint, and hiring details in one clean overview.
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-zinc-200 bg-white/90 px-4 py-3 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Founded
            </div>
            <div className="mt-1 text-sm font-semibold text-slate-800">
              {data?.foundedDate ? formatDateToThree(data?.foundedDate) : 'Non disclosable'}
            </div>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white/90 px-4 py-3 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Employees
            </div>
            <div className="mt-1 text-sm font-semibold text-slate-800">
              {data?.employees || 'Not shared'}
            </div>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white/90 px-4 py-3 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Locations
            </div>
            <div className="mt-1 text-sm font-semibold text-slate-800">
              {data?.locations?.length ? `${data.locations.length} locations` : 'Not shared'}
            </div>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white/90 px-4 py-3 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Industry
            </div>
            <div className="mt-1 text-sm font-semibold text-slate-800">
              {data?.industry ?? 'Non-disclosable'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyDetailsHeader
