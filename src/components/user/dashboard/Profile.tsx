import { useOutletContext } from 'react-router-dom';
import { prop } from 'src/types/AllTypes';
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
    const context = useOutletContext<prop>() || {};
    const { open } = context;
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
        setSelectedSkill()
    }, [])
    return (
        <div className={`flex flex-col ${open ? 'w-full' : 'w-full '} max-md:ml-0 sm:px-6`}>
            <div className="text-2xl font-bold tracking-tight leading-9 text-slate-700 sm:py-2 capitalize">
                My profile
            </div> 
            <div className="justify-between">
                <div className="flex gap-5 max-md:flex-col">
                    <div className="flex flex-col w-[67%] max-md:ml-0 max-md:w-full">
                        <div className="flex flex-col grow max-md:mt-6 max-md:max-w-full">
                            <div style={{border: '0.5px solid #dedbd3'}} className="flex flex-col sm:flex-row justify-center items-center gap-0 sm:gap-3 pb-6 py-3 sm:pt-0 bg-white rounded max-md:max-w-full">
                                {/* //! AVATAR */}
                                <div className='hidden sm:block pt-3'>
                                    {
                                        state?.user?.coverImage ? (
                                            <Avatar src={state?.user?.coverImage} sx={{ bgcolor: deepOrange[500], width: 86, height: 86 }} />

                                        ) : (
                                            <Avatar className='' sx={{ bgcolor: deepOrange[500], width: 86, height: 86 }}>N</Avatar>
                                        )
                                    }
                                </div>
                                <div className='block sm:hidden'>
                                    {
                                        state?.user?.coverImage ? (
                                            <Avatar src={state?.user?.coverImage} sx={{ bgcolor: deepOrange[500], width: 126, height: 126 }} />
                                        ) : (
                                            <Avatar className='' sx={{ bgcolor: deepOrange[500], width: 86, height: 86 }}>N</Avatar>
                                        )
                                    }
                                </div>
                                <div className="justify-between self-end sm:mt-6 max-w-full w-[524px] max-md:pr-5">
                                    <div className="flex gap-5 max-md:flex-col">
                                        <div className="flex flex-col w-[69%] max-md:ml-0 max-md:w-full">
                                            <div className="flex flex-col items-center grow text-lg font-semibold leading-7 text-slate-700 max-md:mt-10">
                                                <div className="text-2xl leading-7 capitalize"> {state?.user?.name} </div>
                                                <div className="mt-2">
                                                    <span className="text-slate-500 capitalize">
                                                        {
                                                            state?.user?.experiences?.map((data: any) => {
                                                                return data?.working ? (
                                                                    `${data?.title} at ${data?.company}`
                                                                ) : (
                                                                    ''
                                                                )
                                                            })
                                                        }
                                                    </span>{" "}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col w-[31%] items-center max-md:ml-0 max-md:w-full">
                                            <UserEditProfile name={state?.user?.name} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{border: '0.5px solid #dedbd3'}} className="flex flex-col p-6 mt-6 bg-white rounded max-md:px-5 max-md:max-w-full">
                                <div className="flex gap-4 justify-between max-md:flex-wrap max-md:max-w-full">
                                    <div className="my-auto text-xl font-semibold leading-6 text-slate-700">
                                        About Me
                                    </div>
                                    <div className="flex justify-center items-center p-2.5 border border-gray-500 rounded">
                                        <UserAboutMeUpdate />
                                    </div>
                                </div>
                                <div className="mt-4 text-base leading-7 text-slate-600 max-md:max-w-full">
                                    {
                                        state?.user?.about
                                    }
                                </div>
                                <div className="mt-4 text-base leading-7 text-slate-600 max-md:max-w-full">
                                </div>
                            </div>
                            <div style={{border: '0.5px solid #dedbd3'}} className="flex flex-col px-px py-6 mt-6 bg-white  rounded max-md:max-w-full">
                                <div className="flex gap-4 justify-between px-6 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
                                    <div className="my-auto text-xl font-semibold leading-6 text-slate-700">
                                        Experiences
                                    </div>
                                    <div className="flex justify-center items-center p-2  border border-gray-500 rounded">
                                        <AddExperience />
                                    </div>
                                </div>
                                {
                                    state?.user?.experiences?.map((data: any, ind: number) => (
                                        <div key={ind} className="flex gap-5 justify-between px-6 py-6 bg-white max-md:flex-wrap max-md:px-5">
                                            <FaAward size={60} />
                                            <div className="flex flex-col max-md:max-w-full">
                                                <div className="flex gap-1.5 justify-between px-px max-md:flex-wrap max-md:max-w-full">
                                                    <div className="my-auto text-lg font-semibold leading-7 text-slate-700">
                                                        {data.title}
                                                    </div>
                                                    <div className="flex justify-center items-center gap-1 p-2.5">
                                                        <div className='px-2 border py-2 border-solid border-gray-400'>
                                                            <Trash2 onClick={() => removeExperience(ind)} />
                                                        </div>
                                                        <div className='px-2 border py-2 border-solid border-gray-400'>
                                                            <EditExperience ind={ind} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2 justify-between self-start mt-2 text-base leading-6 text-slate-600">
                                                    <div className="font-medium text-slate-700"> {data?.company} </div>
                                                    <div>
                                                        {
                                                            formatDate(data?.year?.from) || +
                                                            ' - '
                                                            +
                                                            formatDate(data?.year?.to)
                                                        }
                                                    </div>
                                                </div>
                                                <div className="mt-3 text-base leading-7 text-slate-600 max-md:max-w-full">
                                                    Developed digital marketing strategies, activation plans,
                                                    proposals, contests and promotions for client initiatives
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }

                            </div>
                            <div style={{border: '0.5px solid #dedbd3'}} key={'hai'} className="flex flex-col px-px py-6 mt-6 bg-white rounded max-md:max-w-full">
                                <div className="flex gap-4 justify-between px-6 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
                                    <div className="my-auto text-xl font-semibold leading-6 text-slate-700">
                                        Education
                                    </div>
                                    <div className="flex justify-center items-center p-2 border border-gray-500 rounded">
                                        <AddEducation />
                                    </div>
                                </div>
                                {
                                    state?.user?.education?.map((data: any, index: number) => (
                                        <>
                                            <div key={data?.university + index} className="flex gap-5 justify-between px-6 py-6 bg-white max-md:flex-wrap ">
                                                <div className=''>
                                                    <FaUniversity size={50} />
                                                </div>
                                                <div className="flex flex-col max-md:max-w-full">
                                                    <div className="flex gap-1.5 justify-between px-px max-md:flex-wrap max-md:max-w-full">
                                                        <div className="my-auto text-lg font-semibold leading-7 text-slate-700">
                                                            {data.university}
                                                        </div>
                                                        <div className="flex justify-center items-center p-2.5 border border-solid border-zinc-200">
                                                            <EditEducation ind={index} />
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2 justify-between self-start mt-2 text-base leading-6 text-slate-600">
                                                        <div> {data?.course} </div>
                                                    </div>
                                                    <div className="mt-1.5 text-base leading-6 text-slate-500 max-md:max-w-full">
                                                        {formatDateRange(state?.user?.education[index].year?.from) + ' - ' + formatDateRange(state?.user?.education[index]?.year?.to)}
                                                    </div>
                                                    <div className="mt-3 text-base leading-7 text-slate-700 max-md:max-w-full">
                                                        {
                                                            data?.description
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div key={index} className="shrink-0 max-w-full h-px bg-zinc-200 w-full max-md:mr-1" />
                                        </>
                                    ))
                                }
                            </div>
                            <div style={{border: '0.5px solid #dedbd3'}} className="flex flex-col p-6 mt-6 bg-white rounded max-md:px-5 max-md:max-w-full">
                                <div className="flex gap-4 justify-between w-full max-md:flex-wrap max-md:max-w-full">
                                    <div className="my-auto text-xl font-semibold leading-6 text-slate-700">
                                        Skills
                                    </div>
                                </div>
                                <Multiselect
                                    displayValue="name"
                                    options={skills}
                                    selectedValues={selectedSkills}
                                    onSelect={(e) => setSkills(e)}
                                    onRemove={(e) => setSkills(e)}
                                />

                            </div>
                            <div className='flex mt-3'>
                                <button type='button' onClick={saveSkill} className='bg-indigo-600 w-full text-white font-bold p-2'>
                                    save
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
                        <div className="flex flex-col max-md:mt-6">
                            <div style={{border: '0.5px solid #dedbd3'}} className="flex flex-col p-6 w-full bg-white rounded max-md:px-5">
                                <div className="flex gap-4 justify-between">
                                    <div className="my-auto text-xl font-semibold leading-6 text-slate-700">
                                        Additional Details
                                    </div>
                                    <div className="flex justify-center items-center p-2.5 border border-gray-500  rounded">

                                        {/* //!  A MODAL WILL POPUP IF THE EDIT ICON IS CLICKED */}
                                        <UserAddtionalDetailsUpdate />
                                    </div>
                                </div>
                                <div className="flex gap-4 mt-4 text-base leading-6 whitespace-nowrap">
                                    <Mail />
                                    <div className="flex flex-col">
                                        <div className="text-slate-500">Email</div>
                                        <div className="text-slate-700">{state?.user?.email}</div>
                                    </div>
                                </div>
                                <div className="flex gap-4 mt-4 text-base leading-6">
                                    <Smartphone />
                                    <div className="flex flex-col">
                                        <div className="text-slate-500">Phone</div>
                                        <div className="text-slate-700">{state.user.phonenumber || 'none'}</div>
                                    </div>
                                </div>
                            </div>
                            <div style={{border: '0.5px solid #dedbd3'}} className="flex flex-col p-6 w-full mt-6 bg-white rounded max-md:px-5">
                                <div className="flex gap-4 justify-between">
                                    <div className="my-auto text-xl font-semibold leading-6 text-slate-700">
                                        Add resume
                                    </div>
                                    <div className="flex justify-center items-center p-2.5 border border-gray-500 rounded">

                                        <Plus onClick={handleClick} />
                                        <input ref={fileInputRef} onChange={handleChange} type='file' style={{ display: 'none' }} />
                                    </div>
                                </div>
                                <div className="flex gap-4 mt-4 text-base leading-6 whitespace-nowrap">
                                    <Accordion type="single" collapsible className="w-full">
                                        {
                                            state?.user?.resumes?.map((data: any, index: number) => (
                                                <AccordionItem key={index} value={`item-${index + 1}`}>
                                                    <AccordionTrigger>resume {index + 1} </AccordionTrigger>
                                                    <AccordionContent>
                                                        <iframe height={400} src={data} className='w-full sm:w-auto'>
                                                        </iframe>
                                                    </AccordionContent>
                                                </AccordionItem>
                                            ))
                                        }
                                    </Accordion>
                                </div>
                                {
                                    pdf && (
                                        <>
                                            <AlertDialog open={modal}>
                                                <AlertDialogTrigger asChild>
                                                </AlertDialogTrigger >
                                                <AlertDialogContent className='max-w-fit'>
                                                    <AlertDialogHeader>
                                                        <iframe width="320" className='w-fit' height="360"
                                                            // URL.createObjectURL(file)
                                                            src={pdf}
                                                        >

                                                        </iframe>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel onClick={() => setModal(false)} className="">Cancel</AlertDialogCancel>
                                                        <Button type="submit" onClick={handleResume} className='ml-2 bg-indigo-700'>Submit</Button>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog >

                                        </>
                                    )
                                }
                            </div>
                            <div style={{border: '0.5px solid #dedbd3'}} className="flex flex-col p-6 mt-6 w-full bg-white rounded max-md:px-5">
                                <div className="flex gap-4 justify-between">
                                    <div className="my-auto text-xl font-semibold leading-6 text-slate-700">
                                        Social Links
                                    </div>
                                    <div className="flex justify-center items-center p-2.5 border border-gray-500 rounded">

                                        {/* //!  A MODAL WILL POPUP IF THE EDIT ICON IS CLICKED */}
                                        <UserSocialLinkUpdate />
                                    </div>
                                </div>
                                <div className="flex gap-4 mt-4 text-base leading-6 w-auto overflow-hidden">
                                    <Instagram />
                                    <div className="flex flex-col flex-grow">
                                        <div className="text-slate-500">Instagram</div>
                                        <div className="text-indigo-600 truncate ">{state?.user?.socialLink?.[0]?.substr(8)}</div>
                                    </div>
                                </div>
                                <div className="flex gap-4 mt-4 text-base leading-6 w-auto overflow-hidden">
                                    <Twitter />
                                    <div className="flex flex-col">
                                        <div className="text-slate-500">Twitter</div>
                                        <div className="text-indigo-600">{state?.user?.socialLink?.[1]?.substr(8)}</div>
                                    </div>
                                </div>
                                <div className="flex gap-4 mt-4 text-base leading-6 w-auto overflow-hidden">
                                    <LinkedinIcon />
                                    <div className="flex flex-col">
                                        <div className="text-slate-500">Website</div>
                                        <div className="text-indigo-600">{state?.user?.socialLink?.[2]?.substr(8)}</div>
                                    </div>
                                </div>
                                <div className="flex gap-4 mt-4 text-base leading-6 w-auto overflow-hidden">
                                    <Globe />
                                    <div className="flex flex-col">
                                        <div className="text-slate-500">Website</div>
                                        <div className="text-indigo-600">{state?.user?.personalsite}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile