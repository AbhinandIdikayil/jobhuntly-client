import UserSocialLinkUpdate from './UserSocialLinkUpdate';
import UserAddtionalDetailsUpdate from './UserAddtionalDetailsUpdate';
import UserAboutMeUpdate from './UserAboutMeUpdate';
import { Avatar } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import UserEditProfile from './EditProfile';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/redux/store';
import { Globe, Instagram, LinkedinIcon, Mail, Plus, Smartphone, Trash2, Twitter } from 'lucide-react';
import AddEducation from './addEducation';
import { FaAward, FaUniversity } from 'react-icons/fa'
import AddExperience from './AddExperience';
import { useEffect, useRef, useState } from 'react';
import { handleFileChange } from 'src/utils/validatePdf';
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { uploadToCloudinary } from 'src/utils/common/cloudinaryUpload';
import { removeExperienceAndUpdateUserProfile, updateUserProfile } from 'src/redux/actions/userAction';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { formatDate } from 'src/utils/formateDate';
import EditEducation from './EditEducation';
import EditExperience from './EditExperience';
import Multiselect from 'multiselect-react-dropdown';
import { listSkills } from 'src/redux/actions/adminAction';

function Profile() {
    const skills = useSelector((state: RootState) => state?.admin?.skills)
    const state = useSelector((state: RootState) => state.user);
    const dispatch: AppDispatch = useDispatch()
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [pdf, setPdf] = useState<any>()
    const [pdfUrl, setPdfUrl] = useState<any>()
    const [modal, setModal] = useState<boolean>(false)
    const [skill, setSkills] = useState<any>([])
    const [selectedSkills, setSelectedSkills] = useState<any>([])

    function handleClick() {
        if (fileInputRef.current) {
            fileInputRef.current.click();
            setModal(true)
        }
    }

    function formatDateRange(dateStr: string) {
        const date = new Date(dateStr);

        const options: any = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        let image = handleFileChange(e);
        if (image) {
            setPdfUrl(image)
            let url = URL.createObjectURL(image)
            setPdf(url)
        }
    }

    async function handleResume() {
        try {
            let image = await uploadToCloudinary(pdfUrl);
            const payload = {
                resumes: [
                    ...state.user.resumes,
                    image
                ]
            }
            dispatch(updateUserProfile(payload)).unwrap();
            setModal(false)
        } catch (error) {
            setModal(false)
            console.log(error)
        }
    }

    async function removeExperience(ind: number) {
        try {
            await dispatch(removeExperienceAndUpdateUserProfile(ind)).unwrap();
        } catch (error) {
            console.error('Failed to remove experience and update profile:', error);
        }
    }

    async function saveSkill() {
        const newSKill = skill?.map((data: any) => data?.name);
        try {
            await dispatch(updateUserProfile({ skills: newSKill })).unwrap()
        } catch (error) {
            console.log(error)
        }
    }

    function setSelectedSkill() {
        const matchingSkills = skills.filter(skill => state?.user?.skills?.includes(skill.name));
        setSelectedSkills(matchingSkills)
    }

    useEffect(() => {
        dispatch(listSkills()).unwrap()
    }, [])

    useEffect(() => {
        setSelectedSkill()
    }, [skills, state?.user?.skills])

    return (
        <div className="min-h-screen bg-[linear-gradient(180deg,#faf9f7_0%,#ffffff_52%,#f8fafc_100%)]">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <section className="relative overflow-hidden rounded-[32px] border border-zinc-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.06)] sm:p-8">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.10),_transparent_34%),radial-gradient(circle_at_bottom_left,_rgba(16,185,129,0.08),_transparent_32%)]" />
                    <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700">
                                Profile studio
                            </div>
                            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                                My profile
                            </h1>
                            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                                Keep your professional story, resume, and contact details sharp and ready.
                            </p>
                        </div>
                        <div className="rounded-[28px] border border-zinc-200 bg-white px-5 py-4 shadow-sm">
                            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                                Profile summary
                            </div>
                            <div className="mt-2 text-sm font-medium text-slate-700">
                                {state?.user?.name}
                            </div>
                            <div className="mt-1 text-sm text-slate-500">
                                {state?.user?.experiences?.find((data: any) => data?.working)?.title ? `${state?.user?.experiences?.find((data: any) => data?.working)?.title} at ${state?.user?.experiences?.find((data: any) => data?.working)?.company}` : 'Add your current role'}
                            </div>
                        </div>
                    </div>
                </section>

                <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_380px]">
                    <div className="space-y-6">
                        <div className="rounded-[32px] border border-zinc-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.05)] sm:p-8">
                            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                                <div className="flex items-center gap-5">
                                    <div className="overflow-hidden rounded-[28px] border border-zinc-200 bg-slate-50 p-1 shadow-sm">
                                        <Avatar
                                            src={state?.user?.coverImage}
                                            sx={{ bgcolor: deepOrange[500], width: 110, height: 110 }}
                                        >
                                            N
                                        </Avatar>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-semibold tracking-tight text-slate-900">
                                            {state?.user?.name}
                                        </div>
                                        <div className="mt-2 text-sm text-slate-500 sm:text-base">
                                            {
                                                state?.user?.experiences?.map((data: any) => {
                                                    return data?.working ? (`${data?.title} at ${data?.company}`) : ('')
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                                <UserEditProfile name={state?.user?.name} />
                            </div>
                        </div>

                        <div className="grid gap-6 lg:grid-cols-2">
                            <div className="rounded-[32px] border border-zinc-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.05)]">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="text-xl font-semibold tracking-tight text-slate-900">
                                        About me
                                    </div>
                                    <div className="rounded-xl border border-zinc-200 bg-slate-50 p-2 text-slate-500">
                                        <UserAboutMeUpdate />
                                    </div>
                                </div>
                                <p className="mt-4 text-sm leading-7 text-slate-600">
                                    {state?.user?.about}
                                </p>
                            </div>

                            <div className="rounded-[32px] border border-zinc-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.05)]">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="text-xl font-semibold tracking-tight text-slate-900">
                                        Additional details
                                    </div>
                                    <div className="rounded-xl border border-zinc-200 bg-slate-50 p-2 text-slate-500">
                                        <UserAddtionalDetailsUpdate />
                                    </div>
                                </div>
                                <div className="mt-5 space-y-4">
                                    <div className="flex items-start gap-4 rounded-2xl border border-zinc-200 bg-slate-50 px-4 py-3">
                                        <Mail className="mt-0.5" size={18} />
                                        <div>
                                            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Email</div>
                                            <div className="mt-1 text-sm text-slate-700">{state?.user?.email}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 rounded-2xl border border-zinc-200 bg-slate-50 px-4 py-3">
                                        <Smartphone className="mt-0.5" size={18} />
                                        <div>
                                            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Phone</div>
                                            <div className="mt-1 text-sm text-slate-700">{state.user.phonenumber || 'none'}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-[32px] border border-zinc-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.05)]">
                            <div className="flex items-center justify-between gap-4">
                                <div className="text-xl font-semibold tracking-tight text-slate-900">
                                    Experiences
                                </div>
                                <div className="rounded-xl border border-zinc-200 bg-slate-50 p-2 text-slate-500">
                                    <AddExperience />
                                </div>
                            </div>
                            <div className="mt-6 space-y-4">
                                {
                                    state?.user?.experiences?.map((data: any, ind: number) => (
                                        <div key={ind} className="rounded-[28px] border border-zinc-200 bg-slate-50/70 p-5">
                                            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white ring-1 ring-zinc-200">
                                                    <FaAward size={26} />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                                        <div>
                                                            <div className="text-lg font-semibold text-slate-900">
                                                                {data.title}
                                                            </div>
                                                            <div className="mt-1 text-sm text-slate-500">
                                                                {data?.company} - {formatDate(data?.year?.from) || ''} - {formatDate(data?.year?.to) || ''}
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <button className="rounded-xl border border-zinc-200 bg-white p-2 text-slate-500">
                                                                <Trash2 size={18} onClick={() => removeExperience(ind)} />
                                                            </button>
                                                            <div className="rounded-xl border border-zinc-200 bg-white p-2 text-slate-500">
                                                                <EditExperience ind={ind} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p className="mt-4 text-sm leading-7 text-slate-600">
                                                        Developed digital marketing strategies, activation plans, proposals, contests and promotions for client initiatives
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                        <div className="rounded-[32px] border border-zinc-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.05)]">
                            <div className="flex items-center justify-between gap-4">
                                <div className="text-xl font-semibold tracking-tight text-slate-900">
                                    Education
                                </div>
                                <div className="rounded-xl border border-zinc-200 bg-slate-50 p-2 text-slate-500">
                                    <AddEducation />
                                </div>
                            </div>
                            <div className="mt-6 space-y-4">
                                {
                                    state?.user?.education?.map((data: any, index: number) => (
                                        <div key={data?.university + index} className="rounded-[28px] border border-zinc-200 bg-slate-50/70 p-5">
                                            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white ring-1 ring-zinc-200">
                                                    <FaUniversity size={24} />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                                        <div>
                                                            <div className="text-lg font-semibold text-slate-900">
                                                                {data.university}
                                                            </div>
                                                            <div className="mt-1 text-sm text-slate-500">
                                                                {data?.course}
                                                            </div>
                                                        </div>
                                                        <div className="rounded-xl border border-zinc-200 bg-white p-2 text-slate-500">
                                                            <EditEducation ind={index} />
                                                        </div>
                                                    </div>
                                                    <div className="mt-3 text-sm text-slate-500">
                                                        {formatDateRange(state?.user?.education[index].year?.from) + ' - ' + formatDateRange(state?.user?.education[index]?.year?.to)}
                                                    </div>
                                                    <p className="mt-3 text-sm leading-7 text-slate-600">
                                                        {data?.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="rounded-[32px] border border-zinc-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.05)]">
                            <div className="flex items-center justify-between gap-4">
                                <div className="text-xl font-semibold tracking-tight text-slate-900">
                                    Social links
                                </div>
                                <div className="rounded-xl border border-zinc-200 bg-slate-50 p-2 text-slate-500">
                                    <UserSocialLinkUpdate />
                                </div>
                            </div>
                            <div className="mt-5 space-y-4">
                                <div className="flex items-start gap-4 rounded-2xl border border-zinc-200 bg-slate-50 px-4 py-3">
                                    <Instagram size={18} />
                                    <div>
                                        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Instagram</div>
                                        <div className="mt-1 break-all text-sm text-indigo-600">{state?.user?.socialLink?.[0]?.substr(8)}</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 rounded-2xl border border-zinc-200 bg-slate-50 px-4 py-3">
                                    <Twitter size={18} />
                                    <div>
                                        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Twitter</div>
                                        <div className="mt-1 break-all text-sm text-indigo-600">{state?.user?.socialLink?.[1]?.substr(8)}</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 rounded-2xl border border-zinc-200 bg-slate-50 px-4 py-3">
                                    <LinkedinIcon size={18} />
                                    <div>
                                        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Website</div>
                                        <div className="mt-1 break-all text-sm text-indigo-600">{state?.user?.socialLink?.[2]?.substr(8)}</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 rounded-2xl border border-zinc-200 bg-slate-50 px-4 py-3">
                                    <Globe size={18} />
                                    <div>
                                        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Personal site</div>
                                        <div className="mt-1 break-all text-sm text-indigo-600">{state?.user?.personalsite}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-[32px] border border-zinc-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.05)]">
                            <div className="flex items-center justify-between gap-4">
                                <div className="text-xl font-semibold tracking-tight text-slate-900">
                                    Add resume
                                </div>
                                <button
                                    type="button"
                                    onClick={handleClick}
                                    className="flex h-11 w-11 items-center justify-center rounded-2xl border border-zinc-200 bg-slate-50 text-slate-600 transition hover:border-indigo-200 hover:text-indigo-700"
                                >
                                    <Plus size={20} />
                                    <input ref={fileInputRef} onChange={handleChange} type='file' style={{ display: 'none' }} />
                                </button>
                            </div>
                            <div className="mt-5">
                                <Accordion type="single" collapsible className="w-full">
                                    {
                                        state?.user?.resumes?.map((data: any, index: number) => (
                                            <AccordionItem key={index} value={`item-${index + 1}`}>
                                                <AccordionTrigger>resume {index + 1}</AccordionTrigger>
                                                <AccordionContent>
                                                    <iframe height={360} src={data} className='w-full rounded-2xl border border-zinc-200' />
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))
                                    }
                                </Accordion>
                            </div>
                            {
                                pdf && (
                                    <AlertDialog open={modal}>
                                        <AlertDialogTrigger asChild>
                                            <span />
                                        </AlertDialogTrigger>
                                        <AlertDialogContent className='max-w-fit rounded-[28px] border-zinc-200'>
                                            <AlertDialogHeader>
                                                <iframe width="320" className='w-fit rounded-2xl border border-zinc-200' height="360" src={pdf}></iframe>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel onClick={() => setModal(false)}>Cancel</AlertDialogCancel>
                                                <Button type="submit" onClick={handleResume} className='ml-2 bg-indigo-700'>Submit</Button>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                )
                            }
                        </div>

                        <div className="rounded-[32px] border border-zinc-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.05)]">
                            <div className="text-xl font-semibold tracking-tight text-slate-900">
                                Skills
                            </div>
                            <div className="mt-4">
                                <Multiselect
                                    displayValue="name"
                                    options={skills}
                                    selectedValues={selectedSkills}
                                    onSelect={(e) => setSkills(e)}
                                    onRemove={(e) => setSkills(e)}
                                />
                            </div>
                            <button type='button' onClick={saveSkill} className='mt-4 w-full rounded-2xl bg-indigo-600 p-3 font-bold text-white transition hover:bg-indigo-700'>
                                Save skills
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
