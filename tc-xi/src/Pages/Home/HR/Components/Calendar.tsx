// @ts-nocheck
import { useState } from "react";
import dayjs from "dayjs";

const Calendar_employee = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const daysInMonth = currentDate.daysInMonth();
  const startDayOfWeek = currentDate.startOf("month").day();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handlePreviousMonth = () => {
    setCurrentDate(currentDate.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, "month"));
  };

  // Example event data
  const events = {
    5: [{ name: "Team Meeting", time: "10:00 AM - 11:00 AM" }],
    12: [{ name: "Project Deadline", time: "All Day" }],
    15: [
      { name: "Workshop", time: "2:00 PM - 4:00 PM" },
      { name: "Client Call", time: "5:00 PM - 6:00 PM" },
    ],
    20: [{ name: "Office Party", time: "6:00 PM - 9:00 PM" }],
  };

  const getCellContent = (day: number) => {
    const dayEvents = events[day] || [];
    return (
      <div className="flex flex-col items-center">
        <span className="text-gray-700 font-medium">{day}</span>
        {dayEvents.map((event, index) => (
          <div
            key={index}
            className="bg-blue-400 text-white rounded p-1 text-xs mt-1 w-full text-center"
          >
            {event.name}
            <br />
            <span className="text-gray-200">{event.time}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-5 bg-gray-100">
      <div className="bg-white rounded shadow p-5">
        <header className="flex justify-between items-center mb-5">
          <button
            onClick={handlePreviousMonth}
            className="px-3 py-1 bg-gray-300 rounded"
          >
            Previous
          </button>
          <h2 className="text-lg font-bold">
            {currentDate.format("YYYY MMMM")}
          </h2>
          <button
            onClick={handleNextMonth}
            className="px-3 py-1 bg-gray-300 rounded"
          >
            Next
          </button>
        </header>
        <table className="w-full text-center border-collapse border">
          <thead>
            <tr>
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <th
                  key={day}
                  className="border p-2 bg-gray-200 text-gray-700 font-medium"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: Math.ceil((daysInMonth + startDayOfWeek) / 7) }).map(
              (_, weekIndex) => (
                <tr key={weekIndex}>
                  {Array.from({ length: 7 }).map((_, dayIndex) => {
                    const day = weekIndex * 7 + dayIndex - startDayOfWeek + 1;
                    return (
                      <td
                        key={dayIndex}
                        className={`border p-2 ${
                          day > 0 && day <= daysInMonth
                            ? "bg-white"
                            : "bg-gray-100"
                        }`}
                      >
                        {day > 0 && day <= daysInMonth
                          ? getCellContent(day)
                          : ""}
                      </td>
                    );
                  })}
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Calendar_employee;
