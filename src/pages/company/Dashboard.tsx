import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  CalendarClock,
  Download,
  UsersRound,
  ClipboardList,
  type LucideIcon,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import BarChartDashboard from "src/components/company/BarChartDashboard";
import PieCharDashboard from "src/components/company/PieCharDashboard";
import { AXIOS_INSTANCE_JOB } from "src/constants/axiosInstance";
import { getAllJob, listApplicants } from "src/redux/actions/jobAction";
import { AppDispatch, RootState } from "src/redux/store";

export interface chart {
  week: boolean;
  month: boolean;
  year: boolean;
}

type ExportRow = {
  name: string;
  email: string;
  status: string;
  phone?: string;
};

type JobItem = {
  _id?: string;
  jobTitle?: string;
  createdAt?: string;
  location?: string[];
  employmentDetails?: {
    name?: string;
  };
  categoryDetails?: {
    name?: string;
  };
};

type ApplicantItem = {
  hiring_status?: string;
  schedule?: Array<{
    date?: string;
  }>;
};

const sectionMotion = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const staggerMotion = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

function MetricCard({
  icon: Icon,
  label,
  value,
  note,
  accent,
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
  note: string;
  accent: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-[24px] border border-warm-border bg-white p-5 shadow-warm transition-transform duration-300 hover:-translate-y-1 hover:shadow-warm-md">
      <div
        className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accent}`}
        aria-hidden="true"
      />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium tracking-[0.18em] text-warm-text-tertiary uppercase">
            {label}
          </p>
          <p className="mt-3 font-display text-3xl leading-none text-warm-text-primary sm:text-4xl">
            {value}
          </p>
          <p className="mt-3 max-w-[24ch] text-sm leading-6 text-warm-text-secondary">
            {note}
          </p>
        </div>
        <div
          className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${accent} text-white shadow-lg shadow-slate-900/10`}
          aria-hidden="true"
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  const dispatch: AppDispatch = useDispatch();
  const [timePeriod, setTimePeriod] = useState<chart>({
    week: true,
    month: false,
    year: false,
  });
  const [csvData, setCsvData] = useState<ExportRow[]>([]);

  const state = useSelector((root: RootState) => root?.job);
  const jobs = (state?.jobs?.jobs ?? []) as JobItem[];
  const applicants = (state?.applicants ?? []) as ApplicantItem[];

  const applicantStatusCounts = applicants.reduce(
    (acc, applicant) => {
      const status = applicant?.hiring_status ?? "other";
      acc[status] = (acc[status] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const applicantSchedules = applicants.flatMap((applicant) =>
    (applicant?.schedule ?? []).filter((schedule) => schedule?.date)
  );

  const scheduledForToday = applicantSchedules.filter((schedule) =>
    dayjs(schedule.date).isSame(dayjs(), "day")
  );


  const openJobs = state?.jobs?.totalCount?.[0]?.count ?? 0;
  const inReview = applicantStatusCounts["in-review"] ?? 0;
  const shortlisted = applicantStatusCounts.shortlisted ?? 0;
  const interviews = applicantStatusCounts.interview ?? 0;
  const hired = applicantStatusCounts.hired ?? 0;
  const totalCandidates = applicants.length;

  const hireRate = totalCandidates ? Math.round((hired / totalCandidates) * 100) : 0;
  const recentJobs = jobs.slice(0, 4);

  const fetchData = async () => {
    try {
      await dispatch(listApplicants()).unwrap();
      await dispatch(getAllJob()).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  async function download() {
    try {
      const { data } = await AXIOS_INSTANCE_JOB.post("/download");

      const downloadRows = data.map((candidate: any) => ({
        name: candidate.user.name,
        email: candidate.user.email,
        status: candidate.hiring_status,
        phone: candidate.user?.phonenumber,
      }));

      setCsvData(downloadRows);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    void fetchData();
    void download();
  }, [dispatch]);

  const headers = [
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Status", key: "status" },
    { label: "Phone", key: "phone" },
  ];

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.10),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(15,23,42,0.06),_transparent_28%),linear-gradient(180deg,_#faf9f7_0%,_#f5f3ef_100%)] px-4 py-4 text-warm-text-primary sm:px-6 lg:px-8">
      <div
        className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-amber-300/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-20 top-36 h-80 w-80 rounded-full bg-slate-900/10 blur-3xl"
        aria-hidden="true"
      />

      <motion.div
        variants={staggerMotion}
        initial="hidden"
        animate="visible"
        className="relative mx-auto flex max-w-7xl flex-col gap-6"
      >
      

        <motion.section
          variants={sectionMotion}
          className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          <MetricCard
            icon={BriefcaseBusiness}
            label="Open jobs"
            value={openJobs}
            note="Live postings currently visible on the company side."
            accent="from-sky-500 to-cyan-400"
          />
          <MetricCard
            icon={UsersRound}
            label="In review"
            value={inReview}
            note="Applicants waiting for the next decision step."
            accent="from-violet-500 to-fuchsia-400"
          />
          <MetricCard
            icon={CalendarClock}
            label="Interviews today"
            value={scheduledForToday.length}
            note="Candidate meetings due on the current calendar day."
            accent="from-amber-500 to-orange-400"
          />
          <MetricCard
            icon={BadgeCheck}
            label="Hired"
            value={hired}
            note={`${hireRate}% of the current applicant pool has been hired.`}
            accent="from-emerald-500 to-lime-400"
          />
        </motion.section>

        <section className="grid gap-6 xl:grid-cols-[1.35fr_0.85fr]">
          <motion.article
            variants={sectionMotion}
            className="rounded-[28px] border border-warm-border bg-white p-6 shadow-warm"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium tracking-[0.24em] text-warm-text-tertiary uppercase">
                  Analytics
                </p>
                <h2 className="mt-2 font-display text-3xl text-warm-text-primary">
                  Job statistics
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-warm-text-secondary">
                  Switch between weekly, monthly, and annual hiring movement without
                  losing context.
                </p>
              </div>

              <div className="inline-flex rounded-full border border-warm-border bg-warm-surface p-1 text-sm font-semibold text-warm-text-secondary shadow-warm">
                {(["week", "month", "year"] as const).map((period) => (
                  <button
                    key={period}
                    type="button"
                    onClick={() =>
                      setTimePeriod({
                        week: period === "week",
                        month: period === "month",
                        year: period === "year",
                      })
                    }
                    className={`rounded-full px-4 py-2 capitalize transition-colors ${
                      timePeriod[period]
                        ? "bg-white text-warm-text-primary shadow-sm"
                        : "hover:text-warm-text-primary"
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 rounded-[24px] border border-warm-border bg-warm-surface px-3 py-4">
              <BarChartDashboard charts={timePeriod} />
            </div>
          </motion.article>

          <motion.article
            variants={sectionMotion}
            className="rounded-[28px] border border-warm-border bg-white p-6 shadow-warm"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium tracking-[0.24em] text-warm-text-tertiary uppercase">
                  Applicants
                </p>
                <h2 className="mt-2 font-display text-3xl text-warm-text-primary">
                  Summary
                </h2>
                <p className="mt-2 text-sm leading-6 text-warm-text-secondary">
                  A quick read on how candidates are moving through the funnel.
                </p>
              </div>

              <CSVLink
                data={csvData}
                headers={headers}
                filename="Candidates_List.csv"
                className="inline-flex items-center gap-2 rounded-full border border-warm-border bg-warm-surface px-4 py-2 text-sm font-semibold text-warm-text-primary transition-colors hover:bg-white"
              >
                <Download className="h-4 w-4" />
                Export CSV
              </CSVLink>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-warm-surface p-4">
                <p className="text-sm text-warm-text-secondary">Shortlisted</p>
                <p className="mt-2 font-display text-3xl text-warm-text-primary">
                  {shortlisted}
                </p>
              </div>
              <div className="rounded-2xl bg-warm-surface p-4">
                <p className="text-sm text-warm-text-secondary">Interview stage</p>
                <p className="mt-2 font-display text-3xl text-warm-text-primary">
                  {interviews}
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-[24px] border border-warm-border bg-warm-surface px-4 py-5">
              <PieCharDashboard />
            </div>

            <div className="mt-6 grid gap-3">
              {[
                {
                  label: "In review",
                  value: inReview,
                  tone: "bg-violet-500",
                },
                {
                  label: "Shortlisted",
                  value: shortlisted,
                  tone: "bg-amber-500",
                },
                {
                  label: "Interview",
                  value: interviews,
                  tone: "bg-sky-500",
                },
                {
                  label: "Hired",
                  value: hired,
                  tone: "bg-emerald-500",
                },
              ].map((entry) => (
                <div
                  key={entry.label}
                  className="flex items-center justify-between rounded-2xl border border-warm-border bg-white px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span className={`h-2.5 w-2.5 rounded-full ${entry.tone}`} />
                    <span className="text-sm font-medium text-warm-text-primary">
                      {entry.label}
                    </span>
                  </div>
                  <span className="font-display text-2xl text-warm-text-primary">
                    {entry.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.article>
        </section>

        <motion.section
          variants={sectionMotion}
          className="rounded-[28px] border border-warm-border bg-white p-6 shadow-warm"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-medium tracking-[0.24em] text-warm-text-tertiary uppercase">
                Latest roles
              </p>
              <h2 className="mt-2 font-display text-3xl text-warm-text-primary">
                Job updates
              </h2>
              <p className="mt-2 text-sm leading-6 text-warm-text-secondary">
                The most recent postings at a glance, with a fast path into editing.
              </p>
            </div>

            <Link
              to="job-list"
              className="inline-flex items-center gap-2 rounded-full border border-warm-border bg-warm-surface px-4 py-2 text-sm font-semibold text-warm-text-primary transition-colors hover:bg-white"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {recentJobs.length > 0 ? (
              recentJobs.map((job, index) => {
                const jobId = job?._id;
                const jobLink = jobId ? `job-list/${jobId}` : "job-list";

                return (
                  <Link
                    key={jobId ?? `${job?.jobTitle ?? "job"}-${index}`}
                    to={jobLink}
                    className="group rounded-[24px] border border-warm-border bg-[linear-gradient(180deg,_#ffffff_0%,_#fbfaf7_100%)] p-5 shadow-warm transition-transform duration-300 hover:-translate-y-1 hover:shadow-warm-md"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="truncate text-lg font-semibold text-warm-text-primary">
                          {job?.jobTitle ?? "Untitled role"}
                        </p>
                        <p className="mt-1 text-sm text-warm-text-secondary">
                          {job?.location?.[0] ?? "Location not specified"}
                        </p>
                      </div>
                      <span className="rounded-full bg-slate-900 px-3 py-2 text-xs font-semibold text-white whitespace-nowrap">
                        {job?.employmentDetails?.name ?? "Role"}
                      </span>
                    </div>

                    <div className="mt-5 flex items-center justify-between gap-3 text-sm text-warm-text-secondary">
                      <span className="rounded-full bg-slate-900/5 px-3 py-1.5 font-medium text-slate-700">
                        {job?.categoryDetails?.name ?? "General"}
                      </span>
                      <span>{job?.createdAt ? dayjs(job.createdAt).format("MMM D") : "New"}</span>
                    </div>

                    <div className="mt-5 flex items-center justify-between text-sm font-medium text-warm-text-primary">
                      <span>Open role</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="col-span-full rounded-[24px] border border-dashed border-warm-border bg-warm-surface px-6 py-10 text-center">
                <ClipboardList className="mx-auto h-10 w-10 text-warm-text-tertiary" />
                <p className="mt-4 font-display text-2xl text-warm-text-primary">
                  No jobs to show yet
                </p>
                <p className="mt-2 text-sm text-warm-text-secondary">
                  Once the team posts new roles, they will appear here automatically.
                </p>
              </div>
            )}
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}

export default Dashboard;
