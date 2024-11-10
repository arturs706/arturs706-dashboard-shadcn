import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

interface PublicHolidayProps {
  formData: {
    title?: string;
    description?: string;
    sendNotification?: boolean;
    isRecurring?: boolean;
    recurrencePattern?: string;
  };
  onFormDataChange: (data: Partial<any>) => void;
}

const PublicHoliday: React.FC<PublicHolidayProps> = ({
  formData,
  onFormDataChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Title</Label>
        <Input
          placeholder="Enter holiday title"
          value={formData.title || ""}
          onChange={(e) =>
            onFormDataChange({ title: e.target.value })
          }
        />
      </div>

      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          placeholder="Enter holiday description"
          value={formData.description || ""}
          onChange={(e) =>
            onFormDataChange({ description: e.target.value })
          }
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="notification"
          checked={formData.sendNotification}
          onCheckedChange={(checked) =>
            onFormDataChange({ sendNotification: checked })
          }
        />
        <Label htmlFor="notification">Send Notification</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="recurring"
          checked={formData.isRecurring}
          onCheckedChange={(checked) =>
            onFormDataChange({ isRecurring: checked })
          }
        />
        <Label htmlFor="recurring">Is Recurring</Label>
      </div>

      {formData.isRecurring && (
        <div className="space-y-2">
          <Label>Recurrence Pattern</Label>
          <Input
            placeholder="Enter recurrence pattern"
            value={formData.recurrencePattern || ""}
            onChange={(e) =>
              onFormDataChange({ recurrencePattern: e.target.value })
            }
          />
        </div>
      )}
    </div>
  );
};

export default PublicHoliday;