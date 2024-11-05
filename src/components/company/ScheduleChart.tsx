import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';

import dayjs from 'dayjs';

// Ensure you have a plugin for parsing custom date-time strings, if needed
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const ScheduleChart = () => {
    const [events, setEvents] = useState();
    const applicants = useSelector((state: RootState) => state?.job?.applicants)

    useEffect(() => {
        const event = applicants?.flatMap(applicant => (
            applicant?.schedule ?.map((schedule) => {
                const date = dayjs(schedule.date).format("YYYY-MM-DD");  // Format the date as "YYYY-MM-DD"
                const time = dayjs(schedule.time, ["h:mm A"]).format("HH:mm");

                const startDateTime = `${date}T${time}`;

                return {
                    id: schedule?._id,
                    title: schedule.testType,  // Customize as needed
                    start: startDateTime,  // Combined date and time for FullCalendar
                    end: dayjs(startDateTime).add(1, 'hour').format(),  // Add duration if needed
                    roomId: schedule.roomId,  // Include any other fields as needed
                    status: schedule.status,  // Include any other fields as needed
                };
            })
        ))
        // ...event,
        // start: dayjs(String(event?.date)).toISOString()
        setEvents(event as any)
    }, [])

    return (
        <>
            <div className='w-full'>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin]}
                    initialView='dayGridWeek'
                    headerToolbar={{
                        start: "today prev,next",
                        center: "title",
                        end: "dayGridMonth, timeGridWeek, timeGridDay"
                    }}
                    events={events}
                    eventContent={renderEventContent}
                />
            </div>
        </>
    );
};

function renderEventContent(eventInfo: { timeText: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; event: { title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }; }) {
    return (
        <div className='flex w-full flex-col justify-center bg-lightgreen px-3 py-1 border bg-gray-100 border-customviolet rounded-md text-customviolet font-semibold'>
            <b>{eventInfo.timeText}</b>
            <p className='w-full overflow-hidden overflow-ellipsis whitespace-normal break-words'>
                {eventInfo.event.title}
            </p>
        </div>
    )
}

export default ScheduleChart;



