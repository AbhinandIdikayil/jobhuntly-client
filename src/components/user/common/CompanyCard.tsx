import { Avatar } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { Company } from "src/types/Company"

function CompanyCard({ data }: { data: Company }) {
    const navigate = useNavigate()

    function handleNavigation(sss: any) {
        navigate(`/dashboard/companies/${data?._id}`, { state: sss })
    }

    return (
        <div
            onClick={() => handleNavigation(data)}
            className="group company-card flex flex-col overflow-hidden rounded-[28px] border border-zinc-200 bg-white leading-[160%] shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-[0_18px_40px_rgba(79,70,229,0.08)]"
        >
            <div className="h-1 bg-gradient-to-r from-indigo-600 via-violet-500 to-cyan-400" />
            <div className="flex flex-col p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4 text-base text-indigo-600">
                    {
                        data?.images ? (
                            <img
                                loading="lazy"
                                src={data?.images || ''}
                                className="shrink-0 aspect-square w-16 rounded-2xl object-contain bg-slate-50 p-1 ring-1 ring-zinc-200"
                            />
                        ) : (
                            <Avatar sx={{ width: 72, height: 72, fontSize: 28, fontWeight: 700 }}>
                                {data?.name.charAt(0) ?? ''}
                            </Avatar>
                        )
                    }
                </div>

                <div className="mt-4 text-xl sm:text-2xl font-semibold leading-7 text-slate-900 capitalize">
                    {data?.name ?? ''}
                </div>

                <div className="company-desc mt-3 text-sm sm:text-base leading-7 text-slate-600 capitalize">
                    {data?.description ?? ''}
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                    <div className="self-start rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-600 whitespace-nowrap">
                        {data?.industry}
                    </div>
                    <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-slate-500">
                        View details
                    </span>
                </div>
            </div>
        </div>
    )
}

export default CompanyCard
