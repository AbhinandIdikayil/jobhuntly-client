import { styled } from '@mui/material';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import ApplicationListInDashboard from 'src/components/user/dashboard/ApplicationListInDashboard';
import DashboardInterviewList from 'src/components/user/dashboard/DashboardInterviewList';
import { listApplications } from 'src/redux/actions/jobAction';
import { AppDispatch, RootState } from 'src/redux/store';
import { prop } from 'src/types/AllTypes';

function UserDashboard() {
  const dispatch: AppDispatch = useDispatch()
  const context = useOutletContext<prop>() || {};
  const { open } = context;
  const application = useSelector((state: RootState) => state?.job?.applications);
  const interviewed = application?.filter((data) => data?.hiring_status === 'interview')
  const shortlisted = application?.filter((data) => data?.hiring_status == 'shortlisted')
  const inreview = application?.filter((data) => data?.hiring_status === 'in-review')
  const rejected = application?.filter((data) => data?.hiring_status === 'rejected')

  const [series] = useState([interviewed?.length, inreview?.length, shortlisted?.length, rejected?.length, application?.length]);
  const [options] = useState<any>({
    chart: {
      type: 'donut',
    },
    labels: ['Interviewed', 'in-review', 'shortlisted', 'declined', 'applied'],
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
  });

  const fetchData = async () => {
    try {
      let data = await dispatch(listApplications()).unwrap()
      return data
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const ResponsiveContainer = styled('div')<{ open: boolean }>(({ theme }) => ({
    width: '100%',
    maxWidth: '100%',
    overflowX: 'hidden',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      // width: open ? `calc(100% - ${240}px)` : '100%',
      // marginLeft: open ? 240 : 0,
    },
  }));


  return (
    <ResponsiveContainer open={open ? true : false}>
      <div className="flex flex-col gap-1 w-full">
        <div className='flex flex-wrap w-full gap-5'>
          <div className='flex flex-col max-md:flex-row gap-2'>
            <div className="flex overflow-hidden items-start px-6  pt-7  border border-solid border-zinc-400 rounded w-[258px] max-md:w-full max-md:px-3">
              <div className="flex z-10 flex-col self-start mr-0 w-full">
                <div className="text-xl max-md:text-base leading-tight w-full font-bold">Total Jobs Applied</div>
                <div className="self-start mt-7 text-7xl leading-none text-center max-md:text-4xl">
                  {application?.length ?? 0}
                </div>
              </div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/81d209f7c4399a3afb60010a5a56afe0eead64ffb45723cb07f84b5ae7cb3e08?placeholderIfAbsent=true&apiKey=bf80438c4595450788b907771330b274"
                className="object-contain shrink-0 self-end mt-16 aspect-[1.29] w-[88px] max-md:mt-10"
              />
            </div>
            <div className="flex overflow-hidden items-start px-6 pt-7 max-w-full  border border-solid border-zinc-400 rounded w-[258px] max-md:w-full max-md:px-5">
              <div className="flex z-10 flex-col self-start mr-0">
                <div className="text-xl leading-tight max-md:text-base font-bold">Total Jobs Applied</div>
                <div className="self-start mt-7 text-7xl leading-none text-center max-md:text-4xl">
                  {application?.length ?? 0}
                </div>
              </div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/81d209f7c4399a3afb60010a5a56afe0eead64ffb45723cb07f84b5ae7cb3e08?placeholderIfAbsent=true&apiKey=bf80438c4595450788b907771330b274"
                className="object-contain shrink-0 self-end mt-16 aspect-[1.29] w-[88px] max-md:mt-10"
              />
            </div>
          </div>
          <div className="relative flex flex-col items-center justify-center px-1 py-2  border border-solid border-zinc-400 rounded w-full sm:w-1/3 max-md:px-5 shadow-md">
            <div className="absolute top-5 text-xl font-semibold leading-tight text-center text-slate-800">
              Jobs Applied Status
            </div>
            <div className="flex gap-6 items-center self-stretch mt-5">
              <div className="flex flex-col self-stretch leading-relaxed whitespace-nowrap">
                <div id="chart">
                  <ReactApexChart options={options} series={series} type="donut" />
                </div>
              </div>
            </div>
          </div>
          <div className="hflex flex-col pb-3 bg-white border border-solid border-zinc-500 rounded w-full sm:w-1/3 max-md:max-w-full shadow-md">
            <div className="flex flex-col pt-2 pb-2 w-full text-xl font-semibold leading-tight text-gray-800 border border-solid shadow-sm border-zinc-200 max-md:max-w-full">
              <div className="self-start ml-6 text-center max-md:ml-2.5 bg-white ">
                Upcomming Interviews
              </div>
            </div>
            <DashboardInterviewList />
          </div>
        </div>
        <ApplicationListInDashboard />
      </div >
      {/* <div className="flex flex-col font-semibold  text-slate-800 sm:w-1/4 shadow-md">
      <div className="flex overflow-hidden items-start px-6 pt-7 max-w-full  border border-solid border-zinc-500 rounded w-[258px] max-md:px-5">
        <div className="flex z-10 flex-col self-start mr-0">
          <div className="text-xl leading-tight">Total Jobs Applied</div>
          <div className="self-start mt-7 text-7xl leading-none text-center max-md:text-4xl">
            {application?.length ?? 0}
          </div>
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/81d209f7c4399a3afb60010a5a56afe0eead64ffb45723cb07f84b5ae7cb3e08?placeholderIfAbsent=true&apiKey=bf80438c4595450788b907771330b274"
          className="object-contain shrink-0 self-end mt-16 aspect-[1.29] w-[88px] max-md:mt-10"
        />
      </div>
      <div className="flex overflow-hidden gap-1 items-start px-6 pt-7 mt-6 max-w-full whitespace-nowrap bg-white border border-solid border-zinc-500 rounded w-[258px] max-md:px-5">
        <div className="flex flex-col self-start">
          <div className="text-xl leading-tight">Interviewed</div>
          <div className="self-start mt-7 text-7xl leading-none max-md:text-4xl">
            {interviewed?.length ?? 0}
          </div>
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/e639e7eb7a3e7324143d1f3f1f310726fe1853dbd532adc134c962bd6cba6d13?placeholderIfAbsent=true&apiKey=bf80438c4595450788b907771330b274"
          className="object-contain shrink-0 self-end mt-16 aspect-[1.29] w-[88px] max-md:mt-10"
        />
      </div>
      </div>
      <div className="h-[400px] flex flex-col items-center justify-center px-1 py-7 bg-white border border-solid border-zinc-500 rounded min-w-[240px] sm:w-1/3 max-md:px-5 shadow-md">
      <div className="text-xl font-semibold leading-tight text-center text-slate-800">
        Jobs Applied Status
      </div>
      <div className="flex gap-6 items-center self-stretch mt-5">
        <div className="flex flex-col self-stretch leading-relaxed whitespace-nowrap">
          <div id="chart">
            <ReactApexChart options={options} series={series} type="donut" />
          </div>
        </div>
      </div>
      </div>
      <div className="h-[400px] flex flex-col pb-3 bg-white border border-solid border-zinc-500 rounded min-w-[290px] sm:w-1/3 max-md:max-w-full shadow-md">
      <div className="flex flex-col pt-2 pb-2 w-full text-xl font-semibold leading-tight text-gray-800 border border-solid shadow-lg border-zinc-200 max-md:max-w-full">
        <div className="self-start ml-6 text-center max-md:ml-2.5 bg-white ">
          Upcomming Interviews
        </div>
      </div>
      <DashboardInterviewList />
  </div> */}
    </ResponsiveContainer>
  )
}

export default UserDashboard

