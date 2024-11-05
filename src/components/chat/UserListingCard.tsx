import { Avatar } from '@mui/material'
import { useEffect, useState, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { UseChatSocketContext } from 'src/context/ChatSocketContext'
import { getAllusers } from 'src/redux/actions/adminAction'
import { createOneToOneChat, getAllMessages, listChats } from 'src/redux/actions/chatAction'
import { listAllCompanies } from 'src/redux/actions/commonAction'
import { AppDispatch, RootState } from 'src/redux/store'

function UserListingCard({ data, setLoading, setMessages }: { data: any, setLoading: (newState: boolean) => void, setMessages: (newState: any) => void }) {
    const dispatch: AppDispatch = useDispatch()
    const [chatDetails, setChatDetails] = useState<any>()
    const users = useSelector((state: RootState) => state?.admin)
    const chat = useSelector((state: RootState) => state?.chat)
    const user = useSelector((state:RootState)=> state?.user?.user)
    const location = useLocation()
    const { socket } = UseChatSocketContext()
    const [onlineUsers, setOnlineUsers] = useState<any>([]);
    const [onlineCompanies, setOnlineCompanies] = useState<any>([]);

    async function createChat(data: any) {
        setMessages('')
        try {
            setLoading(true)
            let result
            if (location.pathname == '/company/messages') {
                result = await dispatch(createOneToOneChat({ data, role: 'company' })).unwrap()
            } else {
                result = await dispatch(createOneToOneChat({ data, role: 'user' })).unwrap()
            }
            return result
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    async function filterChat() {
        await dispatch(listAllCompanies(undefined)).unwrap()
        await dispatch(getAllusers()).unwrap()
        // if (a || b) {
        if (location.pathname == '/company/messages') {
            let res = users?.users?.filter(user => user?._id == data?.members[0])
            setLoading(false)
            setChatDetails(res)
            return;
        } else {
            let res = users?.companies?.companies?.filter(com => com?._id === data?.members?.[1])
            setLoading(false)
            setChatDetails(res)
        }
        // }
        setLoading(false)
    }

    async function listMessage() {
        setLoading(true)
        try {
            const data = await dispatch(getAllMessages(chat?.selectedUser?._id)).unwrap()
            if (data) {
                setLoading(false)
                return data
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    useEffect(() => {
        dispatch(listChats()).unwrap()
        if (data) {
            filterChat().then(data => data).catch(err => console.log(err))
        }
    }, [])

    useEffect(() => {
        if (socket && socket?.connected) {
            socket.emit('setup', user)

            const handleOnlineUsers = (val: any) => {
                const users = val?.filter((user: any) => user.role === 'user');
                const companies = val?.filter((user: any) => user.role === 'company');
                if (location.pathname === '/company/messages') {
                    setOnlineUsers(users); // Directly set the new list of online users
                } else {
                    setOnlineCompanies(companies); // Directly set the new list of online companies
                }
            };
            socket.on('get-online-users', handleOnlineUsers)

            return () => {
                socket.off('get-online-users', handleOnlineUsers)
            }
        }

    }, [socket,user,location.pathname])



    useEffect(() => {
        listMessage()
    }, [chat?.selectedUser])

    return (
        <>
            <div onClick={() => createChat(data?._id)}
                className={`${chat?.selectedUser?._id == data?._id ? 'text-indigo-600' : ''}
                relative
                w-full flex gap-2 items-center hover:bg-gray-50 hover:cursor-pointer rounded border-b`
                }>
                <Avatar />
                <div className="flex flex-col">
                    <span className="text-small"> {data?.name || chatDetails?.[0]?.name} </span>
                    <span className="text-tiny text-default-400"> {data?.email || chatDetails?.[0]?.email} </span>
                    {
                        location.pathname == '/company/messages'
                            ?
                            onlineUsers?.length > 0 ? onlineUsers?.map((val: any) => {
                                if (data?.members[0] === val?.userId) {
                                    return (
                                        <div
                                        key={val?.userId}
                                            className={`  
                                            bg-green-500          
                                    w-[8px] h-[8px] absolute right-0 top-2 rounded-lg shadow-lg`}
                                        >

                                        </div>
                                    )
                                } else {
                                    return (<div
                                    key={val?.userId}
                                        className={`  
                                            bg-blue-500          
                                    w-[8px] h-[8px] absolute right-0 top-2 rounded-lg shadow-lg`}
                                    >

                                    </div>)
                                }
                            }) : (
                                <div
                                    className={`  
                                            bg-blue-500          
                                    w-[8px] h-[8px] absolute right-0 top-2 rounded-md shadow-lg`}
                                >
                                </div>
                            )
                            :
                            onlineCompanies?.length > 0 ?
                                onlineCompanies?.map((val: any) => {
                                    if (data?.members[1] == val?.userId) {
                                        return (
                                            <div key={val?.userId}
                                                className={`  
                                            bg-green-500          
                                    w-[8px] h-[8px] absolute right-0 top-2 rounded-md shadow-lg`}
                                            >

                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div key={val?.userId}
                                                className={`  
                                            bg-blue-500          
                                    w-[8px] h-[8px] absolute right-0 top-2 rounded-md shadow-lg`}
                                            >

                                            </div>
                                        )
                                    }
                                }) : (
                                    <div
                                        className={`  
                                            bg-blue-500          
                                    w-[8px] h-[8px] absolute right-0 top-2 rounded-md shadow-lg`}
                                    >

                                    </div>
                                )
                    }

                </div>
            </div>
        </>
    )
}

export default memo(UserListingCard)