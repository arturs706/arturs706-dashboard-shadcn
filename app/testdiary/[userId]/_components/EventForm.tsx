import React, { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import TimePicker from "./TimePicker";
import Appointment from "./eventform/Appointment";
import Callback from "./eventform/Callback";
import Inspection from "./eventform/Inspection";
import Maintenance from "./eventform/Maintenance";
import Note from "./eventform/Note";
import PublicHoliday from "./eventform/PublicHoliday";
import SickLeave from "./eventform/SickLeave";
import StaffHoliday from "./eventform/StaffHoliday";
import { Training } from "./eventform/Training";
import Valuation from "./eventform/Valuation";
import StaffMeeting from "./eventform/StaffMeeting";
import Viewing from './eventform/Viewing';
import {
  createInitialEventData,
  EVENT_TYPES,
  EventFormData,
  validateEventData,
} from '../_types/form';

interface EventFormProps {
  rowIndex: number | null;
  colIndex: number | null;
}

type EventComponentMap = {
  [K in EventFormData['eventType']]: React.ComponentType<{
    formData: Extract<EventFormData, { eventType: K }>;
    onFormDataChange: (data: Partial<Omit<Extract<EventFormData, { eventType: K }>, 'eventType'>>) => void;
  }>;
};

const EventForm: React.FC<EventFormProps> = ({ rowIndex, colIndex }) => {
  // Helper function to convert time string to minutes
  const timeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  // Helper function to convert minutes to time string
  const minutesToTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  // Calculate initial time based on row index
  const calculateInitialTime = (row: number | null): string => {
    if (row === null) return "09:00"; // Default start time
    const totalMinutes = (Math.floor(row / 2) * 60) + ((row % 2) * 30);
    return minutesToTime(totalMinutes);
  };

  // Calculate end time based on event type and start time
  const calculateEndTime = (startTime: string, eventType: EventFormData['eventType']): string => {
    const defaultDurations: { [key in EventFormData['eventType']]?: number } = {
      'Viewing': 30,
      'Appointment': 60,
      'Callback': 15,
      'Inspection': 45,
      'Maintenance': 120,
      'Staff Meeting': 60,
      'Training': 180,
      'Valuation': 45,
    };

    const startMinutes = timeToMinutes(startTime);
    const duration = defaultDurations[eventType] || 30; // Default 30 minutes if not specified
    const endMinutes = Math.min(startMinutes + duration, 23 * 60 + 59); // Cap at 23:59

    return minutesToTime(endMinutes);
  };

  // Initialize form data with calculated times
  const [formData, setFormData] = useState<EventFormData>(() => {
    const initialTime = calculateInitialTime(rowIndex);
    const initialData = createInitialEventData("Viewing");
    return {
      ...initialData,
      startTime: initialTime,
      endTime: calculateEndTime(initialTime, "Viewing"),
    };
  });

  // Handle time changes with validation
  const handleTimeChange = (type: "startTime" | "endTime", value: string) => {
    if (type === "startTime") {
      setFormData((prev) => ({
        ...prev,
        startTime: value,
        endTime: calculateEndTime(value, prev.eventType),
      }));
    } else {
      const startMinutes = timeToMinutes(formData.startTime);
      const endMinutes = timeToMinutes(value);
      
      if (endMinutes <= startMinutes) {
        // If end time is before or equal to start time, adjust it
        const adjustedEndTime = calculateEndTime(formData.startTime, formData.eventType);
        setFormData((prev) => ({
          ...prev,
          endTime: adjustedEndTime,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          endTime: value,
        }));
      }
    }
  };

  // Handle event type changes
  const handleEventTypeChange = (value: typeof EVENT_TYPES[number]) => {
    setFormData((prev) => ({
      ...createInitialEventData(value),
      startTime: prev.startTime,
      endTime: calculateEndTime(prev.startTime, value),
    }));
  };

  const EVENT_COMPONENTS: EventComponentMap = {
    "Viewing": Viewing,
    "Appointment": Appointment,
    "Callback": Callback,
    "Inspection": Inspection,
    "Maintenance": Maintenance,
    "Note": Note,
    "Public Holiday": PublicHoliday,
    "Sick Leave": SickLeave,
    "Staff Holiday": StaffHoliday,
    "Staff Meeting": StaffMeeting,
    "Training": Training,
    "Valuation": Valuation,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validateEventData(formData);
    if (isValid) {
      console.log("Valid event data:", formData);
    } else {
      console.log("Invalid event data:", formData);
    }
  };

  const renderEventTypeFields = () => {
    const Component = EVENT_COMPONENTS[formData.eventType];
    
    if (!Component) return null;
  
    const eventTypeProps = {
      formData,
      onFormDataChange: (newData: Partial<Omit<typeof formData, 'eventType'>>) => {
        setFormData(prev => ({
          ...prev,
          ...newData
        }));
      }
    };
  
    return <Component {...(eventTypeProps as any)} />;
  };

  return (
    <div className="space-y-4" onClick={(e) => e.stopPropagation()}>
      <form onSubmit={handleSubmit} className="space-y-4" id="eventForm" name="eventForm">
        <h2 className="font-bold text-lg" id="formTitle">Create Event</h2>
        
        <div className="space-y-2">
          <Label htmlFor="eventType" className="block">Event Type</Label>
          <Select
            defaultValue={formData.eventType}
            onValueChange={handleEventTypeChange}
            name="eventType"
          >
            <SelectTrigger className="w-full" id="eventType">
              <SelectValue aria-label="Event type">{formData.eventType}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {EVENT_TYPES.map((eventType) => (
                <SelectItem 
                  key={eventType} 
                  value={eventType}
                  id={`eventType-${eventType.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {eventType}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <TimePicker
              label="Start Time"    
              id="startTime"
              name="startTime"
              value={formData.startTime}
              onChange={(time) => handleTimeChange("startTime", time)}
              aria-label="Start time"
            />
          </div>
          <div>
            <TimePicker
              label="End Time"        
              id="endTime"
              name="endTime"
              value={formData.endTime}
              onChange={(time) => handleTimeChange("endTime", time)}
              aria-label="End time"
            />
          </div>
        </div>

        {renderEventTypeFields()}

        <Button 
          type="submit" 
          className="w-full"
          id="submitEvent"
          name="submitEvent"
          aria-label="Save event"
        >
          Save Event
        </Button>
      </form>
    </div>
  );
};

export default EventForm;