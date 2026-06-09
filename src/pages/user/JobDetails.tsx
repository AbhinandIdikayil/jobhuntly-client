import { format } from 'date-fns';
import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useOutletContext, useParams } from 'react-router-dom';
import { setJobById } from 'src/redux/reducers/jobSlice';
import { AppDispatch, RootState } from 'src/redux/store';
import { prop } from 'src/types/AllTypes';
import { formatSalary } from 'src/utils/formatSalary';

function JobDetails() {
    const { id } = useParams()
    const location = useLocation()
    const dispatch: AppDispatch = useDispatch();
    const state = useSelector((state: RootState) => state.job)
    const context = useOutletContext<prop>() || {};
    const { open } = context;

    useEffect(() => {
        window.scroll(0, 0)
        if (id) {
            dispatch(setJobById(id))
        }
    }, [id, location])

    function formatDate(date: string) {
        if (date) {
            const givenDate = new Date(date)
            return format(givenDate, 'dd-MMM-yy');
        }
    }

    return (
        <div className={`min-h-screen bg-[linear-gradient(180deg,#faf9f7_0%,#ffffff_48%,#f8fafc_100%)] ${open ? '' : ''}`}>
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div className="rounded-[32px] border border-zinc-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.06)] sm:p-8">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                                <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-zinc-200 bg-slate-50 shadow-sm">
                                    <img
                                        loading="lazy"
                                    src={state?.job?.company?.images}
                                    className="h-full w-full object-contain p-2"
                                />
                            </div>
                            <div className="max-w-3xl">
                                <div className="flex flex-wrap items-center gap-3">
                                    <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                                        {state?.job?.jobTitle}
                                    </h1>
                                    <span className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700">
                                        {state?.job?.employmentDetails?.name}
                                    </span>
                                </div>
                                <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-600">
                                    <span className="font-semibold text-slate-800">{state?.job?.company?.name}</span>
                                    <span className="text-slate-300">•</span>
                                    <span>{state?.job?.company?.locations?.[0]}</span>
                                    <span className="text-slate-300">•</span>
                                    <span>{state?.job?.employmentDetails?.name}</span>
                                </div>
                                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                                    A cleaner, more focused job detail layout that keeps the key action visible while giving the role description room to breathe.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col items-start gap-3 lg:items-end">
                            <div className="flex items-center gap-3 text-slate-400">
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/e3738b4dd49192a6d40bc920921c9d25176575734d8e5ca5741203c937e095d6?apiKey=bf80438c4595450788b907771330b274&&apiKey=bf80438c4595450788b907771330b274"
                                    className="w-8 aspect-[0.97]"
                                />
                                <button className="rounded-xl border border-zinc-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-indigo-200 hover:text-indigo-700">
                                    Share
                                </button>
                            </div>
                            <div className="rounded-2xl bg-indigo-600 px-8 py-3.5 text-base font-bold text-white shadow-[0_10px_20px_rgba(79,70,229,0.18)]">
                                Apply
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_360px]">
                    <div className="rounded-[32px] border border-zinc-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.05)] sm:p-8">
                        <div className="space-y-10 text-slate-600">
                            <section>
                                <div className="text-2xl font-semibold tracking-tight text-slate-900">
                                    Description
                                </div>
                                <p className="mt-4 max-w-4xl text-sm leading-7 capitalize sm:text-base">
                                    {state?.job?.description}
                                </p>
                            </section>

                            <section>
                                <div className="text-2xl font-semibold tracking-tight text-slate-900">
                                    Responsibilities
                                </div>
                                <div className="mt-4 space-y-3">
                                    {state?.job?.responsibilities?.map((data, index) => {
                                        if (typeof data === 'string' && data.length > 0) {
                                            return (
                                                <div key={index} className="flex gap-3 rounded-2xl border border-zinc-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700 sm:text-base">
                                                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-400" />
                                                    <div className="capitalize">{data}</div>
                                                </div>
                                            );
                                        }
                                        return null;
                                    })}
                                </div>
                            </section>

                            <section>
                                <div className="text-2xl font-semibold tracking-tight text-slate-900">
                                    Who You Are
                                </div>
                                <div className="mt-4 space-y-3">
                                    {state?.job?.qualification?.map((data, ind) => {
                                        if (typeof data === 'string' && data.length > 0) {
                                            return (
                                                <div key={ind} className="flex gap-3 rounded-2xl border border-zinc-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700 sm:text-base">
                                                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-indigo-500" />
                                                    <div className="capitalize">{data}</div>
                                                </div>
                                            )
                                        }
                                        return null;
                                    })}
                                </div>
                            </section>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="rounded-[32px] border border-zinc-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.05)]">
                            <div className="text-2xl font-semibold tracking-tight text-slate-900">
                                About this role
                            </div>
                            <div className="mt-5 space-y-4 text-sm sm:text-base">
                                <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3">
                                    <span className="text-slate-500">Apply before</span>
                                    <span className="font-semibold text-slate-800">{state?.job?.expiry ? formatDate(state?.job?.expiry) : 'N/A'}</span>
                                </div>
                                <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3">
                                    <span className="text-slate-500">Job posted on</span>
                                    <span className="font-semibold text-slate-800">{state?.job?.createdAt ? formatDate(state?.job?.createdAt) : 'N/A'}</span>
                                </div>
                                <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3">
                                    <span className="text-slate-500">Job type</span>
                                    <span className="font-semibold text-slate-800">{state.job?.employmentDetails?.name}</span>
                                </div>
                                <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3">
                                    <span className="text-slate-500">Salary</span>
                                    <span className="font-semibold text-slate-800">
                                        {formatSalary(Number(state?.job?.salaryrange?.from), Number(state.job?.salaryrange?.to))}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-[32px] border border-zinc-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.05)]">
                            <div className="text-2xl font-semibold tracking-tight text-slate-900">
                                Categories
                            </div>
                            <div className="mt-5 flex flex-wrap gap-3">
                                <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-slate-50 px-3 py-2">
                                    <img className='h-8 w-8 rounded-xl object-cover' src={state?.job?.categoryDetails?.image} />
                                    <div className="rounded-full bg-amber-50 px-3 py-1.5 text-sm font-semibold text-amber-600">
                                        {state?.job?.categoryDetails?.name}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-[32px] border border-zinc-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.05)]">
                            <div className="text-2xl font-semibold tracking-tight text-slate-900">
                                Required Skills
                            </div>
                            <div className='mt-4 flex flex-wrap gap-2'>
                                <span className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-sm font-semibold text-indigo-700">
                                    Copy Editing
                                </span>
                                {
                                    state.job?.skills?.map((data, ind) => {
                                        if (typeof data === 'string' && data.length > 0) {
                                            return (
                                                <span key={ind} className="rounded-full border border-zinc-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700">
                                                    {data}
                                                </span>
                                            )
                                        }
                                        return null;
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(JobDetails)
