"use client";
import React, { useState } from "react";
import { CalendarProps } from "./_types/calendar";
import CalendarGrid from "./_components/CalendarGrid";
import TimeGrid from "./_components/TimeGrid";
import DateGrid from "./_components/DateGrid";


export default function Calendar({ refreshData, initialData }: CalendarProps) {
  const [data, setData] = useState(initialData);


return (
    <div className="flex flex-row justify-center">
        <div className="w-4/5">
          <DateGrid initialData={data} refreshData={refreshData}/>
          <div className="flex-row flex">
            <TimeGrid/>
            <div className="my-3 border border-indigo-500 rounded-sm w-full">
              <CalendarGrid initialData={data} refreshData={refreshData}/>
            </div>
          </div>
        </div>
    </div>
  );

}
