import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Bell, Home, Menu } from 'lucide-react'
import { useEffect, useState } from 'react'
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
        <header className="flex items-center justify-between h-[72px] px-6 lg:px-8 bg-white border-b border-warm-border shrink-0">
            {/* Left section */}
            <div className="flex items-center gap-4">
                <button
                    onClick={func}
                    className={`
                        lg:hidden flex items-center justify-center
                        w-9 h-9 rounded-lg
                        text-warm-text-secondary hover:text-warm-text-primary
                        hover:bg-stone-100 transition-colors duration-150
                        ${open ? 'hidden' : ''}
                    `}
                >
                    <Menu size={20} />
                </button>

                <div className="flex flex-col">
                    <h1 className="text-xl font-display text-warm-text-primary tracking-wide">
                        Dashboard
                    </h1>
                    <p className="text-[12px] text-warm-text-tertiary mt-0.5 hidden sm:block">
                        Welcome back{user?.user?.name ? `, ${user.user.name}` : ''}
                    </p>
                </div>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-2">
                {/* Notifications */}
                <Popover>
                    <PopoverTrigger asChild>
                            <button className="relative flex items-center justify-center w-10 h-10 rounded-xl text-warm-text-secondary hover:text-warm-text-primary hover:bg-stone-100 transition-colors duration-150">
                                <Bell size={19} strokeWidth={1.8} />
                                {notifications?.length > 0 && (
                                    <span className="absolute top-1.5 right-1.5 w-[18px] h-[18px] bg-indigo-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                                        {notifications.length > 9 ? '9+' : notifications.length}
                                    </span>
                                )}
                            </button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-80 p-0 rounded-xl border-warm-border shadow-warm-md overflow-hidden">
                        <div className="px-4 py-3 border-b border-warm-border bg-warm-surface-warm">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-semibold text-warm-text-primary font-body">
                                        Notifications
                                    </h3>
                                    {notifications?.length > 0 && (
                                        <button
                                            onClick={() => setNotifications([])}
                                            className="text-[11px] font-medium text-indigo-600 hover:text-indigo-700 transition-colors uppercase tracking-wider"
                                        >
                                            Clear all
                                        </button>
                                    )}
                                </div>
                        </div>
                        <ScrollArea className="h-64">
                            <div className="p-2">
                                {notifications?.length > 0 ? (
                                    notifications?.map((data: any, ind: number) => (
                                        <div
                                            key={ind + (data?.from || data?.content?.content)}
                                            className="px-3 py-2.5 rounded-lg hover:bg-stone-50 transition-colors"
                                        >
                                            {data?.from ? (
                                                <div className="flex flex-col gap-1.5">
                                                    <p className="text-[13px] text-warm-text-primary leading-snug">
                                                        {data?.data}
                                                    </p>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-[11px] text-warm-text-tertiary">
                                                            from {data?.from}
                                                        </span>
                                                        <a
                                                            href={data?.link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-700 uppercase tracking-wider"
                                                        >
                                                            Join
                                                        </a>
                                                    </div>
                                                </div>
                                            ) : (
                                                <p className="text-[13px] text-warm-text-primary leading-snug">
                                                    {data?.content?.content}
                                                </p>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-8 text-center">
                                        <Bell size={24} className="text-stone-300 mb-2" />
                                        <p className="text-[13px] text-warm-text-tertiary">No notifications yet</p>
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                    </PopoverContent>
                </Popover>

                {/* Divider */}
                <div className="w-px h-6 bg-warm-border mx-1 hidden sm:block" />

                {/* Home link */}
                <Link
                    to="/home"
                    className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-[13px] font-medium hover:bg-indigo-700 transition-colors duration-150"
                >
                    <Home size={15} strokeWidth={1.8} />
                    <span>Home</span>
                </Link>
            </div>
        </header>
    )
}

export default Header
