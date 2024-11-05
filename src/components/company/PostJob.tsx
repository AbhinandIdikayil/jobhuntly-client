import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Field, FieldArray, Form, Formik, FormikValues } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import { listCategory, listSectors } from 'src/redux/actions/commonAction';
import { postJob } from 'src/redux/actions/jobAction';
import { AppDispatch, RootState } from 'src/redux/store';
import { prop } from 'src/types/AllTypes';
import { postJobValidationSchema } from 'src/validation/company';
import { LocationInput } from '../common/LocationInput';
import { Button } from '@/components/ui/button';
import { Brain, LoaderCircle } from 'lucide-react';
import { AIChatSession } from 'src/service/AIModal';
import Multiselect from 'multiselect-react-dropdown';


function PostJob() {
    const [loading, setLoading] = useState<boolean>(false);
    const context = useOutletContext<prop>() || {};
    const { open } = context;
    const state = useSelector((state: RootState) => state?.category);
    const company = useSelector((state: RootState) => state?.user)
    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate()
    const [location, setLocation] = useState<any>([]);
    const [AiGeneratedDesc, setAiGeneratedDesc] = useState<any>();
    const skillOption = useSelector((state: RootState) => state?.admin)
    const [selectedSkills, setSelectedSkills] = useState<any>([])
    const [skill, setSkills] = useState<any>([])


    
    function setSelectedSkill() {
        const matchingSkills = skillOption?.skills?.filter(skill => company?.user?.skills?.includes(skill.name));
        setSelectedSkills(matchingSkills)
    }

    useEffect(() => {
        dispatch(listCategory(null)).unwrap()
        dispatch(listSectors()).unwrap()
        setSelectedSkill()
    }, [location])

    let PostJobInitialValues = {
        jobTitle: '',
        description: '',
        employment: '',
        category: '',
        salaryrange: {
            from: '',
            to: '',
        },
        companyId: company?.user?._id || '',
        expiry: '',
        responsibilities: [''],
        skills: [''],
        qualification: [''],
    }


    async function GenerateSummeryFromAI(title: string, skills: string[], responsibility: string[], qualification: string[]) {
        setLoading(true)

        let skillIntoString: string = ''
        let responsibilities: string = ''
        let qualifications: string = ''
        skills.forEach((val) => skillIntoString += val + ',')
        responsibility?.forEach((val) => responsibilities += val + ',')
        qualification?.forEach((val) => qualifications += val + ',')

        const prompt = `Create a detailed job description for a ${title} position. The ideal candidate will possess the following skills: ${skillIntoString}. The responsibilities for this role include: ${responsibilities} and the qualification for this role ${qualifications} . all these in to one paragraph`
        try {
            const result = await AIChatSession.sendMessage(prompt)
            setAiGeneratedDesc(JSON.parse(result.response.text()))
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    async function handleSubmit(values: FormikValues) {
        try {
            if (location?.length > 1) {
                return toast.error('Multiple location is restricted')
            }
            if (company?.user?.approvalStatus !== 'Accepted') {
                toast.error('your request hasnt accepted yet', { position: 'top-center' })
                return;
            }
            if (!company?.user?.profileCompletionStatus) {
                toast.error('pleae complete the profile')
                return
            }
            if(skill?.length < 1){
                toast.error('Add morethan 1 skill')
                return;
            }
            const newSKill = skill?.map((data: any) => data?.name);

            await dispatch(postJob({ ...values, location , skills:newSKill})).unwrap()
            return navigate('/company/job-list')
        } catch (error) {
            console.log(error)
        }
    }

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
                                    <span className='text-xs text-red-600'>
                                        {
                                            errors?.jobTitle && (
                                                errors?.jobTitle
                                            )
                                        }
                                    </span>
                                    <Field type="text" name='jobTitle' className='w-full sm:w-auto border border-solid border-zinc-200 focus:border-zinc-500 focus:outline-none p-2' />
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

                                    {/* //!  category  */}
                                    <span className='text-red-600 text-xs'>   {
                                        errors?.employment && (
                                            errors?.employment
                                        )
                                    }   </span>
                                    <Select onValueChange={(e) => setFieldValue('employment', e)}>
                                        <SelectTrigger className="w-[200px]">
                                            <SelectValue placeholder="none" />
                                        </SelectTrigger>
                                        <SelectContent className='border border-solid border-zinc-200 focus:border-zinc-500 focus:outline-none p-2'>
                                            {
                                                state?.category.length > 0
                                                    ? (
                                                        state?.category.map(data => (
                                                            <SelectItem value={data._id}>{data.name}</SelectItem>
                                                        ))
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
                                    <span className='text-red-600 text-xs'>   {
                                        errors?.salaryrange?.from && (
                                            errors?.salaryrange.from
                                        )
                                    }   </span>
                                    <Field type="text" name='salaryrange.from' className='w-full sm:w-auto  border border-solid border-zinc-200 focus:border-zinc-500 focus:outline-none p-2' /> <br />
                                    <span className='text-red-600 text-xs'>   {
                                        errors?.salaryrange?.to && (
                                            errors?.salaryrange.to
                                        )
                                    }   </span>
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

                                    {/* //! sectors */}
                                    <span className='text-red-600 text-xs'>   {
                                        errors?.category && (
                                            errors?.category
                                        )
                                    }   </span>
                                    <Select onValueChange={(e) => setFieldValue('category', e)}>
                                        <SelectTrigger className="w-[200px]">
                                            <SelectValue placeholder="none" />
                                        </SelectTrigger>
                                        <SelectContent className='border border-solid border-zinc-200 focus:border-zinc-500 focus:outline-none p-2'>
                                            {
                                                state?.sectors.length > 0
                                                    ? (
                                                        state.sectors.map(data => (
                                                            <SelectItem value={data._id}>{data.name}</SelectItem>
                                                        ))
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

                                    {/* <FieldArray name='skills'>
                                        {({ remove, push }) => (
                                            <div>
                                                {values.skills.length > 0 &&
                                                    values.skills?.map((_, index) => (
                                                        <div className="w-full sm:w-auto flex items-center" key={index}>
                                                            <div className="flex flex-col w-full">
                                                                <Field
                                                                    name={`skills.${index}`}
                                                                    type="text"
                                                                    className='w-full border border-solid border-zinc-200 focus:border-zinc-500 focus:outline-none p-2'
                                                                />
                                                                {errors.skills && (
                                                                    <div className="text-red-600 text-xs">
                                                                        {errors.skills[index]}
                                                                    </div>
                                                                )}
                                                            </div>

                                                            {values.skills.length > 1 && (
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
                                                {typeof errors.skills === 'string' && (
                                                    <div className="text-red-600 text-xs">
                                                        {errors.skills}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </FieldArray> */}
                                    <Multiselect
                                        selectedValues={selectedSkills}
                                        onSelect={(e) => setSkills(e)}
                                        options={skillOption?.skills}
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
                                                {values?.responsibilities?.length > 0 &&
                                                    values?.responsibilities?.map((_, index) => (
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
                            <div className='flex w-full'>
                                {
                                    AiGeneratedDesc?.responsibilities?.map((data: string, ind: number) => (
                                        <div className='p-5 shadow-lg my-4 rounded-lg cursor-pointer' key={data + ind}>
                                            <p>
                                                {data}
                                            </p>
                                        </div>
                                    ))
                                }
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
                                                        values.qualification?.map((_, index) => (
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
                            <div className='flex w-full'>
                                {
                                    AiGeneratedDesc?.qualifications?.map((data: string, ind: number) => (
                                        <div className='p-5 shadow-lg my-4 rounded-lg cursor-pointer' key={data + ind}>
                                            <p>
                                                {data}
                                            </p>
                                        </div>
                                    )) ||
                                    AiGeneratedDesc?.requirements?.map((data: string, ind: number) => (
                                        <div className='p-5 shadow-lg my-4 rounded-lg cursor-pointer' key={data + ind}>
                                            <p>
                                                {data}
                                            </p>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className='w-full flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center mt-5'>
                                <div className='w-full sm:w-1/2 flex flex-col items-start'>
                                    <span className='font-bold text-xl'>Job descriptions</span>
                                    <label htmlFor="" className='font-sans'>
                                        Enter job description
                                    </label>
                                </div>
                                <div className='w-full sm:w-1/2 flex flex-col items-start'>
                                    <Button variant="outline"
                                        onClick={() => {
                                            if (values?.jobTitle) {
                                                GenerateSummeryFromAI(values?.jobTitle, values?.skills, values?.responsibilities, values?.qualification)
                                            } else {
                                                toast.error('Pleae provide job title, skill, responsibility,qualification')
                                            }
                                        }}
                                        type="button" size="sm" className="border-primary text-primary flex gap-2 mb-1">
                                        {
                                            loading ? <LoaderCircle className='animate-spin h-4 w-4' /> : <Brain className='h-4 w-4' />
                                        }
                                        Generate from AI
                                    </Button>
                                    <span className='text-xs text-red-600'>
                                        {
                                            errors?.description && (
                                                errors?.description
                                            )
                                        }
                                    </span>
                                    <Field as='textarea' type="text" name='description' className='w-full sm:w-[450px] h-36  border border-solid border-zinc-200 focus:border-zinc-500 focus:outline-none p-2' />
                                    <span className='font-sans'>atleast 50 character</span>
                                </div>
                            </div>
                            {
                                AiGeneratedDesc?.description && (
                                    <div className='flex   mx-1'>
                                        <div onClick={() => setFieldValue('description', AiGeneratedDesc?.description)} className='p-5 shadow-lg my-4 rounded-lg cursor-pointer'>
                                            <p>{AiGeneratedDesc?.description}</p>
                                        </div>
                                    </div>
                                )
                            }
                            <hr />
                            <div className='w-full flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center mt-5'>
                                <div className='w-full sm:w-1/2 flex flex-col items-start'>
                                    <span className='font-bold text-xl'>Location</span>
                                    <label htmlFor="" className='font-sans'>
                                        Please specify  the location of the job posting
                                    </label>
                                </div>
                                <div className='w-full sm:w-1/2 flex flex-col items-start'>
                                    <LocationInput label='location' name='location' key={'location'} location={location} setLocation={setLocation} />
                                </div>
                            </div>

                            <div className='w-full flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center mt-5'>
                                <div className='w-full sm:w-1/2 flex flex-col items-start'>
                                    <span className='font-bold text-xl'>Ends on</span>
                                    <label htmlFor="" className='font-sans'>
                                        Please specify  the date to end the job posting
                                    </label>
                                </div>
                                <div className='w-full sm:w-1/2 flex flex-col items-start'>
                                    <Field type="date" min='2024-07-31' name='expiry' className='w-full sm:w-auto  border border-solid border-zinc-200 focus:border-zinc-500 focus:outline-none p-2' /> <br />
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

export default PostJob