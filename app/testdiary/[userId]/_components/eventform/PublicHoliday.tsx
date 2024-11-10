import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PublicHolidayData } from "../../_types/form";

type PublicHolidayProps = {
  formData: PublicHolidayData;
  onFormDataChange: (data: Partial<Omit<PublicHolidayData, 'eventType'>>) => void;
};

const PublicHoliday: React.FC<PublicHolidayProps> = ({
  formData,
  onFormDataChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Holiday Name</Label>
        <Input
          placeholder="Enter holiday name"
          value={formData.holidayName || ""}
          onChange={(e) =>
            onFormDataChange({ holidayName: e.target.value })
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
          id="nationwide"
          checked={formData.isNationwide}
          onCheckedChange={(checked) =>
            onFormDataChange({ isNationwide: checked as boolean })
          }
        />
        <Label htmlFor="nationwide">Is Nationwide</Label>
      </div>

      {!formData.isNationwide && (
        <div className="space-y-2">
          <Label>Region</Label>
          <Input
            placeholder="Enter region"
            value={formData.region || ""}
            onChange={(e) =>
              onFormDataChange({ region: e.target.value })
            }
          />
        </div>
      )}

      <div className="space-y-2">
        <Label>Affected Services</Label>
        <Textarea
          placeholder="Enter affected services (one per line)"
          value={formData.affectedServices?.join('\n') || ""}
          onChange={(e) =>
            onFormDataChange({ 
              affectedServices: e.target.value.split('\n').filter(service => service.trim() !== '') 
            })
          }
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="recurring"
          checked={formData.isAnnualRecurring}
          onCheckedChange={(checked) =>
            onFormDataChange({ isAnnualRecurring: checked as boolean })
          }
        />
        <Label htmlFor="recurring">Is Annual Recurring</Label>
      </div>

      <div className="space-y-2">
        <Label>Office Status</Label>
        <Select 
          value={formData.officeStatus}
          onValueChange={(value: "Closed" | "Limited Hours" | "Open") =>
            onFormDataChange({ officeStatus: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select office status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Closed">Closed</SelectItem>
            <SelectItem value="Limited Hours">Limited Hours</SelectItem>
            <SelectItem value="Open">Open</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Staff Required</Label>
        <Textarea
          placeholder="Enter required staff (one per line)"
          value={formData.staffRequired?.join('\n') || ""}
          onChange={(e) =>
            onFormDataChange({ 
              staffRequired: e.target.value.split('\n').filter(staff => staff.trim() !== '') 
            })
          }
        />
      </div>

      <div className="space-y-2">
        <Label>Alternative Arrangements</Label>
        <Textarea
          placeholder="Enter alternative arrangements"
          value={formData.alternativeArrangements || ""}
          onChange={(e) =>
            onFormDataChange({ alternativeArrangements: e.target.value })
          }
        />
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
    </div>
  );
};

export default PublicHoliday;