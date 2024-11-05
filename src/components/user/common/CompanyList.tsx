import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Checkbox } from '@/components/ui/checkbox'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import { listAllCompanies } from 'src/redux/actions/commonAction';
import { AppDispatch, RootState } from 'src/redux/store';
import { prop } from 'src/types/AllTypes';
import CompanyCard from './CompanyCard';
import Loading from 'src/components/common/Loading';
import { DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { Button, FormControl, InputLabel } from '@mui/material';
import { BootstrapInput } from 'src/components/common/BootsrapInput';
import SectoresAccordian from 'src/components/common/SectoresAccordian';
import Lottie from 'lottie-react'
import animation from 'src/animation/Animation - 1728884349481.json'
interface FilterAndSearch {
    name: string;
    location: string;
    category: any[];
}

function CompanyList() {
    const context = useOutletContext<prop>() || {};
    const { open } = context;
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
    const page = Math.ceil((state?.companies?.totalCount?.[0]?.count || 5) / pagination.pageSize)

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
        // if (filterAndSearch?.name?.trim().length == ) {
        //     return toast.error('At least 2 character', {
        //         position: 'top-center'
        //     })
        // }
        setStartNameSearch(!startNameSearch)
    }

    function handleCategory(e: any, _id: string) {
        const target = e.currentTarget; // or e.target if it's directly on the button
        const ariaChecked = target.getAttribute('aria-checked');

        // Optional: Toggle aria-checked value if needed
        const newAriaChecked = ariaChecked === 'true' ? 'false' : 'true';
        target.setAttribute('aria-checked', newAriaChecked);
        setFilterAndSearch(prevState => {
            let updatedCategory;

            if (newAriaChecked === 'true') {
                // Add category if checked
                updatedCategory = [...prevState.category, _id];
            } else {

                // Remove category if unchecked
                updatedCategory = prevState.category.filter(id => id !== _id);
            }

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
        <>
            <div className={`flex flex-col items-center justify-center ${open && open ? 'w-full' : 'w-full'}  ${open && open ? 'bg-none' : 'bg-slate-50'}`}>
                <div className={`${open && open ? 'hidden' : ''} `}>
                    <div className={`hidden sm:flex gap-4 mt-10 text-5xl font-semibold text-center leading-[52.8px] max-md:flex-wrap max-md:text-4xl`}>
                        <div className="self-start text-slate-800 max-md:text-4xl">
                            Find your
                        </div>
                        <div className={`flex-col text-sky-400 max-md:text-4xl`}>
                            <div className="max-md:text-4xl">dream job</div>
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/4c5387d8afcfab9fd00e94a5a0ff7e7093a6a80b56f15adaf6cecf8274992e61?"
                                className="self-center aspect-[16.67] w-[241px]"
                            />
                        </div>
                    </div>
                    <div className={`hidden sm:block mt-6 text-lg leading-7 text-center text-slate-600 max-md:max-w-full`}>
                        Find your next career at companies like HubSpot, Nike, and Dropbox
                    </div>
                </div>
                <hr className={`${open ? 'w-full bg-black border-solid border-black' : 'hidden'}`} />
                <div className="p-6 flex justify-center items-center w-full bg-white max-w-[800px]  max-md:max-w-full">
                    <div className="flex gap-5 max-md:flex-col">
                        <FormControl sx={{ m: 1 }} variant="standard">
                            <InputLabel
                                htmlFor="demo-customized-textbox"
                            >
                                Search company name
                            </InputLabel>
                            <BootstrapInput onChange={(e) => setFilterAndSearch({ ...filterAndSearch, name: e.target.value })} id="demo-customized-textbox" />
                        </FormControl>
                        <FormControl sx={{ m: 1 }} variant="standard">
                            <InputLabel htmlFor="demo-customized-select-native">location</InputLabel>
                            <BootstrapInput onChange={(e) => setFilterAndSearch({ ...filterAndSearch, location: e.target.value })} id="demo-customized-textbox" />
                        </FormControl>
                        <Button
                            onClick={handleSearch}
                            sx={{
                                m: 1, marginTop: '30px', backgroundColor: 'rgb(79 70 229)', color: 'white', borderRadius: '0px', fontWeight: '600', '&:hover': {
                                    backgroundColor: 'rgb(55 48 163)', // Darker shade for hover
                                }
                            }}
                            variant='outlined'
                        >
                            search companies
                        </Button>
                    </div>
                </div>
                <hr className={`${open ? 'w-full bg-black border-solid border-black' : 'hidden'}`} />
            </div>
            <div className="flex justify-center items-center self-stretch px-10 py-10 bg-white max-md:px-5">
                <div className="w-full max-w-[1192px] max-md:max-w-full">
                    <div className="flex gap-5 max-md:flex-col">
                        <div className="flex flex-col w-1/5 max-md:ml-0 max-md:w-full">
                            <div className="flex flex-col text-base leading-6 text-slate-900">
                                <Accordion type="multiple" className="w-full">
                                    <SectoresAccordian handleCategory={handleCategory} />

                                    <AccordionItem value="item-2" className=' border px-2 rounded-lg mt-1 shadow-sm'>
                                        <AccordionTrigger className='font-bold text-sm'>Company size</AccordionTrigger>
                                        <AccordionContent>
                                            <div className='flex flex-wrap gap-2 items-center justify-start mb-1'>
                                                <Checkbox id="terms2" />
                                                <label
                                                    htmlFor="terms2"
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    1-50 (25)
                                                </label>
                                            </div>
                                            <div className='flex flex-wrap gap-2 items-center justify-start mb-1'>
                                                <Checkbox id="terms2" />
                                                <label
                                                    htmlFor="terms2"
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    1-50 (25)
                                                </label>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        </div>
                        <div className="flex flex-col ml-5 w-[82%] max-md:ml-0 max-md:w-full">
                            <div className="flex flex-col grow max-md:mt-10 max-md:max-w-full">
                                <div className="flex gap-5 justify-between px-px w-full max-md:flex-wrap max-md:max-w-full">
                                    <div className="flex flex-col text-slate-900">
                                        <div className="text-3xl font-semibold leading-10">
                                            All Companies
                                        </div>
                                        <span className="font-semibold leading-10 border border-solid rounded-lg px-2 w-fit shadow-sm">
                                            showing
                                            {' '}
                                            {state?.companies?.totalCount?.[0]?.count}
                                            {' '}
                                            result
                                        </span>
                                    </div>
                                </div>
                                <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 pt-2'>
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
                                        <div className='w-full h-96'>
                                            <Lottie className='w-full h-full' animationData={animation} />
                                        </div>
                                    )
                                }
                                <div className='flex items-center justify-center gap-2 font-bold'>
                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            if (pagination.pageIndex < page) {
                                                if (pagination.pageIndex + 1 > 1) {
                                                    setPagination({ ...pagination, pageIndex: pagination.pageIndex - 1 })
                                                }
                                            }
                                        }}
                                        className="h-8 w-8 p-0"
                                    >
                                        <span className="sr-only">Go to first page</span>
                                        <DoubleArrowLeftIcon className="h-4 w-4" />
                                    </Button>
                                    {
                                        <span className='font-thin'>
                                            page {pagination?.pageIndex + 1} of {page}
                                        </span>
                                    }
                                    <Button
                                        variant="contained"
                                        className={`h-8 w-8 p-0`}
                                        onClick={() => {
                                            if (pagination.pageIndex < page) {
                                                if (pagination.pageIndex + 1 < page) {
                                                    setPagination({ ...pagination, pageIndex: pagination.pageIndex + 1 })
                                                }
                                            }
                                        }}
                                    >
                                        <span className="sr-only">Go to first page</span>
                                        <DoubleArrowRightIcon className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Loading loading={loading} key={'company-loading'} />
            </div>
        </>
    )
}

export default CompanyList