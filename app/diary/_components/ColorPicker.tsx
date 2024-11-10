"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ColorPickerProps } from "../_types/calendarTypes";


const ColorPicker: React.FC<ColorPickerProps> = ({
  currentColor,
  onColorChange,
  defaultColor,
}) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState(currentColor);

  const handleColorChange = async (color: string) => {
    setIsUpdating(true);
    setError(null);

    try {
      await onColorChange(color);
      setSelectedColor(color);
    } catch (err) {
      setError("Failed to update color. Please try again.");
      // Revert to previous color
      setSelectedColor(defaultColor);
    } finally {
      setIsUpdating(false);
    }
  };

  const colors = [
    "#33B3F0",
    "#ef4444",
    "#22c55e",
    "#f59e0b",
    "#6366f1",
    "#ec4899",
    "#14b8a6",
    "#8b5cf6",
    "#f97316",
    "#64748b",
  ];

  return (
    <div className="relative">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-8 h-8 p-0"
            style={{ backgroundColor: selectedColor }}
            disabled={isUpdating}
          />
        </PopoverTrigger>
        <PopoverContent className="w-40">
          <div className="grid grid-cols-5 gap-2">
            {colors.map((color) => (
              <Button
                key={color}
                className="w-6 h-6 p-0"
                style={{ backgroundColor: color }}
                onClick={() => handleColorChange(color)}
                disabled={isUpdating}
              />
            ))}
          </div>
        </PopoverContent>
      </Popover>
      {error && (
        <Alert variant="destructive" className="absolute top-full mt-2 w-48">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {isUpdating && (
        <div className="absolute top-0 left-0 w-full h-full bg-white/50 flex items-center justify-center">
          {/* Add a loading spinner component here if desired */}
        </div>
      )}
    </div>
  );
};

export default ColorPicker;