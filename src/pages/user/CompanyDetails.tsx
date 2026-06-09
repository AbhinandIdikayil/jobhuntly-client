import { Facebook, Instagram, Twitter } from "lucide-react";
import { useLocation, useOutletContext } from "react-router-dom";
import CompanyDetailsHeader from "src/components/common/CompanyDetailsHeader";
import { prop } from "src/types/AllTypes";

function CompanyDetails() {
    const context = useOutletContext<prop>() || {};
    const { open } = context;
    const location = useLocation();
    const { state } = location;

    return (
        <div className={`min-h-screen bg-[linear-gradient(180deg,#faf9f7_0%,#ffffff_48%,#f8fafc_100%)] ${open ? '' : ''}`}>
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <CompanyDetailsHeader data={state} />

                <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_360px]">
                    <div className="rounded-[32px] border border-zinc-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.05)] sm:p-8">
                        <div className="text-2xl font-semibold tracking-tight text-slate-900">
                            Company profile
                        </div>
                        <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-600 sm:text-base">
                            {state?.description}
                        </p>

                        <div className="mt-8 border-t border-zinc-200 pt-6">
                            <div className="text-2xl font-semibold tracking-tight text-slate-900">
                                Contact
                            </div>
                            <div className="mt-5 flex flex-wrap gap-3">
                                {state?.socialLinks?.map((data: string, index: number) => {
                                    if (data.includes('twitter')) {
                                        return (
                                            <div key={index} className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                                                <Twitter size={18} className="text-sky-500" />
                                                <div>{data.substr(8)}</div>
                                            </div>
                                        )
                                    }

                                    if (data.includes('instagram')) {
                                        return (
                                            <div key={index} className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                                                <Instagram size={18} className="text-pink-500" />
                                                <div>{data.substr(8)}</div>
                                            </div>
                                        )
                                    }

                                    if (data.length > 0) {
                                        return (
                                            <div key={index} className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                                                <Facebook size={18} className="text-blue-600" />
                                                <div>{data.substr(8)}</div>
                                            </div>
                                        )
                                    }

                                    return null;
                                })}
                            </div>

                            <div className="mt-4 flex items-center gap-3 rounded-2xl border border-zinc-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/f776a6f75ce5554e99557a08cf3868e21ff513b6544753d4c7fd8c41f59b65a5?apiKey=bf80438c4595450788b907771330b274&&apiKey=bf80438c4595450788b907771330b274"
                                    className="h-6 w-6 object-contain"
                                />
                                <div className="break-all">
                                    {state?.LinkedInLink?.substr(8)}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="rounded-[32px] border border-zinc-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.05)]">
                            <div className="text-2xl font-semibold tracking-tight text-slate-900">
                                Tech stack
                            </div>
                            <p className="mt-3 text-sm leading-7 text-slate-600">
                                Learn about the technology and tools that {state?.name} uses.
                            </p>
                            <div className="mt-5 flex flex-wrap gap-3">
                                {state?.techStack?.map((data: string) => (
                                    <div key={data} className="flex flex-col items-center rounded-2xl border border-zinc-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 shadow-sm">
                                        <img src={`https://deviconapi.vercel.app/${data}?theme=light&size=50`} className="h-10 w-10 object-contain" />
                                        <div className="mt-2 text-center">{data}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-[32px] border border-zinc-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.05)]">
                            <div className="text-2xl font-semibold tracking-tight text-slate-900">
                                Office location
                            </div>
                            <div className="mt-5 space-y-3">
                                {state?.locations?.map((data: string) => (
                                    <div key={data} className="rounded-2xl border border-zinc-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                                        {data}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyDetails
