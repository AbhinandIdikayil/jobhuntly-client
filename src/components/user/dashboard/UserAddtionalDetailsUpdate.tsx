import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from "@hookform/resolvers/zod"
import { SquarePen } from 'lucide-react'
import { Dispatch, SetStateAction, useState } from 'react'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import { updateUserProfile } from 'src/redux/actions/userAction'
import { AppDispatch, RootState } from 'src/redux/store'
import { z } from "zod"


const formSchema = z.object({
    // email: z.string().email({ message: 'Invalid email' }),
    phonenumber: z.string().regex(/^\d+$/, { message: 'Invalid phone number' }),
    // language: z.string({ required_error: 'Language is required' }),
})

interface func {
    setOpen: Dispatch<SetStateAction<boolean>>
}



function UserAddtionalDetailsUpdate() {
    const [open, setOpen] = useState<boolean>(false)
    return (
        <>
            <AlertDialog open={open}>
                <AlertDialogTrigger asChild>
                    <SquarePen onClick={() => setOpen(true)} />
                </AlertDialogTrigger >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Additional Detaisl </AlertDialogTitle>

                        {/* ////! Here is the form component that is under this component */}
                        <AdditionalDetailsForm setOpen={setOpen} />

                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog >
        </>
    )
}

export default UserAddtionalDetailsUpdate


function AdditionalDetailsForm({ setOpen }: func) {

    const state = useSelector((state: RootState) => state?.user)
    const dispatch: AppDispatch = useDispatch()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            // email: "",
            phonenumber: state?.user?.phonenumber || "",
            // language: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            dispatch(updateUserProfile(values)).unwrap()
            setOpen(false)
        } catch (error) {
            console.log(error)
            setOpen(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">

                <FormField
                    control={form.control}
                    name="phonenumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone</FormLabel>
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