import { CalendarData } from "./calendarTypes";
import { UserSettings } from "./userTypes";


export interface SidebarProps {
    currentDate: string;
    monthViewDate: Date;
    setMonthViewDate: (date: Date) => void;
    onDateSelect: (day: number) => void;
    userSettings: UserSettings;
    onColorChange: (color: string) => void;
    data: CalendarData;
  }
 