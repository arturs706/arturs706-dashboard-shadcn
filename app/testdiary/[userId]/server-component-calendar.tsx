import { ComponentType } from 'react';
import { format, startOfWeek, endOfWeek } from 'date-fns';
import { getData } from './server-actions';

export function createServerComponent(ClientComponent: ComponentType<any>) {
  return async function ServerComponent() {
    const startDate = format(startOfWeek(new Date(), { weekStartsOn: 1 }), 'yyyy-MM-dd');
    const endDate = format(endOfWeek(new Date(), { weekStartsOn: 1 }), 'yyyy-MM-dd');
    
    const initialData = await getData(startDate, endDate);
  
    const refreshData = async (start: string, end: string) => {

      'use server';
      console.log(start, end);
      return getData(start, end);
    };

    return <ClientComponent refreshData={refreshData} initialData={initialData} />;
  };
}