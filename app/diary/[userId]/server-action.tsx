'use server'

import { revalidatePath } from 'next/cache'
import { ApiResponse, EventSubmissionData } from '../_types/eventTypes';

export async function submitEvent(data: EventSubmissionData): Promise<ApiResponse> {
  try {
    const API_ENDPOINT = 'http://localhost:10000/api/v1/events';

    const formattedData = {
      event: {
        external_id: data.id,
        event_type: data.type,
        date: data.date,
        start_time: data.startTime,
        end_time: data.endTime,
        title: data.title || null,
        created_by: "ab322572-3331-46a2-bbdf-b69165fe88fe",
        description: data.description || 'No Notes',
      },
      details: {
        event_type: data.type,
        data: {
          property_id: data.property,
          client_name: data.clientName,
          contact_number: data.contactNumber,
          viewing_type: data.viewingType,
          notification_length: data.notificationLength,
        },
      },
    };

    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedData),
    });
    const result: ApiResponse = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to create event');
    }

    revalidatePath('/calendar');
    
    return {
      success: true,
      message: 'Event created successfully',
      data: result.data,
    };
  } catch (error) {
    console.error('Error submitting event:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to create event',
    };
  }
}

export async function updateEvent(eventId: string, data: Partial<EventSubmissionData>): Promise<ApiResponse> {
  try {
    
    const API_ENDPOINT = `https://api.example.com/v1/events/${eventId}`;
    
    
    const response: ApiResponse = {
      success: true,
      message: 'Event updated successfully',
      data: {
        id: eventId,
        ...data,
        updatedAt: new Date().toISOString()
      }
    };

    revalidatePath('/calendar');
    
    return response;
  } catch (error) {
    console.error('Error updating event:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to update event'
    };
  }
}

export async function deleteEvent(eventId: string): Promise<ApiResponse> {
  try {    
    const API_ENDPOINT = `https://api.example.com/v1/events/${eventId}`;
    
    console.log('Deleting event:', eventId);
    
    const response: ApiResponse = {
      success: true,
      message: 'Event deleted successfully'
    };

    revalidatePath('/calendar');
    
    return response;
  } catch (error) {
    console.error('Error deleting event:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to delete event'
    };
  }
}