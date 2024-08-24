import FormSection from 'src/components/resume/FormSection'
import ResumePreview from 'src/components/resume/ResumePreview'

function CreateResume() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
      {/*//! Form section */}
      <FormSection />

      {/* //! Preview section */}
      <ResumePreview />
    </div>
  )
}

export default CreateResume