"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { deleteEvent, submitEvent, updateEvent } from "./server-action";
import EventForm from "@/app/diary/_components/EventForm";
import CalendarGrid from "../_components/CalendarGrid";
import CalendarHeader from "../_components/CalendarHeader";
import DeleteConfirmationDialog from "../_components/DeleteConfirmationDialog";
import Sidebar from "../_components/Sidebar";
import LoadingDialog from "@/components/elements/loading-spinner/LoadingSpinner";
import { ApiResponse, CalendarData,CalendarProps } from "../_types/calendarTypes";
import { EVENT_TYPES, EventFormData, EventType } from "../_types/eventTypes";
import { UserSettings } from "../_types/userTypes";

async function updateUserColor(
  data: CalendarData,
  color: string
): Promise<ApiResponse> {
  const diaryId = data.diary_id;
  const staffId = data.staff_id;
  const popupNotifiEn = data.popup_notifi_en;
  const emailNotifiEn = data.email_notifi_en;
  const updated_at = new Date().toISOString();
  const apiHost = process.env.NEXT_PUBLIC_API_HOST;
  const apiUrl = `${apiHost}/api/v1/diary-settings/${diaryId}`;
  try {
    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        diary_id: diaryId,
        staff_id: staffId,
        diary_colour: color,
        popup_notifi_en: popupNotifiEn,
        email_notifi_en: emailNotifiEn,
        updated_at: updated_at,
      }),
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error("Failed to update color");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

