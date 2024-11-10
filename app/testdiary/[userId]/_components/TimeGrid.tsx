import React from 'react';

const TimeGrid = () => {
  const timeSlots = [];
  for (let hour = 0; hour <= 24; hour++) {
    const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
    timeSlots.push(`${formattedHour}:00`);
  }

  return (
    <div>
      <ul className='flex flex-col h-full justify-between py-1 pr-5'>
        {timeSlots.map((time, index) => (
          <li key={index} className='text-center text-sm'>
            <div>{time}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimeGrid;
