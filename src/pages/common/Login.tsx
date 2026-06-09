import React, { useEffect, useState } from "react"
import { Login as LoginI } from "../../types/AllTypes"
import { Formik, Field, FormikValues, Form } from 'formik'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { AppDispatch, RootState } from "../../redux/store"
import { useDispatch, useSelector } from "react-redux"
import { googleLoginAndSignup, login } from "../../redux/actions/userAction"
import Navbar from "../user/BeforeOneApplicant/Navbar"
import { ForgotPSConfirm } from "../../components/common/ForgotPSConfirm"
import { LoginvalidationSchema } from "src/validation/common/signup-validation"
import Otp from "src/components/common/Otp"
import { GoogleLogin } from '@react-oauth/google'
import { resetErr } from "src/redux/reducers/user/userSlice"
import LoginAndSignupSidePage from "src/components/common/LoginAndSignupSidePage"


const Login: React.FC = () => {
    const user = useSelector((state: RootState) => state?.user)
    const dispath: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const [otpPage, setOtpPage] = useState(false);
    const location = useLocation()

    const [isCompanyLogin, setIsCompanyLogin] = useState(false);

    useEffect(() => {
        dispath(resetErr())
        if (user.role == 'company') {
            return navigate('/company')
        } else if (user.role == 'user') {
            return navigate('/home')
        }
    }, [])

    useEffect(() => {
        setIsCompanyLogin(window.location.pathname.includes('/company/login'))
    }, [user])


    const responseMessage = (response: Object) => {
        console.log(response);
        let data;
        if (location.pathname === '/company/login') {
            data = {
                ...response,
                role: 'company',
                page: 'login'
            }
        } else {
            data = {
                ...response,
                role: 'user',
                page: 'login'
            }
        }
        console.log(data)
        handleGoogleAuth(data)
    };
    const errorMessage = () => {
        console.log('auth failed');
    };


    async function handleGoogleAuth(data: any) {
        try {
            let result = await dispath(googleLoginAndSignup(data)).unwrap()
            console.log(result)
            if (result) {
                navigate('/home');
            }
        } catch (error) {
            console.log(error);
        }
    }



    const initialValues: LoginI = {
        email: '',
        password: ''
    }

    async function handleSubmit(values: FormikValues) {
        const formData: any = {
            ...values
        }
        try {
            const data = await dispath(login(formData)).unwrap()
            if (data) {
                if (location.pathname == '/company/login') {
                    return navigate('/company')
                } else {
                    return navigate('/home')
                }
            }
        } catch (error) {
            console.log(error)
        }
        console.log(values)
    }

    return (
        <div className="bg-white h-screen">
            <Navbar />
            <div className="flex  max-md:flex-col max-md:gap-0">
                <LoginAndSignupSidePage />
                <div className="flex flex-col w-[50%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col h-full justify-center px-16 w-full text-base bg-white max-md:px-5 max-md:max-w-full">
                        {
                            otpPage ? (
                                <div className="flex flex-col pt-5 sm:pt-0 pb-1 mx-8 bg-white max-md:mx-2.5">
                                    <Otp />
                                </div>
                            ) : (
                                <div className="flex flex-col pt-3 sm:pt-0 pb-1 mx-8 bg-white max-md:mx-2.5">
                                    <div className="flex gap-0 justify-center self-center font-semibold text-indigo-600 leading-[160%]">
                                        {
                                            isCompanyLogin ? (
                                                <>
                                                    <Link to={'/login'} className="justify-center px-3 py-2 bg-white">
                                                        Job Seeker
                                                    </Link>
                                                    <Link to={'/company/login'} className="justify-center px-3 py-2 whitespace-nowrap bg-violet-100 ">
                                                        Company
                                                    </Link>
                                                </>
                                            ) : (
                                                <>
                                                    <Link to={'/login'} className="justify-center px-3 py-2 bg-violet-100">
                                                        Job Seeker
                                                    </Link>
                                                    <Link to={'/company/login'} className="justify-center px-3 py-2 whitespace-nowrap bg-white">
                                                        Company
                                                    </Link>
                                                </>
                                            )
                                        }
                                    </div>
                                    <div className="mt-3 text-1xl sm:text-3xl font-semibold leading-10 text-center text-gray-800">
                                        Welcome back dude{" "}
                                    </div>
                                    <div className="flex justify-center items-center px-4 py-3 mt-6 font-bold text-center text-indigo-600 leading-[160%] max-md:px-5">
                                        <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
                                    </div>
                                    <div className="flex gap-2 items-center py-1 mt-3 text-center text-gray-800 leading-[160%]">
                                        <div className="hidden shrink-0 self-stretch my-auto h-px border border-solid bg-zinc-200 border-zinc-200 w-[109px]" />
                                        <div className="flex-auto self-stretch">
                                            Or login with email
                                        </div>
                                        <div className="hidden shrink-0 self-stretch my-auto h-px border border-solid bg-zinc-200 border-zinc-200 w-[104px]" />
                                    </div>
                                    <Formik
                                        initialValues={initialValues}
                                        validationSchema={LoginvalidationSchema}
                                        onSubmit={handleSubmit}
                                    >
                                        {({ errors, isSubmitting }) => (
                                            <Form className="flex flex-col">

                                                <div className="mt-4 font-semibold leading-[160%] text-slate-600">
                                                    Email Address
                                                    <span className="text-red-600">
                                                        {
                                                            errors?.email
                                                                ? '(' + errors.email + ')'
                                                                : (typeof user?.err === 'string' && user?.err.includes('user'))
                                                                    ? '(' + user?.err + ')'
                                                                    : null
                                                        }
                                                    </span>
                                                </div>
                                                <Field
                                                    placeholder=' Enter email address'
                                                    className='justify-center items-start px-3 py-2 mt-1 text-gray-500 bg-white border border-solid border-zinc-200 leading-[160%] max-md:pr-5'
                                                    type="text"
                                                    name='email'
                                                />
                                                <div className="mt-4 font-semibold leading-[160%] text-slate-600">
                                                    Password
                                                    <span className="text-red-600">
                                                        {
                                                            errors?.password
                                                                ? '(' + errors.password + ')'
                                                                : (typeof user?.err === 'string' && !user?.err.includes('user'))
                                                                    ? '(' + user?.err + ')'
                                                                    : null
                                                        }
                                                    </span>
                                                </div>
                                                <Field
                                                    name='password'
                                                    placeholder=' Enter password'
                                                    className='justify-center items-start px-3 py-2 mt-1 text-gray-500 bg-white border border-solid border-zinc-200 leading-[160%] max-md:pr-5'
                                                    type="text"
                                                />
                                                {/* //! here whenever some click the forgot password a modal will popup
                                    //! here if the email exist in DB it will render a otp page the function 
                                    //! passing is to update the otpPage state to true. On the starting phase of 
                                    //! this component i have done the conditional rendering
                                    */}

                                                <ForgotPSConfirm setOtpPage={setOtpPage} />

                                                {
                                                    isSubmitting ? (
                                                        <button className="justify-center items-center px-6 py-3 mt-6 font-bold text-center text-white whitespace-nowrap bg-indigo-600 leading-[160%] max-md:px-5">
                                                            Loging in
                                                        </button>
                                                    ) : (
                                                        <button type="submit" disabled={isSubmitting} className="justify-center items-center px-6 py-3 mt-6 font-bold text-center text-white whitespace-nowrap bg-indigo-600 leading-[160%] max-md:px-5">
                                                            Login
                                                        </button>
                                                    )
                                                }

                                                <div className="flex gap-2 mt-4">
                                                    <div className="text-gray-800 leading-[160%]">
                                                        Dont have an account?
                                                    </div>
                                                    <Link to={'/signup'} className="font-semibold text-center text-indigo-600 leading-[150%]">
                                                        signup
                                                    </Link>
                                                </div>

                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
