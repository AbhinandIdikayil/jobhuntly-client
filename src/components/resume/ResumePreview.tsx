import { useEffect } from 'react'
import ha from './data/dummy'
import { useLocation } from 'react-router-dom'
import { SummarPreview } from './preview/SummarPreview'
import { SkillsPreview } from './preview/SkillsPreview'
import { ExperiencePreview } from './preview/ExperiencePreview'
import { EducationalPreview } from './preview/EducationalPreview'
import { PersonalDetails } from './preview/PersonalDetails'
import { UseResumeContext } from 'src/context/ResumeContext'

export function ResumePreview() {
  const { resume, setResume } = UseResumeContext()
  const location = useLocation();
  const { state } = location;
  useEffect(() => {
    if (state) {
      setResume(state)
    } else {
      setResume(ha)
    }
  }, [])
  return (
    <div className='shadow-lg h-full p-14 max-md:p-10 border-t-[20px]'
      style={{
        borderColor: resume?.themeColor || '#000'
      }}>
      {/* Persoanal details */}
      <PersonalDetails data={resume || {}} />
      {/* summary */}
      <SummarPreview data={resume || {}} />

      {/* skills */}
      {resume?.skill?.length > 0 && <SkillsPreview data={resume || []} />}

      {/* experience */}
      {resume?.experience?.length > 0 && <ExperiencePreview data={resume || []} />}

      {/* education */}
      {resume?.education?.length > 0 && <EducationalPreview data={resume || []} />}

    </div >
  )
}

