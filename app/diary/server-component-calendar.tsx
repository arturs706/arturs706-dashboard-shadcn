import 'server-only';
import { cookies } from "next/headers";
import { ComponentType } from 'react';

interface FlexibleUserProps {
  uuid?: string;
  data?: any,
  [key: string]: any;
}

function decodeToken(token: string): Record<string, any> {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const decodedPayload = Buffer.from(base64, 'base64').toString('utf8');
  return JSON.parse(decodedPayload);
}

async function getData(): Promise<{ user_id: string; [key: string]: any }> {
    const apiHost = process.env.API_HOST;
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;
    
    if (!accessToken || accessToken === '' || accessToken === 'undefined') {
      return { user_id: '' };
    }
    
    const uuid = decodeToken(accessToken).sub;
    const apiUrl = `${apiHost}/api/v1/diary-settings/${uuid}`;
    const userNameUrl = `${apiHost}/api/v1/users/${uuid}`;
    const eventUrl = `${apiHost}/api/v1/events/users/${uuid}`;
  

    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };
  
    const [diarySettingsRes, userRes, eventRes] = await Promise.all([
      fetch(apiUrl, { headers }),
      fetch(userNameUrl, { headers }),
      fetch(eventUrl, { headers })
    ]);

  
    if (!diarySettingsRes.ok || !userRes.ok) {
      throw new Error("Failed to fetch data");
    }
  
    const diarySettings = await diarySettingsRes.json();
    const userDetails = await userRes.json();
    const events = await eventRes.json();
  
    return {
      ...diarySettings,
      userDetails,
      events,
    };
  }
  
function createServerComponent(WrappedComponent: ComponentType<FlexibleUserProps>) {
  return async function ServerComponent(props: Omit<FlexibleUserProps, 'uuid' | 'data'>) {
    const data = await getData();
    return <WrappedComponent {...props} uuid={data.user_id} data={data} />;
  };
}

export { createServerComponent, type FlexibleUserProps };