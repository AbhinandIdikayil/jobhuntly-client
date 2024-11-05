import { Field, Form, Formik, FormikValues } from "formik"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { adminLogin } from "src/redux/actions/adminAction"
import { AppDispatch, RootState } from "src/redux/store"
import { adminLoginInitialValues, adminLoginValidationSchema } from "src/validation/admin"

function Login() {

  const dispatch: AppDispatch = useDispatch();
  const state = useSelector((state: RootState) => state.user);
  const navigate = useNavigate()

  async function handleAdminLogin(values: FormikValues) {
    try {
      await dispatch(adminLogin(values)).unwrap()
      navigate('/admin/home')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (state.role == 'admin' && state.user) {
      return navigate('/admin/home')
    }
  }, [])

  return (

    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="maxw-screen-xl m-0 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">
              Login
            </h1>
            <Formik
              initialValues={adminLoginInitialValues}
              validationSchema={adminLoginValidationSchema}
              onSubmit={handleAdminLogin}
            >
              {({ errors }) => (
                <Form>
                  <div className="w-full flex-1 mt-8">

                    <div className="mx-auto max-w-xs">
                      {
                        errors?.email && (<span className="text-red-600"> {errors?.email} </span>)
                        ||
                        (typeof state?.err === 'object' && state?.err?.message && (
                          <span className="text-red-600">{state?.err?.message}</span>
                        ))
                      }
                      <Field
                        name='email'
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="email" placeholder="Email" />
                      {
                        errors?.password && (<span className="text-red-600"> {errors?.password} </span>)
                      }

                      <Field
                        name='password'
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                        type="password" placeholder="Password" />
                      <button type="submit"
                        className="mt-5 tracking-wide font-semibold bg-green-500 text-gray-100 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                        </svg>

                        <span className="ml-3">
                          Sign In
                        </span>
                      </button>
                    </div>

                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Login