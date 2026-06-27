import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuCalendar, LuClock, LuCheck } from 'react-icons/lu';
import SlotCalendar from './SlotCalendar.jsx';
import './SlotBooking.css';

const PRICE_PER_HOUR = 150;

export default function SlotBooking() {
  const todayStr = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  const handleDateChange = (dateStr) => {
    setSelectedDate(dateStr);
    setIsBooked(false);
  };

  // Convert "HH:MM" 24h to minutes
  const parseTimeToMinutes = (timeStr) => {
    if (!timeStr) return 0;
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
  };

  const startMins = useMemo(() => parseTimeToMinutes(startTime), [startTime]);
  const endMins = useMemo(() => parseTimeToMinutes(endTime), [endTime]);

  const durationMins = useMemo(() => {
    if (!startTime || !endTime) return 0;
    return endMins - startMins;
  }, [startTime, endTime, startMins, endMins]);

  const isValid = useMemo(() => {
    return startTime && endTime && durationMins > 0;
  }, [startTime, endTime, durationMins]);

  const totalPrice = useMemo(() => {
    if (!isValid) return 0;
    const hours = durationMins / 60;
    return Math.round(hours * PRICE_PER_HOUR);
  }, [isValid, durationMins]);

  // Convert "15:30" to "03:30 PM"
  const format12Hour = (time24) => {
    if (!time24) return '';
    let [h, m] = time24.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    const mStr = m.toString().padStart(2, '0');
    return `${h.toString().padStart(2, '0')}:${mStr} ${ampm}`;
  };

  // Format total minutes to readable text (e.g. "1 Hr 30 Mins")
  const formatDurationText = (mins) => {
    if (mins <= 0) return '';
    const hrs = Math.floor(mins / 60);
    const m = mins % 60;
    const hrsText = hrs > 0 ? `${hrs} Hr${hrs > 1 ? 's' : ''}` : '';
    const minsText = m > 0 ? `${m} Min${m > 1 ? 's' : ''}` : '';
    return `${hrsText} ${minsText}`.trim();
  };

  const handleConfirmBooking = () => {
    if (!isValid) return;

    // Simulate saving the booking to localStorage for Dashboard page
    const newBooking = {
      id: `b-${Date.now()}`,
      date: selectedDate,
      time: `${format12Hour(startTime)} to ${format12Hour(endTime)} (${formatDurationText(durationMins)})`,
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
      setEndTime('');
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
        <h2 className="slot-booking__heading section-title">BUILD YOUR LANE SESSION</h2>
      </div>

      {/* Calendar strip */}
      <div className="slot-booking__calendar-wrap">
        <SlotCalendar
          selectedDate={selectedDate}
          onSelectDate={handleDateChange}
        />
      </div>

      <div className="slot-booking__selection-grid">
        {/* Precise Time Pickers */}
        <div className="slot-booking__box brutal-card time-pickers-box">
          <h3 className="text-mono mb-md flex items-center gap-xs">
            <LuClock /> CHOOSE EXACT TIMING
          </h3>
          
          <div className="time-inputs-container">
            <div className="time-input-group">
              <label htmlFor="startTime">START TIME</label>
              <input
                type="time"
                id="startTime"
                value={startTime}
                onChange={(e) => { setStartTime(e.target.value); setIsBooked(false); }}
                className="brutal-input brutal-time-picker"
                required
              />
            </div>
            
            <div className="time-input-group">
              <label htmlFor="endTime">END TIME</label>
              <input
                type="time"
                id="endTime"
                value={endTime}
                onChange={(e) => { setEndTime(e.target.value); setIsBooked(false); }}
                className="brutal-input brutal-time-picker"
                required
              />
            </div>
          </div>
          
          {startTime && endTime && durationMins <= 0 && (
            <p className="validation-error text-mono mt-md">
              ⚠ END TIME MUST BE AFTER START TIME!
            </p>
          )}
        </div>

        {/* Pricing Rate Box */}
        <div className="slot-booking__box brutal-card duration-box">
          <h3 className="text-mono mb-md">
            🌊 POOL RATE
          </h3>
          <h2 className="rate-value text-mono mb-sm">₹{PRICE_PER_HOUR} / Hour</h2>
          <p className="rate-subtext">Precise billing down to the minute!</p>
          <div className="brutal-divider"></div>
          <p className="duration-note text-sm">Example: 1 Hour 30 Minutes costs ₹225.</p>
        </div>
      </div>

      {/* Booking Summary */}
      <AnimatePresence mode="wait">
        <motion.div
          key={isValid ? 'valid' : 'empty'}
          className="slot-booking__summary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {isValid ? (
            <>
              <div className="slot-booking__summary-details">
                <span className="slot-booking__summary-title">Lane Session Invoice</span>
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
                    <span className="slot-booking__summary-label">Timing:</span>
                    <span className="slot-booking__summary-value">
                      {format12Hour(startTime)} – {format12Hour(endTime)}
                    </span>
                  </div>
                  <div className="slot-booking__summary-item">
                    <span>⌛</span>
                    <span className="slot-booking__summary-label">Duration:</span>
                    <span className="slot-booking__summary-value">
                      {formatDurationText(durationMins)}
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
              ← Select a date, then enter a valid start and end time above to proceed
            </span>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

