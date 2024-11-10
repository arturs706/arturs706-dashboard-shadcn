// page.tsx
import { createServerComponent } from '@/app/server-component'
import Nav from '@/components/elements/nav/Nav'

const NavWithUUID = createServerComponent(Nav);

export default function Layout() {
  return <NavWithUUID />;
}