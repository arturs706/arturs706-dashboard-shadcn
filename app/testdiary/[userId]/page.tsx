import { Suspense } from "react";
import { createServerComponent } from "./server-component-calendar";
import Calendar from "./client-component";

export default function Page() {
  const DiaryWithUserData = createServerComponent(Calendar);
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DiaryWithUserData />
    </Suspense>
  );
}