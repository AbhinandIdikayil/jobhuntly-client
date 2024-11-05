import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { UseResumeContext } from 'src/context/ResumeContext';
import { generateUniqueKey } from 'src/utils/uniqueKey';

function AddSkills() {


  const [skillsList, setSkillsList] = useState<any>([{
    name: '',
  }])

  const [loading, setLoading] = useState(false);
  const { resume, setResume } = UseResumeContext();
  useEffect(() => {
    resume && setSkillsList(resume?.skills)
  }, [])


  const AddNewSkills = () => {
    let skills = resume?.skill
    let data = [
      ...skills,
      {
        name: '',
        data: ''
      }
    ]
    setResume({
      ...resume,
      skill: data
    })
  }
  const RemoveSkills = () => {
    let skills = resume?.skill
    skills?.pop()
    setResume({
      ...resume,
      skill: skills
    })
  }

  const onSave = () => {
    setLoading(true);
    setLoading(false);
    toast('Details updated !')
  }

  useEffect(() => {
    setResume({
      ...resume,
      skills: skillsList
    })
  }, [skillsList])

  const handleSkillChange = (index: number, key: 'name' | 'data', value: string) => {
    setResume((prevState: any) => {
      const updatedSkills = prevState.skill.map((skill:any, i:number) =>
        i === index ? { ...skill, [key]: value } : skill
      );
      return {
        ...prevState,
        skill: updatedSkills,
      };
    });
  };

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
      <h2 className='font-bold text-lg'>Skills</h2>
      <p>Add Your top professional key skills</p>
      <div>
        {
          resume?.skill?.length &&
          resume?.skill?.map((data: any, ind: number) => (
            <div key={generateUniqueKey()} className='flex flex-col justify-between mb-2 border rounded-lg p-3 '>
              <div>
                <Input className="w-full"
                  defaultValue={data?.name}
                  onChange={(e) => handleSkillChange(ind, 'name', e.target.value)}
                />
                <label className='text-xs'>Name</label>
              </div>
              <textarea
                className='w-full h-32 p-2 border-2 border-solid border-black rounded'
                name="description"
                defaultValue={data?.data}
                onChange={(e) => handleSkillChange(ind, 'data', e.target.value)}
              />
            </div>
          ))

        }

      </div>
      <div className='flex justify-between'>
        <div className='flex gap-2'>
          <Button variant="outline" onClick={AddNewSkills} className="text-primary"> + Add More Skill</Button>
          <Button variant="outline" onClick={RemoveSkills} className="text-primary"> - Remove</Button>

        </div>
        <Button disabled={loading} onClick={() => onSave()}>
          {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
        </Button>
      </div>
    </div>
  )
}

export default AddSkills