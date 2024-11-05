"use client"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "src/redux/store"
import { verifyEmail } from "../../redux/actions/userAction"
import { resetErr } from "../../redux/reducers/user/userSlice"

interface func {
  setOtpPage: (data:boolean) => void
}

export function ForgotPSConfirm({ setOtpPage }: func) {

  return (

    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="link" className="text-gray-700">Forgot password?</Button >
      </AlertDialogTrigger >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>OTP verification </AlertDialogTitle>
          <AlertDialogDescription>
            We will be sending a 4 digit OTP to your email
          </AlertDialogDescription>

          {/* ////! Here is the form component that is under this component */}
          <ProfileForm setOtpPage={setOtpPage} />

        </AlertDialogHeader>
        <AlertDialogFooter>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog >

  )
}



const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
})

export function ProfileForm({ setOtpPage }: func) {

  const dispatch: AppDispatch = useDispatch()
  const state = useSelector((state: RootState) => state.user)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await dispatch(verifyEmail(values)).unwrap()
      setOtpPage(true)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>email
                <span className="text-red-600">

                  {
                    state.err && '(' + state.err + ')'
                  }
                </span>
              </FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <AlertDialogCancel onClick={() => dispatch(resetErr())} className="m-2">Cancel</AlertDialogCancel>
        {/* <AlertDialogAction> */}
        <Button type="submit">Submit</Button>
        {/* </AlertDialogAction> */}

      </form>
    </Form>
  )
}
