import { startOfWeek, endOfWeek, addDays } from "date-fns";
import { useState } from "react";
import { CalendarProps } from "../_types/calendar";

const DateGrid = ({ initialData, refreshData }: CalendarProps) => {

  const initialStartOfWeek = startOfWeek(new Date(), { weekStartsOn: 1 });
  const initialEndOfWeek = endOfWeek(new Date(), { weekStartsOn: 1 });
  const [startOfWeekDate, setStartOfWeekDate] =
    useState<Date>(initialStartOfWeek);
  const [endOfWeekDate, setEndOfWeekDate] = useState<Date>(initialEndOfWeek);
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0]; 
  };

  const getWeekDates = (start: Date, end: Date): Date[] => {
    const dates: Date[] = [];
    let currentDate: Date = start;
    while (currentDate <= end) {
      dates.push(currentDate);
      currentDate = addDays(currentDate, 1);
    }
    return dates;
  };
  const [weekDates, setWeekDates] = useState<Date[]>(
    getWeekDates(initialStartOfWeek, initialEndOfWeek)
  );

  const getMonthRange = (start: Date, end: Date): string => {
    const startMonth = start.toLocaleString("default", { month: "long" });
    const startYear = start.getFullYear();
    const endMonth = end.toLocaleString("default", { month: "long" });
    const endYear = end.getFullYear();

    if (startMonth === endMonth && startYear === endYear) {
      return `${startMonth} ${startYear}`;
    } else if (startYear === endYear) {
      return `${startMonth} - ${endMonth} ${startYear}`;
    } else {
      return `${startMonth} ${startYear} - ${endMonth} ${endYear}`;
    }
  };

  const [monthRange, setMonthRange] = useState<string>(
    getMonthRange(initialStartOfWeek, initialEndOfWeek)
  );

  const getPrevWeek = async () => {
    const newStartOfWeek = addDays(startOfWeekDate, -7);
    const newEndOfWeek = addDays(endOfWeekDate, -7);
    setStartOfWeekDate(newStartOfWeek);
    setEndOfWeekDate(newEndOfWeek);
    setWeekDates(getWeekDates(newStartOfWeek, newEndOfWeek));
    setMonthRange(getMonthRange(newStartOfWeek, newEndOfWeek));
    await refreshData(formatDate(newStartOfWeek), formatDate(newEndOfWeek));

  };

  const getNextWeek = async () => {
    const newStartOfWeek = addDays(startOfWeekDate, 7);
    const newEndOfWeek = addDays(endOfWeekDate, 7);
    setStartOfWeekDate(newStartOfWeek);
    setEndOfWeekDate(newEndOfWeek);
    setWeekDates(getWeekDates(newStartOfWeek, newEndOfWeek));
    setMonthRange(getMonthRange(newStartOfWeek, newEndOfWeek));
    await refreshData(formatDate(newStartOfWeek), formatDate(newEndOfWeek));

  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="text-xl font-bold">Calendar</div>
        <div className="flex gap-4 items-center">
          <button onClick={getPrevWeek}>prev</button>
          <span className="font-semibold">{monthRange}</span>
          <button className="bg-green-400" onClick={getNextWeek}>
            next
          </button>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-7 gap-1 text-center text-sm my-3 pl-14">
          {weekDates.map((date, index) => (
            <div key={index} className="font-medium">
              {date.toDateString()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DateGrid;
