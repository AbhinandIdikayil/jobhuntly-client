import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Outlet, useOutletContext } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react'
import CompanyScreenFrame from 'src/components/company/CompanyScreenFrame'
import { sendRequest } from 'src/redux/actions/companyAction'
import { AppDispatch, RootState } from 'src/redux/store'
import { prop } from 'src/types/AllTypes'

function Settings() {
    const { open } = useOutletContext<prop>()
    const dispatch: AppDispatch = useDispatch()
    const state = useSelector((state: RootState) => state.user)
    const profileReady = Boolean(
        state?.user?.name &&
            state?.user?.email &&
            state?.user?.description &&
            state?.user?.industry &&
            state?.user?.employees &&
            state?.user?.locations &&
            state?.user?.techStack,
    )

    async function hanldeRequest() {
        try {
            if (!state?.user?.profileCompletionStatus) {
                toast.error('please complete the profile');
                return
            }
            const data = await dispatch(sendRequest()).unwrap()
            console.log(data)
            toast.success('Request has been send',{
                position:"top-center"
            })
        } catch (error: any) {
            if(error?.message) {
                toast.warn('Request has been already sent',{
                    position:"top-center"
                })
            }
            console.log(error)
        }
    }

    return (
        <CompanyScreenFrame
            className={open ? 'pl-0 lg:pl-0' : ''}
            eyebrow="Company workspace"
            title="Settings"
            description="Finish your company profile, publish public details, and keep your social links aligned with the rest of the workspace."
            actions={
                <>
                    <button
                        onClick={hanldeRequest}
                        className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
                    >
                        <Sparkles className="h-4 w-4" />
                        Send request
                    </button>
                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
                        <ShieldCheck className="h-4 w-4" />
                        {profileReady ? 'Profile ready' : 'Profile incomplete'}
                    </div>
                </>
            }
            stats={[
                {
                    label: 'Current section',
                    value: 'Company profile',
                    hint: 'Overview and social links',
                },
                {
                    label: 'Access',
                    value: state?.user?.profileCompletionStatus ? 'Approved' : 'Pending',
                    hint: 'Request is tied to profile completion',
                },
                {
                    label: 'Primary action',
                    value: 'Send request',
                    hint: 'Submit once the profile is complete',
                },
            ]}
        >
            <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/85 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl">
                <div className="border-b border-slate-200/80 px-4 py-4 sm:px-6">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">
                                Sections
                            </p>
                            <p className="mt-1 text-sm text-slate-600">
                                Switch between company overview and public social links.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <NavLink
                                to={''}
                                end
                                className={({ isActive }) =>
                                    `inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                                        isActive
                                            ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20'
                                            : 'border border-slate-200 bg-white text-slate-600 hover:border-amber-300 hover:text-slate-900'
                                    }`
                                }
                            >
                                Overview
                            </NavLink>
                            {profileReady ? (
                                <NavLink
                                    to="social-links"
                                    className={({ isActive }) =>
                                        `inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                                            isActive
                                                ? 'bg-amber-400 text-slate-900 shadow-lg shadow-amber-200/60'
                                                : 'border border-slate-200 bg-white text-slate-600 hover:border-amber-300 hover:text-slate-900'
                                        }`
                                    }
                                >
                                    Social links
                                    <ArrowRight className="h-4 w-4" />
                                </NavLink>
                            ) : (
                                <button
                                    onClick={() =>
                                        toast.warn('Complete the overview section before opening social links', {
                                            position: 'top-center',
                                        })
                                    }
                                    className="inline-flex items-center gap-2 rounded-full border border-dashed border-amber-300 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700 transition hover:bg-amber-100"
                                >
                                    Social links locked
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="px-4 py-5 sm:px-6">
                    <Outlet />
                </div>
            </div>
        </CompanyScreenFrame>
    )
}

export default Settings
