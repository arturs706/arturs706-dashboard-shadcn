'use server'

import { FetchParams, LandlordData, SortField, SortOrder, StatusFilter } from "./_types/landlords";

export async function getData({
  initial_sort_by = 'name',
  initial_order = 'asc',
  initial_filter = 'all'
}: FetchParams = {}): Promise<LandlordData[]> {
  const apiHost = process.env.API_HOST;
  
  if (!apiHost) {
    throw new Error('API_HOST environment variable is not set');
  }

  const apiUrl = `${apiHost}/api/v1/landlords`;
  const queryParams = new URLSearchParams();

  if (initial_sort_by) {
    const validSortFields: SortField[] = ['name', 'created_at', 'updated_at', 'email', 'phone_nr'];
    if (validSortFields.includes(initial_sort_by as SortField)) {
      queryParams.append('sort_by', initial_sort_by);
    }
  }

  if (initial_order) {
    const validOrders: SortOrder[] = ['asc', 'desc'];
    if (validOrders.includes(initial_order.toLowerCase() as SortOrder)) {
      queryParams.append('order', initial_order.toLowerCase());
    }
  }

  if (initial_filter) {
    const validStatuses: StatusFilter[] = ['active', 'inactive', 'all'];
    if (validStatuses.includes(initial_filter.toLowerCase() as StatusFilter)) {
      queryParams.append('status', initial_filter.toLowerCase());
    }
  }

  const fullUrl = `${apiUrl}?${queryParams.toString()}`;

  try {
    const response = await fetch(fullUrl, {
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        `API request failed: ${response.status} ${response.statusText}${
          errorData ? ` - ${JSON.stringify(errorData)}` : ''
        }`
      );
    }

    const data: LandlordData[] = await response.json();
    return data; // Now correctly returns LandlordData[]
  } catch (error) {
    console.error('Error fetching landlord data:', error);
    throw new Error(
      `Failed to fetch landlord data: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}