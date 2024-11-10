import { Dispatch, SetStateAction } from "react";

export interface BaseEvent {
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
  
  export interface EventFormProps {
    eventFormData: EventFormData;
    setEventFormData: Dispatch<SetStateAction<EventFormData>>;
    selectedEventType?: string;
  }

  export interface EventFormData extends BaseEvent {
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
    contractor?: string;
    contactName?: string;
    phoneNumber?: string;
    staffMember?: string;
    clientName?: string;
    isUrgent?: boolean;
    isHalfDay?: boolean;
    contactNumber?: string;
    viewingType?: string;
    notificationLength?: string;
  }
  
  export const EVENT_TYPES = [
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
  ] as const;
  
  export type EventType = (typeof EVENT_TYPES)[number];
  
  export interface EventSubmissionData {
    id: string
    type: string
    title?: string
    date: string
    startTime: string
    endTime: string
    description?: string
    location?: string
    property?: string
    staff?: string[]
    additionalAttendees?: string[]
    isPrivate?: boolean
    contact?: string
    letting?: string
    notification?: boolean
    isRecurring?: boolean
    recurrencePattern?: string,
    clientName?: string,
    contactNumber?: string,
    viewingType?: string,
    notificationLength?: string
  }
  
  export interface ApiResponse {
    success: boolean
    message: string
    data?: any
  }
  