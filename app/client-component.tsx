// client-component.tsx
'use client';

import { useState } from 'react';
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { UserData } from './server-component';

interface ClientComponentProps {
  data?: UserData; // Make data optional
}

export default function ClientComponent({ data }: ClientComponentProps) {
  const [count, setCount] = useState(0);

  if (!data) return null; 

  return (
    <div className="p-8">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p>You are logged in as: {data.name}</p>
          <p>Your account level is: {data.acc_level}</p>
        </CardContent>
      </Card>
      
    </div>
  );
}