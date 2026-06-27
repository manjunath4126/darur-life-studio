import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LuCalendar, LuPackage, LuCrown, LuUser, LuLogOut } from 'react-icons/lu';
import { useAuth } from '../context/AuthContext.jsx';
import './Dashboard.css';

export default function Dashboard() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' | 'orders' | 'membership'

  // Load bookings dynamically from localStorage, fallback to static defaults
  const bookings = React.useMemo(() => {
    const stored = localStorage.getItem('darur_bookings');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        // ignore
      }
    }
    return [
      {
        id: 'b-1',
        date: '2026-06-28',
        time: '07:00 AM (1 Hour)',
        type: 'Swimming Booking',
        status: 'CONFIRMED',
        price: '₹150',
        badgeColor: 'var(--neon-green)'
      },
      {
        id: 'b-2',
        date: '2026-06-25',
        time: '06:00 AM (1 Hour)',
        type: 'Swimming Booking',
        status: 'COMPLETED',
        price: '₹150',
        badgeColor: 'var(--electric-blue)'
      }
    ];
  }, []);

  const sampleOrders = [
    {
      id: 'o-1092',
      date: '2026-06-24',
      items: 'Anti-Fog Goggles x1, Pro Swim Cap x1',
      total: '₹1,059',
      status: 'DELIVERED',
      badgeColor: 'var(--neon-green)'
    }
  ];


  const sampleMembership = {
    plan: 'PRO MEMBERSHIP',
    status: 'ACTIVE',
    startDate: '2026-06-01',
    endDate: '2026-07-01',
    price: '₹2,500/month',
    badgeColor: 'var(--neon-green)'
  };

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  if (!isAuthenticated) {
    return (
      <div className="page-wrapper dashboard-page flex-center bg-cream">
        <div className="brutal-card text-center max-w-sm">
          <LuUser className="icon-large mb-md text-coral" />
          <h2 className="text-mono mb-sm">ACCESS DENIED</h2>
          <p className="mb-lg">Please login or register to view your membership, bookings, and orders dashboard.</p>
          <Link to="/auth" className="brutal-btn brutal-btn--primary">
            GO TO LOGIN
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper dashboard-page">
      {/* Banner */}
      <section className="dashboard-banner">
        <div className="container">
          <div className="banner-flex">
            <div className="user-profile-header">
              <div className="user-avatar-brutal">
                <LuUser />
              </div>
              <div>
                <span className="section-label">// DASHBOARD</span>
                <h1 className="user-welcome">HELLO, {user.name}!</h1>
                <p className="text-mono">Member Since: June 2026</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="brutal-btn brutal-btn--ghost logout-btn"
            >
              <LuLogOut /> LOG OUT
            </button>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="dashboard-content section">
        <div className="container">
          <div className="dashboard-tabs-row mb-xl">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`brutal-btn brutal-btn--sm tab-btn ${activeTab === 'bookings' ? 'brutal-btn--primary' : 'brutal-btn--ghost'}`}
            >
              <LuCalendar className="tab-icon" /> MY BOOKINGS
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`brutal-btn brutal-btn--sm tab-btn ${activeTab === 'orders' ? 'brutal-btn--primary' : 'brutal-btn--ghost'}`}
            >
              <LuPackage className="tab-icon" /> MY ORDERS
            </button>
            <button
              onClick={() => setActiveTab('membership')}
              className={`brutal-btn brutal-btn--sm tab-btn ${activeTab === 'membership' ? 'brutal-btn--primary' : 'brutal-btn--ghost'}`}
            >
              <LuCrown className="tab-icon" /> MEMBERSHIP
            </button>
          </div>

          {/* Active Tab Panel */}
          <div className="tab-panel">
            {activeTab === 'bookings' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-mono mb-lg">SWIMMING LANE BOOKINGS</h2>
                {bookings.length === 0 ? (
                  <div className="brutal-card text-center py-xl">
                    <p className="text-mono mb-md">NO UPCOMING OR PAST BOOKINGS FOUND</p>
                    <Link to="/swimming" className="brutal-btn brutal-btn--blue">
                      BOOK A LANE NOW
                    </Link>
                  </div>
                ) : (
                  <div className="dashboard-list">
                    {bookings.map((b) => (
                      <div key={b.id} className="brutal-card dashboard-item-card">
                        <div className="item-main">
                          <span 
                            className="brutal-badge text-mono" 
                            style={{ backgroundColor: b.badgeColor, color: b.badgeColor === 'var(--neon-green)' ? '#000' : '#fff' }}
                          >
                            {b.status}
                          </span>
                          <h3 className="item-title mt-xs">{b.type}</h3>
                          <p className="text-mono text-secondary">{b.date} | {b.time}</p>
                        </div>
                        <div className="item-side">
                          <span className="item-val text-mono font-bold">{b.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'orders' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-mono mb-lg">ACCESSORIES PURCHASE HISTORY</h2>
                {sampleOrders.length === 0 ? (
                  <div className="brutal-card text-center py-xl">
                    <p className="text-mono mb-md">NO SHOP ORDERS FOUND</p>
                    <Link to="/shop" className="brutal-btn brutal-btn--coral">
                      VISIT ACCESSORIES SHOP
                    </Link>
                  </div>
                ) : (
                  <div className="dashboard-list">
                    {sampleOrders.map((o) => (
                      <div key={o.id} className="brutal-card dashboard-item-card">
                        <div className="item-main">
                          <span 
                            className="brutal-badge text-mono" 
                            style={{ backgroundColor: o.badgeColor }}
                          >
                            {o.status}
                          </span>
                          <h3 className="item-title mt-xs">ORDER #{o.id}</h3>
                          <p className="text-secondary">{o.items}</p>
                          <p className="text-mono text-muted text-sm">{o.date}</p>
                        </div>
                        <div className="item-side">
                          <span className="item-val text-mono font-bold">{o.total}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'membership' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-mono mb-lg">GYM MEMBERSHIP STATUS</h2>
                {!sampleMembership ? (
                  <div className="brutal-card text-center py-xl">
                    <p className="text-mono mb-md">NO ACTIVE MEMBERSHIP FOUND</p>
                    <Link to="/gym" className="brutal-btn brutal-btn--green">
                      BUY GYM MEMBERSHIP
                    </Link>
                  </div>
                ) : (
                  <div className="brutal-card membership-status-card" style={{ borderLeft: '10px solid var(--neon-green)' }}>
                    <div className="status-header mb-md">
                      <span className="brutal-badge brutal-badge--green text-mono">
                        {sampleMembership.status}
                      </span>
                      <h3 className="membership-plan-title mt-xs">{sampleMembership.plan}</h3>
                    </div>
                    <div className="brutal-divider"></div>
                    <div className="status-grid">
                      <div className="status-detail-item">
                        <span className="label text-mono">START DATE:</span>
                        <span className="val">{sampleMembership.startDate}</span>
                      </div>
                      <div className="status-detail-item">
                        <span className="label text-mono">EXPIRY DATE:</span>
                        <span className="val">{sampleMembership.endDate}</span>
                      </div>
                      <div className="status-detail-item">
                        <span className="label text-mono">BILLING RATE:</span>
                        <span className="val">{sampleMembership.price}</span>
                      </div>
                    </div>
                    <button className="brutal-btn brutal-btn--primary mt-lg">
                      RENEW MEMBERSHIP
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
