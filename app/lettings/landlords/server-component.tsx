// server-component.tsx
import 'server-only';
import { cookies } from "next/headers";
import { ComponentType } from 'react';

// Base user data interface
interface LandlordData {
  user_id: string;
  name: string;
  username: string;
  mob_phone: string;
  passwd: string;
  acc_level: string;
  status: string;
  a_created: string;
}

// Flexible props interface that can handle both uuid and data
interface FlexibleLandlordProps {
  uuid?: string;
  data?: LandlordData;
  [key: string]: any;
}

async function getData(): Promise<LandlordData> {
  const apiHost = process.env.API_HOST;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  
  if (!accessToken || accessToken === '' || accessToken === 'undefined') {
    return {
      user_id: '',
      name: '',
      username: '',
      mob_phone: '',
      passwd: '',
      acc_level: '',
      status: '',
      a_created: '',
    };
  }
  
  
  const apiUrl = `${apiHost}/api/v1/landlords`;

  const res = await fetch(apiUrl, {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  const data: LandlordData = await res.json();
  return data;
}

// Create a server component that can handle both cases
function createServerComponent(WrappedComponent: ComponentType<FlexibleLandlordProps>) {
  return async function ServerComponent(props: Omit<FlexibleLandlordProps, 'data'>) {
    const data = await getData();
    return <WrappedComponent {...props} data={data} />;
  };
}

export { createServerComponent, type LandlordData, type FlexibleLandlordProps };