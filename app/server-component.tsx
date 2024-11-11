// server-component.tsx
import 'server-only';
import { cookies } from "next/headers";
import { ComponentType } from 'react';

// Base user data interface
interface UserData {
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
interface FlexibleUserProps {
  uuid?: string;
  data?: UserData;
  [key: string]: any;
}

function decodeToken(token: string): Record<string, any> {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const decodedPayload = Buffer.from(base64, 'base64').toString('utf8');
  return JSON.parse(decodedPayload);
}

async function getData(): Promise<UserData> {
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
  
  
  const uuid = decodeToken(accessToken).sub;
  const apiUrl = `${apiHost}/api/v1/users/byuserid/${uuid}`;

  const res = await fetch(apiUrl, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    }
  });

  const data: UserData = await res.json();
  return data;
}

// Create a server component that can handle both cases
function createServerComponent(WrappedComponent: ComponentType<FlexibleUserProps>) {
  return async function ServerComponent(props: Omit<FlexibleUserProps, 'uuid' | 'data'>) {
    const data = await getData();
    return <WrappedComponent {...props} uuid={data.user_id} data={data} />;
  };
}

export { createServerComponent, type UserData, type FlexibleUserProps };