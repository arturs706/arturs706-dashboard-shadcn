import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StaffHolidayData } from "../../_types/form";

type StaffHolidayProps = {
    formData: StaffHolidayData
    onFormDataChange: (data: Partial<Omit<StaffHolidayData, 'eventType'>>) => void;
};


const StaffHoliday: React.FC<StaffHolidayProps> = ({
  formData,
  onFormDataChange,
}) => {
  const handleInputChange = (field: string, value: any) => {
    onFormDataChange({
      ...formData,
      [field]: value,
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="holidayType">Holiday Type</Label>
        <Select
          value={formData.holidayType || "annual"}
          onValueChange={(value) => handleInputChange("holidayType", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select holiday type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="annual">Annual Leave</SelectItem>
            <SelectItem value="unpaid">Unpaid Leave</SelectItem>
            <SelectItem value="compassionate">Compassionate Leave</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title || ""}
          onChange={(e) => handleInputChange("title", e.target.value)}
          placeholder="Holiday title"
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="startDate">Start Date</Label>
        <Input
          id="startDate"
          type="datetime-local"
          value={formData.startDate || ""}
          onChange={(e) => handleInputChange("startDate", e.target.value)}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="endDate">End Date</Label>
        <Input
          id="endDate"
          type="datetime-local"
          value={formData.endDate || ""}
          onChange={(e) => handleInputChange("endDate", e.target.value)}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description || ""}
          onChange={(e) => handleInputChange("description", e.target.value)}
          placeholder="Add any additional details"
          className="w-full"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="notification"
          checked={formData.sendNotification || false}
          onCheckedChange={(checked) =>
            handleInputChange("sendNotification", checked)
          }
        />
        <Label htmlFor="notification">Send notification</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="isRecurring"
          checked={formData.isRecurring || false}
          onCheckedChange={(checked) => handleInputChange("isRecurring", checked)}
        />
        <Label htmlFor="isRecurring">Is recurring</Label>
      </div>

      {formData.isRecurring && (
        <div className="space-y-2">
          <Label htmlFor="recurrencePattern">Recurrence Pattern</Label>
          <Input
            id="recurrencePattern"
            value={formData.recurrencePattern || ""}
            onChange={(e) => handleInputChange("recurrencePattern", e.target.value)}
            placeholder="e.g., Every Monday, Monthly on the 1st"
            className="w-full"
          />
        </div>
      )}
    </div>
  );
};

export default StaffHoliday;