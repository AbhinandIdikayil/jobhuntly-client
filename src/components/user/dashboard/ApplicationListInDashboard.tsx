import { ArrowRight } from 'lucide-react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { RootState } from 'src/redux/store'
import { formatDateToThree } from 'src/utils/formateDate';

function ApplicationListInDashboard() {
  const application = useSelector((state: RootState) => state?.job?.applications);

  if (!application?.length) return null;

  return (
    <div className="space-y-4">
      {application?.slice(0, 3)?.map((data: any, ind: number) => (
        <div
          key={ind}
          className="flex flex-col gap-4 rounded-[24px] border border-zinc-200 bg-slate-50/70 p-5 transition-colors hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex min-w-0 items-center gap-4">
            <img
              loading="lazy"
              src={data?.companyId?.images}
              className="h-14 w-14 rounded-2xl object-contain bg-white p-1 ring-1 ring-zinc-200"
            />
            <div className="min-w-0">
              <div className="truncate text-lg font-semibold text-slate-900">
                {data?.jobId?.jobTitle}
              </div>
              <div className="mt-1 text-sm text-slate-500">
                {data?.jobId?.location?.[0]}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-2xl border border-zinc-200 bg-white px-4 py-2 text-sm">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Date applied
              </div>
              <div className="mt-1 font-semibold text-slate-800">{formatDateToThree(data?.createdAt)}</div>
            </div>

            <div
              className={`rounded-full px-4 py-2 text-sm font-semibold ring-1 ${
                data?.hiring_status == 'interview'
                  ? 'border border-green-200 bg-green-50 text-green-600 ring-green-100'
                  : data?.hiring_status == 'shortlisted'
                    ? 'border border-orange-200 bg-orange-50 text-orange-600 ring-orange-100'
                    : data?.hiring_status == 'in-review'
                      ? 'border border-indigo-200 bg-indigo-50 text-indigo-600 ring-indigo-100'
                      : 'border border-zinc-200 bg-slate-50 text-slate-600 ring-zinc-100'
              }`}
            >
              {data?.hiring_status}
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-center pt-2">
        <Link
          to={'applications'}
          className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700 transition-colors hover:bg-indigo-100"
        >
          View all applications
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  )
}

export default ApplicationListInDashboard
