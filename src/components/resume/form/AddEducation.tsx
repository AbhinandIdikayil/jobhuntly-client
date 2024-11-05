import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { UseResumeContext } from 'src/context/ResumeContext';
import { generateUniqueKey } from 'src/utils/uniqueKey';

function AddEducation() {

  const [loading, setLoading] = useState<boolean>(false);
  const { resume, setResume } = UseResumeContext();
  const [educationalList, setEducationalList] = useState<any>([
    {
      universityName: '',
      degree: '',
      major: '',
      startDate: '',
      endDate: '',
      description: ''
    }
  ])

  useEffect(() => {
    resume && setEducationalList(resume?.education)
  }, [])
  const handleChange = (event: any, index: number) => {
    const newEntries = educationalList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setEducationalList(newEntries);
  }

  const AddNewEducation = () => {
    setEducationalList([...educationalList,
    {
      universityName: '',
      degree: '',
      major: '',
      startDate: '',
      endDate: '',
      description: ''
    }
    ])
  }
  const RemoveEducation = () => {
    setEducationalList((educationalList: any) => educationalList.slice(0, -1))
  }
  const onSave = () => {
    setLoading(true)

    setLoading(false)
    toast('Details updated !')
  }

  useEffect(() => {
    setResume({
      ...resume,
      education: educationalList
    })
  }, [educationalList])


  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
      <h2 className='font-bold text-lg'>Education</h2>
      <p>Add Your educational details</p>

      <div>
        {educationalList.map((item: any, index: number) => (
          <div key={generateUniqueKey()}>
            <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
              <div className='col-span-2'>
                <label>University Name</label>
                <Input name="universityName"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.universityName}
                />
              </div>
              <div>
                <label>Degree</label>
                <Input name="degree"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.degree} />
              </div>
              <div>
                <label>Major</label>
                <Input name="major"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.major} />
              </div>
              <div>
                <label>Start Date</label>
                <Input type="date" name="startDate"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.startDate} />
              </div>
              <div>
                <label>End Date</label>
                <Input type="date" name="endDate"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.endDate} />
              </div>
              <div className='col-span-2'>
                <label>Description</label>
                <textarea
                  className='w-full h-32 p-2 border-2 border-solid border-black rounded'
                  name="description"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.description} />
              </div>

            </div>

          </div>
        ))}
      </div>
      <div className='flex justify-between max-md:flex-wrap gap-1'>
        <div className='flex gap-2 max-md:flex-wrap'>
          <Button variant="outline" onClick={AddNewEducation} className="text-primary"> + Add More Education</Button>
          <Button variant="outline" onClick={RemoveEducation} className="text-primary"> - Remove</Button>
        </div>
        <Button disabled={loading} onClick={() => onSave()}>
          {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
        </Button>
      </div>
    </div>
  )
}

export default AddEducation