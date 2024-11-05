import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Avatar } from '@mui/material'
import { deepOrange } from '@mui/material/colors'
import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { updateUserProfile } from 'src/redux/actions/userAction'
import { AppDispatch, RootState } from 'src/redux/store'
import { uploadToCloudinary } from 'src/utils/common/cloudinaryUpload'
import { validateImage } from 'src/validation/common/image-validation'
import { z } from 'zod'


const formSchema = z.object({
    name: z.string().min(5, { message: 'Atleast 20 character' }).optional(),
    location: z.string({ required_error: 'location is required' }).optional()
})

interface UserEditProfileProps {
    name: string;
    setOpen: Dispatch<SetStateAction<boolean>>
}
interface UserEditProfileProps2 {
    name: string;
}

function UserEditProfile({ name }: UserEditProfileProps2) {
    const [open, setOpen] = useState<boolean>(false)
    return (
        <AlertDialog open={open}>
            <AlertDialogTrigger asChild>
                
                <div onClick={() => setOpen(true)} className="px-6 py-3 text-base font-bold leading-6 text-center text-indigo-600 border border-gray-500 rounded max-md:px-5 max-md:mt-10 hover:cursor-pointer">
                    Edit Profile
                </div>
            </AlertDialogTrigger >
            <AlertDialogContent className='max-w-fit'>
                <AlertDialogHeader>
                    <AlertDialogTitle>Edit profile</AlertDialogTitle>

                    {/* ////! Here is the form component that is under this component */}
                    <EditProfile name={name} setOpen={setOpen} />

                </AlertDialogHeader>
                <AlertDialogFooter>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog >
    )
}

export default UserEditProfile

function EditProfile({ name, setOpen }: UserEditProfileProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const dispatch: AppDispatch = useDispatch()
    const state = useSelector((state: RootState) => state.user)
    const [image, setImage] = useState<string | null>(state.user?.coverImage);

    function handleAvatarClick() {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target?.files?.[0];
        if (file) {
            if(!validateImage(file)){
                return toast.error('Invalid file type',{position:'top-center'})
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    setImage(reader.result);
                } else {
                    console.error('FileReader result is not a string');
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: name || ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            let imageUrl
            if (!state.user?.coverImage) {
                if (image) {
                    imageUrl = await uploadToCloudinary(image);
                }
            }
            let req = {
                coverImage: imageUrl,
                ...values
            }
            dispatch(updateUserProfile(req)).unwrap()
            setOpen(false)
        } catch (error) {
            setOpen(false)
            console.log(error)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1 w-auto">
                <div className='flex flex-col justify-center items-center relative'>
                    <div className='w-1/2 z-40 flex items-center justify-center' style={{ borderRadius: '500px' }} onClick={handleAvatarClick}>
                        {
                            state?.user?.coverImage ? (
                                <Avatar src={state?.user?.coverImage} className='bg-transparent bg-white' sx={{ width: 86, height: 86 }} />
                            ) : (
                                <Avatar sx={{ bgcolor: deepOrange[500], width: 86, height: 86 }}>N</Avatar>
                            )
                        }
                    </div>
                    <input
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        type="file" style={{ display: 'none' }}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description
                                <span className="text-red-600">

                                    {/* {
                                        state.err && '(' + state.err + ')'
                                    } */}
                                </span>
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <AlertDialogCancel onClick={() => setOpen(false)} className="">Cancel</AlertDialogCancel>
                {/* <AlertDialogAction> */}
                <Button type="submit" className='ml-2 bg-indigo-700'>Submit</Button>
                {/* </AlertDialogAction> */}

            </form>
        </Form>
    )
}
