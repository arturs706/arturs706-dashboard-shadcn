"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import LoadingSpinner from "@/components/elements/loading-spinner/LoadingSpinner";

interface BaseEvent {
  id: string;
  type: string;
  title?: string;
  date: string;
  startTime: string;
  endTime: string;
  description?: string;
  notification?: boolean;
  isRecurring?: boolean;
  recurrencePattern?: string;
  column?: number;
}

interface EventFormData extends BaseEvent {
  location?: string;
  property?: string;
  staff?: string[];
  additionalAttendees?: string[];
  isPrivate?: boolean;
  contact?: string;
  letting?: string;
  inspectionStatus?: string;
  inspectionBy?: string[];
  supplierInspectionBy?: string;
  tenantConfirmed?: boolean;
  maintenanceJob?: string;
  virtualViewing?: boolean;
  secondViewing?: boolean;
  viewingStatus?: string;
  arrangements?: string;
  feedback?: string;
  internalNotes?: string;
  followUpDate?: string;
  isClosed?: boolean;
}

const EVENT_TYPES = [
  "Appointment",
  "Callback",
  "Inspection",
  "Maintenance",
  "Note",
  "Public Holiday",
  "Sick Leave",
  "Staff Holiday",
  "Staff Meeting",
  "Training",
  "Valuation",
  "Viewing",
];

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [events, setEvents] = useState<EventFormData[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<{
    date: string;
    time: string;
  } | null>(null);
  const [showEventTypeSelect, setShowEventTypeSelect] = useState(false);
  const [selectedEventType, setSelectedEventType] = useState<string>("");
  const [editingEvent, setEditingEvent] = useState<EventFormData | null>(null);
  const [eventFormData, setEventFormData] = useState<EventFormData>({
    id: "",
    type: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  // Time slots generation for 30-minute intervals
  const timeSlots = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const minutes = i % 2 === 0 ? "00" : "30";
    return `${String(hour).padStart(2, "0")}:${minutes}`;
  });

  const calculateEventColumns = (
    events: EventFormData[],
    date: string,
    time: string
  ) => {
    const overlappingEvents = events.filter(
      (event) =>
        event.date === date && event.startTime <= time && event.endTime > time
    );

    // Sort events by start time
    overlappingEvents.sort((a, b) => a.startTime.localeCompare(b.startTime));

    // Assign columns to events
    let maxColumn = 0;
    const assignedColumns = new Set<number>();

    overlappingEvents.forEach((event) => {
      let column = 0;
      while (assignedColumns.has(column)) {
        column++;
      }
      event.column = column;
      assignedColumns.add(column);
      maxColumn = Math.max(maxColumn, column);
    });

    return { events: overlappingEvents, totalColumns: maxColumn + 1 };
  };

  // Calendar navigation functions
  const getWeekDates = (date: Date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    return Array.from({ length: 7 }, (_, i) => {
      const current = new Date(startOfWeek);
      current.setDate(startOfWeek.getDate() + i);
      return current.toISOString().split("T")[0];
    });
  };

  const weekDates = getWeekDates(new Date(currentDate));

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return {
      day: days[date.getDay()],
      date: date.getDate(),
    };
  };

  const formatSelectedDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("default", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getDefaultEndTime = (startTime: string) => {
    const [hours, minutes] = startTime.split(":").map(Number);
    let endHours = hours;
    let endMinutes = minutes + 30;

    if (endMinutes >= 60) {
      endHours += 1;
      endMinutes = 0;
    }

    return `${String(endHours).padStart(2, "0")}:${String(endMinutes).padStart(
      2,
      "0"
    )}`;
  };

  const handleTimeSlotClick = (date: string, time: string) => {
    setSelectedSlot({ date, time });
    setShowEventTypeSelect(true);
    setEventFormData({
      ...eventFormData,
      date,
      startTime: time,
      endTime: getDefaultEndTime(time),
    });
  };

  const handleEventTypeSelect = (type: string) => {
    setSelectedEventType(type);
    setShowEventTypeSelect(false);
    setEventFormData({
      ...eventFormData,
      type,
      id: Math.random().toString(36).substr(2, 9),
    });
  };

  const handleEventClick = (event: EventFormData, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingEvent(event);
    setEventFormData(event);
    setSelectedEventType(event.type);
  };

  const handleUpdateEvent = () => {
    if (editingEvent) {
      setEvents(
        events.map((event) =>
          event.id === editingEvent.id ? eventFormData : event
        )
      );
      setEditingEvent(null);
      setSelectedEventType("");
      setEventFormData({
        id: "",
        type: "",
        date: "",
        startTime: "",
        endTime: "",
      });
    }
  };

  const handleBackToEventTypes = () => {
    setSelectedEventType("");
    setShowEventTypeSelect(true);
  };

  const renderEventForm = () => {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Event Details</h3>
          <Button
            variant="ghost"
            onClick={handleBackToEventTypes}
            className="text-blue-600 hover:text-blue-700"
          >
            Change Event Type
          </Button>
        </div>

        {selectedEventType === "Appointment" ? (
          <div className="space-y-4">
            <Select
              onValueChange={(value) =>
                setEventFormData({ ...eventFormData, title: value })
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
                setEventFormData({ ...eventFormData, title: e.target.value })
              }
            />
            <Input
              placeholder="Location"
              value={eventFormData.location || ""}
              onChange={(e) =>
                setEventFormData({ ...eventFormData, location: e.target.value })
              }
            />
            <Input
              placeholder="Property"
              value={eventFormData.property || ""}
              onChange={(e) =>
                setEventFormData({ ...eventFormData, property: e.target.value })
              }
            />
            <Textarea
              placeholder="Description"
              value={eventFormData.description || ""}
              onChange={(e) =>
                setEventFormData({
                  ...eventFormData,
                  description: e.target.value,
                })
              }
            />
            <div className="flex items-center space-x-2">
              <Checkbox
                id="private"
                checked={eventFormData.isPrivate}
                onCheckedChange={(checked) =>
                  setEventFormData({
                    ...eventFormData,
                    isPrivate: checked as boolean,
                  })
                }
              />
              <label htmlFor="private">Private</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="notification"
                checked={eventFormData.notification}
                onCheckedChange={(checked) =>
                  setEventFormData({
                    ...eventFormData,
                    notification: checked as boolean,
                  })
                }
              />
              <label htmlFor="notification">Notification</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="recurring"
                checked={eventFormData.isRecurring}
                onCheckedChange={(checked) =>
                  setEventFormData({
                    ...eventFormData,
                    isRecurring: checked as boolean,
                  })
                }
              />
              <label htmlFor="recurring">Is Recurring</label>
            </div>
            {eventFormData.isRecurring && (
              <Input
                placeholder="Recurrence Pattern"
                value={eventFormData.recurrencePattern || ""}
                onChange={(e) =>
                  setEventFormData({
                    ...eventFormData,
                    recurrencePattern: e.target.value,
                  })
                }
              />
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <Input
              placeholder="Title"
              value={eventFormData.title || ""}
              onChange={(e) =>
                setEventFormData({ ...eventFormData, title: e.target.value })
              }
            />
            <Textarea
              placeholder="Description"
              value={eventFormData.description || ""}
              onChange={(e) =>
                setEventFormData({
                  ...eventFormData,
                  description: e.target.value,
                })
              }
            />
          </div>
        )}
      </div>
    );
  };

  const handleCreateEvent = () => {
    if (selectedSlot && eventFormData.type) {
      setEvents([...events, eventFormData]);
      setSelectedSlot(null);
      setSelectedEventType("");
      setEventFormData({
        id: "",
        type: "",
        date: "",
        startTime: "",
        endTime: "",
      });
    }
  };

  return (
    <Card className="p-4 w-full max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Calendar</h1>
        <div className="flex gap-4 items-center">
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              const previousWeek = new Date(currentDate);
              previousWeek.setDate(previousWeek.getDate() - 7);
              setCurrentDate(previousWeek.toISOString().split("T")[0]);
            }}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="font-semibold">
            {new Date(currentDate).toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              const nextWeek = new Date(currentDate);
              nextWeek.setDate(nextWeek.getDate() + 7);
              setCurrentDate(nextWeek.toISOString().split("T")[0]);
            }}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-8 gap-1">
        {/* Time column */}
        <div className="pt-16">
          {timeSlots.map((time) => (
            <div
              key={time}
              className="h-8 text-sm text-gray-500 pr-2 text-right"
            >
              {time.endsWith("00") ? time : ""}
            </div>
          ))}
        </div>

        {/* Days columns */}
        {weekDates.map((date) => (
          <div key={date} className="min-w-[120px]">
            <div className="text-center pb-2 pt-4 border-b">
              <div className="text-sm text-gray-500">
                {formatDate(date).day}
              </div>
              <div className="text-lg font-semibold">
                {formatDate(date).date}
              </div>
            </div>
            {timeSlots.map((time) => {
              const { events: overlappingEvents, totalColumns } =
                calculateEventColumns(events, date, time);
              return (
                <div
                  key={`${date}-${time}`}
                  className="h-8 border-b border-r relative hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleTimeSlotClick(date, time)}
                >
                  {overlappingEvents.map((event) => (
                    <div
                      key={event.id}
                      className="absolute top-0 bottom-0 bg-blue-100 border border-blue-200 p-1 text-xs overflow-hidden hover:bg-blue-200 transition-colors"
                      style={{
                        left: `${(event.column || 0) * (100 / totalColumns)}%`,
                        width: `${100 / totalColumns}%`,
                        zIndex: 10,
                      }}
                      onClick={(e) => handleEventClick(event, e)}
                    >
                      {event.title || event.type}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      {/* Event Type Selection Dialog */}

      <Dialog open={showEventTypeSelect} onOpenChange={setShowEventTypeSelect}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Event Type</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-2">
            {EVENT_TYPES.map((type) => (
              <Button
                key={type}
                variant="outline"
                onClick={() => handleEventTypeSelect(type)}
              >
                {type}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Event Creation/Editing Dialog */}
      <Dialog
        open={Boolean(selectedEventType)}
        onOpenChange={() => {
          setSelectedEventType("");
          setEditingEvent(null);
          setEventFormData({
            id: "",
            type: "",
            date: "",
            startTime: "",
            endTime: "",
          });
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingEvent ? "Edit" : "Create"} {selectedEventType}
            </DialogTitle>
            {selectedSlot && !editingEvent && (
              <div className="mt-1 text-sm text-gray-500">
                Selected Date: {formatSelectedDate(selectedSlot.date)}
              </div>
            )}
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Start Time
                </label>
                <Input
                  type="time"
                  step="1800"
                  value={eventFormData.startTime}
                  onChange={(e) => {
                    const newStartTime = e.target.value;
                    setEventFormData({
                      ...eventFormData,
                      startTime: newStartTime,
                      endTime: getDefaultEndTime(newStartTime),
                    });
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  End Time
                </label>
                <Input
                  type="time"
                  step="1800"
                  value={
                    eventFormData.endTime === "24:00"
                      ? "00:00"
                      : eventFormData.endTime
                  }
                  onChange={(e) =>
                    setEventFormData({
                      ...eventFormData,
                      endTime: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            {renderEventForm()}

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedEventType("");
                  setEditingEvent(null);
                }}
              >
                {" "}
                Cancel
              </Button>
              <Button
                onClick={editingEvent ? handleUpdateEvent : handleCreateEvent}
              >

                {editingEvent ? "Update" : "Create"} Event
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default Calendar;
