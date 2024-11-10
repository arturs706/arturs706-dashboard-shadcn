import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ValuationFormData {
  title?: string;
  eventType?: string;
  startTime?: string;
  endTime?: string;
  propertyOwner?: string;
  location?: string;
  staff?: string[];
  notes?: string;
  instructionStatus?: string;
  followUpDate?: string;
  sendNotification?: boolean;
}

interface ValuationProps {
  formData: ValuationFormData;
  onFormDataChange: (newData: Partial<ValuationFormData>) => void;
}

const Valuation: React.FC<ValuationProps> = ({ formData, onFormDataChange }) => {
  const handleChange = (field: keyof ValuationFormData, value: any) => {
    onFormDataChange({ [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Property Owner</Label>
        <Input
          value={formData.propertyOwner || ""}
          onChange={(e) => handleChange("propertyOwner", e.target.value)}
          placeholder="Enter property owner name"
        />
      </div>

      <div className="space-y-2">
        <Label>Location</Label>
        <Input
          value={formData.location || ""}
          onChange={(e) => handleChange("location", e.target.value)}
          placeholder="Enter property location"
        />
      </div>

      <div className="space-y-2">
        <Label>Staff Members</Label>
        <Input
          value={formData.staff?.join(", ") || ""}
          onChange={(e) => handleChange("staff", e.target.value.split(", "))}
          placeholder="Enter staff members (comma-separated)"
        />
      </div>

      <div className="space-y-2">
        <Label>Instruction Status</Label>
        <Select
          value={formData.instructionStatus || "Awaiting Instruction"}
          onValueChange={(value) => handleChange("instructionStatus", value)}
        >
          <SelectTrigger>
            <SelectValue>{formData.instructionStatus || "Select status"}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Awaiting Instruction">Awaiting Instruction</SelectItem>
            <SelectItem value="Instructed">Instructed</SelectItem>
            <SelectItem value="On Hold">On Hold</SelectItem>
            <SelectItem value="Withdrawn">Withdrawn</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Follow-up Date</Label>
        <Input
          type="date"
          value={formData.followUpDate || ""}
          onChange={(e) => handleChange("followUpDate", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Notes</Label>
        <Textarea
          value={formData.notes || ""}
          onChange={(e) => handleChange("notes", e.target.value)}
          placeholder="Enter any additional notes"
          className="min-h-[100px]"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          checked={formData.sendNotification}
          onCheckedChange={(checked) => handleChange("sendNotification", checked)}
        />
        <Label>Send Notification</Label>
      </div>
    </div>
  );
};

export default Valuation;