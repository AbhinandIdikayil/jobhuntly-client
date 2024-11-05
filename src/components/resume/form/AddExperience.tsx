import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import { LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { UseResumeContext } from 'src/context/ResumeContext';
import RichTextEditor from '../RichTextEditor';


function AddExperience() {
  const [experinceList, setExperinceList] = useState<any>([]);
  const { resume, setResume } = UseResumeContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    resume?.experience?.length > 0 && setExperinceList(resume?.experience)
  }, [])

  const handleChange = (index: any, event: any) => {
    const newEntries = experinceList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setExperinceList(newEntries);
  }

  const AddNewExperience = () => {
    setExperinceList([...experinceList, {
      title: '',
      companyName: '',
      city: '',
      state: '',
      startDate: '',
      endDate: '',
      workSummery: '',
    }])
  }

  const RemoveExperience = () => {
    setExperinceList((experinceList: any) => experinceList.slice(0, -1))
  }

  const handleRichTextEditor = (e: any, name: any, index: any) => {
    const newEntries = experinceList.slice();
    newEntries[index][name] = e.target.value
    setExperinceList(newEntries);
  }

  useEffect(() => {
    setResume({
      ...resume,
      experience: experinceList
    });

  }, [experinceList]);


  const onSave = () => {
    setLoading(true)
    setLoading(false);
    toast('Details updated !')

  }
  return (
    <div>
      <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Professional Experience</h2>
        <p>Add Your previous Job experience</p>
        <div>
          {experinceList?.map((item: any, index: any) => (
            <div key={index}>
              <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                <div>
                  <label className='text-xs'>Position Title</label>
                  <Input name="title"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.title}
                  />
                </div>
                <div>
                  <label className='text-xs'>Company Name</label>
                  <Input name="companyName"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.companyName} />
                </div>
                <div>
                  <label className='text-xs'>City</label>
                  <Input name="city"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.city} />
                </div>
                <div>
                  <label className='text-xs'>State</label>
                  <Input name="state"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.state}
                  />
                </div>
                <div>
                  <label className='text-xs'>Start Date</label>
                  <Input type="date"
                    name="startDate"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.startDate} />
                </div>
                <div>
                  <label className='text-xs'>End Date</label>
                  <Input type="date" name="endDate"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.endDate}
                  />
                </div>
                <div className='col-span-2'>
                  {/* Work Summery  */}
                  <RichTextEditor
                    index={index}
                    defaultValue={item?.workSummery}
                    onRichTextEditorChange={(event: any) => handleRichTextEditor(event, 'workSummery', index)} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='flex max-md:flex-wrap max-md:gap-2 justify-between'>
          <div className='flex gap-2 max-md:flex-wrap'>
            <Button variant="outline" onClick={AddNewExperience} className="text-primary"> + Add More Experience</Button>
            <Button variant="outline" onClick={RemoveExperience} className="text-primary"> - Remove</Button>
          </div>
          <Button disabled={loading} onClick={() => onSave()}>
            {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AddExperience