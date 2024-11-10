// components/EventForm.tsx
import { Dispatch, SetStateAction } from 'react';
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
import { EventFormProps } from '../_types/eventTypes';


const EventForm = ({ eventFormData, setEventFormData, selectedEventType }: EventFormProps) => {
  switch (selectedEventType) {
    case "Appointment":
      return (
        <div className="space-y-4">
          <Select
            onValueChange={(value) =>
              setEventFormData(prev => ({ ...prev, title: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Appointment Type" />
            </SelectTrigger>
            <SelectContent>
              {["Initial", "Follow-up", "Final"].map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            placeholder="Title"
            value={eventFormData.title || ""}
            onChange={(e) =>
              setEventFormData(prev => ({ ...prev, title: e.target.value }))
            }
          />
          <Input
            placeholder="Location"
            value={eventFormData.location || ""}
            onChange={(e) =>
              setEventFormData(prev => ({ ...prev, location: e.target.value }))
            }
          />
          <Input
            placeholder="Property"
            value={eventFormData.property || ""}
            onChange={(e) =>
              setEventFormData(prev => ({ ...prev, property: e.target.value }))
            }
          />
          <Textarea
            placeholder="Description"
            value={eventFormData.description || ""}
            onChange={(e) =>
              setEventFormData(prev => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
          <div className="flex items-center space-x-2">
            <Checkbox
              id="private"
              checked={eventFormData.isPrivate}
              onCheckedChange={(checked) =>
                setEventFormData(prev => ({
                  ...prev,
                  isPrivate: checked as boolean,
                }))
              }
            />
            <label htmlFor="private">Private</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="notification"
              checked={eventFormData.notification}
              onCheckedChange={(checked) =>
                setEventFormData(prev => ({
                  ...prev,
                  notification: checked as boolean,
                }))
              }
            />
            <label htmlFor="notification">Notification</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="recurring"
              checked={eventFormData.isRecurring}
              onCheckedChange={(checked) =>
                setEventFormData(prev => ({
                  ...prev,
                  isRecurring: checked as boolean,
                }))
              }
            />
            <label htmlFor="recurring">Is Recurring</label>
          </div>
          {eventFormData.isRecurring && (
            <Input
              placeholder="Recurrence Pattern"
              value={eventFormData.recurrencePattern || ""}
              onChange={(e) =>
                setEventFormData(prev => ({
                  ...prev,
                  recurrencePattern: e.target.value,
                }))
              }
            />
          )}
        </div>
      );

    case "Callback":
      return (
        <div className="space-y-4">
          <Input
            placeholder="Contact Name"
            value={eventFormData.contactName || ""}
            onChange={(e) =>
              setEventFormData(prev => ({
                ...prev,
                contactName: e.target.value,
              }))
            }
          />
          <Input
            placeholder="Phone Number"
            value={eventFormData.phoneNumber || ""}
            onChange={(e) =>
              setEventFormData(prev => ({
                ...prev,
                phoneNumber: e.target.value,
              }))
            }
          />
          <Textarea
            placeholder="Call Notes"
            value={eventFormData.description || ""}
            onChange={(e) =>
              setEventFormData(prev => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
          <div className="flex items-center space-x-2">
            <Checkbox
              id="urgent"
              checked={eventFormData.isUrgent}
              onCheckedChange={(checked) =>
                setEventFormData(prev => ({
                  ...prev,
                  isUrgent: checked as boolean,
                }))
              }
            />
            <label htmlFor="urgent">Urgent</label>
          </div>
        </div>
      );

    case "Inspection":
    case "Maintenance":
      return (
        <div className="space-y-4">
          <Input
            placeholder="Title"
            value={eventFormData.title || ""}
            onChange={(e) =>
              setEventFormData(prev => ({ ...prev, title: e.target.value }))
            }
          />
          <Input
            placeholder="Property"
            value={eventFormData.property || ""}
            onChange={(e) =>
              setEventFormData(prev => ({ ...prev, property: e.target.value }))
            }
          />
          <Input
            placeholder="Contractor"
            value={eventFormData.contractor || ""}
            onChange={(e) =>
              setEventFormData(prev => ({
                ...prev,
                contractor: e.target.value,
              }))
            }
          />
          <Textarea
            placeholder="Description"
            value={eventFormData.description || ""}
            onChange={(e) =>
              setEventFormData(prev => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
          <div className="flex items-center space-x-2">
            <Checkbox
              id="notification"
              checked={eventFormData.notification}
              onCheckedChange={(checked) =>
                setEventFormData(prev => ({
                  ...prev,
                  notification: checked as boolean,
                }))
              }
            />
            <label htmlFor="notification">Notification</label>
          </div>
        </div>
      );

    case "Valuation":
      return (
        <div className="space-y-4">
          <Input
            placeholder="Property"
            value={eventFormData.property || ""}
            onChange={(e) =>
              setEventFormData(prev => ({ ...prev, property: e.target.value }))
            }
          />
          <Input
            placeholder="Client Name"
            value={eventFormData.clientName || ""}
            onChange={(e) =>
              setEventFormData(prev => ({
                ...prev,
                clientName: e.target.value,
              }))
            }
          />
          <Input
            placeholder="Contact Number"
            value={eventFormData.contactNumber || ""}
            onChange={(e) =>
              setEventFormData(prev => ({
                ...prev,
                contactNumber: e.target.value,
              }))
            }
          />
          <Textarea
            placeholder="Notes"
            value={eventFormData.description || ""}
            onChange={(e) =>
              setEventFormData(prev => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
          <div className="flex items-center space-x-2">
            <Checkbox
              id="notification"
              checked={eventFormData.notification}
              onCheckedChange={(checked) =>
                setEventFormData(prev => ({
                  ...prev,
                  notification: checked as boolean,
                }))
              }
            />
            <label htmlFor="notification">Notification</label>
          </div>
        </div>
      );

    case "Staff Meeting":
    case "Training":
      return (
        <div className="space-y-4">
          <Input
            placeholder="Title"
            value={eventFormData.title || ""}
            onChange={(e) =>
              setEventFormData(prev => ({ ...prev, title: e.target.value }))
            }
          />
          <Input
            placeholder="Location"
            value={eventFormData.location || ""}
            onChange={(e) =>
              setEventFormData(prev => ({ ...prev, location: e.target.value }))
            }
          />
          <Textarea
            placeholder="Agenda/Description"
            value={eventFormData.description || ""}
            onChange={(e) =>
              setEventFormData(prev => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
          <div className="flex items-center space-x-2">
            <Checkbox
              id="recurring"
              checked={eventFormData.isRecurring}
              onCheckedChange={(checked) =>
                setEventFormData(prev => ({
                  ...prev,
                  isRecurring: checked as boolean,
                }))
              }
            />
            <label htmlFor="recurring">Is Recurring</label>
          </div>
          {eventFormData.isRecurring && (
            <Input
              placeholder="Recurrence Pattern"
              value={eventFormData.recurrencePattern || ""}
              onChange={(e) =>
                setEventFormData(prev => ({
                  ...prev,
                  recurrencePattern: e.target.value,
                }))
              }
            />
          )}
        </div>
      );

    case "Staff Holiday":
    case "Sick Leave":
      return (
        <div className="space-y-4">
          <Input
            placeholder="Staff Member"
            value={eventFormData.staffMember || ""}
            onChange={(e) =>
              setEventFormData(prev => ({
                ...prev,
                staffMember: e.target.value,
              }))
            }
          />
          <Textarea
            placeholder="Notes"
            value={eventFormData.description || ""}
            onChange={(e) =>
              setEventFormData(prev => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
          <div className="flex items-center space-x-2">
            <Checkbox
              id="halfDay"
              checked={eventFormData.isHalfDay}
              onCheckedChange={(checked) =>
                setEventFormData(prev => ({
                  ...prev,
                  isHalfDay: checked as boolean,
                }))
              }
            />
            <label htmlFor="halfDay">Half Day</label>
          </div>
        </div>
      );

    case "Public Holiday":
      return (
        <div className="space-y-4">
          <Input
            placeholder="Holiday Name"
            value={eventFormData.title || ""}
            onChange={(e) =>
              setEventFormData(prev => ({ ...prev, title: e.target.value }))
            }
          />
          <Textarea
            placeholder="Description"
            value={eventFormData.description || ""}
            onChange={(e) =>
              setEventFormData(prev => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
        </div>
      );

    case "Viewing":
      return (
        <div className="space-y-4">
          <Input
            placeholder="Property"
            value={eventFormData.property || ""}
            onChange={(e) =>
              setEventFormData(prev => ({ ...prev, property: e.target.value }))
            }
          />
          <Input
            placeholder="Client Name"
            value={eventFormData.clientName || ""}
            onChange={(e) =>
              setEventFormData(prev => ({
                ...prev,
                clientName: e.target.value,
              }))
            }
          />
          <Input
            placeholder="Contact Number"
            value={eventFormData.contactNumber || ""}
            onChange={(e) =>
              setEventFormData(prev => ({
                ...prev,
                contactNumber: e.target.value,
              }))
            }
          />
          <Textarea
            placeholder="Notes"
            value={eventFormData.description || ""}
            onChange={(e) =>
              setEventFormData(prev => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
          <Select
            onValueChange={(value) =>
              setEventFormData(prev => ({
                ...prev,
                viewingType: value,
              }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Viewing Type" />
            </SelectTrigger>
            <SelectContent>
              {["In-Person Viewing", "Virtual Viewing", "Second Viewing"].map((theme) => (
                <SelectItem key={theme} value={theme}>
                  {theme}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value) =>
              setEventFormData(prev => ({
                ...prev,
                notificationLength: value,
              }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Notification" />
            </SelectTrigger>
            <SelectContent>
              {["00:05", "00:10", "00:15", "00:20", "00:25", "00:30"].map(
                (time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>
      );

    case "Note":
    default:
      return (
        <div className="space-y-4">
          <Input
            placeholder="Title"
            value={eventFormData.title || ""}
            onChange={(e) =>
              setEventFormData(prev => ({ ...prev, title: e.target.value }))
            }
          />
          <Textarea
            placeholder="Description"
            value={eventFormData.description || ""}
            onChange={(e) =>
              setEventFormData(prev => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
        </div>
      );
  }
};

export default EventForm;