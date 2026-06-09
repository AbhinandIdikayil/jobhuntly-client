import { Avatar } from "@mui/material"
import { deepOrange } from "@mui/material/colors"
import { Link, useLocation } from "react-router-dom"
import { getAllJobsUser } from "src/types/Job"
import { formatSalary } from "src/utils/formatSalary"

function JobCard({ data, apply }: { data: getAllJobsUser, apply: (data: any) => void }) {
    const location = useLocation()
    return ( 
        <div className="group mb-4 w-full overflow-hidden rounded-[28px] border border-zinc-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-[0_18px_40px_rgba(79,70,229,0.08)]">
            <div className="flex flex-col gap-6 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex gap-4 sm:gap-5 justify-between font-semibold min-w-0">
                {
                    data?.company?.images ? (
                        <img
                            loading="lazy"
                            src={data?.company?.images}
                            className="shrink-0 self-start w-14 sm:w-16 aspect-square rounded-2xl object-contain bg-slate-50 p-1 ring-1 ring-zinc-200"
                        />
                    ) : (
                        <Avatar sx={{ bgcolor: deepOrange[500], width: 72, height: 72, fontSize: 28, fontWeight: 700 }}>
                            { data?.company?.name?.charAt(1) }
                            
                        </Avatar>
                    )
                }

                <div className="flex min-w-0 flex-col">
                    {
                        location.pathname == '/home/jobs' ? (
                            <Link to={`/home/jobs/${data?._id}`} className="text-lg sm:text-xl leading-6 text-slate-900 hover:text-indigo-600 transition-colors">
                                {data?.jobTitle || ''}
                            </Link>
                        ) : (
                            <Link to={`/dashboard/jobs/${data?._id}`} className="text-lg sm:text-xl leading-6 text-slate-900 hover:text-indigo-600 transition-colors">
                                {data?.jobTitle || ''}
                            </Link>
                        )
                    }
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                        <span className="font-medium text-slate-600">{data?.company?.name || 'Company'}</span>
                        <span className="text-slate-300">•</span>
                        <span>{data?.location?.[0] || 'non-disclosable'}</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2 text-sm whitespace-nowrap">
                        <div className="rounded-full bg-emerald-50 px-3 py-1.5 text-emerald-600 ring-1 ring-emerald-200">
                            {data?.employmentDetails?.name}
                        </div>
                        <div className="hidden sm:inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-amber-700">
                            {data?.categoryDetails?.name || 'non-disclosable'}
                        </div>
                       
                    </div>
                </div>
            </div>
            <div className="flex flex-row items-end justify-between gap-4 lg:flex-col lg:items-end lg:justify-between text-center">
                <button
                    onClick={() => apply({ jobId: data?._id, companyId: data?.companyId })}
                    className="hover:cursor-pointer rounded-xl bg-indigo-600 px-6 py-3 text-sm sm:text-base font-bold text-white whitespace-nowrap shadow-[0_10px_20px_rgba(79,70,229,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700">
                    Apply
                </button>
                <div className="flex flex-col items-end gap-2">
                <div className="text-sm font-semibold text-slate-800">
                    {
                        formatSalary(data?.salaryrange?.from,data?.salaryrange?.to)
                    }
                </div>
                <div className="h-2 w-40 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-indigo-500" />
                </div>
                </div>
            </div>
            </div>
        </div >
    )
}

export default JobCard
