import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";

function PieCharDashboard() {
    const state = useSelector((state:RootState) => state?.job)
    const inreview = state?.applicants?.filter((data) => data?.hiring_status === 'in-review')
    const shortlisted = state?.applicants?.filter((data) => data?.hiring_status === 'shortlisted')
    const interview = state?.applicants?.filter((data) => data?.hiring_status === 'interview')
    const rejected = state?.applicants?.filter((data) => data?.hiring_status === 'rejected')
    const hired = state?.applicants?.filter((data) => data?.hiring_status === 'hired')
    const options: any = {
        series: [inreview?.length, shortlisted?.length, interview?.length, rejected?.length || 0, hired?.length || 0],
        chart: {
            width: 300,
            type: 'pie',
        },
        labels: ['in-review', 'shortlisted', 'interview', 'rejected', 'hired'],
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200,
                    },
                    legend: {
                        position: 'bottom',
                    },
                },
            },
        ],
    };
    return (
        <div className="mt-12 max-md:mt-10 max-md:mr-2.5 max-md:max-w-full">
            <div id="chart">
                <ReactApexChart
                    options={options}
                    series={options.series}
                    type="pie"
                    width={options.chart.width}
                />
            </div>
        </div>
    )
}

export default PieCharDashboard