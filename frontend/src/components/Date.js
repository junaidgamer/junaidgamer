import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css'; // Import the styles

const Date = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <Date
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy" // Customize date format if needed
      />
    </div>
  );
};

export default Date;
