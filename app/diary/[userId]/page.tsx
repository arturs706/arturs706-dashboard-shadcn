import { createServerComponent } from '@/app/diary/server-component-calendar'
import Calendar from './client-component';

const DiarydWithUserData = createServerComponent(Calendar);

export default function Page() {
  return <DiarydWithUserData />;
}