import { createServerComponent } from './server-component';
import ClientComponent from './client-component';

const DashboardWithUserData = createServerComponent(ClientComponent);

export default function Page() {
  return <DashboardWithUserData />;
}