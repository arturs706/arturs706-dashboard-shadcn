import React from 'react';
import { CalendarGridProps } from '../_types/calendarTypes';
import { EventFormData } from '../_types/eventTypes';

const CalendarGrid: React.FC<CalendarGridProps> = ({
  weekDates,
  timeSlots,
  events,
  userSettings,
  handleTimeSlotClick,
  handleEventDoubleClick,
  formatDate,
}) => {
  const calculateEventColumns = (
    events: EventFormData[],
    date: string,
    time: string
  ) => {
    const overlappingEvents = events.filter(
      (event) =>
        event.date === date && event.startTime <= time && event.endTime > time
    );

    overlappingEvents.sort((a, b) => a.startTime.localeCompare(b.startTime));

    let maxColumn = 0;
    const assignedColumns = new Set<number>();

    overlappingEvents.forEach((event) => {
      let column = 0;
      while (assignedColumns.has(column)) {
        column++;
      }
      event.column = column;
      assignedColumns.add(column);
      maxColumn = Math.max(maxColumn, column);
    });

    return { events: overlappingEvents, totalColumns: maxColumn + 1 };
  };

  const renderEventInCell = (
    event: EventFormData,
    totalColumns: number,
    isLastEvent: boolean
  ) => {
    return (
      <div
        key={event.id}
        className="absolute top-0 bottom-0 border p-1 text-xs overflow-hidden cursor-pointer"
        style={{
          left: `${(event.column || 0) * (100 / totalColumns)}%`,
          width: isLastEvent
            ? `${(100 / totalColumns) * 0.8}%`
            : `${100 / totalColumns}%`,
          backgroundColor: `${userSettings.eventColor}20`,
          borderColor: userSettings.eventColor,
          zIndex: 10,
        }}
        onDoubleClick={(e) => handleEventDoubleClick(event, e)}
      >
        <div className="flex justify-between items-start h-full">
          <span className="truncate flex-1">{event.title || event.type}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-8 gap-1">
      <div className="pt-16">
        {timeSlots.map((time) => (
          <div key={time} className="h-8 text-sm text-gray-500 pr-2 text-right">
            {time.endsWith("00") ? time : ""}
          </div>
        ))}
      </div>

      {weekDates.map((date) => (
        <div key={date} className="min-w-[120px]">
          <div className="text-center pb-2 pt-4 border-b">
            <div className="text-sm text-gray-500">{formatDate(date).day}</div>
            <div className="text-lg font-semibold">{formatDate(date).date}</div>
          </div>
          {timeSlots.map((time) => {
            const { events: overlappingEvents, totalColumns } = calculateEventColumns(
              events,
              date,
              time
            );
            return (
              <div
                key={`${date}-${time}`}
                className="h-8 border-b border-r relative hover:bg-gray-50 cursor-pointer"
                onClick={(e) => handleTimeSlotClick(date, time, e, overlappingEvents)}
              >
                {overlappingEvents.map((event, index) =>
                  renderEventInCell(
                    event,
                    totalColumns,
                    index === overlappingEvents.length - 1
                  )
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default CalendarGrid;