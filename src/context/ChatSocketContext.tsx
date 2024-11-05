import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import io, { Socket } from 'socket.io-client'
import { RootState } from 'src/redux/store';
import { Children } from 'src/types/AllTypes';



interface ChatSocketContextType {
    socket: Socket | null;
    socketConnected: boolean;
    setSocketConnected: React.Dispatch<React.SetStateAction<boolean>>;
    isCalling: boolean;
    setIsCalling: React.Dispatch<React.SetStateAction<boolean>>;
    callId: string | null;
    setCallId: React.Dispatch<React.SetStateAction<string | null>>;
    isOnCall: boolean;
    setIsOnCall: React.Dispatch<React.SetStateAction<boolean>>;
    notifications: any[]
    setNotifications: React.Dispatch<React.SetStateAction<any[]>>
}

const ChatSocketContext = createContext<ChatSocketContextType | null>(null);

export const UseChatSocketContext = () => {
    const context = useContext(ChatSocketContext);
    if (!context) {
        throw new Error('UseChatSocketContext must be used within a ChatSocketProvider');
    }
    return context;
};


export const ChatSocketProvider = ({ children }: Children) => {
    const [socketConnected, setSocketConnected] = useState<boolean>(false)
    const [isCalling, setIsCalling] = useState(false);
    const [isOnCall, setIsOnCall] = useState(false);
    const [callId, setCallId] = useState<string | null>(null);
    const [notifications, setNotifications] = useState<any[]>([])
    const selectedChat = useSelector((state: RootState) => state?.chat?.selectedUser)
    const location = useLocation()
    const socketRef = useRef<Socket | null>(null);
    const locationRef = useRef(location.pathname); // Store the latest location.pathname

    useEffect(() => {
        if (!socketRef.current) {
            const newSocket = io(String(process.env.CHAT_ORIGIN));
            newSocket.on('connect', () => {
                setSocketConnected(true);
            });
            newSocket.on('disconnect', () => {
                setSocketConnected(false);
            });
            socketRef.current = newSocket;
        }

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        function interview(data: any) {
            setNotifications((prev: any) => [...prev,data])
        }
        if(socketRef?.current){
            socketRef?.current?.on('interviewee',interview)

            return () => {
                socketRef.current?.off('interviewee',interview)
            }
        }
    }, [socketRef])

    const handleNotification = (data: any) => {
        if (!locationRef?.current?.endsWith('messages') || data?.chatId !== selectedChat?._id) {
            setNotifications((prev: any) => [...prev, data]);
        } else {
        }
    }

    useEffect(() => {
        locationRef.current = location.pathname;
    }, [location.pathname]);

    useEffect(() => {
        if (socketRef?.current) {
            socketRef.current.on('recieve-message', handleNotification);
            return () => {
                socketRef?.current?.off('receive-message', handleNotification);
            };
        }
    }, [socketRef])

    return (
        <ChatSocketContext.Provider value={{
            socket: socketRef.current, socketConnected, setSocketConnected, isCalling, setIsCalling,
            callId, setCallId, setIsOnCall, isOnCall, notifications, setNotifications
        }}>
            {children}
        </ChatSocketContext.Provider>
    )
}