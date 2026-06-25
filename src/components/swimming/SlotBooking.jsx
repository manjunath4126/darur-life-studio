import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuCalendar, LuClock, LuWaves } from 'react-icons/lu';
import SlotCalendar from './SlotCalendar.jsx';
import './SlotBooking.css';

/* ── Fake slot data generator ── */
function generateSlots(dateStr) {
  const seed = dateStr.split('-').reduce((a, b) => a + parseInt(b, 10), 0);
  const morningSlots = [
    { id: `${dateStr}-m1`, time: '6:00 – 7:00 AM', period: 'morning' },
    { id: `${dateStr}-m2`, time: '7:00 – 8:00 AM', period: 'morning' },
    { id: `${dateStr}-m3`, time: '8:00 – 9:00 AM', period: 'morning' },
  ];
  const eveningSlots = [
    { id: `${dateStr}-e1`, time: '5:00 – 6:00 PM', period: 'evening' },
    { id: `${dateStr}-e2`, time: '6:00 – 7:00 PM', period: 'evening' },
    { id: `${dateStr}-e3`, time: '7:00 – 8:00 PM', period: 'evening' },
  ];

  const allSlots = [...morningSlots, ...eveningSlots];
  return allSlots.map((slot, i) => {
    const pseudoRandom = ((seed * (i + 3) * 17) % 9);
    const total = 8;
    const booked = pseudoRandom;
    const available = total - booked;
    return {
      ...slot,
      spotsTotal: total,
      spotsAvailable: available,
      isFull: available <= 0,
    };
  });
}

const PRICE_PER_SESSION = 200;

export default function SlotBooking() {
  const todayStr = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [selectedSlotId, setSelectedSlotId] = useState(null);

  const slots = useMemo(() => generateSlots(selectedDate), [selectedDate]);
  const morningSlots = slots.filter(s => s.period === 'morning');
  const eveningSlots = slots.filter(s => s.period === 'evening');
  const selectedSlot = slots.find(s => s.id === selectedSlotId);

  const handleDateChange = (dateStr) => {
    setSelectedDate(dateStr);
    setSelectedSlotId(null); // reset slot on date change
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
        <span className="section-label">// BOOK A SLOT</span>
        <h2 className="slot-booking__heading section-title">RESERVE YOUR LANE</h2>
      </div>

      {/* Calendar strip */}
      <div className="slot-booking__calendar-wrap">
        <SlotCalendar
          selectedDate={selectedDate}
          onSelectDate={handleDateChange}
        />
      </div>

      {/* Morning slots */}
      <SlotPeriod label="Morning" icon={<LuClock />} />
      <div className="slot-booking__slots-grid">
        {morningSlots.map((slot, index) => (
          <SlotCard
            key={slot.id}
            slot={slot}
            isSelected={selectedSlotId === slot.id}
            onSelect={() => !slot.isFull && setSelectedSlotId(slot.id)}
            delay={index * 0.08}
          />
        ))}
      </div>

      {/* Evening slots */}
      <SlotPeriod label="Evening" icon={<LuWaves />} />
      <div className="slot-booking__slots-grid">
        {eveningSlots.map((slot, index) => (
          <SlotCard
            key={slot.id}
            slot={slot}
            isSelected={selectedSlotId === slot.id}
            onSelect={() => !slot.isFull && setSelectedSlotId(slot.id)}
            delay={index * 0.08 + 0.24}
          />
        ))}
      </div>

      {/* Booking Summary */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedSlotId || 'empty'}
          className="slot-booking__summary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {selectedSlot ? (
            <>
              <div className="slot-booking__summary-details">
                <span className="slot-booking__summary-title">Booking Summary</span>
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
                    <span className="slot-booking__summary-label">Slot:</span>
                    <span className="slot-booking__summary-value">{selectedSlot.time}</span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xl)' }}>
                <span className="slot-booking__summary-price">₹{PRICE_PER_SESSION}</span>
                <button className="brutal-btn brutal-btn--primary brutal-btn--lg" type="button">
                  CONFIRM &amp; PAY
                </button>
              </div>
            </>
          ) : (
            <span className="slot-booking__summary-empty">
              ← Select a date and time slot to proceed
            </span>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ── Slot Period Heading ── */
function SlotPeriod({ label, icon }) {
  return (
    <div className="slot-booking__period">
      <span className="slot-booking__period-label">
        {icon} {label}
      </span>
      <span className="slot-booking__period-line" />
    </div>
  );
}

/* ── Individual Slot Card ── */
function SlotCard({ slot, isSelected, onSelect, delay = 0 }) {
  const stateClass = slot.isFull
    ? 'slot-card--full'
    : isSelected
      ? 'slot-card--selected'
      : 'slot-card--available';

  return (
    <motion.div
      className={`slot-card ${stateClass}`}
      onClick={onSelect}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.3 }}
      whileTap={!slot.isFull ? { scale: 0.97 } : {}}
      role="button"
      tabIndex={0}
      aria-disabled={slot.isFull}
      aria-pressed={isSelected}
    >
      <span className="slot-card__time">{slot.time}</span>
      <span className="slot-card__spots">
        {slot.isFull
          ? 'FULL'
          : `${slot.spotsAvailable}/${slot.spotsTotal} spots`
        }
      </span>
      <button
        className="brutal-btn brutal-btn--blue brutal-btn--sm slot-card__book-btn"
        type="button"
        disabled={slot.isFull}
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
      >
        {slot.isFull ? 'FULL' : isSelected ? 'SELECTED ✓' : 'BOOK NOW'}
      </button>
    </motion.div>
  );
}
