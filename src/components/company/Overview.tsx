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
import { Building2, ImagePlus, Sparkles } from 'lucide-react'


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
            <div className="company-form-shell space-y-6">
                <div className="rounded-[2rem] border border-white/80 bg-white/90 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-6">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-2xl">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">
                                Basic information
                            </p>
                            <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl text-slate-900 sm:text-3xl">
                                Keep the public company profile polished.
                            </h2>
                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                This is the information candidates see first. Use the logo, description,
                                and company details to make the profile feel complete.
                            </p>
                        </div>
                        <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700">
                            <Sparkles className="h-4 w-4" />
                            Public profile surface
                        </div>
                    </div>
                </div>

                <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/90 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl">
                    <div className="grid gap-0 lg:grid-cols-[280px,1fr]">
                        <div className="border-b border-slate-200/80 px-5 py-6 lg:border-b-0 lg:border-r lg:px-6 lg:py-8">
                            <div className="flex items-start gap-3">
                                <div className="rounded-2xl bg-amber-50 p-3 text-amber-600">
                                    <ImagePlus className="h-5 w-5" />
                                </div>
                                <div>
                                    <div className="font-semibold text-slate-900">Company logo</div>
                                    <div className="mt-1 text-sm leading-6 text-slate-500">
                                        This image will be shown publicly as company logo.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="px-5 py-6 lg:px-8 lg:py-8">
                            <div className="flex items-center justify-center">
                                <label className="group flex w-full cursor-pointer flex-col items-center justify-center rounded-[1.75rem] border border-dashed border-slate-300 bg-gradient-to-br from-white to-slate-50 px-6 py-8 transition hover:border-amber-300 hover:bg-amber-50/40">
                                    <div className="flex flex-col items-center justify-center pt-2 pb-4">
                                                {imagePreview ? (
                                                    <>
                                                        <IoCloseCircle
                                                            onClick={() => setImagePreview('')}
                                                            size={30}
                                                            className="absolute right-4 top-4 cursor-pointer text-slate-500 transition hover:text-rose-500"
                                                        />
                                                        <img
                                                            src={imagePreview}
                                                            alt="Preview"
                                                            className="max-h-72 w-full rounded-[1.5rem] object-contain shadow-lg"
                                                        />
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="rounded-full bg-amber-100 p-4 text-amber-600">
                                                            <Building2 className="h-8 w-8" />
                                                        </div>
                                                        <svg className="mt-4 mb-4 h-8 w-8 text-slate-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                        </svg>
                                                        <p className="mb-2 text-sm text-slate-500">
                                                            <span className="font-semibold text-slate-900">Click to upload</span>
                                                        </p>
                                                        <p className="text-xs text-slate-400">SVG, PNG, JPG or GIF</p>
                                                        <input id="dropzone-file" type="file" onChange={handleFileChange} className="hidden" />
                                                    </>
                                                )}
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/90 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl">
                    <div className="grid gap-0 lg:grid-cols-[280px,1fr]">
                        <div className="border-b border-slate-200/80 px-5 py-6 lg:border-b-0 lg:border-r lg:px-6 lg:py-8">
                            <div className="flex items-start gap-3">
                                <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
                                    <Building2 className="h-5 w-5" />
                                </div>
                                <div>
                                    <div className="font-semibold text-slate-900">Company details</div>
                                    <div className="mt-1 text-sm leading-6 text-slate-500">
                                        Introduce your company core info quickly with a clean, readable form.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="px-5 py-6 lg:px-8 lg:py-8">
                            <Formik
                                initialValues={companyProfileInitialState}
                                validationSchema={companyProfile}
                                onSubmit={handleSubmit}
                            >
                                {
                                    ({ errors, isSubmitting }) => (
                                        <Form>
                                            <div className="flex flex-col gap-5 text-base leading-6 text-slate-600">
                                                <div className="font-semibold text-slate-900">
                                                    Company Name
                                                </div>
                                                <Field name='name' id='name' label='name' type='text' className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700 shadow-sm outline-none transition focus:border-amber-300 focus:ring-4 focus:ring-amber-100" />
                                                <div className="font-semibold text-slate-900">
                                                    Website
                                                    {
                                                        errors?.website && <span className='text-red-600'> {errors?.website as string} </span>
                                                    }
                                                </div>
                                                <Field name='website' className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700 shadow-sm outline-none transition focus:border-amber-300 focus:ring-4 focus:ring-amber-100" />
                                                {
                                                    !locations?.length && <span className='text-red-600'>location is required</span>
                                                }
                                                {
                                                    errors?.locations && <span className='text-red-600'> {errors?.locations as string} </span>
                                                }

                                                <LocationInput label='location' name='location' location={locations} setLocation={setLocation} />

                                                <div className="grid gap-4 md:grid-cols-2">
                                                    <div className="flex flex-col">
                                                        <div className="font-semibold text-slate-900">Employees</div>
                                                        <div className="mt-1 flex gap-4 justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                                                            <select onChange={(e) => setEmployee(e.target.value)} name="" id="" className='w-full bg-transparent outline-none'>
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
                                                        <div className="font-semibold text-slate-900">Industry</div>
                                                        <div className="mt-1 flex gap-4 justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                                                            <select onChange={(e) => setIndustry(e.target.value)} name="" id="" className='w-full bg-transparent outline-none'>
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

                                                <div className="text-base font-semibold leading-6 text-slate-600">
                                                    Description
                                                    {
                                                        errors?.description && <span className='text-red-600'> {errors?.description as string} </span>
                                                    }
                                                </div>
                                                <Field type='textarea'
                                                    as='textarea'
                                                    name='description'
                                                    label='description'
                                                    className="w-full min-h-56 rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-700 shadow-sm outline-none transition focus:border-amber-300 focus:ring-4 focus:ring-amber-100"
                                                />
                                            </div>
                                            <div className="mt-8 flex justify-end">
                                                <button type='submit' disabled={isSubmitting} name='button' className="inline-flex items-center justify-center rounded-full bg-slate-900 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-slate-800">
                                                Save Changes
                                                </button>
                                            </div>
                                        </Form>
                                    )
                                }

                            </Formik>
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
