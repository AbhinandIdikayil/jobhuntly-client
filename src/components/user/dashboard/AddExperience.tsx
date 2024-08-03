import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { title } from 'process'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserProfile } from 'src/redux/actions/userAction'
import { AppDispatch, RootState } from 'src/redux/store'
import { z } from 'zod'


const experienceSchema = z.object({
    title: z.string().nonempty({ message: 'title is required' }),
    company: z.string(),
    description: z.string(),
    year: z.object({
        from: z.date({ required_error: 'Start date is required' }).refine(date => date <= new Date(), {
            message: 'Start date must be in the past'
        }),
        to: z.date({ required_error: 'End date is required' }).refine(date => date <= new Date(), {
            message: 'End date must be in the past'
        })
    }).refine(data => data.from <= data.to, {
        message: 'Start date must be before or equal to the end date',
        path: ['from']  // Specify the path to indicate where the error should be applied
    }),
})

const formSchema = z.object({
    experiences: z.array(experienceSchema)
})

interface UserAddExperience {
    setOpen: Dispatch<SetStateAction<boolean>>
}


function AddExperience() {
    const [open, setOpen] = useState<boolean>(false)
    return (
        <AlertDialog open={open}>
            <AlertDialogTrigger asChild >
                <Plus onClick={() => setOpen(true)} />
            </AlertDialogTrigger >
            <AlertDialogContent className='max-x-fit max-h-fit'>
                <AlertDialogHeader>
                    <AlertDialogTitle>Social links </AlertDialogTitle>

                    {/* ////! Here is the form component that is under this component */}
                    <AddExperienceForm setOpen={setOpen} />

                </AlertDialogHeader>
                <AlertDialogFooter>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog >
    )
}

export default AddExperience

function AddExperienceForm({ setOpen }: UserAddExperience) {

    const state = useSelector((state: RootState) => state?.user);
    const dispatch: AppDispatch = useDispatch()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            experiences: [
                {
                    title: "",
                    company: "",
                    description: "",
                    year: {
                        from: undefined,
                        to: undefined
                    },
                }
            ]
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        const updatedExperience = values.experiences.map(ed => ({
            ...ed,
            year: {
                from: ed.year.from?.toISOString(),
                to: ed.year.to?.toISOString()
            }
        }));

        const payload = {
            experiences: [
                ...state.user.experiences,
                ...updatedExperience
            ]
        };
        console.log(payload);
        try {
            dispatch(updateUserProfile(payload)).unwrap()
            setOpen(false)
        } catch (error) {
            setOpen(false)
            console.log(error)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0">

                <FormField
                    control={form.control}
                    name={`experiences.${0}.title`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>title
                            </FormLabel>
                            <FormControl>
                                <Input  {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={`experiences.${0}.company`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>company name

                            </FormLabel>
                            <FormControl>
                                <Input  {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={`experiences.${0}.description`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>description

                            </FormLabel>
                            <FormControl>
                                <Input  {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className='flex gap-2'>
                    <FormField
                        control={form.control}
                        name={`experiences.${0}.year.from`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>from

                                </FormLabel>
                                <br />
                                <FormControl>
                                    <input
                                        className='border border-solid border-gray-400'
                                        type='date'
                                        value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                                        onChange={(e) => {
                                            const valueAsDate = e.target.value ? new Date(e.target.value) : null;
                                            field.onChange(valueAsDate);
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={`experiences.${0}.year.to`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>to

                                </FormLabel>
                                <br />
                                <FormControl>
                                    <input
                                        className='border border-solid border-gray-400'
                                        type='date'
                                        value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                                        onChange={(e) => {
                                            const valueAsDate = e.target.value ? new Date(e.target.value) : null;
                                            field.onChange(valueAsDate);
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <AlertDialogCancel onClick={() => setOpen(false)} className="">Cancel</AlertDialogCancel>
                {/* <AlertDialogAction> */}
                <Button type="submit" className='ml-2 bg-indigo-700'>Submit</Button>
                {/* </AlertDialogAction> */}

            </form>
        </Form>
    )
}