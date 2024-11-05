import React, { useState } from "react";
import { DateInput } from "@nextui-org/react";
import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date";
import { useField } from "formik";

interface PasswordInputProps {
    label: string;
    name: string;
    date: CalendarDate;
    setDate: (CalendarDate:CalendarDate) => any
}


const TypeDate: React.FC<PasswordInputProps> = ({ label, name ,date ,setDate }) => {
    const [_, meta,] = useField(name)
    const [isInvalid, setIsInvalid] = useState(false);

    const handleDateChange = (newDate:any) => {
        const parsedDate = new CalendarDate(newDate.year, newDate.month, newDate.day);
        const today = new CalendarDate(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());
        console.log(date)
        const isValidDate = parsedDate.compare(today) >= 0; // Ensure the selected datE is not in the future
        setDate(parsedDate);
        setIsInvalid(isValidDate);
    };

    return (
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4 border-gray-400 mt-6" style={{ border: '0.5px groove' }}>
            {meta.touched && meta.error ? (
                <div style={{ color: 'red' }}>{meta.error}</div>
            ) : null}
            <DateInput
                label={label}
                onChange={handleDateChange}
                maxValue={today(getLocalTimeZone())}
                defaultValue={today(getLocalTimeZone()).subtract({ days: 1 })}
                isInvalid={isInvalid}
                errorMessage="Please enter a valid date that is not in the future"
            />
        </div>
    );
}

export default TypeDate
