import io, { Socket } from 'socket.io-client'
import { createContext , useContext, useEffect, useState} from 'react'
import { Children } from 'src/types/AllTypes'


const SocketContext = createContext<Socket | null>(null)



export const useSocket = () => useContext(SocketContext)



export const SocketProvider = ({children}:Children) => {
    const [socket,setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        console.log(String(process.env.COMPANY_ORIGIN))
        const newSocket = io(String(process.env.COMPANY_ORIGIN));
        setSocket(newSocket);
        return () => {
            newSocket.close()
        }
    },[])

    return (
        <SocketContext.Provider value={socket} >
            {children}
        </SocketContext.Provider>
    )
}