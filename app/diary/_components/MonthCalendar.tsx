import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MonthCalendarProps } from '../_types/calendarTypes';

const MonthCalendar = ({
  currentDate,
  monthViewDate,
  setMonthViewDate,
  onDateSelect
}: MonthCalendarProps) => {
  const generateMonthCalendar = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // Adjust starting day to make Monday the first day of the week
    let startingDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
    const totalDays = lastDay.getDate();
    const weeks: (number | null)[][] = [];
    let currentWeek: (number | null)[] = [];
   
    // Fill the days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      currentWeek.push(null);
    }
    
    for (let day = 1; day <= totalDays; day++) {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }
    
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weeks.push(currentWeek);
    }
    
    return weeks;
  };

  const handlePreviousMonth = () => {
    const newDate = new Date(monthViewDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setMonthViewDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(monthViewDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setMonthViewDate(newDate);
  };

  const weeks = generateMonthCalendar(monthViewDate);
  const currentDateObj = new Date(currentDate);
  const currentMonthDate = currentDateObj.getDate();
  const currentMonthValue = currentDateObj.getMonth();

  return (
    <Card className="p-4 w-64">
      <div className="flex justify-between items-center mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={handlePreviousMonth}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="font-semibold">
          {monthViewDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleNextMonth}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm mb-2">
        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
          <div key={day} className="font-medium">
            {day}
          </div>
        ))}
      </div>
      {weeks.map((week, i) => (
        <div key={i} className="grid grid-cols-7 gap-1">
          {week.map((day, j) => {
            const isCurrentDate = day === currentMonthDate && monthViewDate.getMonth() === currentMonthValue;
            return (
              <Button
                key={`${i}-${j}`}
                variant="ghost"
                size="sm"
                className={`p-1 ${
                  isCurrentDate ? "bg-blue-100" : ""
                }`}
                disabled={!day}
                onClick={() => day && onDateSelect(day)}
              >
                {day}
              </Button>
            );
          })}
        </div>
      ))}
    </Card>
  );
};

export default MonthCalendar;
