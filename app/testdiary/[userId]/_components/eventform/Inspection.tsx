import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

interface InspectionProps {
  formData: {
    inspectionType?: string;
    letting?: string;
    inspectionStatus?: string;
    staffInspectors?: string[];
    supplierInspector?: string;
    officeNotes?: string;
    tenantConfirmed?: boolean;
    sendNotification?: boolean;
  };
  onFormDataChange: (data: Partial<InspectionProps["formData"]>) => void;
}

const Inspection: React.FC<InspectionProps> = ({ formData, onFormDataChange }) => {
  const inspectionTypes = [
    "Periodic",
    "Pre-Tenancy",
    "Post-Tenancy",
    "Property Check",
    "Maintenance Check",
  ];

  const inspectionStatuses = [
    "Scheduled",
    "In Progress",
    "Completed",
    "Cancelled",
    "Rescheduled",
  ];

  const staffMembers = [
    "John Smith",
    "Jane Doe",
    "Mike Johnson",
    "Sarah Wilson",
  ];

  const suppliers = [
    "ABC Inspections",
    "Quality Check Ltd",
    "Property Inspect Co",
    "Premier Inspection Services",
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Inspection Type</Label>
        <Select
          value={formData.inspectionType}
          onValueChange={(value) =>
            onFormDataChange({ inspectionType: value })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select inspection type" />
          </SelectTrigger>
          <SelectContent>
            {inspectionTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Letting</Label>
        <Input
          type="text"
          placeholder="Search letting..."
          value={formData.letting}
          onChange={(e) => onFormDataChange({ letting: e.target.value })}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label>Inspection Status</Label>
        <Select
          value={formData.inspectionStatus}
          onValueChange={(value) =>
            onFormDataChange({ inspectionStatus: value })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            {inspectionStatuses.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Staff Inspectors</Label>
        <Select
          value={formData.staffInspectors?.[0]}
          onValueChange={(value) =>
            onFormDataChange({ staffInspectors: [value] })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select staff" />
          </SelectTrigger>
          <SelectContent>
            {staffMembers.map((staff) => (
              <SelectItem key={staff} value={staff}>
                {staff}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Supplier Inspector</Label>
        <Select
          value={formData.supplierInspector}
          onValueChange={(value) =>
            onFormDataChange({ supplierInspector: value })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select supplier" />
          </SelectTrigger>
          <SelectContent>
            {suppliers.map((supplier) => (
              <SelectItem key={supplier} value={supplier}>
                {supplier}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Office Notes</Label>
        <Textarea
          placeholder="Enter office notes..."
          value={formData.officeNotes}
          onChange={(e) => onFormDataChange({ officeNotes: e.target.value })}
          className="min-h-[100px]"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="tenantConfirmed"
          checked={formData.tenantConfirmed}
          onCheckedChange={(checked) =>
            onFormDataChange({ tenantConfirmed: checked as boolean })
          }
        />
        <Label htmlFor="tenantConfirmed">Tenant Confirmed</Label>
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

export default Inspection;