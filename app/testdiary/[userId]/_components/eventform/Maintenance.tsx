import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { MaintenanceData } from "../../_types/form";

type MaintenanceProps = {
  formData: MaintenanceData;
  onFormDataChange: (data: Partial<Omit<MaintenanceData, 'eventType'>>) => void;
};

type MaintenanceType = typeof maintenanceTypes[number];


const maintenanceTypes = [
  "Routine",
  "Emergency",
  "Preventive",
  "Corrective",
  "Scheduled"
] as const;

// Define the staff members constant
const staffMembers = [
  "John Doe",
  "Jane Smith",
  "Mike Johnson",
  "Sarah Williams"
] as const;


const Maintenance: React.FC<MaintenanceProps> = ({ formData, onFormDataChange }) => {
  const handleStaffSelection = (value: string) => {
    const currentStaff = formData.staff || [];
    const updatedStaff = currentStaff.includes(value)
      ? currentStaff.filter((staff) => staff !== value)
      : [...currentStaff, value];
    
    onFormDataChange({ staff: updatedStaff });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Maintenance Type</Label>
        <Select
          value={formData.maintenanceType}
          onValueChange={(value: MaintenanceType) => 
            onFormDataChange({ maintenanceType: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select maintenance type" />
          </SelectTrigger>
          <SelectContent>
            {maintenanceTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Maintenance Job</Label>
        <Input
          type="text"
          placeholder="Enter maintenance job details"
          value={formData.maintenanceJob || ""}
          onChange={(e) => onFormDataChange({ maintenanceJob: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Staff</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className="w-full justify-between"
            >
              {formData.staff && formData.staff.length > 0
                ? `${formData.staff.length} staff selected`
                : "Select staff"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search staff..." />
              <CommandEmpty>No staff found.</CommandEmpty>
              <CommandGroup>
                {staffMembers.map((staff) => (
                  <CommandItem
                    key={staff}
                    onSelect={() => handleStaffSelection(staff)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        formData.staff?.includes(staff) ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {staff}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="notification"
          checked={formData.sendNotification || false}
          onCheckedChange={(checked: boolean) =>
            onFormDataChange({ sendNotification: checked })
          }
        />
        <Label htmlFor="notification">Send Notification</Label>
      </div>
    </div>
  );

};

export default Maintenance;