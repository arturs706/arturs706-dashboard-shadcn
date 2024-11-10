import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Command, CommandInput } from '@/components/ui/command';
import { AppointmentData } from '../../_types/form';

type AppointmentProps = {
  formData: AppointmentData;
  onFormDataChange: (data: Partial<Omit<AppointmentData, 'eventType'>>) => void;
}

const Appointment: React.FC<AppointmentProps> = ({ formData, onFormDataChange }) => {
  const [showRecurrence, setShowRecurrence] = useState(formData.isRecurring || false);

  const handleInputChange = (field: string, value: any) => {
    onFormDataChange({ [field]: value });
  };

  const appointmentTypes = [
    "Client Meeting",
    "Team Meeting",
    "Site Visit",
    "Consultation",
    "Follow-up",
    "Other"
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Appointment Type</Label>
        <Select
          value={formData.appointmentType}
          onValueChange={(value) => handleInputChange('appointmentType', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select appointment type" />
          </SelectTrigger>
          <SelectContent>
            {appointmentTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Title</Label>
        <Input
          value={formData.title || ''}
          onChange={(e) => handleInputChange('title', e.target.value)}
          placeholder="Enter appointment title"
        />
      </div>

      <div className="space-y-2">
        <Label>Location</Label>
        <Input
          value={formData.location || ''}
          onChange={(e) => handleInputChange('location', e.target.value)}
          placeholder="Enter location"
        />
      </div>

      <div className="space-y-2">
        <Label>Property</Label>
        <Command className="border rounded-md">
          <CommandInput
            value={formData.property || ''}
            onValueChange={(value) => handleInputChange('property', value)}
            placeholder="Search properties..."
            className="h-9"
          />
        </Command>
      </div>

      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          value={formData.description || ''}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Enter appointment description"
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <Label>Staff</Label>
        <Select
          value={formData.staff?.[0]}
          onValueChange={(value) => handleInputChange('staff', [value])}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select staff members" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="staff1">Staff Member 1</SelectItem>
            <SelectItem value="staff2">Staff Member 2</SelectItem>
            <SelectItem value="staff3">Staff Member 3</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Additional Attendees</Label>
        <Command className="border rounded-md">
          <CommandInput
            value={formData.additionalAttendees?.[0] || ''}
            onValueChange={(value) => handleInputChange('additionalAttendees', [value])}
            placeholder="Search attendees..."
            className="h-9"
          />
        </Command>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="private"
            checked={formData.isPrivate}
            onCheckedChange={(checked) => handleInputChange('isPrivate', checked)}
          />
          <Label htmlFor="private">Private</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="notification"
            checked={formData.sendNotification}
            onCheckedChange={(checked) => handleInputChange('sendNotification', checked)}
          />
          <Label htmlFor="notification">Send Notification</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="recurring"
            checked={formData.isRecurring}
            onCheckedChange={(checked) => {
              setShowRecurrence(!!checked);
              handleInputChange('isRecurring', checked);
            }}
          />
          <Label htmlFor="recurring">Is Recurring</Label>
        </div>
      </div>

      {showRecurrence && (
        <div className="space-y-2">
          <Label>Recurrence Pattern</Label>
          <Input
            value={formData.recurrencePattern || ''}
            onChange={(e) => handleInputChange('recurrencePattern', e.target.value)}
            placeholder="Enter recurrence pattern (e.g., 'Weekly on Monday')"
          />
        </div>
      )}
    </div>
  );
};

export default Appointment;