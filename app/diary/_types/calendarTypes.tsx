import exp from "constants";
import { EventFormData } from "./eventTypes";
import { UserDetails } from "./userTypes";

export interface EventDetailsResponse {
    id: string;
    external_id: string;
    event_type: string;
    date: string;
    start_time: string;
    end_time: string;
    title: string | null;
    description: string;
    created_by: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface EventData {
    location: string | null;
    property_id: string | null;
    is_private: boolean | null;
    notification: string | null;
    is_recurring: boolean | null;
    recurrence_pattern: string | null;
    client_name?: string;
    contact_number?: string;
    viewing_type?: string;
    notification_length?: string;
  }
  
  export interface CalendarData {
    diary_id: string;
    staff_id: string;
    diary_colour: string;
    popup_notifi_en: boolean;
    email_notifi_en: boolean;
    updated_at: string;
    userDetails?: UserDetails;
    events?: [EventDetailsResponse, { event_type: string; data: EventData }][];
  }
  
  export interface CalendarProps {
    data?: CalendarData;
  }

  export interface CalendarGridProps {
    weekDates: string[];
    timeSlots: string[];
    events: EventFormData[];
    userSettings: {
      eventColor: string;
    };
    handleTimeSlotClick: (date: string, time: string, e: React.MouseEvent, existingEvents: EventFormData[]) => void;
    handleEventDoubleClick: (event: EventFormData, e: React.MouseEvent) => void;
    formatDate: (dateString: string) => { day: string; date: number };
  }
  
  
  export interface ApiResponse {
    success: boolean;
    message: string;
  }
  
  export interface CalendarHeaderProps {
    currentDate: string;
    onNavigateWeek: (direction: 'previous' | 'next') => void;
  }

  export interface ColorPickerProps {
    currentColor: string;
    onColorChange: (color: string) => Promise<void>;
    defaultColor: string;
  }
  
  export interface MonthCalendarProps {
    currentDate: string;
    monthViewDate: Date;
    setMonthViewDate: (date: Date) => void;
    onDateSelect: (day: number) => void;
  }
  