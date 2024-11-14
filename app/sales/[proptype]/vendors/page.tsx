import { Suspense } from "react";
import { createServerComponent } from "./server-component-calendar";
import Landlords from "./client-component";

export default function Page() {
  const LandlordsWithData = createServerComponent(Landlords);
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LandlordsWithData />
    </Suspense>
  );
}