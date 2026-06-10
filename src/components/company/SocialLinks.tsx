import { Field, Form, Formik, FormikValues } from "formik"
import { Link2, ShieldCheck, Sparkles } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { updateSocialLinks } from "src/redux/actions/companyAction";
import { AppDispatch, RootState } from "src/redux/store";
import { socialLinksValidation } from "src/validation/company"

function SocialLinks() {
  const dispatch: AppDispatch = useDispatch();
  const state = useSelector((state: RootState) => state.user);
  const socialLinks = {
    twitter: state?.user?.socialLinks?.[0] || '',
    youtube: state?.user?.socialLinks?.[1] || '',
    facebook: state?.user?.socialLinks?.[2] || '',
    instagram: state?.user?.socialLinks?.[3] || '',
    LinkedInLink: state?.user?.LinkedInLink || '',
  }

  async function handleSubmit(values: FormikValues) {
    try {
      await dispatch(updateSocialLinks(values)).unwrap()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="company-form-shell space-y-6">
      <div className="rounded-[2rem] border border-white/80 bg-white/90 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">
              Social presence
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl text-slate-900 sm:text-3xl">
              Keep your company links in one place.
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Add usernames or URLs for the networks you actively use so candidates can discover
              the company outside the portal too.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
            <ShieldCheck className="h-4 w-4" />
            Public contact surface
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/90 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        <Formik
          initialValues={socialLinks}
          validationSchema={socialLinksValidation}
          onSubmit={handleSubmit}
        >
          {({ errors }) => (
            <Form className="p-4 sm:p-6">
              <div className="grid gap-0 lg:grid-cols-[280px,1fr]">
                <div className="border-b border-slate-200/80 px-0 py-0 lg:border-b-0 lg:border-r lg:px-2 lg:py-2">
                  <div className="flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-4">
                    <div className="rounded-2xl bg-white p-3 text-slate-700 shadow-sm">
                      <Link2 className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">Link hub</div>
                      <div className="mt-1 text-sm leading-6 text-slate-500">
                        Keep handles short and readable. Full URLs are optional.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-0 py-0 lg:pl-8">
                  <div className="grid gap-5 text-base font-semibold leading-6 text-slate-700">
                    <label className="grid gap-2">
                      <span>
                        Instagram
                        {typeof errors?.instagram == 'string' && (
                          <span className="ml-2 text-xs font-medium text-rose-600">{errors?.instagram}</span>
                        )}
                      </span>
                      <Field name='instagram' className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700 shadow-sm outline-none transition focus:border-amber-300 focus:ring-4 focus:ring-amber-100" />
                    </label>

                    <label className="grid gap-2">
                      <span>
                        Twitter
                        {typeof errors?.twitter == 'string' && (
                          <span className="ml-2 text-xs font-medium text-rose-600">{errors?.twitter}</span>
                        )}
                      </span>
                      <Field name='twitter' className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700 shadow-sm outline-none transition focus:border-amber-300 focus:ring-4 focus:ring-amber-100" />
                    </label>

                    <label className="grid gap-2">
                      <span>
                        Facebook
                        {typeof errors?.facebook == 'string' && (
                          <span className="ml-2 text-xs font-medium text-rose-600">{errors?.facebook}</span>
                        )}
                      </span>
                      <Field name='facebook' className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700 shadow-sm outline-none transition focus:border-amber-300 focus:ring-4 focus:ring-amber-100" />
                    </label>

                    <label className="grid gap-2">
                      <span>
                        LinkedIn
                        {typeof errors?.LinkedInLink == 'string' && (
                          <span className="ml-2 text-xs font-medium text-rose-600">{errors?.LinkedInLink}</span>
                        )}
                      </span>
                      <Field name='LinkedInLink' className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700 shadow-sm outline-none transition focus:border-amber-300 focus:ring-4 focus:ring-amber-100" />
                    </label>

                    <label className="grid gap-2">
                      <span>
                        Youtube
                        {typeof errors?.youtube == 'string' && (
                          <span className="ml-2 text-xs font-medium text-rose-600">{errors?.youtube}</span>
                        )}
                      </span>
                      <Field name='youtube' className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700 shadow-sm outline-none transition focus:border-amber-300 focus:ring-4 focus:ring-amber-100" />
                    </label>
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-slate-800"
                    >
                      <Sparkles className="h-4 w-4" />
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default SocialLinks
