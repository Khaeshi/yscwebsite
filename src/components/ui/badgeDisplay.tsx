// BadgeDisplay.tsx
import React from 'react';
import { Badge } from "./badge";

interface BadgeDisplayProps {
  color: string;
  age: string;
  duration: string;
}

export function BadgeDisplay({ color, age, duration }: BadgeDisplayProps) {
  return (
    <div className="bottom-6 left-6 right-6 py-2">
      <div className="flex gap-3 flex-wrap">
        <Badge className={`${color} text-white border-0`}>
          {age}
        </Badge>
        <Badge className={`${color} text-white border-0`}>
          {duration}
        </Badge>
      </div>
    </div>
  );
}