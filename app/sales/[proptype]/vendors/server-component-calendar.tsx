import { ComponentType } from 'react';
import { getData } from './server-actions';
import { ClientComponentProps, FetchParams, LandlordData } from './_types/landlords';

export function createServerComponent(
  ClientComponent: ComponentType<ClientComponentProps>
) {
  return async function ServerComponent() {
    const defaultParams: FetchParams = {
      initial_sort_by: 'name',
      initial_order: 'asc',
      initial_filter: 'active'
    };

    try {
      const initialData = await getData(defaultParams);

      async function refreshData(params: FetchParams): Promise<LandlordData[]> {
        'use server';
        return getData({
          initial_sort_by: params.initial_sort_by || defaultParams.initial_sort_by,
          initial_order: params.initial_order || defaultParams.initial_order,
          initial_filter: params.initial_filter || defaultParams.initial_filter
        });
      }

      return (
        <ClientComponent 
          refreshData={refreshData}
          initialData={initialData}
        />
      );
    } catch (error) {
      console.error('Error in server component:', error);
      return (
        <ClientComponent 
          refreshData={async () => []}
          initialData={[]}
        />
      );
    }
  };
}