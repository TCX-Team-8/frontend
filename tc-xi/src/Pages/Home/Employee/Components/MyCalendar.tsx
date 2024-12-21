import React, { useState } from 'react';
import Calendar, { TileClassNameFn } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './MyCalendar.css';

const MyCalendar: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date()); 

  const handleDateChange = (e: any): void => {
    setDate(e.target.value); 
  };

  
  const attendanceData: Record<string, { late: number; absent: number }> = {
    '2024-12-13': { late: 1, absent: 0 }, // Late
    '2024-12-01': { late: 0, absent: 1 }, // Absent
    '2024-12-23': { late: 0, absent: 1 }, // Absent
  };

  // Function to format date as YYYY-MM-DD
  const formatDate = ({ date }: { date: Date }): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Define the tileClassName function to apply dynamic classes
  const tileClassName: TileClassNameFn = ({ date, view } :{date: Date , view:string}) => {
    if (view === 'month') {
      const formattedDate = formatDate({ date });
      const attendance = attendanceData[formattedDate];

      // Apply styles based on attendance data
      if (attendance) {
        if (attendance.absent > 0) return 'text-red-600'; // Absent
        if (attendance.late > 0) return 'text-blue-500'; // Late
      }
    }
    return ''; // Default case, no class applied
  };

  return (
    <div className="p-4 place-content-center text-black">
      <h1 className="text-xl font-bold mb-4">Attendance Calendar</h1>

      {/* Calendar component */}
      <Calendar
        onChange={handleDateChange}
        value={date} // Use date state here
        tileClassName={tileClassName} // Apply dynamic class
      />

      {/* Legend for color explanation */}
      <div className="mt-4 flex gap-[4rem] ml-14">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-red-600"></span>
          <span>Absent</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-blue-500"></span>
          <span>En retard</span>
        </div>
      </div>
    </div>
  );
};

export default MyCalendar;
