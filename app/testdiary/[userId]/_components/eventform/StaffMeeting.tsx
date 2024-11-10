import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { StaffMeetingData } from "../../_types/form";

type StaffMeetingProps = {
    formData: StaffMeetingData;
    onFormDataChange: (data: Partial<Omit<StaffMeetingData, 'eventType'>>) => void;
};

const StaffMeeting: React.FC<StaffMeetingProps> = ({
  formData,
  onFormDataChange,
}) => {
  const handleChange = (
    field: string,
    value: string | boolean | string[]
  ) => {
    onFormDataChange({ [field]: value });
  };

  const meetingTypes = [
    "Team Meeting",
    "Department Meeting",
    "All Staff Meeting",
    "Training Session",
    "Strategy Meeting",
    "Performance Review",
    "Other"
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Meeting Title</Label>
        <Input
          value={formData.title || ""}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="Enter meeting title"
        />
      </div>

      <div className="space-y-2">
        <Label>Meeting Type</Label>
        <Select
          value={formData.meetingType}
          onValueChange={(value) => handleChange("meetingType", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select meeting type" />
          </SelectTrigger>
          <SelectContent>
            {meetingTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Location</Label>
        <Input
          value={formData.location || ""}
          onChange={(e) => handleChange("location", e.target.value)}
          placeholder="Enter meeting location"
        />
      </div>

      <div className="space-y-2">
        <Label>Agenda</Label>
        <Textarea
          value={formData.agenda || ""}
          onChange={(e) => handleChange("agenda", e.target.value)}
          placeholder="Enter meeting agenda"
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <Label>Internal Notes</Label>
        <Textarea
          value={formData.internalNotes || ""}
          onChange={(e) => handleChange("internalNotes", e.target.value)}
          placeholder="Enter any internal notes"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="sendNotification"
          checked={formData.sendNotification}
          onCheckedChange={(checked) =>
            handleChange("sendNotification", checked as boolean)
          }
        />
        <Label htmlFor="sendNotification">Send notification to attendees</Label>
      </div>
    </div>
  );
};

export default StaffMeeting;