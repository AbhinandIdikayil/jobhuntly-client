import { Field, Form, Formik, FormikValues } from "formik";
import Timer from "./Timer";
import { otpInitialValues, otpValidationSchema } from "src/validation/common/signup-validation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/redux/store";
import { verifyOtp } from "src/redux/actions/userAction";
import { useNavigate } from "react-router-dom";

function Otp() {
    const dispath: AppDispatch = useDispatch();
    const state = useSelector((state: RootState) => state.user)
    const navigate = useNavigate()
    async function handleOtp(values: FormikValues) {
        try {
            let value:any = {
                ...values,
                email: state.user.email,
                intention: true
            }
            const data = await dispath(verifyOtp(value)).unwrap()
            if (data) {
                
                return navigate('/forgot-password')
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Formik
            initialValues={otpInitialValues}
            validationSchema={otpValidationSchema}
            onSubmit={handleOtp}
        >
            {({ errors }) => (
                <Form className='flex flex-col'>
                    <div className="mt-3 text-1xl sm:text-3xl font-semibold leading-10 text-center text-gray-800">
                        Get more opportunities{" "}
                    </div>

                    <Timer initialSeconds={240} onExpire={() => { }} />

                    <div className="mt-4 font-semibold leading-[160%] text-slate-600">
                        Enter otp
                        <span className='text-red-600'>
                            {
                                errors?.otp && errors?.otp ||
                                state?.err && state.err
                            }
                        </span>
                    </div>
                    <Field
                        name='otp'
                        placeholder='Enter otp'
                        className='justify-center items-start px-3 py-2 mt-1 text-gray-500 bg-white border border-solid border-zinc-200 leading-[160%] max-md:pr-5'
                        type="text"
                    />

                    <button type='submit' className="justify-center items-center px-6 py-3 mt-6 font-bold text-center text-white whitespace-nowrap bg-indigo-600 leading-[160%] max-md:px-5">
                        verify
                    </button>

                </Form>
            )}
        </Formik>
    )
}

export default Otp