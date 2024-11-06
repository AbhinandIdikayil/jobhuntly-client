import FormSection from 'src/components/resume/FormSection'
import { ResumePreview } from 'src/components/resume/ResumePreview'

function CreateResume() {
  console.log(process.env.BASE_URL_CLIENT + "/my-resume/view")

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 p-10 max-md:p-5 gap-10'>
      {/*//! Form section */}
      <FormSection />

      {/* //! Preview section */}
      <ResumePreview />
    </div>
  )
}

export default CreateResume