const Calendar: React.FC<CalendarProps> = ({ data }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{date: string; time: string;} | null>(null);
  const [showEventTypeSelect, setShowEventTypeSelect] = useState(false);
  const [selectedEventType, setSelectedEventType] = useState<EventType | "">();
  const [editingEvent, setEditingEvent] = useState<EventFormData | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<EventFormData | null>( null );
  const [monthViewDate, setMonthViewDate] = useState(new Date());
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentDate, setCurrentDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [eventFormData, setEventFormData] = useState<EventFormData>({
    id: "",
    type: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  if (!data) {
    console.log("Data is not provided");
    return null;
  }
  const [userSettings, setUserSettings] = useState<UserSettings>({
    username: data.userDetails?.name || "User",
    eventColor: data.diary_colour,
  });
  const eventData = data.events || [];

  const getStartOfWeek = (date: Date) => {
    const result = new Date(date);
    const day = result.getDay();
    const mondayBasedDay = day === 0 ? 6 : day - 1;
    result.setDate(result.getDate() - mondayBasedDay);
    return result;
  };

  const adjustTimeForDisplay = (timeString: string) => { 
    const tzOffset = new Date().getTimezoneOffset();
    const [hours, minutes] = timeString.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0);
    date.setMinutes(date.getMinutes() - tzOffset);
    return `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}`;
  };

  const [events, setEvents] = useState<EventFormData[]>(
    eventData.map((eventWrapper) => {
      const event = eventWrapper[0];
      const eventData = eventWrapper[1];

      return {
        id: event.id,
        type: event.event_type,
        title: event.title || "",
        date: event.date,
        startTime: adjustTimeForDisplay(event.start_time),
        endTime: adjustTimeForDisplay(event.end_time),
        description: event.description,
        ...(eventData?.data?.property_id && {
          property: eventData.data.property_id,
        }),
        ...(eventData?.data?.client_name && {
          clientName: eventData.data.client_name,
        }),
        ...(eventData?.data?.contact_number && {
          contactNumber: eventData.data.contact_number,
        }),
        ...(eventData?.data?.viewing_type && {
          viewingType: eventData.data.viewing_type,
        }),
        ...(eventData?.data?.notification_length && {
          notificationLength: eventData.data.notification_length,
        }),
      };
    })
  );

  const adjustTimeForStorage = (timeString: string) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0);
    date.setMinutes(date.getMinutes() + new Date().getTimezoneOffset());
    return `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}:00`;
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(monthViewDate);
    newDate.setDate(day);
    setCurrentDate(newDate.toISOString().split("T")[0]);
  };

  const handleEventDoubleClick = (
    event: EventFormData,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    setEditingEvent(event);
    setEventFormData(event);
    setSelectedEventType(event.type as EventType);
    setIsDialogOpen(true);
  };

  const timeSlots = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const minutes = i % 2 === 0 ? "00" : "30";
    return `${String(hour).padStart(2, "0")}:${minutes}`;
  });

  const getWeekDates = (dateString: string) => {
    const date = new Date(dateString);
    const startOfWeek = getStartOfWeek(date);

    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      return day.toISOString().split("T")[0];
    });
  };

  const navigateWeek = (direction: "previous" | "next") => {
    const currentDateObj = new Date(currentDate);
    const newDate = new Date(currentDateObj);
    if (direction === "previous") {
      newDate.setDate(currentDateObj.getDate() - 7);
    } else {
      newDate.setDate(currentDateObj.getDate() + 7);
    }
    setCurrentDate(newDate.toISOString().split("T")[0]);
  };

  const weekDates = getWeekDates(currentDate);
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const dayIndex = date.getDay();
    const mondayBasedIndex = dayIndex === 0 ? 6 : dayIndex - 1;
    return {
      day: days[mondayBasedIndex],
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

  const handleTimeSlotClick = (
    date: string,
    time: string,
    e: React.MouseEvent,
    existingEvents: EventFormData[]
  ) => {
    const cellElement = e.currentTarget as HTMLElement;
    const rect = cellElement.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const cellWidth = rect.width;
    const isWhitespaceClick = relativeX > cellWidth * 0.8;

    if (existingEvents.length > 0 && !isWhitespaceClick) {
      return;
    }

    setSelectedSlot({ date, time });
    setShowEventTypeSelect(true);
    setEventFormData({
      ...eventFormData,
      date,
      startTime: time,
      endTime: getDefaultEndTime(time),
    });
  };

  const handleEventTypeSelect = (type: EventType) => {
    setSelectedEventType(type);
    setShowEventTypeSelect(false);
    setEventFormData({
      ...eventFormData,
      type,
      id: Math.random().toString(36).substr(2, 9),
    });
  };

  const handleColorChange = async (color: string) => {
    try {
      await updateUserColor(data, color);
      setUserSettings({ ...userSettings, eventColor: color });
    } catch (error) {
      throw error;
    }
  };

  const handleCreateEvent = async () => {
    setIsLoading(true); 
    if (selectedSlot && eventFormData.type) {
      try {        
        const eventDataForServer = {
          ...eventFormData,
          startTime: adjustTimeForStorage(eventFormData.startTime),
          endTime: adjustTimeForStorage(eventFormData.endTime),
        };
        
        
        const response = await submitEvent(eventDataForServer);

        if (response.success) {
          setIsDialogOpen(false); 

          setEvents([...events, eventFormData]);
          setEventFormData({
            id: "",
            type: "",
            date: "",
            startTime: "",
            endTime: "",
          });
          setSelectedEventType("");
          setSelectedSlot(null);
        }
      } catch (error) {
        console.error("Error creating event:", error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    }
  };


  const handleUpdateEvent = async () => {
    if (editingEvent) {
      try {
        setIsDialogOpen(false);
        setIsLoading(true);
        const eventDataForServer = {
          ...eventFormData,
          startTime: adjustTimeForStorage(eventFormData.startTime),
          endTime: adjustTimeForStorage(eventFormData.endTime),
        };
        const response = await updateEvent(editingEvent.id, eventDataForServer);
        if (response.success) {
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
      } catch (error) {
        console.error("Error updating event:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const confirmDelete = async () => {
    if (eventToDelete) {
      try {
        setIsDeleting(true);
        const response = await deleteEvent(eventToDelete.id);
        if (response.success) {
          setEvents(events.filter((event) => event.id !== eventToDelete.id));
          setShowDeleteConfirmation(false);
          setEventToDelete(null);
          setSelectedEventType("");
          setEditingEvent(null);
          setIsDialogOpen(false);
          setEventFormData({
            id: "",
            type: "",
            date: "",
            startTime: "",
            endTime: "",
          });
        } else {
          console.error("Failed to delete event:", response.message);
        }
      } catch (error) {
        console.error("Error deleting event:", error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="flex gap-4 p-4">
      <Sidebar
        currentDate={currentDate}
        monthViewDate={monthViewDate}
        setMonthViewDate={setMonthViewDate}
        onDateSelect={handleDateClick}
        userSettings={userSettings}
        onColorChange={handleColorChange}
        data={data}
      />

      <Card className="p-4 w-full max-w-6xl mx-auto">
        <CalendarHeader
          currentDate={currentDate}
          onNavigateWeek={navigateWeek}
        />
        <CalendarGrid
          weekDates={weekDates}
          timeSlots={timeSlots}
          events={events}
          userSettings={userSettings}
          handleTimeSlotClick={handleTimeSlotClick}
          handleEventDoubleClick={handleEventDoubleClick}
          formatDate={formatDate}
        />

        {/* Event Type Selection Dialog */}
        <Dialog
          open={showEventTypeSelect}
          onOpenChange={(open) => {
            setShowEventTypeSelect(open);
            if (!open) {
              setSelectedSlot(null);
            }
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Select Event Type</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-2">
              {EVENT_TYPES.map((type) => (
                <Button
                  key={type}
                  variant="outline"
                  onClick={() => {
                    handleEventTypeSelect(type);
                    setIsDialogOpen(true);
                  }}
                >
                  {type}
                </Button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
        {/* Event Creation/Editing Dialog */}
        <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          if (!isLoading) { 
            setIsDialogOpen(open);
            if (!open) {
              setIsDialogOpen(false);
              setSelectedEventType("");
              setEditingEvent(null);
              setEventFormData({
                id: "",
                type: "",
                date: "",
                startTime: "",
                endTime: "",
              });
            }
          }
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

              <EventForm
                eventFormData={eventFormData}
                setEventFormData={setEventFormData}
                selectedEventType={selectedEventType}
              />

              <div className="flex justify-end gap-2">
                {editingEvent && (
                  <Button
                    variant="destructive"
                    onClick={() => {
                      setShowDeleteConfirmation(true);
                      setEventToDelete(editingEvent);
                    }}
                  >
                    Delete
                  </Button>
                )}
                <Button
                  onClick={editingEvent ? handleUpdateEvent : handleCreateEvent}
                  disabled={isLoading}
                >
                  {isLoading && (
                    <LoadingDialog
                      open={isLoading}
                      onOpenChange={setIsLoading}
                    />
                  )}
                  {editingEvent ? "Update" : "Create"} Event
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <DeleteConfirmationDialog
          open={showDeleteConfirmation}
          onOpenChange={setShowDeleteConfirmation}
          onConfirm={confirmDelete}
          isDeleting={isDeleting}
        />
      </Card>
    </div>
  );
};

export default Calendar;
