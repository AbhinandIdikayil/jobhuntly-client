import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Field, FieldArray, Form, Formik, FormikValues } from 'formik';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LocationInput } from 'src/components/common/LocationInput';
import { listCategory, listSectors } from 'src/redux/actions/commonAction';
import { updateJob } from 'src/redux/actions/jobAction';
import { AppDispatch, RootState } from 'src/redux/store'
import { prop } from 'src/types/AllTypes';
import { formatDate } from 'src/utils/formateDatetoDateinput';
import { postJobValidationSchema } from 'src/validation/company'
import Multiselect from 'multiselect-react-dropdown';

function JobEdting() {
    const context = useOutletContext<prop>() || {};
    const { open } = context;
    const dispatch: AppDispatch = useDispatch()
    const state = useSelector((state: RootState) => state?.job)
    const categoryState = useSelector((state: RootState) => state?.category)
    const skillsOption = useSelector((state: RootState) => state?.admin?.skills)
    const navigate = useNavigate()
    const [location, setLocation] = useState<any>([])
    const [selectedSkills, setSelectedSkills] = useState<any>([])
    const [skill, setSkills] = useState<any>([])

    const PostJobInitialValues = {
        jobTitle: state?.job?.job?.jobTitle || '',
        description: state?.job?.job?.description || '',
        employment: state?.job?.job?.employmentDetails?._id || '',
        category: state?.job?.job?.categoryDetails?._id || '',
        salaryrange: {
            from: state?.job?.job?.salaryrange?.from || '',
            to: state?.job?.job?.salaryrange?.to || '',
        },
        location: state?.job?.job?.location || [],
        companyId: state?.job?.job?.company?._id || '',
        expiry: formatDate(state?.job?.job?.expiry || '') || '',
        responsibilities: state?.job?.job?.responsibilities || [''],
        // skills: state?.job?.job?.skills || [''],
        qualification: state?.job?.job?.qualification || [''],
    }
    async function handleSubmit(values: FormikValues) {
        try {
            if (location?.length > 1) {
                return toast.error('Multiple locations are restricted')
            }
            if (skill?.length < 1) {
                toast.error('Add morethan 1 skill')
                return;
            }

            const newSKill = skill?.map((data: any) => data?.name);

            //! here i passed an id, it is used to pass as  params 
            await dispatch(updateJob({ data: { ...values, location, skills: newSKill }, id: state?.job?._id })).unwrap()
            toast.success('job updated successfully', { position: 'top-center' })
            navigate('/company/job-list')
        } catch (error) {
            console.log(error)
        }
    }

    function setSelectedSkill() {
        const matchingSkills = skillsOption?.filter(skill => state?.job?.job?.skills?.includes(skill.name));
        console.log(matchingSkills, 'matching skill')
        setSelectedSkills(matchingSkills)
        setSkills(matchingSkills)
    }

    useEffect(() => {
        setLocation(state?.job?.job?.location ?? [])
        dispatch(listSectors())
        dispatch(listCategory(null))
        setSelectedSkill()
    }, [])

    return (
        <div className={`flex flex-col ml-2 ${open ? 'w-5/6' : 'w-full'}max-md:ml-0 px-0 sm:px-10 py-5 max-md:w-full text-zinc-600`}>
            <Formik
                initialValues={PostJobInitialValues}
                validationSchema={postJobValidationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, setFieldValue, isSubmitting, values }) => {
                    return (
                        <Form>
                            <div className='w-full flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center'>
                                <div className='w-full sm:w-1/2 flex flex-col items-start'>
                                    <span className='font-bold text-xl'>Job title</span>
                                    <label htmlFor="" className='font-sans'>
                                        job title must be describing one position
                                    </label>
                                </div>
                                <div className='w-full sm:w-1/2 flex flex-col items-start'>
                                    <Field type="text" name='jobTitle' className='w-full sm:w-auto border border-solid border-zinc-200 focus:border-zinc-500 focus:outline-none p-2' />
                                    <span className='font-sans'>atleast 50 character</span>
                                </div>
                            </div>
                            <hr />
                            <div className='w-full flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center mt-5'>
                                <div className='w-full sm:w-1/2 flex flex-col items-start'>
                                    <span className='font-bold text-xl'>Job descriptions</span>
                                    <label htmlFor="" className='font-sans'>
                                        Enter job description
                                    </label>
                                </div>
                                <div className='w-full sm:w-1/2 flex flex-col items-start'>
                                    <span className='text-xs text-red-600'>

                                    </span>
                                    <Field type="textarea" as='textarea' name='description' className='w-full sm:w-[450px] h-32 border border-solid border-zinc-200 focus:border-zinc-500 focus:outline-none p-2' />
                                    <span className='font-sans'>atleast 50 character</span>
                                </div>
                            </div>
                            <hr />
                            <div className='w-full flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center mt-5'>
                                <div className='w-full sm:w-1/2 flex flex-col items-start'>
                                    <span className='font-bold text-xl'>Types of employment</span>
                                    <label htmlFor="" className='font-sans'>
                                        select single type of employment
                                    </label>
                                </div>
                                <div className='w-1/2 flex flex-col items-start'>
                                    <Select onValueChange={(e) => setFieldValue('employment', e)}>
                                        <SelectTrigger className="w-[200px]">
                                            <SelectValue placeholder={state?.job?.job?.employmentDetails?.name} />
                                        </SelectTrigger>
                                        <SelectContent className='border border-solid border-zinc-200 focus:border-zinc-500 focus:outline-none p-2'>
                                            {
                                                categoryState?.category.length > 0
                                                    ? (
                                                        categoryState?.category.map(data => {
                                                            if (data._id !== values.employment) {
                                                                return (
                                                                    <SelectItem value={data._id}>{data.name}</SelectItem>
                                                                )
                                                            }
                                                            return null;
                                                        })
                                                    ) : (
                                                        <h1>asf</h1>
                                                    )
                                            }
                                        </SelectContent>
                                    </Select>
                                    <span className='font-sans'>atleast 50 character</span>
                                </div>
                            </div>
                            <hr />
                            <div className='w-full flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center mt-5'>
                                <div className='w-full sm:w-1/2 flex flex-col items-start'>
                                    <span className='font-bold text-xl'>Salary</span>
                                    <label htmlFor="" className='font-sans'>
                                        Please specify  the estimated salary range for the role
                                    </label>
                                </div>
                                <div className='w-full sm:w-1/2 flex flex-col items-start'>
                                    <Field type="text" name='salaryrange.from' className='w-full sm:w-auto  border border-solid border-zinc-200 focus:border-zinc-500 focus:outline-none p-2' /> <br />
                                    <Field type="text" name='salaryrange.to' className='w-full sm:w-auto  border border-solid border-zinc-200 focus:border-zinc-500 focus:outline-none p-2' />
                                    <span className='font-sans'>number</span>
                                </div>
                            </div>
                            <hr />
                            <div className='w-full flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center mt-5'>
                                <div className='w-full sm:w-1/2 flex flex-col items-start'>
                                    <span className='font-bold text-xl'>Categories</span>
                                    <label htmlFor="" className='font-sans'>
                                        select single type of employment
                                    </label>
                                </div>
                                <div className='w-1/2 flex flex-col items-start'>
                                    <Select onValueChange={(e) => setFieldValue('category', e)}>
                                        <SelectTrigger className="w-[200px]">
                                            <SelectValue placeholder={state?.job?.categoryDetails?.name} />
                                        </SelectTrigger>
                                        <SelectContent className='border border-solid border-zinc-200 focus:border-zinc-500 focus:outline-none p-2'>
                                            {
                                                categoryState?.sectors.length > 0
                                                    ? (
                                                        categoryState.sectors.map(data => {
                                                            if (data._id != values.category) {
                                                                return (
                                                                    <SelectItem value={data._id}>{data.name}</SelectItem>
                                                                )
                                                            }
                                                            return null
                                                        })
                                                    ) : (
                                                        <h1>asf</h1>
                                                    )
                                            }
                                        </SelectContent>
                                    </Select>
                                    <span className='font-sans'>atleast 50 character</span>
                                </div>
                            </div>
                            <hr />
                            <div className='w-full flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center mt-5'>
                                <div className='w-full sm:w-1/2 flex flex-col items-start'>
                                    <span className='font-bold text-xl'>Required skills</span>
                                    <label htmlFor="" className='font-sans'>
                                        select single type of employment
                                    </label>
                                </div>
                                <div className='w-full sm:w-1/2 flex flex-col items-start'>
                                    <Multiselect
                                        selectedValues={selectedSkills}
                                        onSelect={(e) => setSkills(e)}
                                        options={skillsOption}
                                        displayValue='name'
                                    />
                                </div>
                            </div>
                            <hr />
                            <div className='w-full flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center mt-5'>
                                <div className='w-full sm:w-1/2 flex flex-col items-start'>
                                    <span className='font-bold text-xl'>Responsibilities</span>
                                    <label htmlFor="" className='font-sans'>
                                        select single type of employment
                                    </label>
                                </div>
                                <div className='w-full sm:w-1/2 flex flex-col items-start'>
                                    <FieldArray name='responsibilities'>
                                        {({ remove, push }) => (
                                            <div>
                                                {values.responsibilities.length > 0 &&
                                                    values.responsibilities.map((_, index) => (
                                                        <div className="w-full sm:w-auto flex items-center" key={index}>
                                                            <div className="flex flex-col w-full">
                                                                <Field
                                                                    name={`responsibilities.${index}`}
                                                                    type="text"
                                                                    className='w-full border border-solid border-zinc-200 focus:border-zinc-500 focus:outline-none p-2'
                                                                />
                                                                {errors.responsibilities && (
                                                                    <div className="text-red-600 text-xs">
                                                                        {errors.responsibilities[index]}
                                                                    </div>
                                                                )}
                                                            </div>

                                                            {values.responsibilities.length > 1 && (
                                                                <button
                                                                    type="button"
                                                                    className="font-sans bg-red-500 px-1 text-white font-bold rounded ml-2"
                                                                    onClick={() => remove(index)}
                                                                >
                                                                    Remove
                                                                </button>
                                                            )}
                                                        </div>
                                                    ))}
                                                <button
                                                    type="button"
                                                    className="font-sans bg-indigo-600  text-white font-bold px-2 mt-2"
                                                    onClick={() => push('')}
                                                >
                                                    Add
                                                </button>
                                                {typeof errors.responsibilities === 'string' && (
                                                    <div className="text-red-600 text-xs">
                                                        {errors.responsibilities}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </FieldArray>
                                    <span className='font-sans'>atleast 50 character</span>
                                </div>
                            </div>
                            <hr />
                            <div className='w-full flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center mt-5'>
                                <div className='w-full sm:w-1/2 flex flex-col items-start'>
                                    <span className='font-bold text-xl'>Who you are</span>
                                    <label htmlFor="" className='font-sans'>
                                        Add your preferred candidates qualifiacations
                                    </label>
                                </div>
                                <div className='w-full sm:w-1/2 flex flex-col items-start'>
                                    <FieldArray name='qualification'>
                                        {
                                            ({ remove, push }) => (
                                                <div>
                                                    {values.qualification.length > 0 &&
                                                        values.qualification.map((_, index) => (
                                                            <div className="w-full sm:w-auto flex items-center" key={index}>
                                                                <div className="flex flex-col w-full">
                                                                    <Field
                                                                        name={`qualification.${index}`}
                                                                        type="text"
                                                                        className='w-full border border-solid border-zinc-200 focus:border-zinc-500 focus:outline-none p-2'
                                                                    />
                                                                    {errors.qualification && (
                                                                        <div className="text-red-600 text-xs">
                                                                            {errors.qualification[index]}
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                {values.qualification.length > 1 && (
                                                                    <button
                                                                        type="button"
                                                                        className="font-sans bg-red-500 px-1 text-white font-bold rounded ml-2"
                                                                        onClick={() => remove(index)}
                                                                    >
                                                                        Remove
                                                                    </button>
                                                                )}
                                                            </div>
                                                        ))}
                                                    <button
                                                        type="button"
                                                        className="font-sans bg-indigo-600  text-white font-bold px-2 mt-2"
                                                        onClick={() => push('')}
                                                    >
                                                        Add
                                                    </button>
                                                    {typeof errors.qualification === 'string' && (
                                                        <div className="text-red-600 text-xs">
                                                            {errors.qualification}
                                                        </div>
                                                    )}
                                                </div>
                                            )
                                        }
                                    </FieldArray>
                                    <span className='font-sans'>atleast 50 character</span>
                                </div>
                            </div>
                            <hr />
                            <div className='w-full flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center mt-5'>
                                <div className='w-full sm:w-1/2 flex flex-col items-start'>
                                    <span className='font-bold text-xl'>Location</span>
                                    <label htmlFor="" className='font-sans'>
                                        Please specify  the location of the job posting
                                    </label>
                                </div>
                                <div className='w-full sm:w-1/2 flex flex-col items-start'>
                                    <LocationInput label='location' name='location' key={'location'} location={location}
                                        setLocation={setLocation} />
                                </div>
                            </div>
                            <hr />
                            <div className='w-full flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center mt-5'>
                                <div className='w-full sm:w-1/2 flex flex-col items-start'>
                                    <span className='font-bold text-xl'>Ends on</span>
                                    <label htmlFor="" className='font-sans'>
                                        Please specify  the date to end the job posting
                                    </label>
                                </div>
                                <div className='w-full sm:w-1/2 flex flex-col items-start'>
                                    <Field type="date" min='2024-07-31' value={values.expiry} name='expiry' className='w-full sm:w-auto  border border-solid border-zinc-200 focus:border-zinc-500 focus:outline-none p-2' /> <br />
                                    <span className='text-red-600 text-xs'>   {
                                        errors?.expiry && (
                                            errors?.expiry
                                        )
                                    }   </span>
                                    <span className='font-sans'>Date</span>
                                </div>
                            </div>
                            <hr />
                            <div className='w-full mt-2 flex items-center justify-start'>
                                <button type='submit' disabled={isSubmitting} className='bg-indigo-600 text-white font-bold px-10 py-2'>
                                    post
                                </button>
                            </div>
                        </Form>
                    )
                }}

            </Formik>
        </div>
    )
}

export default JobEdting