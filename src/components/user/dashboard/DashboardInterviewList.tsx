import { useSelector } from "react-redux"
import { RootState } from "src/redux/store"
import { formatDateToThree } from "src/utils/formateDate";
import Lottie from 'lottie-react'
import animation from '../../../animation/Animation - 1728884349481.json'

function DashboardInterviewList() {
    const state = useSelector((state: RootState) => state.job)
    const today = new Date();

    const allSchedules = state.applications?.flatMap(applicant =>
        applicant.schedule
            .filter(schedule => {
                const scheduleDate = new Date(schedule.date);
                scheduleDate.setHours(today.getHours(), today.getMinutes(), today.getSeconds(), today.getMilliseconds());

                return scheduleDate > today;
            })
            .map(schedule => ({
                ...schedule,
                companyName: applicant.companyId.name,
                companyEmail: applicant.companyId.email,
                companyImage: applicant.companyId.images
            }))
    );

    return (
        <div className="space-y-3">
            {
                allSchedules?.length > 0 ?
                allSchedules?.map((data: any, index: number) => (
                    <div
                        key={`${data?.companyName}-${data?.date}-${index}`}
                        className="rounded-[24px] border border-zinc-200 bg-slate-50/70 p-4 transition-colors hover:bg-slate-50"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-16 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                                {data?.time}
                            </div>
                            <div className="flex flex-1 items-center gap-4 rounded-[20px] border border-zinc-200 bg-white px-4 py-3 shadow-sm">
                                <img
                                    loading="lazy"
                                    src={data?.companyImage}
                                    className="h-12 w-12 rounded-2xl object-contain bg-slate-50 p-1 ring-1 ring-zinc-200"
                                />
                                <div className="min-w-0">
                                    <div className="truncate text-sm font-semibold text-slate-900">
                                        {data?.companyName}
                                    </div>
                                    <div className="mt-1 text-xs text-slate-500">
                                        {data?.testType} ({formatDateToThree(data?.date)})
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
                : (
                    <div className="flex min-h-[260px] items-center justify-center">
                        <Lottie animationData={animation} />
                    </div>
                )
            }
        </div>
    )
}

export default DashboardInterviewList
