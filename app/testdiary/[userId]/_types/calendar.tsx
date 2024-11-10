export interface CalendarData {
    diary_id: string
    staff_id: string
    diary_colour: string
    popup_notifi_en: boolean
    email_notifi_en: boolean
    updated_at: string
    userDetails: UserDetails
    events: Event[][]
  }
  
  export interface UserDetails {
    user_id: string
    name: string
    username: string
    mob_phone: string
    passwd: string
    acc_level: string
    status: string
    a_created: string
  }
  
  export interface CalendarEvent {
    id?: string
    external_id?: string
    event_type: string
    date?: string
    start_time?: string
    end_time?: string
    title?: string
    description?: string
    created_by?: string
    created_at?: string
    updated_at?: string
    data?: Data
  }
  
  export interface Data {
    location?: string
    property_id?: string
    is_private?: boolean
    notification?: boolean
    is_recurring?: boolean
    recurrence_pattern?: string
    contractor?: string
    staff_member?: string
    holiday_type?: string
    is_half_day?: boolean
    is_urgent?: boolean
    approval_status?: string
    contact_number?: string
    approved_by: any
    approval_date: any
    remaining_days?: number
    training_title?: string
    lead_staff?: string
    attendees?: string[]
    additional_attendees?: any[]
    training_type?: string
    training_status?: string
    materials_url: any
    prerequisites?: string
    attendance_confirmed?: boolean
    certificates_issued?: boolean
    note_type?: string
    assigned_staff?: string[]
    category?: string
    priority?: string
    related_entity_type?: string
    related_entity_id?: string
    status?: string
    client_name?: string
    completion_date: any
    completed_by: any
    contact_name?: string
    phone_number?: string
    viewing_status?: string
    is_second_viewing?: boolean
  }
  

  export interface CalendarProps {
    refreshData: (start: string, end: string) => Promise<any>;
    initialData: CalendarData;
  }