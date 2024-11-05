import { Button } from '@/components/ui/button';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { UseResumeContext } from 'src/context/ResumeContext';
import { AIChatSession } from '../../../service/AIModal'

const prompt = "Job Title: {jobTitle} , Depends on job title give me list of  summary for 3 experience level, Mid Level and Fresher level in 3 -4 lines in array format, With summary and experience_level Field in JSON Format"

function Summary({ enabledNext }: { enabledNext: any }) {

  const { resume, setResume } = UseResumeContext();
  const [summery, setSummery] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState([]);

  const GenerateSummeryFromAI = async () => {
    setLoading(true)
    const PROMPT = prompt.replace('{jobTitle}', resume?.jobTitle);
    const result = await AIChatSession.sendMessage(PROMPT);

    setAiGenerateSummeryList(JSON.parse(result.response.text()))
    setLoading(false);
  }



  const onSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    enabledNext(true);
    setLoading(false);
    toast("Details updated")

  }

  useEffect(() => {
    summery && setResume({
      ...resume,
      summery: summery
    })
  }, [summery])

  return (
    <div>
      <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Summary</h2>
        <p>Add Summery for your job title</p>

        <form className='mt-7' onSubmit={onSave}>
          <div className='flex justify-between items-end'>
            <label>Add Summary</label>
            <Button variant="outline" onClick={() => GenerateSummeryFromAI()}
              type="button" size="sm" className="border-primary text-primary flex gap-2">
              <Brain className='h-4 w-4' />  Generate from AI</Button>
          </div>
          <textarea className="mt-5 w-full h-32 p-2 border-2 border-solid border-black rounded" required

            value={summery}
            defaultValue={summery ? summery : resume?.summery}
            onChange={(e) => setSummery(e.target.value)}
          />
          <div className='mt-2 flex justify-end'>
            <Button type="submit"
              disabled={loading}>
              {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
            </Button>
          </div>
        </form>
      </div>


      {
        aiGeneratedSummeryList &&
        <div className='my-5'>
          <h2 className='font-bold text-lg'>Suggestions</h2>
          {
            aiGeneratedSummeryList?.map((item: any, index: any) => (
              <div key={index}
                onClick={() => setSummery(item?.summary)}
                className='p-5 shadow-lg my-4 rounded-lg cursor-pointer'>
                <h2 className='font-bold my-1 text-primary'>Level: {item?.experience_level}</h2>
                <p>{item?.summary}</p>
              </div>
            ))}
        </div>
      }

    </div>
  )
}

export default Summary