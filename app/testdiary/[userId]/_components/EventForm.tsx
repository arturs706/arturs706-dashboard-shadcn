import React, { useState } from 'react';
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
import Viewing from "./eventform/Viewing";
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
  const calculateTime = (row: number | null): string => {
    if (row === null) return "00:00";
    const hour = Math.floor(row / 2);
    const minute = (row % 2) * 30;
    return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
  };

  const calculateEndTime = (startTime: string): string => {
    if (startTime === "--:--") return "00:00";
    const [hours, minutes] = startTime.split(":").map(Number);
    let newMinutes = minutes + 15;
    let newHours = hours;

    if (newMinutes >= 60) {
      newMinutes -= 60;
      newHours += 1;
    }

    if (newHours >= 24) {
      newHours = 23;
      newMinutes = 59;
    }

    return `${newHours.toString().padStart(2, "0")}:${newMinutes.toString().padStart(2, "0")}`;
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

  const [formData, setFormData] = useState<EventFormData>(() => {
    const initialTime = calculateTime(rowIndex);
    return createInitialEventData("Viewing");
  });

  const handleTimeChange = (type: "startTime" | "endTime", value: string) => {
    setFormData((prev) => ({
      ...prev,
      [type]: value,
      ...(type === "startTime" ? { endTime: calculateEndTime(value) } : {}),
    }));
  };

  const handleEventTypeChange = (value: typeof EVENT_TYPES[number]) => {
    // Create new form data with the new event type while preserving times
    const { startTime, endTime } = formData;
    const newData = createInitialEventData(value);
    setFormData({
      ...newData,
      startTime,
      endTime,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validateEventData(formData);
    console.log("Event Type:", formData.eventType);
    console.log(isValid);
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