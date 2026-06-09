import { Accordion } from '@/components/ui/accordion'
import { Checkbox } from '@/components/ui/checkbox'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { listAllCompanies } from 'src/redux/actions/commonAction';
import { AppDispatch, RootState } from 'src/redux/store';
import CompanyCard from './CompanyCard';
import Loading from 'src/components/common/Loading';
import { DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { Button, FormControl, InputLabel } from '@mui/material';
import { BootstrapInput } from 'src/components/common/BootsrapInput';
import SectoresAccordian from 'src/components/common/SectoresAccordian';
import Lottie from 'lottie-react'
import animation from 'src/animation/Animation - 1728884349481.json'
import { Search, Sparkles } from 'lucide-react';

interface FilterAndSearch {
    name: string;
    location: string;
    category: any[];
}

function CompanyList() {
    const dispatch: AppDispatch = useDispatch()
    const state = useSelector((state: RootState) => state.admin)
    const [loading, setLoading] = useState<boolean>(false)
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 5,
    });
    const [filterAndSearch, setFilterAndSearch] = useState<FilterAndSearch>({
        name: '',
        category: [],
        location: ''
    })
    const [startNameSearch, setStartNameSearch] = useState<boolean>(false)
    const totalCompanies = state?.companies?.totalCount?.[0]?.count || 0
    const page = Math.max(1, Math.ceil((totalCompanies || 5) / pagination.pageSize))

    const fetchData = async (page: number, pageSize: number, name?: string, category?: string[], location?: string) => {
        try {
            setLoading(true)
            await dispatch(listAllCompanies({
                page,
                pageSize,
                name,
                category,
                location
            })).unwrap()
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
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

    useEffect(() => {
        fetchData(
            pagination?.pageIndex + 1,
            pagination?.pageSize,
            filterAndSearch?.name,
            filterAndSearch?.category,
            filterAndSearch?.location
        )
    }, [pagination?.pageIndex, pagination?.pageSize, filterAndSearch?.category, startNameSearch])

    return (
        <div className="min-h-screen bg-[linear-gradient(180deg,#faf9f7_0%,#ffffff_50%,#f8fafc_100%)]">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <section className="relative overflow-hidden rounded-[32px] border border-zinc-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.06)] sm:p-8">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.10),_transparent_34%),radial-gradient(circle_at_bottom_left,_rgba(16,185,129,0.08),_transparent_32%)]" />
                    <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                                <Sparkles size={14} />
                                Company directory
                            </div>
                            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                                Discover the companies hiring right now.
                            </h1>
                            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
                                Explore company profiles with a cleaner search flow, richer cards, and a more editorial visual hierarchy.
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
                                    variant='contained'
                                    startIcon={<Search size={18} />}
                                >
                                    Search companies
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="mt-6 rounded-[32px] border border-zinc-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.05)]">
                    <div className="p-6 sm:p-8">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
                            <aside className="lg:w-[300px]">
                                <div className="rounded-[28px] border border-zinc-200 bg-white p-4 shadow-sm">
                                    <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                        Filters
                                    </div>
                                    <Accordion type="multiple" className="w-full">
                                        <SectoresAccordian handleCategory={handleCategory} />

                                        <div className='mt-1 rounded-2xl border border-zinc-200 bg-white p-2 shadow-sm'>
                                            <div className='px-2 py-2 text-sm font-semibold text-slate-800'>
                                                Company size
                                            </div>
                                            <div className='space-y-3 px-2 pb-2'>
                                                <div className='flex flex-wrap gap-2 items-center justify-start rounded-xl px-2 py-2 hover:bg-indigo-50/60 transition-colors'>
                                                    <Checkbox id="terms2" className='border-zinc-300 text-indigo-600' />
                                                    <label htmlFor="terms2" className="text-sm font-medium leading-none text-slate-700">
                                                        1-50 (25)
                                                    </label>
                                                </div>
                                                <div className='flex flex-wrap gap-2 items-center justify-start rounded-xl px-2 py-2 hover:bg-indigo-50/60 transition-colors'>
                                                    <Checkbox id="terms3" className='border-zinc-300 text-indigo-600' />
                                                    <label htmlFor="terms3" className="text-sm font-medium leading-none text-slate-700">
                                                        50-200 (18)
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </Accordion>
                                </div>
                            </aside>

                            <div className="flex-1">
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col text-slate-900">
                                        <div className="text-3xl font-semibold tracking-tight">
                                            All Companies
                                        </div>
                                        <span className="mt-2 inline-flex w-fit rounded-full border border-zinc-200 bg-slate-50 px-3 py-1 text-sm font-semibold text-slate-600 shadow-sm">
                                            showing {totalCompanies} result{totalCompanies === 1 ? '' : 's'}
                                        </span>
                                    </div>

                                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-2'>
                                        {
                                            state?.companies?.companies?.length > 0 &&
                                            state?.companies?.companies.map((data: any, index) => {
                                                return data?.approvalStatus === 'Accepted' && (
                                                    <CompanyCard key={index} data={data} />
                                                )
                                            })
                                        }
                                    </div>

                                    {
                                        state?.companies?.companies?.length == 0 && (
                                            <div className='flex min-h-[420px] items-center justify-center rounded-[28px] border border-dashed border-zinc-200 bg-white'>
                                                <Lottie className='w-full max-w-lg' animationData={animation} />
                                            </div>
                                        )
                                    }

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
                                            page {pagination?.pageIndex + 1} of {page}
                                        </span>
                                        <Button
                                            variant="contained"
                                            className="h-10 w-10 rounded-full bg-indigo-600 p-0 shadow-sm hover:bg-indigo-700"
                                            onClick={() => {
                                                if (pagination.pageIndex + 1 < page) {
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
                        </div>
                    </div>
                </div>
            </div>
            <Loading loading={loading} key={'company-loading'} />
        </div>
    )
}

export default CompanyList
