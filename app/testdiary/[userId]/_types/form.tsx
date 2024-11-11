const EVENT_TYPES = [
  "Appointment",
  "Inspection",
  "Maintenance",
  "Note",
  "Callback",
  "Public Holiday",
  "Sick Leave",
  "Staff Holiday",
  "Staff Meeting",
  "Training",
  "Valuation",
  "Viewing",
] as const;

interface BaseEventData {
  eventType: (typeof EVENT_TYPES)[number];
  startTime: string;
  endTime: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ViewingData extends BaseEventData {
  eventType: "Viewing";
  property?: string;
  staff?: string[];
  viewingStatus?: string;
  isSecondViewing?: boolean;
  isVirtualViewing?: boolean;
  arrangements?: string;
  feedback?: string;
  internalNotes?: string;
  followUpDate?: string;
  isClosed?: boolean;
  sendNotification?: boolean;
}

export interface StaffMember {
  user_id: string;
  name: string;
}

export interface Property {
  id: string;
  address: string;
  reference?: string;
}

interface AppointmentData extends BaseEventData {
  eventType: "Appointment";
  appointmentType?: string;
  title?: string;
  location?: string;
  property?: string;
  description?: string;
  staff?: string[];
  additionalAttendees?: string[];
  isPrivate?: boolean;
  sendNotification?: boolean;
  isRecurring?: boolean;
  recurrencePattern?: string;
}

interface CallbackData extends BaseEventData {
  eventType: "Callback";
  contact?: string;
  description?: string;
  staff?: string[];
  sendNotification?: boolean;
}

interface InspectionData extends BaseEventData {
  eventType: "Inspection";
  inspectionType?:
    | "Periodic"
    | "Pre-Tenancy"
    | "Post-Tenancy"
    | "Property Check"
    | "Maintenance Check";
  letting?: string;
  inspectionStatus?:
    | "Scheduled"
    | "In Progress"
    | "Completed"
    | "Cancelled"
    | "Rescheduled";
  staffInspectors?: string[];
  supplierInspector?: string;
  officeNotes?: string;
  tenantConfirmed?: boolean;
  sendNotification?: boolean;
}

interface MaintenanceData extends BaseEventData {
  eventType: "Maintenance";
  maintenanceType?:
    | "Routine"
    | "Emergency"
    | "Preventive"
    | "Corrective"
    | "Scheduled";
  maintenanceJob?: string;
  staff?: string[];
  maintenanceStatus?:
    | "Scheduled"
    | "In Progress"
    | "Completed"
    | "Cancelled"
    | "Rescheduled";
  property?: string;
  description?: string;
  supplierAssigned?: string;
  estimatedCost?: number;
  actualCost?: number;
  priority?: "Low" | "Medium" | "High" | "Urgent";
  completionNotes?: string;
  sendNotification?: boolean;
}

interface NoteData extends BaseEventData {
  eventType: "Note";
  noteType?: "General" | "Meeting" | "Follow-up" | "Reminder" | "Important";
  note?: string;
  staff?: string[];
  isPrivate?: boolean;
  sendNotification?: boolean;
  isRecurring?: boolean;
  recurrencePattern?: string;
}

interface PublicHolidayData extends BaseEventData {
  eventType: "Public Holiday";
  holidayName?: string;
  description?: string;
  isNationwide?: boolean;
  region?: string;
  affectedServices?: string[];
  isAnnualRecurring?: boolean;
  officeStatus?: "Closed" | "Limited Hours" | "Open";
  staffRequired?: string[];
  alternativeArrangements?: string;
  sendNotification?: boolean;
}

interface SickLeaveData extends BaseEventData {
  eventType: "Sick Leave";
  leaveType?: "sick" | "medical";
  title?: string;
  description?: string;
  sendNotification?: boolean;
  isRecurring?: boolean;
  recurrencePattern?: "daily" | "weekly" | "monthly";
}

interface StaffHolidayData extends BaseEventData {
  eventType: "Staff Holiday";
  holidayType?: "annual" | "unpaid" | "compassionate" | "other";
  title?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  sendNotification?: boolean;
  isRecurring?: boolean;
  recurrencePattern?: string;
}

interface StaffMeetingData extends BaseEventData {
  eventType: "Staff Meeting";
  title?: string;
  meetingType?:
    | "Team Meeting"
    | "Department Meeting"
    | "All Staff Meeting"
    | "Training Session"
    | "Strategy Meeting"
    | "Performance Review"
    | "Other";
  location?: string;
  agenda?: string;
  internalNotes?: string;
  staff?: string[];
  sendNotification?: boolean;
}

interface TrainingData extends BaseEventData {
  eventType: "Training";
  trainingType?: "internal" | "external" | "online";
  title?: string;
  location?: string;
  description?: string;
  leadStaff?: string;
  additionalAttendees?: string;
  sendNotification?: boolean;
  isRecurring?: boolean;
  recurrencePattern?: string;
}

interface ValuationData extends BaseEventData {
  eventType: "Valuation";
  propertyOwner?: string;
  location?: string;
  staff?: string[];
  instructionStatus?:
    | "Awaiting Instruction"
    | "Instructed"
    | "On Hold"
    | "Withdrawn"
    | "Inactive";
  followUpDate?: string;
  notes?: string;
  title?: string;
  sendNotification?: boolean;
}

type EventFormData =
  | ViewingData
  | AppointmentData
  | CallbackData
  | InspectionData
  | MaintenanceData
  | NoteData
  | PublicHolidayData
  | SickLeaveData
  | StaffHolidayData
  | StaffMeetingData
  | TrainingData
  | ValuationData;

const isViewingData = (data: EventFormData): data is ViewingData => {
  return data.eventType === "Viewing";
};

const isAppointmentData = (data: EventFormData): data is AppointmentData => {
  return data.eventType === "Appointment";
};

const isCallbackData = (data: EventFormData): data is CallbackData => {
  return data.eventType === "Callback";
};

const isInspectionData = (data: EventFormData): data is InspectionData => {
  return data.eventType === "Inspection";
};

const isMaintenanceData = (data: EventFormData): data is MaintenanceData => {
  return data.eventType === "Maintenance";
};

const isNoteData = (data: EventFormData): data is NoteData => {
  return data.eventType === "Note";
};

const isPublicHolidayData = (
  data: EventFormData
): data is PublicHolidayData => {
  return data.eventType === "Public Holiday";
};

const isSickLeaveData = (data: EventFormData): data is SickLeaveData => {
  return data.eventType === "Sick Leave";
};

const isStaffHolidayData = (data: EventFormData): data is StaffHolidayData => {
  return data.eventType === "Staff Holiday";
};

const isStaffMeetingData = (data: EventFormData): data is StaffMeetingData => {
  return data.eventType === "Staff Meeting";
};

const isTrainingData = (data: EventFormData): data is TrainingData => {
  return data.eventType === "Training";
};

const isValuationData = (data: EventFormData): data is ValuationData => {
  return data.eventType === "Valuation";
};

const createInitialViewingData = (): ViewingData => ({
  eventType: "Viewing",
  startTime: "",
  endTime: "",
  property: "",
  staff: [],
  viewingStatus: "Scheduled",
  isSecondViewing: false,
  isVirtualViewing: false,
  isClosed: false,
  sendNotification: false,
  followUpDate: "",
});

const createInitialAppointmentData = (): AppointmentData => ({
  eventType: "Appointment",
  startTime: "",
  endTime: "",
  appointmentType: "",
  title: "",
  staff: [],
  isPrivate: false,
  sendNotification: false,
  isRecurring: false,
});

const createInitialCallbackData = (): CallbackData => ({
  eventType: "Callback",
  startTime: "",
  endTime: "",
  contact: "",
  staff: [],
  sendNotification: false,
});

const createInitialInspectionData = (): InspectionData => ({
  eventType: "Inspection",
  startTime: "",
  endTime: "",
  inspectionType: "Periodic",
  staffInspectors: [],
  tenantConfirmed: false,
  sendNotification: false,
});

const createInitialMaintenanceData = (): MaintenanceData => ({
  eventType: "Maintenance",
  startTime: "",
  endTime: "",
  maintenanceType: "Routine",
  staff: [],
  priority: "Medium",
  sendNotification: false,
});

const createInitialNoteData = (): NoteData => ({
  eventType: "Note",
  startTime: "",
  endTime: "",
  noteType: "General",
  staff: [],
  isPrivate: false,
  sendNotification: false,
  isRecurring: false,
});

const createInitialPublicHolidayData = (): PublicHolidayData => ({
  eventType: "Public Holiday",
  startTime: "",
  endTime: "",
  isNationwide: true,
  officeStatus: "Closed",
  sendNotification: false,
});

const createInitialSickLeaveData = (): SickLeaveData => ({
  eventType: "Sick Leave",
  startTime: "",
  endTime: "",
  leaveType: "sick",
  sendNotification: false,
  isRecurring: false,
});

const createInitialStaffHolidayData = (): StaffHolidayData => ({
  eventType: "Staff Holiday",
  startTime: "",
  endTime: "",
  holidayType: "annual",
  sendNotification: false,
  isRecurring: false,
});

const createInitialStaffMeetingData = (): StaffMeetingData => ({
  eventType: "Staff Meeting",
  startTime: "",
  endTime: "",
  meetingType: "Team Meeting",
  staff: [],
  sendNotification: false,
});

const createInitialTrainingData = (): TrainingData => ({
  eventType: "Training",
  startTime: "",
  endTime: "",
  trainingType: "internal",
  sendNotification: false,
  isRecurring: false,
});

const createInitialValuationData = (): ValuationData => ({
  eventType: "Valuation",
  startTime: "",
  endTime: "",
  staff: [],
  instructionStatus: "Awaiting Instruction",
  sendNotification: false,
});

const createInitialEventData = (
  eventType: (typeof EVENT_TYPES)[number]
): EventFormData => {
  switch (eventType) {
    case "Viewing":
      return createInitialViewingData();
    case "Appointment":
      return createInitialAppointmentData();
    case "Callback":
      return createInitialCallbackData();
    case "Inspection":
      return createInitialInspectionData();
    case "Maintenance":
      return createInitialMaintenanceData();
    case "Note":
      return createInitialNoteData();
    case "Public Holiday":
      return createInitialPublicHolidayData();
    case "Sick Leave":
      return createInitialSickLeaveData();
    case "Staff Holiday":
      return createInitialStaffHolidayData();
    case "Staff Meeting":
      return createInitialStaffMeetingData();
    case "Training":
      return createInitialTrainingData();
    case "Valuation":
      return createInitialValuationData();
    default:
      throw new Error(`Unsupported event type: ${eventType}`);
  }
};

const validateViewingData = (data: ViewingData): boolean => {
  return !!(
    data.property &&
    data.staff?.length &&
    data.startTime &&
    data.endTime
  );
};

const validateAppointmentData = (data: AppointmentData): boolean => {
  return !!(
    data.title &&
    data.appointmentType &&
    data.staff?.length &&
    data.startTime &&
    data.endTime
  );
};

const validateCallbackData = (data: CallbackData): boolean => {
  return !!(
    data.contact &&
    data.description &&
    data.staff?.length &&
    data.startTime &&
    data.endTime
  );
};

const validateInspectionData = (data: InspectionData): boolean => {
  return !!(
    data.inspectionType &&
    data.staffInspectors?.length &&
    data.startTime &&
    data.endTime
  );
};

const validateMaintenanceData = (data: MaintenanceData): boolean => {
  return !!(
    data.maintenanceType &&
    data.startTime &&
    data.endTime &&
    data.property &&
    data.staff?.length
  );
};

const validateNoteData = (data: NoteData): boolean => {
  return !!(data.noteType && data.note && data.startTime && data.endTime);
};

const validatePublicHolidayData = (data: PublicHolidayData): boolean => {
  return !!(data.holidayName && data.startTime && data.endTime);
};

const validateSickLeaveData = (data: SickLeaveData): boolean => {
  return !!(data.title && data.startTime && data.endTime);
};

const validateStaffHolidayData = (data: StaffHolidayData): boolean => {
  return !!(data.holidayType && data.startTime && data.endTime);
};

const validateStaffMeetingData = (data: StaffMeetingData): boolean => {
  return !!(
    data.title &&
    data.meetingType &&
    data.staff?.length &&
    data.startTime &&
    data.endTime
  );
};

const validateTrainingData = (data: TrainingData): boolean => {
  return !!(data.title && data.trainingType && data.startTime && data.endTime);
};

const validateValuationData = (data: ValuationData): boolean => {
  return !!(
    data.propertyOwner &&
    data.location &&
    data.staff?.length &&
    data.startTime &&
    data.endTime
  );
};

const validateEventData = (data: EventFormData): boolean => {
  if (!data || !("eventType" in data)) {
    throw new Error(`Invalid event data`);
  }

  switch (data.eventType) {
    case "Viewing":
      return validateViewingData(data as ViewingData);
    case "Appointment":
      return validateAppointmentData(data as AppointmentData);
    case "Callback":
      return validateCallbackData(data as CallbackData);
    case "Inspection":
      return validateInspectionData(data as InspectionData);
    case "Maintenance":
      return validateMaintenanceData(data as MaintenanceData);
    case "Note":
      return validateNoteData(data as NoteData);
    case "Public Holiday":
      return validatePublicHolidayData(data as PublicHolidayData);
    case "Sick Leave":
      return validateSickLeaveData(data as SickLeaveData);
    case "Staff Holiday":
      return validateStaffHolidayData(data as StaffHolidayData);
    case "Staff Meeting":
      return validateStaffMeetingData(data as StaffMeetingData);
    case "Training":
      return validateTrainingData(data as TrainingData);
    case "Valuation":
      return validateValuationData(data as ValuationData);
    default:
      throw new Error(`Unsupported event type`);
  }
};

export {
  type EventFormData,
  type ViewingData,
  type AppointmentData,
  type CallbackData,
  type InspectionData,
  type MaintenanceData,
  type NoteData,
  type PublicHolidayData,
  type SickLeaveData,
  type StaffHolidayData,
  type StaffMeetingData,
  type TrainingData,
  type ValuationData,
  EVENT_TYPES,
  createInitialEventData,
  validateEventData,
  isViewingData,
  isAppointmentData,
  isCallbackData,
  isInspectionData,
  isMaintenanceData,
  isNoteData,
  isPublicHolidayData,
  isSickLeaveData,
  isStaffHolidayData,
  isStaffMeetingData,
  isTrainingData,
  isValuationData,
  createInitialViewingData,
  createInitialAppointmentData,
  createInitialCallbackData,
  createInitialInspectionData,
  createInitialMaintenanceData,
  createInitialNoteData,
  createInitialPublicHolidayData,
  createInitialSickLeaveData,
  createInitialStaffHolidayData,
  createInitialStaffMeetingData,
  createInitialTrainingData,
  createInitialValuationData,
  validateViewingData,
  validateAppointmentData,
  validateCallbackData,
  validateInspectionData,
  validateMaintenanceData,
  validateNoteData,
  validatePublicHolidayData,
  validateSickLeaveData,
  validateStaffHolidayData,
  validateStaffMeetingData,
  validateTrainingData,
  validateValuationData,
};
