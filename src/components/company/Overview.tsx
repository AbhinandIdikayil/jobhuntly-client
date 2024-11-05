import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, FormikValues } from 'formik'
import TypeDate from '../common/TypeDate'
import { LocationInput } from '../common/LocationInput'
import { companyProfile } from '../../validation/company/index'
import TechStackInput from '../common/TechStackInput'
import { CalendarDate } from '@internationalized/date'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import { getCompany, updateProfile } from 'src/redux/actions/companyAction'
import { Backdrop, CircularProgress } from '@mui/material'
import { IoCloseCircle } from 'react-icons/io5'
import { uploadToCloudinary } from 'src/utils/common/cloudinaryUpload'


function Overview() {
    const dispatch: AppDispatch = useDispatch()
    const state = useSelector((state: RootState) => state?.user)
    let companyProfileInitialState = {
        name: state.user?.name || '',
        website: state.user?.website || '',
        locations: state.user?.location || [''],
        industry: state.user?.industry || '',
        employees: state.user?.employees || '',
        foundedDate: state.user?.foundedDate || '06/11/1995',
        description: state.user?.description || '',
        techStack: state.user?.techStack || ['']
    }

    const [locations, setLocation] = useState<any[]>(state.user?.locations || []);
    const [stacks, setStacks] = useState<any[]>(state?.user?.techStack || []);
    const [imagePreview, setImagePreview] = useState('')
    const [date, setDate] = useState(state.user?.foundedDate || new CalendarDate(2024, 7, 15));
    const [employee, setEmployee] = useState(state.user?.employees || '1-5')
    const [industry, setIndustry] = useState(state.user?.industry || 'technology')
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true)

    //$ to list the number of employees array
    const allOptions = ['1-5', '5-15', '15-30', '30-40', '40-65', '65-100'];
    const optionsToDisplay = allOptions.filter(option => option !== employee);


    const fetchData = async () => {
        try {
            await dispatch(getCompany()).unwrap()
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        if (state.user) {
            companyProfileInitialState = {
                ...companyProfileInitialState,
                name: state.user?.name || '',
                website: state.user?.website || '',
                locations: state.user?.location || [''],
                industry: state.user?.industry || '',
                employees: state.user?.employees || '',
                foundedDate: state.user?.foundedDate || '06/11/1995',
                description: state.user?.description || '',
                techStack: state.user?.techStack || ['']
            }

            setLocation(state.user?.locations ?? []);
            setStacks(state.user?.techStack ?? []);
            setDate(state.user?.foundedDate ?? new CalendarDate(2024, 7, 15));
            setEmployee(state.user?.employees ?? '1-5');
            setIndustry(state.user?.industry ?? 'technology');
        }
    }, [state?.user])


   


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target?.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    setImagePreview(reader.result);
                } else {
                    console.error('FileReader result is not a string');
                }
            };
            reader.readAsDataURL(file);
        }
    }

    async function handleSubmit(values: FormikValues, helpers: any) {
        const { setSubmitting, setFieldError } = helpers
        if (!locations?.length || !stacks?.length) {
            console.log('Locations or tech stacks are missing');
            setFieldError('asdfad')
            setSubmitting(false); // End Formik's submitting state
            return;
        }
        setOpen(true)
        const year = date.year;
        const month = date.month - 1; // JavaScript Date months are 0-based
        const day = date.day;
        const newDate = new Date(Date.UTC(year, month, day));

        let images = await uploadToCloudinary(imagePreview)

        let request = {
            ...values,
            employees: employee,
            techStack: stacks,
            locations,
            industry,
            foundedDate: newDate,
            images
        }
        try {
            const data = await dispatch(updateProfile(request)).unwrap()
            setOpen(false)
            return data
        } catch (error) {
            setOpen(false)
            console.log(error)
        }
    }

    if (loading) {
        return (
            <h1>Loading....</h1>
        )
    }

    return (
        <>
            <div className="flex flex-col justify-center px-2 sm:p-3 w-full bg-white max-md:max-w-full">
                <div className="self-start text-lg font-semibold leading-7 text-slate-800 max-md:max-w-full">
                    Basic Information
                </div>
                <div className="self-start mt-1 text-base leading-6 text-slate-500 max-md:max-w-full">
                    This is company information that you can update anytime.
                </div>
                <div className="mt-12 max-md:mt-10 max-md:max-w-full">
                    <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                        <div className="flex flex-col w-[34%] max-md:ml-0 max-md:w-full">
                            <div className="flex flex-col text-base leading-7 max-md:mt-10">
                                <div className="font-semibold text-slate-800">Company Logo</div>
                                <div className="mt-1 text-slate-500">
                                    This image will be shown publicly as company logo.
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col ml-5 w-[66%] max-md:ml-0 max-md:w-full">
                            <div className="grow max-md:mt-10 max-md:max-w-full">
                                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                                    <div className="flex items-center justify-center w-full">
                                        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6 ">
                                                {imagePreview ? (
                                                    // <ReactCrop
                                                    //     crop={crop}
                                                    //     keepSelection
                                                    //     aspect={1}
                                                    //     minWidth={150}
                                                    //     className='w-80'
                                                    //     onChange={(percentCrop) => setCrop(percentCrop)}
                                                    // >
                                                    <>
                                                        <IoCloseCircle onClick={() => setImagePreview('')} size={30} />
                                                        <img src={imagePreview} alt="Preview"
                                                            // onLoad={imageLoad}
                                                            className="h-full w-full object-contain" />
                                                    </>
                                                    // </ReactCrop>
                                                ) : (
                                                    <>
                                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                        </svg>
                                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                            <span className="font-semibold">Click to upload</span>
                                                        </p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF</p>
                                                        <input id="dropzone-file" type="file" onChange={handleFileChange} className="hidden" />
                                                    </>
                                                )}
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-12 max-md:mt-10 max-md:max-w-full">
                    <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                        <div className="flex flex-col w-[34%] max-md:ml-0 max-md:w-full">
                            <div className="flex flex-col text-base leading-7 max-md:mt-10">
                                <div className="font-semibold text-slate-800">
                                    Company Details
                                </div>
                                <div className="mt-1 text-slate-500">
                                    Introduce your company core info quickly to users by fill up
                                    company details
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col ml-5 w-[66%] max-md:ml-0 max-md:w-full">
                            <Formik
                                initialValues={companyProfileInitialState}
                                validationSchema={companyProfile}
                                onSubmit={handleSubmit}
                            >
                                {
                                    ({ errors, isSubmitting }) => (
                                        <Form>
                                            <div className="flex flex-col grow text-base leading-6 text-slate-600 max-md:mt-10 max-md:max-w-full">
                                                <div className="font-semibold max-md:max-w-full">
                                                    Company Name
                                                </div>
                                                <Field name='name' id='name' label='name' type='text' className="justify-center items-start px-4 py-3 mt-1 whitespace-nowrap bg-white border border-solid border-zinc-200 max-md:pr-5 max-md:max-w-full" />
                                                <div className="mt-6 font-semibold max-md:max-w-full">
                                                    Website
                                                    {
                                                        errors?.website && <span className='text-red-600'> {errors?.website as string} </span>
                                                    }
                                                </div>
                                                <Field name='website' className="justify-center items-start px-4 py-3 mt-1 whitespace-nowrap bg-white border border-solid border-zinc-200 max-md:pr-5 max-md:max-w-full" />
                                                {
                                                    !locations?.length && <span className='text-red-600'>location is required</span>
                                                }
                                                {
                                                    errors?.locations && <span className='text-red-600'> {errors?.locations as string} </span>
                                                }

                                                <LocationInput label='location' name='location' location={locations} setLocation={setLocation} />

                                                <div className="flex gap-5 justify-between mt-6 max-md:flex-wrap">
                                                    <div className="flex flex-col">
                                                        <div className="font-semibold">Employee</div>
                                                        <div className="flex gap-4 justify-between px-4 py-3 mt-1 bg-white border border-solid border-zinc-200 max-md:pr-5">
                                                            <select onChange={(e) => setEmployee(e.target.value)} name="" id="" className='w-[110px]'>
                                                                <option value={employee}>{employee}</option>

                                                                {
                                                                    optionsToDisplay.map((data) => (
                                                                        <option value={data}>{data}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col whitespace-nowrap">
                                                        <div className="font-semibold">Industry</div>
                                                        <div className="flex gap-4 justify-between px-4 py-3 mt-1 bg-white border border-solid border-zinc-200 max-md:pr-5">
                                                            <select onChange={(e) => setIndustry(e.target.value)} name="" id="" className='w-[110px]'>
                                                                <option value={'technology'}>Technology</option>
                                                                <option value={'finance'}>Finance</option>
                                                                <option value={'medical'}>Medical</option>
                                                                <option value={'aviation'}>Aviation</option>
                                                                <option value={'media'}>media</option>
                                                                <option value={'business'}>business</option>
                                                            </select>
                                                        </div>

                                                    </div>
                                                </div>
                                                {
                                                    errors?.foundedDate && <span className='text-red-600'> {errors?.foundedDate as string} </span>
                                                }
                                                <TypeDate label='founded-date' name='date' date={date} setDate={setDate} />

                                                <div className="mt-6 font-semibold max-md:max-w-full">
                                                    Tech Stack
                                                    {
                                                        !stacks?.length && <span className='text-red-600'>stacks are required</span>
                                                    }
                                                </div>
                                                <TechStackInput label='stack' name='stack' stacks={stacks} setStacks={setStacks} />

                                                <div className="text-base font-semibold leading-6 text-slate-600 max-md:max-w-full">
                                                    Description
                                                    {
                                                        errors?.description && <span className='text-red-600'> {errors?.description as string} </span>
                                                    }
                                                </div>
                                                <Field type='textarea'
                                                    as='textarea'
                                                    name='description'
                                                    label='description'
                                                    className="w-full h-56 justify-center items-start px-4 py-3 mt-1 whitespace-nowrap bg-white border border-solid border-zinc-200 max-md:pr-5 max-md:max-w-full"
                                                />
                                            </div>
                                            <button type='submit' disabled={isSubmitting} name='button' className="justify-center self-end px-10 py-3.5 mt-12 text-lg font-bold leading-7 text-center text-white bg-indigo-600 max-md:px-5 max-md:mt-10">
                                                Save Changes
                                            </button>
                                        </Form>
                                    )
                                }

                            </Formik>
                        </div>
                    </div>
                </div>
                <div className="mt-12 max-md:mt-10 max-md:max-w-full">
                    <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                        <div className="flex flex-col w-[28%] max-md:ml-0 max-md:w-full">
                            <div className="flex flex-col text-base leading-7 max-md:mt-10">
                                <div className="font-semibold text-slate-800">
                                    About Company
                                </div>
                                <div className="mt-1 text-slate-500">
                                    Brief description for your company. URLs are hyperlinked.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Backdrop
                open={open}
                sx={{ color: 'white', backgroundColor: 'rgba( 9,9,9,0.2)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}

export default Overview