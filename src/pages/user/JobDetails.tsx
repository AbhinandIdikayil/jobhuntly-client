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
        window.scroll(0,0)
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
        <>

            <div className={`flex flex-col items-center ${open && open ? 'w-full' : 'w-full'}  ${open && open ? 'bg-none' : 'bg-slate-50'} px-3`}>
                <div className="flex w-full gap-5 px-20 justify-between p-6 bg-white  border-zinc-200 max-md:flex-wrap max-md:px-5">
                    <div className="flex gap-5 justify-center max-md:flex-wrap">
                        <img
                            loading="lazy"
                            srcSet={state?.job?.company?.images}
                            className="shrink-0 aspect-[0.97] w-[88px]"
                        />
                        <div className="flex flex-col my-auto">
                            <div className="text-lg sm:text-2xl font-semibold leading-10 text-gray-700">
                                {state?.job?.jobTitle}
                            </div>
                            <div className="flex gap-2 justify-between mt-2 text-xl leading-8 text-slate-600 capitalize">
                                <div>{state?.job?.company?.name}</div>
                                <div> {state?.job?.company?.locations?.[0]} </div>
                                <div> {state?.job?.employmentDetails?.name} </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-5 justify-between py-px my-auto text-lg font-bold leading-7 text-center text-white whitespace-nowrap">
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/e3738b4dd49192a6d40bc920921c9d25176575734d8e5ca5741203c937e095d6?apiKey=bf80438c4595450788b907771330b274&&apiKey=bf80438c4595450788b907771330b274"
                            className="shrink-0 my-auto w-8 aspect-[0.97]"
                        />
                        <div className="px-10 sm:px-14 py-3.5 bg-indigo-600 ">Apply</div>
                    </div>
                </div>
                <div className={`flex justify-center items-center self-stretch  sm:px-5 py-5 bg-white`}>
                    <div className={`${!open && 'px-5 sm:px-10 py-5'} w-full max-w-[1192px] max-md:max-w-full`}>
                        <div className="flex gap-5 max-md:flex-col">
                            <div className="flex flex-col w-[67%] max-md:ml-0 max-md:w-full">
                                <div className="flex flex-col text-base leading-6 text-slate-600 max-md:mt-10 max-md:max-w-full">
                                    <div className="text-lg sm:text-2xl font-semibold leading-10 text-gray-700 max-md:max-w-full">
                                        Description
                                    </div>
                                    <div className="mt-4 leading-7 max-md:max-w-full capitalize">
                                        {state?.job?.description}
                                        {/* Stripe is looking for Social Media Marketing expert to help
                                        manage our online networks. You will be responsible for
                                        monitoring our social media channels, creating content, finding
                                        effective ways to engage the community and incentivize others to
                                        engage on our channels. */}
                                    </div>
                                    <div className="mt-10 text-lg sm:text-2xl font-semibold leading-10 text-gray-700 max-md:max-w-full">
                                        Responsibilities
                                    </div>
                                    <div className="flex flex-col">
                                        {
                                            state?.job?.responsibilities?.map((data, index) => {
                                                if (typeof data === 'string' && data.length > 0) {
                                                    return (
                                                        <div key={index} className='flex gap-2 mt-1 sm:mt-4'>
                                                            <img
                                                                loading="eager"
                                                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/13597c93cc790211f83d37157790033eb10b87552a995f5648afecec4d7bb54b?apiKey=bf80438c4595450788b907771330b274&&apiKey=bf80438c4595450788b907771330b274"
                                                                className="shrink-0 self-start w-5 aspect-square mt-1"
                                                                alt="Responsibility Icon"
                                                            />
                                                            <div className="max-md:max-w-full capitalize">
                                                                {data}
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            })
                                        }
                                        <div className='flex gap-2 mt-1 sm:mt-4'>
                                            <img
                                                loading="lazy"
                                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/13597c93cc790211f83d37157790033eb10b87552a995f5648afecec4d7bb54b?apiKey=bf80438c4595450788b907771330b274&&apiKey=bf80438c4595450788b907771330b274"
                                                className="shrink-0 self-start w-5 aspect-square mt-1"
                                            />
                                            <div className="max-md:max-w-full">
                                                Community engagement to ensure that is supported and actively
                                                represented online
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-10 text-lg sm:text-2xl font-semibold leading-10 text-gray-700 max-md:max-w-full">
                                        Who You Are
                                    </div>
                                    <div className="flex flex-col capitalize">
                                        {
                                            state?.job?.qualification?.map((data, ind) => {
                                                if (typeof data === 'string' && data.length > 0) {
                                                    return (
                                                        <div key={ind} className='flex gap-2 self-start mt-4 '>
                                                            <img
                                                                loading="lazy"
                                                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/6509028df0eed4dc36fdf09450c46d7b3b5b5c59f9501f6a5f89b5a8c65876a4?apiKey=bf80438c4595450788b907771330b274&&apiKey=bf80438c4595450788b907771330b274"
                                                                className="shrink-0 self-start w-5 aspect-square mt-1"
                                                            />
                                                            <div className="max-md:max-w-full">
                                                                {data}
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            })
                                        }
                                        <div className='flex gap-2 self-start mt-4 '>
                                            <img
                                                loading="lazy"
                                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/6509028df0eed4dc36fdf09450c46d7b3b5b5c59f9501f6a5f89b5a8c65876a4?apiKey=bf80438c4595450788b907771330b274&&apiKey=bf80438c4595450788b907771330b274"
                                                className="shrink-0 self-start w-5 aspect-square mt-1"
                                            />
                                            <div className="max-md:max-w-full">
                                                You get energy from people and building the ideal work
                                                environment
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                                <div className="flex flex-col grow max-md:mt-10">
                                    <div className="text-lg sm:text-2xl font-semibold leading-10 text-gray-700">
                                        About this role
                                    </div>
                                    <div className="flex gap-5 justify-between mt-6 text-base leading-6">
                                        <div className="text-slate-600">Apply Before</div>
                                        <div className="font-semibold text-gray-700">
                                            {
                                                state?.job?.expiry && (
                                                    formatDate(state?.job?.expiry)
                                                )
                                            }
                                        </div>
                                    </div>
                                    <div className="flex gap-5 justify-between mt-6 text-base leading-6">
                                        <div className="text-slate-600">Job Posted On</div>
                                        <div className="font-semibold text-gray-700">
                                            {
                                                state?.job?.createdAt && (
                                                    formatDate(state?.job?.createdAt)
                                                )
                                            }
                                        </div>
                                    </div>
                                    <div className="flex gap-5 justify-between mt-6 text-base leading-6">
                                        <div className="text-slate-600">Job Type</div>
                                        <div className="font-semibold text-gray-700">
                                            {state.job?.employmentDetails?.name}
                                        </div>
                                    </div>
                                    <div className="flex gap-5 justify-between mt-6 text-base leading-6">
                                        <div className="text-slate-600">Salary</div>
                                        <div className="font-semibold text-gray-800 text-sm">
                                            {
                                                formatSalary(Number(state?.job?.salaryrange?.from), Number(state.job?.salaryrange?.to))
                                                // state.job?.salaryrange?.from + '-' + state.job?.salaryrange?.to
                                            }
                                        </div>
                                    </div>
                                    <div className="shrink-0 mt-10 h-px border border-solid bg-zinc-200 border-zinc-200" />
                                    <div className="mt-10 text-lg sm:text-2xl font-semibold leading-10 text-gray-700">
                                        Categories
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-6 text-sm font-semibold leading-6 whitespace-nowrap">
                                        <div className='flex border'>
                                            <img className='w-8 h-8'
                                                src={state?.job?.categoryDetails?.image}
                                            />
                                            <div className="px-2.5 py-1.5 text-amber-400 bg-orange-400 bg-opacity-10 rounded-[80px] flex">
                                                {state?.job?.categoryDetails?.name}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="shrink-0 mt-10 h-px border border-solid bg-zinc-200 border-zinc-200" />
                                    <div className="mt-12 text-3xl font-semibold leading-10 text-gray-700 max-md:mt-10">
                                        Required Skills
                                    </div>

                                    <div className='flex flex-wrap gap-1'>
                                        <span className="px-3 py-1 mt-2.5 text-base leading-6 text-indigo-600 bg-slate-50">
                                            Copy Editing
                                        </span>
                                        {
                                            state.job?.skills?.map((data, ind) => {
                                                if (typeof data === 'string' && data.length > 0) {
                                                    return (
                                                        <span key={ind} className="px-3 py-1 mt-2.5 text-base leading-6 text-indigo-600 bg-slate-50">
                                                            {data}
                                                        </span>
                                                    )
                                                } else {
                                                    return null;
                                                }
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default memo(JobDetails)