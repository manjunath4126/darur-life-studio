import { useMemo } from 'react';
import { motion } from 'framer-motion';
import './SlotCalendar.css';

const DAY_NAMES = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

function getNext7Days() {
  const days = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push({
      date: d,
      dayName: DAY_NAMES[d.getDay()],
      dayNumber: d.getDate(),
      isToday: i === 0,
      dateStr: d.toISOString().split('T')[0], // YYYY-MM-DD for comparison
    });
  }
  return days;
}

export default function SlotCalendar({ selectedDate, onSelectDate }) {
  const days = useMemo(() => getNext7Days(), []);

  return (
    <div className="slot-calendar">
      {days.map((day, index) => {
        const isSelected = selectedDate === day.dateStr;
        return (
          <motion.button
            key={day.dateStr}
            className={`slot-calendar__day-btn${isSelected ? ' slot-calendar__day-btn--selected' : ''}`}
            onClick={() => onSelectDate(day.dateStr)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            whileTap={{ scale: 0.95 }}
            type="button"
          >
            {day.isToday && <span className="slot-calendar__today-dot" />}
            <span className="slot-calendar__day-name">{day.dayName}</span>
            <span className="slot-calendar__day-number">{day.dayNumber}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
