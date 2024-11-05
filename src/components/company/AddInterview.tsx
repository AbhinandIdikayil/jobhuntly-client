import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { scheduleInterview } from 'src/redux/actions/jobAction'
import { AppDispatch, RootState } from 'src/redux/store'
import { z } from 'zod'


const scheduleSchema = z.object({
    type: z.string().nonempty({ message: 'Type is required' }),
    date: z.date({ required_error: 'Date is required' }).refine(date => date > new Date(), {
        message: 'Date must be in the future'
    }),
    time: z.string({ required_error: 'Time is required' }),
    roomId: z.string({ required_error: 'room number is required' })
})

const formSchema = z.object({
    schedule: z.array(scheduleSchema)
})


function AddInterview({ open, setOpen }: { open: boolean, setOpen: (prev: boolean) => void }) {
    const applicant = useSelector((state: RootState) => state?.job?.applicant)
    function addInterviewModel() {
        if (applicant?.hiring_status !== 'interview') {
            toast.error('Hiring status is not interview')
            return
        }
        setOpen(true)
    }
    return (
        <AlertDialog open={open}>
            <AlertDialogTrigger asChild >
                <button onClick={addInterviewModel} type='button' className="flex gap-2.5 justify-center items-center self-stretch px-4 py-3 my-auto font-bold text-center text-white min-w-[240px] bg-indigo-600 ">
                    <PlusIcon />
                    <div className="self-stretch my-auto">Schedule Interview</div>
                </button>
            </AlertDialogTrigger >
            <AlertDialogContent className='max-x-fit max-h-fit'>
                <AlertDialogHeader>
                    <AlertDialogTitle>Schedule  interview</AlertDialogTitle>

                    {/* ////! Here is the form component that is under this component */}
                    <ScheduleForm setOpen={setOpen} id={applicant?._id} />

                </AlertDialogHeader>
                <AlertDialogFooter>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog >
    )
}

export default AddInterview

function ScheduleForm({ setOpen, id }: { setOpen: (pre: boolean) => void, id: any }) {
    const [time, setTime] = useState<string>('')
    const dispatch: AppDispatch = useDispatch()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            schedule: [
                {
                    type: "",   // type is initialized as an empty string
                    date: undefined, // date should be initialized as a date object or null
                    time: "",     // time is initialized as an empty string
                    roomId: ""
                }
            ]
        },
    })


    async function onSubmit(values: z.infer<typeof formSchema>) {
        let data = {
            ...values.schedule[0],
            time,
            id,
        }
        try {
            await dispatch(scheduleInterview(data)).unwrap()
        } catch (error) {
            console.log(error)
        } finally {
            setOpen(false)
        }
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0">
                <FormField
                    control={form.control}
                    name={`schedule.${0}.type`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Type of test
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
                    name={`schedule.${0}.roomId`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Room number {''}
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
                    name={`schedule.${0}.date`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Date {''}

                            </FormLabel>
                            <FormControl>
                                <input
                                    className='border border-solid border-gray-400'
                                    type='date'
                                    value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                                    onChange={(e) => {
                                        console.log(e.target.value)
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
                    name={`schedule.${0}.time`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Time {''}

                            </FormLabel>
                            <FormControl>
                                <input
                                    className='border border-solid border-gray-400'
                                    type='time'
                                    value={field.value}
                                    onChange={
                                        (e) => {
                                            const value = e.target.value;
                                            const timeSplit = value.split(':');
                                            let hours = parseInt(timeSplit[0]);
                                            const minutes = timeSplit[1];
                                            let meridian;

                                            if (hours > 12) {
                                                meridian = 'PM';
                                                hours -= 12;
                                            } else if (hours < 12) {
                                                meridian = 'AM';
                                                if (hours === 0) {
                                                    hours = 12;
                                                }
                                            } else {
                                                meridian = 'PM';
                                            }

                                            const formatted = `${hours}:${minutes} ${meridian}`;
                                            setTime(formatted)
                                            field.onChange(value);
                                        }
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className='pt-3'>
                    <AlertDialogCancel onClick={() => setOpen(false)} className="">Cancel</AlertDialogCancel>
                    <Button type="submit" className='ml-2 bg-indigo-700'>Submit</Button>
                </div>
            </form>
        </Form>
    )
}