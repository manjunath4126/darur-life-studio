import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuCalendar, LuClock, LuPlus, LuMinus, LuCheck } from 'react-icons/lu';
import SlotCalendar from './SlotCalendar.jsx';
import './SlotBooking.css';

const START_TIMES = [
  '06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
  '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM'
];

const PRICE_PER_HOUR = 150;

export default function SlotBooking() {
  const todayStr = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState(1);
  const [isBooked, setIsBooked] = useState(false);

  const totalPrice = useMemo(() => duration * PRICE_PER_HOUR, [duration]);

  const handleDateChange = (dateStr) => {
    setSelectedDate(dateStr);
    setIsBooked(false);
  };

  const handleTimeSelect = (time) => {
    setStartTime(time);
    setIsBooked(false);
  };

  const incrementDuration = () => {
    if (duration < 5) setDuration(prev => prev + 1);
  };

  const decrementDuration = () => {
    if (duration > 1) setDuration(prev => prev - 1);
  };

  const handleConfirmBooking = () => {
    if (!startTime) return;

    // Simulate saving the booking to localStorage for Dashboard page
    const newBooking = {
      id: `b-${Date.now()}`,
      date: selectedDate,
      time: `${startTime} (${duration} ${duration === 1 ? 'Hour' : 'Hours'})`,
      type: 'Swimming Booking',
      status: 'CONFIRMED',
      price: `₹${totalPrice}`,
      badgeColor: 'var(--neon-green)'
    };

    const existingBookingsStr = localStorage.getItem('darur_bookings');
    const existingBookings = existingBookingsStr ? JSON.parse(existingBookingsStr) : [];
    
    // Put new booking at the top
    localStorage.setItem('darur_bookings', JSON.stringify([newBooking, ...existingBookings]));

    setIsBooked(true);
    setTimeout(() => {
      setIsBooked(false);
      setStartTime('');
      setDuration(1);
    }, 2500);
  };

  const formatDisplayDate = (dateStr) => {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
  };

  return (
    <div className="slot-booking">
      {/* Header */}
      <div className="slot-booking__header">
        <span className="section-label">// BOOK A LANE</span>
        <h2 className="slot-booking__heading section-title">SELECT TIMING &amp; DURATION</h2>
      </div>

      {/* Calendar strip */}
      <div className="slot-booking__calendar-wrap">
        <SlotCalendar
          selectedDate={selectedDate}
          onSelectDate={handleDateChange}
        />
      </div>

      <div className="slot-booking__selection-grid">
        {/* Start Time Selector */}
        <div className="slot-booking__box brutal-card">
          <h3 className="text-mono mb-md flex items-center gap-xs">
            <LuClock /> SELECT START TIME
          </h3>
          <div className="start-times-grid">
            {START_TIMES.map((time) => (
              <button
                key={time}
                onClick={() => handleTimeSelect(time)}
                className={`brutal-btn brutal-btn--sm start-time-btn ${startTime === time ? 'brutal-btn--primary' : 'brutal-btn--ghost'}`}
                type="button"
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Duration Selector */}
        <div className="slot-booking__box brutal-card duration-box">
          <h3 className="text-mono mb-md">
            ⌛ SELECT DURATION
          </h3>
          <p className="duration-rate text-mono mb-lg">RATE: ₹{PRICE_PER_HOUR} / hour</p>
          
          <div className="duration-counter">
            <button
              onClick={decrementDuration}
              className="brutal-btn brutal-btn--sm brutal-btn--ghost counter-btn"
              type="button"
              disabled={duration <= 1}
            >
              <LuMinus />
            </button>
            <span className="duration-value text-mono">
              {duration} {duration === 1 ? 'HOUR' : 'HOURS'}
            </span>
            <button
              onClick={incrementDuration}
              className="brutal-btn brutal-btn--sm brutal-btn--ghost counter-btn"
              type="button"
              disabled={duration >= 5}
            >
              <LuPlus />
            </button>
          </div>
          
          <p className="duration-note text-sm mt-md">Max 5 hours per booking session.</p>
        </div>
      </div>

      {/* Booking Summary */}
      <AnimatePresence mode="wait">
        <motion.div
          key={startTime || 'empty'}
          className="slot-booking__summary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {startTime ? (
            <>
              <div className="slot-booking__summary-details">
                <span className="slot-booking__summary-title">Booking Details</span>
                <div className="slot-booking__summary-row">
                  <div className="slot-booking__summary-item">
                    <LuCalendar size={16} />
                    <span className="slot-booking__summary-label">Date:</span>
                    <span className="slot-booking__summary-value">
                      {formatDisplayDate(selectedDate)}
                    </span>
                  </div>
                  <div className="slot-booking__summary-item">
                    <LuClock size={16} />
                    <span className="slot-booking__summary-label">Start Time:</span>
                    <span className="slot-booking__summary-value">{startTime}</span>
                  </div>
                  <div className="slot-booking__summary-item">
                    <span>⌛</span>
                    <span className="slot-booking__summary-label">Duration:</span>
                    <span className="slot-booking__summary-value">
                      {duration} {duration === 1 ? 'Hour' : 'Hours'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="slot-booking__action-area">
                <span className="slot-booking__summary-price">₹{totalPrice}</span>
                <button 
                  onClick={handleConfirmBooking}
                  className={`brutal-btn ${isBooked ? 'brutal-btn--green' : 'brutal-btn--primary'} brutal-btn--lg`} 
                  type="button"
                  disabled={isBooked}
                >
                  {isBooked ? <span className="flex items-center gap-xs"><LuCheck /> BOOKED!</span> : 'CONFIRM & PAY'}
                </button>
              </div>
            </>
          ) : (
            <span className="slot-booking__summary-empty">
              ← Select a start time above to build your session
            </span>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

