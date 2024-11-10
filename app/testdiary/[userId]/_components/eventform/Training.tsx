import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TrainingProps {
  formData: any;
  onFormDataChange: (data: any) => void;
}

const Training: React.FC<TrainingProps> = ({ formData, onFormDataChange }) => {
  const handleChange = (field: string, value: any) => {
    onFormDataChange({ [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Type</Label>
        <Select
          value={formData.trainingType}
          onValueChange={(value) => handleChange("trainingType", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select training type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="internal">Internal</SelectItem>
            <SelectItem value="external">External</SelectItem>
            <SelectItem value="online">Online</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Title</Label>
        <Input
          value={formData.title || ""}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="Training title"
        />
      </div>

      <div className="space-y-2">
        <Label>Location</Label>
        <Input
          value={formData.location || ""}
          onChange={(e) => handleChange("location", e.target.value)}
          placeholder="Training location"
        />
      </div>

      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          value={formData.description || ""}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Training description"
        />
      </div>

      <div className="space-y-2">
        <Label>Lead Staff</Label>
        <Select
          value={formData.leadStaff}
          onValueChange={(value) => handleChange("leadStaff", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select lead staff" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="staff1">Staff Member 1</SelectItem>
            <SelectItem value="staff2">Staff Member 2</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Additional Attendees</Label>
        <Input
          value={formData.additionalAttendees || ""}
          onChange={(e) => handleChange("additionalAttendees", e.target.value)}
          placeholder="Search attendees"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="notification"
          checked={formData.sendNotification || false}
          onCheckedChange={(checked) => handleChange("sendNotification", checked)}
        />
        <Label htmlFor="notification">Send Notification</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="recurring"
          checked={formData.isRecurring || false}
          onCheckedChange={(checked) => handleChange("isRecurring", checked)}
        />
        <Label htmlFor="recurring">Is Recurring</Label>
      </div>

      {formData.isRecurring && (
        <div className="space-y-2">
          <Label>Recurrence Pattern</Label>
          <Input
            value={formData.recurrencePattern || ""}
            onChange={(e) => handleChange("recurrencePattern", e.target.value)}
            placeholder="Enter recurrence pattern"
          />
        </div>
      )}
    </div>
  );
};

export { Training };