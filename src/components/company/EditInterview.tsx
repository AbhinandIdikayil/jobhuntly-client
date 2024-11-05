import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertDialogDescription } from '@radix-ui/react-alert-dialog'
import { memo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { editInterview } from 'src/redux/actions/jobAction'
import { AppDispatch, RootState } from 'src/redux/store'
import { AmPmTime } from 'src/utils/AmPmTime'
import { formatDate } from 'src/utils/formateDatetoDateinput'
import { z } from 'zod'


const scheduleSchema = z.object({
    testType: z.string().nonempty({ message: 'Type is required' }),
    date: z.date({ required_error: 'Date is required' }).refine(date => date > new Date(), {
        message: 'Date must be in the future'
    }),
    time: z.string({ required_error: 'Time is required' }),
    roomId: z.string({ required_error: 'room number is required' })
})

const formSchema = z.object({
    schedule: z.array(scheduleSchema)
})


function EditInterview({ ind }: { ind: number }) {
    const [open, setOpen] = useState<boolean>(false)
    const handleOpenChange = (newOpen: boolean) => {
        if (!newOpen) {
            // Only allow the dialog to close if we're setting it to false
            setOpen(false);
        }
    };
    return (
        <AlertDialog open={open} 
        onOpenChange={handleOpenChange}
            // onClickOutside={(e: any) => e?.preventDefault()}
            >
            <AlertDialogTrigger asChild className='w-full'>
                <button onClick={(e) => {
                    e.stopPropagation(); // Prevent event from bubbling up
                    setOpen(true);
                }} className="w-full font-bold">
                    Edit
                </button>
            </AlertDialogTrigger >
            <AlertDialogContent className='max-x-fit max-h-fit'>
                <AlertDialogHeader>
                    <AlertDialogTitle>Edit  interview</AlertDialogTitle>
                    <FormEdit setOpen={setOpen} ind={ind} />
                </AlertDialogHeader>
                <AlertDialogDescription />
            </AlertDialogContent>
        </AlertDialog >
    )
}

export default memo(EditInterview)



function EditScheduleForm({ setOpen, ind }: { setOpen: (pre: boolean) => void, ind: number }) {
    const [time, setTime] = useState<string>('')
    const dispatch: AppDispatch = useDispatch()
    const applicant = useSelector((state: RootState) => state?.job?.applicant)
    function extractAmPm() {
        const match = applicant?.schedule?.[ind]?.time?.match(/(AM|PM)/i);
        return match ? match[0] : null;
    }
    let meridian = extractAmPm()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            schedule: [
                {
                    testType: "" || applicant?.schedule?.[ind]?.testType,
                    date: applicant?.schedule?.[ind]?.date ? new Date(applicant.schedule[ind].date) : undefined,
                    time: applicant?.schedule?.[ind]?.time?.slice(0, 5) ?? '',
                    roomId: "" ?? applicant?.schedule?.[ind]?.roomId
                }
            ]
        },
    })

    async function onSubmit(values: any) {
        try {
            let res = { ...values.schedule[0], ind, id: applicant?._id }
            if (!time) {
                res = {
                    ...res,
                    time: res?.time + '' + meridian
                }
            } else {
                res = {
                    ...res,
                    time
                }
            }
            await dispatch(editInterview(res)).unwrap()
        } catch (error) {
            console.log(error)
        } finally {
            setOpen(false)
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={(e: any) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit(onSubmit)(e);
            }
            } className="space-y-0" onClick={(e) => e.stopPropagation()}>
                <FormField
                    control={form.control}
                    name={`schedule.${0}.testType`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Type of test
                            </FormLabel>
                            <FormControl>
                                <Input
                                    onKeyDown={(e) => e.stopPropagation()}
                                    onClick={(e) => e.stopPropagation()}
                                    {...field} />
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
                                <Input
                                    onKeyDown={(e) => e.stopPropagation()}
                                    onClick={(e) => e.stopPropagation()}
                                    {...field} />
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
                                    value={field.value ? formatDate(field?.value) : ''}
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
                                            const formatted = AmPmTime(value);
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
                    <AlertDialogCancel onClick={(e) => { e.stopPropagation(); setOpen(false); }} className="">Cancel</AlertDialogCancel>
                    <Button type="submit" className='ml-2 bg-indigo-700'>Submit</Button>
                </div>
            </form>
        </Form>
    )
}


export const FormEdit = memo(EditScheduleForm);

