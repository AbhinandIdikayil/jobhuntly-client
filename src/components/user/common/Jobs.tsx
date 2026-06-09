import { useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button'
import {
    Accordion,
} from "@/components/ui/accordion"
import { prop } from 'src/types/AllTypes';
import { useOutletContext } from 'react-router-dom';
import UserJobCard from './JobCard'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/redux/store';
import { applyJob, getAllJob, recommendedJobs } from 'src/redux/actions/jobAction';
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from 'react-toastify';
import { DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { BootstrapInput } from 'src/components/common/BootsrapInput';
import CategoryAccordian from 'src/components/common/CategoryAccordian';
import SectoresAccordian from 'src/components/common/SectoresAccordian';
import SalaryAccordian from 'src/components/common/SalaryAccordian';
import Loading from 'src/components/common/Loading';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import Lottie from 'lottie-react'
import animation from 'src/animation/Animation - 1728884349481.json'
import { Search, Sparkles } from 'lucide-react';

function Jobs() {
    const context = useOutletContext<prop>() || {};
    const { open } = context;
    const jobState = useSelector((state: RootState) => state.job);
    const userState = useSelector((state: RootState) => state.user)
    const dispatch: AppDispatch = useDispatch()
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [pdf, setPdf] = useState<any[]>([])
    const [jobid, setJobId] = useState<string>()
    const [companyId, setCompanyId] = useState<string>()
    const [loading, setLoading] = useState(false)
    const [minSalary, setMinSalary] = useState<number>()
    const [maxSalary, setMaxSalary] = useState<number>()
    const [startNameSearch, setStartNameSearch] = useState<boolean>(false)
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 5,
    });

    interface FilterAndSearch {
        name: string;
        location: string;
        category: any[];
        employment: any[] | [];
        price: number[] | [];
    }

    const [filterAndSearch, setFilterAndSearch] = useState<FilterAndSearch>({
        name: '',
        location: '',
        category: [],
        employment: [],
        price: [],
    })

    const totalJobs = jobState?.jobs?.totalCount?.[0]?.count || 0
    const totalPages = Math.max(1, Math.ceil((totalJobs || 5) / pagination.pageSize))
    const recommendedCount = jobState?.recommended?.length || 0

    const fetchData = async (page: number, pageSize: number, name?: string, employment?: string[], category?: string[], price?: number[], location?: string) => {
        try {
            setLoading(true)
            await dispatch(getAllJob({
                page,
                pageSize,
                name,
                employment,
                category,
                price,
                location,
            })).unwrap()
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData(
            pagination.pageIndex + 1,
            pagination.pageSize,
            filterAndSearch?.name,
            filterAndSearch?.employment,
            filterAndSearch?.category,
            mergeRanges(filterAndSearch?.price),
            filterAndSearch?.location
        )
    }, [pagination.pageIndex, pagination.pageSize, filterAndSearch?.employment, filterAndSearch?.category, filterAndSearch?.price, startNameSearch])

    function applyForJob(data: any) {
        if (userState?.user.resumes.length > 0) {
            setModalOpen(true)
            setJobId(data.jobId)
            setCompanyId(data.companyId)
            setPdf(userState?.user.resumes)
        } else {
            toast.error('please provide a resume')
        }
    }

    async function handleResume(data: string) {
        let userid = userState?.user._id;
        try {
            let res = await dispatch(applyJob({ userid, jobid, resume: data, companyId })).unwrap()
            if (res) {
                setModalOpen(false)
            }
            toast.success('applied successfully', { position: "top-center" })
        } catch (error) {
            console.log(error)
            toast.error(jobState?.err?.message, { position: "top-center" })
        }
    }

    function handleSearch() {
        setStartNameSearch(!startNameSearch)
    }

    function handleCategory(e: any, _id: string) {
        const target = e.currentTarget;
        const ariaChecked = target.getAttribute('aria-checked');
        const newAriaChecked = ariaChecked === 'true' ? 'false' : 'true';
        target.setAttribute('aria-checked', newAriaChecked);
        setFilterAndSearch(prevState => {
            const updatedCategory = newAriaChecked === 'true'
                ? [...prevState.category, _id]
                : prevState.category.filter(id => id !== _id);

            return {
                ...prevState,
                category: updatedCategory
            };
        })
    }

    function handleEmployment(e: any, _id: string) {
        const target = e.currentTarget;
        const ariaChecked = target.getAttribute('aria-checked');
        const newAriaChecked = ariaChecked === 'true' ? 'false' : 'true';
        target.setAttribute('aria-checked', newAriaChecked);
        setFilterAndSearch(prevState => {
            const updatedEmployment = newAriaChecked === 'true'
                ? [...prevState.employment, _id]
                : prevState.employment.filter(id => id !== _id);

            return {
                ...prevState,
                employment: updatedEmployment
            };
        })
    }

    function handleSalary(e: any, data: any[]) {
        const target = e.currentTarget;
        const ariaChecked = target.getAttribute('aria-checked');
        const newAriaChecked = ariaChecked === 'true' ? 'false' : 'true';
        target.setAttribute('aria-checked', newAriaChecked);
        setFilterAndSearch((prevState: any) => {
            const updatedPrice = newAriaChecked === 'true'
                ? [...prevState.price, data]
                : prevState.price.filter(
                    (r: any) => r[1] != data[1] || r[0] != data[0]
                );

            mergeRanges(updatedPrice);
            return {
                ...prevState,
                price: updatedPrice
            };
        })
    }

    function handleInputSalary() {
        setFilterAndSearch((prev: any) => {
            return {
                ...prev,
                price: [minSalary, maxSalary]
            }
        })
    }

    const mergeRanges = (ranges: any) => {
        if (ranges.length === 0) return [];
        const sortedRanges = ranges.sort((a: any, b: any) => a[0] - b[0]);
        const merged = [sortedRanges?.[0]?.[0] || sortedRanges?.[0], sortedRanges?.[sortedRanges?.length - 1]?.[1] || sortedRanges?.[sortedRanges?.length - 1]];
        return merged
    };

    useEffect(() => {
        dispatch(recommendedJobs()).unwrap()
    }, [])

    const jobList = (items: any[] = []) => (
        <>
            {items.length > 0 ? (
                items.map((data: any, ind: number) => (
                    <UserJobCard key={ind} data={data} apply={applyForJob} />
                ))
            ) : (
                <div className='flex min-h-[420px] items-center justify-center rounded-[28px] border border-dashed border-zinc-200 bg-white'>
                    <Lottie className='h-72 w-full max-w-lg' animationData={animation} />
                </div>
            )}
        </>
    )

    return (
        <div className={`min-h-screen bg-[linear-gradient(180deg,#faf9f7_0%,#ffffff_50%,#f8fafc_100%)] ${open ? '' : ''}`}>
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <section className="relative overflow-hidden rounded-[32px] border border-zinc-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.06)] sm:p-8">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.10),_transparent_34%),radial-gradient(circle_at_bottom_left,_rgba(16,185,129,0.08),_transparent_32%)]" />
                    <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700">
                                <Sparkles size={14} />
                                Curated jobs
                            </div>
                            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                                Find your next role without the noise.
                            </h1>
                            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
                                Search by company, location, or salary and browse the strongest matches in a cleaner, more focused layout.
                            </p>
                        </div>

                        <div className="w-full max-w-3xl rounded-[28px] border border-zinc-200 bg-white/90 p-4 shadow-sm backdrop-blur">
                            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]">
                                <FormControl sx={{ m: 0 }} variant="standard">
                                    <InputLabel htmlFor="demo-customized-textbox">Search company name</InputLabel>
                                    <BootstrapInput onChange={(e) => setFilterAndSearch({ ...filterAndSearch, name: e.target.value })} id="demo-customized-textbox" />
                                </FormControl>
                                <FormControl sx={{ m: 0 }} variant="standard">
                                    <InputLabel htmlFor="demo-customized-select-native">location</InputLabel>
                                    <BootstrapInput onChange={(e) => setFilterAndSearch({ ...filterAndSearch, location: e.target.value })} id="demo-customized-textbox" />
                                </FormControl>
                                <Button
                                    onClick={handleSearch}
                                    sx={{
                                        m: 0,
                                        height: '52px',
                                        marginTop: { xs: '8px', lg: '22px' },
                                        backgroundColor: 'rgb(79 70 229)',
                                        color: 'white',
                                        borderRadius: '16px',
                                        fontWeight: '700',
                                        paddingInline: '24px',
                                        '&:hover': {
                                            backgroundColor: 'rgb(67 56 202)',
                                        }
                                    }}
                                    variant="contained"
                                    startIcon={<Search size={18} />}
                                >
                                    Search jobs
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="mt-6 rounded-[32px] border border-zinc-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.05)]">
                    <Tabs defaultValue="jobs" className="p-6 sm:p-8">
                        <div className="flex flex-col items-center gap-4">
                            <div className="text-3xl font-semibold tracking-tight text-slate-900">
                                All Jobs
                            </div>
                            <TabsList className='inline-flex h-auto gap-2 rounded-full border border-zinc-200 bg-slate-50 p-1 shadow-sm'>
                                <TabsTrigger value='jobs' className={cn("rounded-full px-4 py-2 text-sm font-semibold text-slate-600 data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-sm")}>
                                    Showing {totalJobs} results
                                </TabsTrigger>
                                <TabsTrigger value='recommended' className={cn("rounded-full px-4 py-2 text-sm font-semibold text-slate-600 data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-sm")}>
                                    recommended jobs {recommendedCount}
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        <TabsContent value='jobs' className="mt-8">
                            <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
                                <aside className="h-fit lg:sticky lg:top-6">
                                    <div className="rounded-[28px] border border-zinc-200 bg-white p-4 shadow-sm">
                                        <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                            Filters
                                        </div>
                                        <Accordion type="multiple" className="w-full">
                                            <CategoryAccordian handleEmployment={handleEmployment} />
                                            <SectoresAccordian handleCategory={handleCategory} />
                                            <SalaryAccordian
                                                handleSalary={handleSalary}
                                                setMaxSalary={setMaxSalary}
                                                setMinSalary={setMinSalary}
                                                minSalary={minSalary}
                                                handleInputSalary={handleInputSalary}
                                            />
                                        </Accordion>
                                    </div>
                                </aside>

                                <div className="flex flex-col gap-4">
                                    {jobList(jobState?.jobs?.jobs)}

                                    <div className='flex items-center justify-center gap-3 rounded-[24px] border border-zinc-200 bg-white px-4 py-3 font-bold shadow-sm'>
                                        <Button
                                            variant="contained"
                                            onClick={() => {
                                                if (pagination.pageIndex > 0) {
                                                    setPagination({ ...pagination, pageIndex: pagination.pageIndex - 1 })
                                                }
                                            }}
                                            className="h-10 w-10 rounded-full bg-indigo-600 p-0 shadow-sm hover:bg-indigo-700"
                                        >
                                            <span className="sr-only">Previous page</span>
                                            <DoubleArrowLeftIcon className="h-4 w-4" />
                                        </Button>
                                        <span className='rounded-full bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600'>
                                            page {pagination?.pageIndex + 1} of {totalPages}
                                        </span>
                                        <Button
                                            variant="contained"
                                            className="h-10 w-10 rounded-full bg-indigo-600 p-0 shadow-sm hover:bg-indigo-700"
                                            onClick={() => {
                                                if (pagination.pageIndex + 1 < totalPages) {
                                                    setPagination({ ...pagination, pageIndex: pagination.pageIndex + 1 })
                                                }
                                            }}
                                        >
                                            <span className="sr-only">Next page</span>
                                            <DoubleArrowRightIcon className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value='recommended' className="mt-8">
                            <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
                                <div className="hidden lg:block" />
                                <div className="flex flex-col gap-4">
                                    {jobList(jobState?.recommended)}
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

            <AlertDialog open={modalOpen}>
                <AlertDialogTrigger asChild>
                    <span />
                </AlertDialogTrigger>
                <AlertDialogContent className='max-w-[92vw] sm:max-w-fit rounded-[28px] border-zinc-200'>
                    <AlertDialogHeader>
                        <div className='flex max-w-full gap-4 overflow-x-auto pb-2'>
                            {
                                pdf.map((data, index) => (
                                    <div key={index} className='flex shrink-0 flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm'>
                                        <iframe
                                            width="320"
                                            className='w-[280px] sm:w-[320px]'
                                            height="360"
                                            src={data}
                                        />
                                        <button
                                            type='button'
                                            className='rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700'
                                            onClick={() => handleResume(data)}
                                        >
                                            Select resume
                                        </button>
                                    </div>
                                ))
                            }
                        </div>
                    </AlertDialogHeader>
                    <AlertDialogFooter className='items-center justify-between gap-3'>
                        <span className='text-sm text-slate-500'>Choose the resume you want to attach.</span>
                        <AlertDialogCancel onClick={() => setModalOpen(false)} className="rounded-xl border-zinc-200">
                            Cancel
                        </AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <Loading loading={loading} key={'loading'} />
        </div>
    )
}

export default Jobs
