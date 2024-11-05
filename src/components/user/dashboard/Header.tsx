import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Bell, Home } from 'lucide-react'
import { useEffect, useState } from 'react'
import { HiMenuAlt3 } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { UseChatSocketContext } from 'src/context/ChatSocketContext'
import { getUser } from 'src/redux/actions/userAction'
import { AppDispatch, RootState } from 'src/redux/store'

interface props {
    func: () => void,
    open: boolean
}

function Header({ func, open }: props) {
    const dispatch: AppDispatch = useDispatch()
    const user = useSelector((state: RootState) => state?.user)
    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>()
    const { socket, setSocketConnected, notifications, setNotifications } = UseChatSocketContext()

    useEffect(() => {
        if (socket) {
            socket.emit('setup', user?.user)
            socket.on('connected', () => setSocketConnected(true))
            socket.on('disconnect', () => {
                console.log('disconnected');
            });

            return () => {
                socket.off('connected');
                socket.off('disconnect');
            };
        }
    }, [socket])

    const fetchUser = async () => {
        try {
            await dispatch(getUser()).unwrap();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const checkUserRole = async () => {
            try {
                await fetchUser();
            } catch (error) {
                // Optionally handle any errors here
            } finally {
                if (!user.role) {
                    navigate('/login');
                }
            }
        };

        checkUserRole();
    }, [])

    useEffect(() => {
        if (!loading) {
            if (!user.role) {
                navigate('/login');
            }
        }
    }, [loading, user.role, navigate]);

    return (
        <div className="flex gap-5 justify-between px-8 w-full bg-slate-50  max-md:flex-wrap max-md:px-5 max-md:max-w-full " style={{  paddingBlock: '16px', borderBottom: '0.5px solid gray' }}>
            <div className="flex gap-4 whitespace-nowrap">
                <div className={`flex items-center ${open ? 'hidden' : ''} `}>
                    <HiMenuAlt3 onClick={func} color='black' size={30} />
                </div>
                <div className="flex flex-col justify-center items-center">
                    <div className="flex gap-2">
                        <div className="hidden sm:block sm:flex-auto text-2xl font-bold tracking-tight leading-9 text-slate-800">
                            Dashboard
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex gap-5 justify-center text-base font-bold leading-6 text-center text-white">
                <Popover>
                    <PopoverTrigger asChild>
                        <div className="flex relative justify-center items-center">
                            {
                                notifications?.length > 0 && (
                                    <span className="bg-red-500 absolute top-1 right-0 px-1 rounded-full flex justify-center items-center" style={{ fontSize: '10px', height: '15px' }} >
                                        {notifications?.length}
                                    </span>
                                )
                            }
                            <Bell color="blue" />
                        </div>
                    </PopoverTrigger>
                    <PopoverContent align="center" className="w-56 sm:w-80" style={{ zIndex: 99 }}>
                        <ScrollArea className="h-40 sm:h-48 rounded-md ">
                            <div className="grid gap-4">
                                <div className="space-y-2">
                                    <h4 className="font-medium leading-none">Dimensions</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Set the dimensions for the layer.
                                    </p>
                                </div>
                                <div className="grid gap-4">
                                    <div className=" border-b border-indigo-600 flex items-center w-full justify-between pb-1">
                                        <h4 className="font-medium leading-none">Notifications</h4>
                                        <span onClick={() => setNotifications([])} className="font-normal text-sm leading-none bg-indigo-600 text-white  rounded-md px-2 py-1">
                                            CLEAR ALL
                                        </span>
                                    </div>
                                    {
                                        notifications?.length > 0 &&
                                        notifications?.map((data: any, ind: number) => {
                                            return data?.from ? (
                                                <div key={ind + data?.from} className="overflow-hidden text-ellipsis whitespace-nowrap w-full items-center gap-1 border rounded shadow-md">
                                                    <span className="text-indigo-600 rounded-full  h-1 "> {ind + 1} ) </span>
                                                    {data?.data}
                                                    <h1 className='pl-1'>from : {data?.from} </h1>
                                                    <a href={data?.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"  >
                                                        <h1 className='px-1 bg-indigo-600 text-white font-bold text-center'>
                                                            click to join
                                                        </h1>
                                                    </a>
                                                </div>
                                            ) : (
                                                <div key={ind + data?.content?.content} className="overflow-hidden text-ellipsis whitespace-nowrap w-full items-center gap-1">
                                                    <span className="text-indigo-600 rounded-full  h-1 "> {ind + 1} ) </span>
                                                    {data?.content?.content}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </ScrollArea>
                    </PopoverContent>
                </Popover>
                <div className="flex gap-1 sm:gap-2.5 justify-center px-2 py-3 sm:px-6 sm:py-3 bg-indigo-600 max-md:rounded-md">
                    <Home className='hidden sm:block' />
                    <Link to={'/home'} className=''>Home Page</Link>
                </div>
            </div>
        </div>
    )
}

export default Header