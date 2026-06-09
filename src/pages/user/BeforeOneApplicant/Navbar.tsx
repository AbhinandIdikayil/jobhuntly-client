import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AppDispatch, RootState } from '../../../redux/store'
import { resetState } from '../../../redux/reducers/user/userSlice';
import { getUser, logout } from '../../../redux/actions/userAction';
import { useEffect } from 'react';
import { listCategory, listSectors } from 'src/redux/actions/commonAction';
import { googleLogout } from '@react-oauth/google'

function Navbar() {
    const user = useSelector((state: RootState) => state.user)
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate()

    const fetch = async () => {
        try {
            await dispatch(listCategory(null)).unwrap()
            await dispatch(listSectors()).unwrap()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (user?.user) {
            dispatch(getUser()).unwrap()
        }
        fetch()
        // if (user.role == 'user') {
        //     return navigate('/home')
        // } 
        if (user.role == 'company') {
            return navigate('/company')
        }
    }, [])


    async function handleLogout() {
        try {
            let data = await dispatch(logout(undefined))
            if (data) {
                dispatch(resetState())
                googleLogout()
                return navigate('/login')
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <nav className="flex justify-center items-center self-stretch px-16 max-md:py-2 w-full max-md:px-5 max-md:w-full border-b-2">
            <div className="flex gap-1 sm:gap-5 justify-between items-center  w-full max-w-[1192px] max-md:w-full">
                <div className="flex gap-1 sm:gap-5 justify-center max-md:flex-wrap max-md:w-full">
                    <div className="hidden sm:flex gap-2  items-center">
                        <div className="flex overflow-hidden relative flex-col justify-center items-center w-8 aspect-square">
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/40550eadec7bbc460f9ee4be4291e780f8963001faa5df2daa66f0614767c8b9?"
                                className="shrink-0 aspect-[1.35] w-[43px]"
                            />
                        </div>
                        <Link to={'/home'} className="flex-auto text-2xl font-bold tracking-tight leading-9 text-slate-800">
                            JobHuntly
                        </Link>
                    </div>
                    <div className="flex gap-4 justify-center pt-1 items-center text-sm sm:text-base font-medium leading-6 text-slate-600">
                        <NavLink to={'/home/jobs'}> Jobs</NavLink>
                        <NavLink to={'/home/companies'}>Companies</NavLink>
                    </div>
                </div>
                <div className="flex max-md:flex-wrap w-full sm:w-auto gap-1 sm:gap-4 justify-center items-center p-1 sm:py-3.5  text-base font-bold leading-6 text-center">
                    {
                        user?.user ? (
                            <div className='flex justify-center items-center gap-1 sm:gap-4 '>
                                <button onClick={handleLogout} className="px-3 md:px-6 py-1 text-xs md:text-base sm:py-3 text-white bg-indigo-600 max-sm:rounded-md my-auto">Logout</button>
                                <NavLink to='/dashboard' className="text-indigo-600 text-xs md:text-base">Dashboard</NavLink>
                            </div>
                        ) : (
                            <>
                                <NavLink to='/login' className="my-auto text-indigo-600">Login</NavLink>
                                <NavLink to='/signup' className="justify-center px-3 text-sm ms:px-6 py-1 sm:py-3 text-white bg-indigo-600 max-sm:rounded">
                                    Sign Up
                                </NavLink>
                            </>
                        )
                    }

                </div>
            </div>
        </nav>
    )
}

export default Navbar