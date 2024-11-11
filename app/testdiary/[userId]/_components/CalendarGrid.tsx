import React, { useState } from "react";
import { CalendarEvent, CalendarProps } from "../_types/calendar";
import {
  CustomModal
} from "@/components/elements/custom-dialog/custom-dialog";
import EventForm from "./EventForm";

interface GridRowProps {
  borderColor: string;
  rowIndex: number;
  onCellClick: (row: number, col: number) => void;
}

const CalendarGrid = ({ initialData, refreshData }: CalendarProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [selectedCol, setSelectedCol] = useState<number | null>(null);



  const GridRow = ({ borderColor, rowIndex, onCellClick }: GridRowProps) => (
    <div
      className={`grid grid-cols-7 grid-rows-1 border-b ${borderColor} gap-0 w-full`}
    >
      {Array.from({ length: 7 }).map((_, colIndex) => (
        <div
          key={colIndex}
          className={`h-6 w-full ${
            colIndex === 0 ? "" : "border-l border-gray-150"
          } hover:bg-gray-100 cursor-pointer`}
          onClick={() => onCellClick(rowIndex, colIndex)}
        >
          {/* Grid text goes here */}
        </div>
      ))}
    </div>
  );

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    setSelectedRow(rowIndex);
    setSelectedCol(colIndex);
    setModalMessage(`You clicked on cell at Row: ${rowIndex}, Column: ${colIndex}`);
    setIsModalOpen(true);
    console.log(`You clicked on cell at Row: ${rowIndex}, Column: ${colIndex}`);
  };

  const handleEventSubmit = (eventData: CalendarEvent) => {
    console.log(eventData);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div>
        {Array.from({ length: 48 }).map((_, rowIndex) => (
          <GridRow
            key={rowIndex}
            rowIndex={rowIndex}
            onCellClick={handleCellClick}
            borderColor={
              rowIndex === 47
                ? "transparent"
                : rowIndex % 2 === 0
                ? "border-gray-100"
                : "border-gray-300"
            }
          />
        ))}
      </div>
      <CustomModal open={isModalOpen} onOpenChange={setIsModalOpen}>
        <EventForm rowIndex={selectedRow} colIndex={selectedCol}/>
      </CustomModal>
    </div>
  );
};

export default CalendarGrid;
