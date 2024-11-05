import { Button } from '@/components/ui/button'
import ResumePreview from 'src/components/resume/ResumePreview'
import { RWebShare } from 'react-web-share'
import { UseResumeContext } from 'src/context/ResumeContext'
function ResumeView() {


    const { resume } = UseResumeContext()


    const HandleDownload = () => {
        let res = document.getElementById('print-area')
        if(res){
            window.print();
        }
    }

    return (
        <>
            <div id="no-print">
                <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
                    <h2 className='text-center text-2xl font-medium'>
                        Congrats! Your Ultimate AI generates Resume is ready ! </h2>
                    <p className='text-center text-gray-400'>Now you are ready to download your resume and you can share unique
                        resume url with your friends and family </p>
                    <div className='flex justify-between px-44 max-md:px-10 my-10'>
                        <Button onClick={HandleDownload}>Download</Button>

                        <RWebShare
                            data={{
                                text: "Hello Everyone, This is my resume please open url to see it",
                                url: import.meta?.env?.VITE_BASE_URL || 'https://jobhuntLy-client.vercel.app' + "/my-resume/view",
                                title: resume?.firstName + " " + resume?.lastName + " resume",
                            }}
                            onClick={() => console.log("shared successfully!")}
                        > <Button>Share</Button>
                        </RWebShare>
                    </div>
                </div>

            </div>
            <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
                <div id="print-area" >
                    <ResumePreview />
                </div>
            </div>
        </>
    )
}

export default ResumeView