import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CalendarHeaderProps } from "../_types/calendarTypes";


  
  const CalendarHeader = ({ currentDate, onNavigateWeek }: CalendarHeaderProps) => {
    return (
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Calendar</h1>
        <div className="flex gap-4 items-center">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onNavigateWeek('previous')}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="font-semibold">
            {new Date(currentDate).toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onNavigateWeek('next')}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };

export default CalendarHeader;