import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';
import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import PersonalDetail from './form/PersonalDetail';
import Summary from './form/Summary';
import AddExperience from './form/AddExperience';
import AddEducation from './form/AddEducation';
import AddSkills from './form/AddSkills';
import ThemeColor from './ThemeColor';
import { UseResumeContext } from 'src/context/ResumeContext';

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(true);
  const { resume } = UseResumeContext()
  return (
    <div>
      <div className='flex justify-between items-center'>
        <div className='flex gap-5'>
          <Link to={"/dashboard"}>
            <Button><Home /></Button>
          </Link>
          <ThemeColor />

        </div>
        <div className='flex gap-2'>
          {activeFormIndex > 1
            && <Button size="sm"
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}> <ArrowLeft /> </Button>}
          <Button
            disabled={!enableNext}
            className="flex gap-2" size="sm"
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
          > Next
            <ArrowRight /> </Button>
        </div>
      </div>
      {/* Personal Detail  */}
      {activeFormIndex == 1 ?
        <PersonalDetail enabledNext={(v: any) => setEnableNext(v)} />
        : activeFormIndex == 2 ?
          <Summary enabledNext={(v: any) => setEnableNext(v)} />
          : activeFormIndex == 3 ?
            <AddExperience />
            : activeFormIndex == 4 ?
              <AddEducation />
              : activeFormIndex == 5 ?
                <AddSkills />
                : activeFormIndex == 6 ?
                  <Navigate state={resume} to={'/dashboard/resume/view'} />

                  : null
      }



    </div>
  )
}

export default FormSection