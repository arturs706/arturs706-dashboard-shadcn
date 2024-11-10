import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
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

interface EventFormProps {
  rowIndex: number | null;
  colIndex: number | null;
}

interface EventFormData {
  title: string;
  eventType: string;
  startTime: string;
  endTime: string;
  property?: string;
  staff?: string[];
  viewingStatus?: string;
  isSecondViewing?: boolean;
  isVirtualViewing?: boolean;
  arrangements?: string;
  feedback?: string;
  internalNotes?: string;
  followUpDate?: string;
  isClosed?: boolean;
  sendNotification?: boolean;
}

const EventForm: React.FC<EventFormProps> = ({ rowIndex, colIndex }) => {
  const calculateTime = (row: number | null): string => {
    if (row === null) return "00:00";
    const hour = Math.floor(row / 2);
    const minute = (row % 2) * 30;
    const formattedHour = hour.toString().padStart(2, "0");
    const formattedMinute = minute.toString().padStart(2, "0");
    return `${formattedHour}:${formattedMinute}`;
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

    return `${newHours.toString().padStart(2, "0")}:${newMinutes
      .toString()
      .padStart(2, "0")}`;
  };

  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    eventType: "Viewing",
    startTime: calculateTime(rowIndex),
    endTime: calculateEndTime(calculateTime(rowIndex)),
    property: "",
    staff: [],
    viewingStatus: "Scheduled",
    isSecondViewing: false,
    isVirtualViewing: false,
    arrangements: "",
    feedback: "",
    internalNotes: "",
    followUpDate: "",
    isClosed: false,
    sendNotification: true,
  });

  const handleTimeChange = (type: "startTime" | "endTime", value: string) => {
    setFormData((prev) => ({
      ...prev,
      [type]: value,
      ...(type === "startTime" ? { endTime: calculateEndTime(value) } : {}),
    }));
  };

  const handleDurationChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      eventType: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  const renderEventTypeFields = () => {
    switch (formData.eventType) {
      case "Viewing":
        return (
          <Viewing
            formData={formData}
            onFormDataChange={(newData) =>
              setFormData((prev) => ({ ...prev, ...newData }))
            }
          />
        );
      case "Appointment":
        return (
          <Appointment
            formData={formData}
            onFormDataChange={(newData) =>
              setFormData((prev) => ({ ...prev, ...newData }))
            }
          />
        );
      case "Callback":
        return (
          <Callback
            formData={formData}
            onFormDataChange={(newData) =>
              setFormData((prev) => ({ ...prev, ...newData }))
            }
          />
        );
      case "Inspection":
        return (
          <Inspection
            formData={formData}
            onFormDataChange={(newData) =>
              setFormData((prev) => ({ ...prev, ...newData }))
            }
          />
        );
      case "Maintenance":
        return (
          <Maintenance
            formData={formData}
            onFormDataChange={(newData) =>
              setFormData((prev) => ({ ...prev, ...newData }))
            }
          />
        );
      case "Note":
        return (
          <Note
            formData={formData}
            onFormDataChange={(newData) =>
              setFormData((prev) => ({ ...prev, ...newData }))
            }
          />
        );
      case "Public Holiday":
        return (
          <PublicHoliday
            formData={formData}
            onFormDataChange={(newData) =>
              setFormData((prev) => ({ ...prev, ...newData }))
            }
          />
        );
      case "Sick Leave":
        return (
          <SickLeave
            formData={formData}
            onFormDataChange={(newData) =>
              setFormData((prev) => ({ ...prev, ...newData }))
            }
          />
        );
      case "Staff Holiday":
        return (
          <StaffHoliday
            formData={formData}
            onFormDataChange={(newData) =>
              setFormData((prev) => ({ ...prev, ...newData }))
            }
          />
        );
      case "Staff Meeting":
        return (
          <StaffMeeting
            formData={formData}
            onFormDataChange={(newData) =>
              setFormData((prev) => ({ ...prev, ...newData }))
            }
          />
        );
      case "Training":
        return (
          <Training
            formData={formData}
            onFormDataChange={(newData) =>
              setFormData((prev) => ({ ...prev, ...newData }))
            }
          />
        );
      case "Valuation":
        return (
          <Valuation
            formData={formData}
            onFormDataChange={(newData) =>
              setFormData((prev) => ({ ...prev, ...newData }))
            }
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4" onClick={(e) => e.stopPropagation()}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="font-bold">Create Event</div>
        <div className="space-y-2">
          <Label>Event Type</Label>
          <Select
            defaultValue={formData.eventType}
            onValueChange={handleDurationChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue>{formData.eventType}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {[
                "Appointment",
                "Inspection",
                "Maintenance",
                "Note",
                "Callback",
                "Public Holiday",
                "Sick Leave",
                "Staff Holiday",
                "Staff Meeting",
                "Training",
                "Valuation",
                "Viewing",
              ].map((chosendEvent) => (
                <SelectItem key={chosendEvent} value={chosendEvent}>
                  {chosendEvent}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <TimePicker
            label="Start Time"
            value={formData.startTime}
            onChange={(time) => handleTimeChange("startTime", time)}
          />
          <TimePicker
            label="End Time"
            value={formData.endTime}
            onChange={(time) => handleTimeChange("endTime", time)}
          />
        </div>

        {renderEventTypeFields()}

        <Button type="submit" className="w-full">
          Save Event
        </Button>
      </form>
    </div>
  );
};

export default EventForm;
