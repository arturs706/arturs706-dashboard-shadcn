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
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SickLeaveData } from "../../_types/form";

type SickLeaveProps = {
  formData: SickLeaveData
  onFormDataChange: (data: Partial<Omit<SickLeaveData, 'eventType'>>) => void;
};
  
  const SickLeave: React.FC<SickLeaveProps> = ({ formData, onFormDataChange }) => {
    const [showRecurrencePattern, setShowRecurrencePattern] = useState(false);
  
    const handleInputChange = (field: string, value: any) => {
      onFormDataChange({
        ...formData,
        [field]: value,
      });
    };
  
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Leave Type</Label>
          <RadioGroup
            defaultValue="sick"
            onValueChange={(value) => handleInputChange('leaveType', value)}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sick" id="sick" />
              <Label htmlFor="sick">Sick Leave</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="medical" id="medical" />
              <Label htmlFor="medical">Medical Appointment</Label>
            </div>
          </RadioGroup>
        </div>
  
        <div className="space-y-2">
          <Label>Title</Label>
          <Input
            type="text"
            placeholder="Enter title"
            value={formData.title || ''}
            onChange={(e) => handleInputChange('title', e.target.value)}
          />
        </div>
  
        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea
            placeholder="Enter description"
            value={formData.description || ''}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className="min-h-[100px]"
          />
        </div>
  
        <div className="flex items-center space-x-2">
          <Checkbox
            id="notification"
            checked={formData.sendNotification || false}
            onCheckedChange={(checked) => handleInputChange('sendNotification', checked)}
          />
          <Label htmlFor="notification">Send Notification</Label>
        </div>
  
        <div className="flex items-center space-x-2">
          <Checkbox
            id="recurring"
            checked={showRecurrencePattern}
            onCheckedChange={(checked) => {
              setShowRecurrencePattern(checked as boolean);
              handleInputChange('isRecurring', checked);
            }}
          />
          <Label htmlFor="recurring">Is Recurring</Label>
        </div>
  
        {showRecurrencePattern && (
          <div className="space-y-2">
            <Label>Recurrence Pattern</Label>
            <Select
              onValueChange={(value) => handleInputChange('recurrencePattern', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select pattern" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    );
  };
  
  export default SickLeave;