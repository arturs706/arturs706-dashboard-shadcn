// page.tsx
import { createServerComponent } from '@/app/server-component'
import MobileNav from '@/components/elements/mobile-nav/MobileNav'

const MobileNavWithUUID = createServerComponent(MobileNav);

export default function Layout() {
  return <MobileNavWithUUID />;
}