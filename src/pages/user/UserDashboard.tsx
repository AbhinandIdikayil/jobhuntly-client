import { useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import ApplicationListInDashboard from 'src/components/user/dashboard/ApplicationListInDashboard';
import DashboardInterviewList from 'src/components/user/dashboard/DashboardInterviewList';
import { listApplications } from 'src/redux/actions/jobAction';
import { AppDispatch, RootState } from 'src/redux/store';

function UserDashboard() {
  const dispatch: AppDispatch = useDispatch()
  const application = useSelector((state: RootState) => state?.job?.applications);
  const interviewed = application?.filter((data) => data?.hiring_status === 'interview')
  const shortlisted = application?.filter((data) => data?.hiring_status == 'shortlisted')
  const inreview = application?.filter((data) => data?.hiring_status === 'in-review')
  const rejected = application?.filter((data) => data?.hiring_status === 'rejected')

  const totalApplications = application?.length ?? 0;
  const series = [interviewed?.length ?? 0, inreview?.length ?? 0, shortlisted?.length ?? 0, rejected?.length ?? 0, application?.length ?? 0];
  const options: any = {
    chart: {
      type: 'donut',
    },
    labels: ['Interviewed', 'in-review', 'shortlisted', 'declined', 'applied'],
    colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#7c3aed'],
    legend: {
      position: 'bottom',
      fontFamily: 'var(--font-body)',
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 250,
        },
        legend: {
          position: 'bottom',
        },
      },
    }],
  };

  const fetchData = async () => {
    try {
      await dispatch(listApplications()).unwrap()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const StatCard = ({ label, value, accent, note }: { label: string; value: number; accent: string; note: string }) => (
    <div className="rounded-[26px] border border-zinc-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
            {label}
          </div>
          <div className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
            {value}
          </div>
          <div className="mt-2 text-sm text-slate-500">
            {note}
          </div>
        </div>
        <div className={`h-12 w-12 rounded-2xl ${accent}`} />
      </div>
    </div>
  );


  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#faf9f7_0%,#ffffff_52%,#f8fafc_100%)]">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-[32px] border border-zinc-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.06)] sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.10),_transparent_34%),radial-gradient(circle_at_bottom_left,_rgba(16,185,129,0.08),_transparent_32%)]" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700">
                Your dashboard
              </div>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                Welcome back, let's turn your profile into a stronger signal.
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                Keep an eye on applications, interview activity, and profile health from one clean workspace.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <StatCard label="Total applications" value={totalApplications} note="All tracked submissions" accent="bg-indigo-100 ring-1 ring-indigo-200" />
              <StatCard label="Interviews" value={interviewed?.length ?? 0} note="Potential next steps" accent="bg-emerald-100 ring-1 ring-emerald-200" />
              <StatCard label="Shortlisted" value={shortlisted?.length ?? 0} note="Applications gaining momentum" accent="bg-amber-100 ring-1 ring-amber-200" />
            </div>
          </div>
        </section>

        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              <div className="rounded-[28px] border border-zinc-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Applied today
                </div>
                <div className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
                  {application?.length ?? 0}
                </div>
                <div className="mt-2 text-sm text-slate-500">
                  Your current application footprint.
                </div>
              </div>

              <div className="rounded-[28px] border border-zinc-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:col-span-2 xl:col-span-1">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Jobs applied status
                    </div>
                    <div className="mt-2 text-sm text-slate-500">
                      Snapshot of where applications stand.
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <ReactApexChart options={options} series={series} type="donut" height={280} />
                </div>
              </div>
            </div>

            <div className="rounded-[32px] border border-zinc-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.05)]">
              <div className="flex items-center justify-between gap-4 border-b border-zinc-200 px-6 py-4">
                <div>
                  <div className="text-xl font-semibold tracking-tight text-slate-900">
                    Recent Applications
                  </div>
                  <p className="mt-1 text-sm text-slate-500">
                    The latest jobs you've acted on.
                  </p>
                </div>
                <div className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-700">
                  live
                </div>
              </div>
              <div className="p-6">
                <ApplicationListInDashboard />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[32px] border border-zinc-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.05)]">
              <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4">
                <div className="text-xl font-semibold tracking-tight text-slate-900">
                  Upcoming Interviews
                </div>
                <div className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                  next up
                </div>
              </div>
              <div className="max-h-[420px] overflow-y-auto p-4">
                <DashboardInterviewList />
              </div>
            </div>

            <div className="rounded-[32px] border border-zinc-200 bg-gradient-to-br from-indigo-600 to-violet-600 p-6 text-white shadow-[0_20px_50px_rgba(79,70,229,0.24)]">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                Next action
              </div>
              <div className="mt-3 text-2xl font-semibold tracking-tight">
                Update your profile before applying again.
              </div>
              <p className="mt-2 text-sm leading-7 text-white/80">
                A stronger profile summary, a richer resume list, and active social links improve visibility.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard

