import { CircleX, SendHorizonal } from "lucide-react"
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { UseChatSocketContext } from "src/context/ChatSocketContext";
import { sendMessage } from "src/redux/actions/chatAction";
import { AppDispatch, RootState } from "src/redux/store";
import { uploadToCloudinary } from "src/utils/common/cloudinaryUpload";

function File_And_ImagePreview({ setMessages, file, preview, setPreview, setFile }: { setMessages: any, file: File, preview: any, setPreview: (prev: string | null) => void, setFile: (prev: File | null) => void }) {
    const { socket, socketConnected } = UseChatSocketContext()
    const chatState = useSelector((state: RootState) => state?.chat)
    const dispatch: AppDispatch = useDispatch()
    async function handleSubmit(fileUrl: string) {
        if (socket && socket.connected && socketConnected) {
            let messageInput = ''
            if (file?.type === 'application/pdf') {
                messageInput = 'doc' 
            } else if (file?.type?.startsWith('image/')) {
                messageInput = 'image' 
            }
            let data: any;
            if (location.pathname == '/company/messages') {
                data = {
                    recieverId: chatState?.selectedUser?.members[0],
                    chatId: chatState?.selectedUser?._id,
                    content: {
                        type: messageInput,
                        content: fileUrl
                    },
                    status: 'unread'
                }
            } else {
                data = {
                    recieverId: chatState?.selectedUser?.members[1],
                    chatId: chatState?.selectedUser?._id,
                    content: {
                        type: messageInput,
                        content: fileUrl
                    },
                    status: 'unread'
                }
            }
            try {
                let res = await dispatch(sendMessage(data)).unwrap()
                socket.emit('send-message', res)
                setMessages((prevMessages: any) => [...prevMessages, res]);
            } catch (error) {
                console.log(error)
            } finally {
                setPreview(null)
                 setFile(null)
            }
        } else {
            toast.warn('socket not connected')
        }
    }
    async function uploadFile() {
        try {
            let url = await uploadToCloudinary(file)
            handleSubmit(url)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[300px] bg-blue-500 z-50 rounded-3xl flex flex-col justify-around shadow-xl' >
            <div className="flex justify-center">
                {file.type.startsWith('image/') && preview && (
                    <img src={preview} alt="Selected file preview" className="max-w-xs max-h-64" />
                )}

                {file.type === 'application/pdf' && preview && (
                    // Preview PDFs with iframe or react-pdf
                    <iframe src={preview} title="PDF Preview" className="w-full h-64"></iframe>
                    // Alternatively, you can use react-pdf like:
                    // <Document file={preview}>
                    //   <Page pageNumber={1} />
                    // </Document>
                )}

                {file.type.startsWith('text/') && preview && (
                    <pre className="p-2 border">{preview}</pre>
                )}

                {!file.type.startsWith('image/') && !file.type.startsWith('text/') && file.type !== 'application/pdf' && (
                    <div className="flex flex-col justify-center items-center w-full">
                        <div className="text-white font-bold text-center w-full">Selected File: {file?.name}</div>
                        <a href={URL.createObjectURL(file)} download={file?.name} className="text-white underline text-center">
                            Download {file.name}
                        </a>
                    </div>
                )}

            </div>
            <div className="flex justify-center">
                <div className=" w-[140px] flex justify-between">
                    <div className="bg-red-500 rounded-full px-2 py-2">
                        <CircleX onClick={() => { setPreview(null), setFile(null) }} className="text-white" />
                    </div>
                    <div className="bg-green-500 rounded-full px-2 py-2">
                        <SendHorizonal onClick={uploadFile} className="text-white" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default File_And_ImagePreview