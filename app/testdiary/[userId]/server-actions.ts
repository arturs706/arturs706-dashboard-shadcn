'use server'

import { cookies } from "next/headers";

export async function getData(startDate: string, endDate: string) {
  const apiHost = process.env.API_HOST;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken || accessToken === '' || accessToken === 'undefined') {
    return { user_id: '' };
  }
  const uuid = decodeToken(accessToken).sub;
  const apiUrl = `${apiHost}/api/v1/diary-settings/${uuid}`;
  const userNameUrl = `${apiHost}/api/v1/users/${uuid}`;
  const eventUrl = `${apiHost}/api/v1/events/diary/${uuid}/events?start_date=${startDate}&end_date=${endDate}`;

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

function decodeToken(token: string): Record<string, any> {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const decodedPayload = Buffer.from(base64, 'base64').toString('utf8');
  return JSON.parse(decodedPayload);
}