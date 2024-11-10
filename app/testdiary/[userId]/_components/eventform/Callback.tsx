import { useState } from 'react';
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
import { Button } from "@/components/ui/button";
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
import { CallbackData } from '../../_types/form';

type CallbackProps = {
  formData: CallbackData;
  onFormDataChange: (data: Partial<Omit<CallbackData, 'eventType'>>) => void;
}

const Callback: React.FC<CallbackProps> = ({ formData, onFormDataChange }) => {
  const [openContacts, setOpenContacts] = useState(false);
  const [openStaff, setOpenStaff] = useState(false);

  // Sample data - in real app, these would come from props or API
  const contacts = [
    { id: '1', name: 'John Doe', email: 'john@example.com' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
  ];

  const staffMembers = [
    { id: '1', name: 'Alice Johnson' },
    { id: '2', name: 'Bob Wilson' },
    { id: '3', name: 'Carol Martinez' },
  ];

  const handleStaffChange = (staffId: string) => {
    const currentStaff = formData.staff || [];
    const newStaff = currentStaff.includes(staffId)
      ? currentStaff.filter(id => id !== staffId)
      : [...currentStaff, staffId];
    
    onFormDataChange({ staff: newStaff });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Contact</Label>
        <Popover open={openContacts} onOpenChange={setOpenContacts}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openContacts}
              className="w-full justify-between"
            >
              {formData.contact
                ? contacts.find(contact => contact.id === formData.contact)?.name
                : "Select contact..."}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search contacts..." />
              <CommandEmpty>No contact found.</CommandEmpty>
              <CommandGroup>
                {contacts.map(contact => (
                  <CommandItem
                    key={contact.id}
                    onSelect={() => {
                      onFormDataChange({ contact: contact.id });
                      setOpenContacts(false);
                    }}
                  >
                    {contact.name}
                  </CommandItem>
                ))}
              </CommandGroup>
              <div className="p-2 border-t">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    // Handle adding new contact
                    console.log('Add new contact clicked');
                  }}
                >
                  + Add New Contact
                </Button>
              </div>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          placeholder="Enter callback details..."
          value={formData.description || ''}
          onChange={(e) => onFormDataChange({ description: e.target.value })}
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <Label>Assigned Staff</Label>
        <Popover open={openStaff} onOpenChange={setOpenStaff}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openStaff}
              className="w-full justify-between"
            >
              {formData.staff?.length
                ? `${formData.staff.length} selected`
                : "Select staff..."}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search staff..." />
              <CommandEmpty>No staff member found.</CommandEmpty>
              <CommandGroup>
                {staffMembers.map(member => (
                  <CommandItem
                    key={member.id}
                    onSelect={() => handleStaffChange(member.id)}
                  >
                    <Checkbox
                      checked={formData.staff?.includes(member.id)}
                      className="mr-2"
                    />
                    {member.name}
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
          checked={formData.sendNotification}
          onCheckedChange={(checked) => 
            onFormDataChange({ sendNotification: checked as boolean })
          }
        />
        <Label htmlFor="notification">Send notification</Label>
      </div>
    </div>
  );
};

export default Callback;