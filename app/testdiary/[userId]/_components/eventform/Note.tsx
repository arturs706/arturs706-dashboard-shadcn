import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface NoteFormData {
  type?: string;
  startDateTime?: Date;
  endDateTime?: Date;
  note?: string;
  staff?: string[];
  isPrivate?: boolean;
  sendNotification?: boolean;
  isRecurring?: boolean;
  recurrencePattern?: string;
}

interface NoteProps {
  formData: NoteFormData;
  onFormDataChange: (data: Partial<NoteFormData>) => void;
}

const Note: React.FC<NoteProps> = ({ formData, onFormDataChange }) => {
  const staffOptions = [
    "John Doe",
    "Jane Smith",
    "Mike Johnson",
    "Sarah Williams",
  ];

  const noteTypes = [
    "General",
    "Meeting",
    "Follow-up",
    "Reminder",
    "Important",
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Note Type</Label>
        <Select
          value={formData.type}
          onValueChange={(value) => onFormDataChange({ type: value })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            {noteTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Staff</Label>
        <Select
          value={formData.staff?.[0]}
          onValueChange={(value) =>
            onFormDataChange({ staff: [value] })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select staff" />
          </SelectTrigger>
          <SelectContent>
            {staffOptions.map((staff) => (
              <SelectItem key={staff} value={staff}>
                {staff}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Note</Label>
        <Textarea
          value={formData.note}
          onChange={(e) => onFormDataChange({ note: e.target.value })}
          placeholder="Enter note details..."
          className="min-h-32"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="private"
          checked={formData.isPrivate}
          onCheckedChange={(checked) =>
            onFormDataChange({ isPrivate: checked as boolean })
          }
        />
        <Label htmlFor="private">Private</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="notification"
          checked={formData.sendNotification}
          onCheckedChange={(checked) =>
            onFormDataChange({ sendNotification: checked as boolean })
          }
        />
        <Label htmlFor="notification">Send Notification</Label>
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="recurring"
            checked={formData.isRecurring}
            onCheckedChange={(checked) =>
              onFormDataChange({ isRecurring: checked as boolean })
            }
          />
          <Label htmlFor="recurring">Is Recurring</Label>
        </div>

        {formData.isRecurring && (
          <Input
            placeholder="Enter recurrence pattern"
            value={formData.recurrencePattern}
            onChange={(e) =>
              onFormDataChange({ recurrencePattern: e.target.value })
            }
          />
        )}
      </div>
    </div>
  );
};

export default Note;