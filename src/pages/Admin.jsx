import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { LuCalendar, LuPackage, LuMessageSquare, LuSettings, LuCheck, LuPlus, LuTrash2, LuDumbbell } from 'react-icons/lu';
import './Admin.css';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' | 'orders' | 'inquiries' | 'settings'

  // Admin Login State (persists on device)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('darur_admin_logged') === 'true';
  });
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // 1. Bookings State (Load from localStorage or defaults)
  const [bookings, setBookings] = useState(() => {
    const stored = localStorage.getItem('darur_bookings');
    if (stored) {
      try { return JSON.parse(stored); } catch (e) {}
    }
    return [
      { id: 'b-1', date: '2026-06-28', time: '07:00 AM (1 Hour)', type: 'Swimming Booking', status: 'CONFIRMED', price: '₹150', user: 'Manjunath Matam', phone: '93816 25959' },
      { id: 'b-2', date: '2026-06-25', time: '06:00 AM (1 Hour)', type: 'Swimming Booking', status: 'COMPLETED', price: '₹150', user: 'Rakesh Kumar', phone: '98480 22334' }
    ];
  });

  // 2. Mock Orders
  const [orders, setOrders] = useState([
    { id: 'o-1092', date: '2026-06-24', items: 'Anti-Fog Goggles x1, Pro Swim Cap x1', total: '₹1,059', status: 'DELIVERED', user: 'Manjunath Matam' },
    { id: 'o-1091', date: '2026-06-23', items: 'Gym Gloves x1', total: '₹399', status: 'SHIPPED', user: 'Suresh V' }
  ]);

  // 3. Mock Inquiries
  const [inquiries, setInquiries] = useState([
    { id: 'inq-1', date: '2026-06-25', name: 'Anjali Sharma', phone: '99887 76655', email: 'anjali@example.com', message: 'I want to know about personal training availability in the morning batch.', type: 'General' },
    { id: 'inq-2', date: '2026-06-24', name: 'Vijay Kumar', phone: '90001 20002', email: 'vijay@gmail.com', message: 'Is the pool open on Sundays? Do you offer swimming coaching for kids?', type: 'Swimming' }
  ]);

  // 4. Products Inventory Settings
  const [inventory, setInventory] = useState(() => {
    const stored = localStorage.getItem('darur_inventory');
    if (stored) {
      try { return JSON.parse(stored); } catch (e) {}
    }
    return [
      { id: 'swim-1', name: 'PRO SWIM CAP', price: 299, category: 'SWIMMING' },
      { id: 'swim-2', name: 'ANTI-FOG GOGGLES', price: 599, category: 'SWIMMING' },
      { id: 'swim-3', name: 'SWIM TRUNKS (MEN)', price: 1499, category: 'SWIMMING' },
      { id: 'swim-4', name: 'ONE-PIECE SUIT (WOMEN)', price: 1699, category: 'SWIMMING' },
      { id: 'gym-1', name: 'LEATHER GYM GLOVES', price: 399, category: 'GYM' },
      { id: 'gym-2', name: 'BRUTAL SHAKER BOTTLE', price: 349, category: 'GYM' }
    ];
  });

  const [editPriceId, setEditPriceId] = useState(null);
  const [newPrice, setNewPrice] = useState('');

  // Stats Calculations
  const stats = useMemo(() => {
    const totalRev = bookings.reduce((sum, b) => sum + parseInt(b.price.replace('₹', ''), 10), 0) + 
                     orders.reduce((sum, o) => sum + parseInt(o.total.replace('₹', '').replace(',', ''), 10), 0);
    return {
      revenue: `₹${totalRev.toLocaleString()}`,
      bookingsCount: bookings.length,
      ordersCount: orders.length,
      inquiriesCount: inquiries.length
    };
  }, [bookings, orders, inquiries]);

  // Handle Admin Log In
  const handleAdminLogin = (e) => {
    e.preventDefault();
    setLoginError('');

    if (loginUsername === 'admin' && loginPassword === 'daruradmin123') {
      localStorage.setItem('darur_admin_logged', 'true');
      setIsAdminLoggedIn(true);
      setLoginUsername('');
      setLoginPassword('');
    } else {
      setLoginError('INVALID ADMIN CREDENTIALS!');
    }
  };

  // Handle Admin Log Out
  const handleAdminLogout = () => {
    localStorage.removeItem('darur_admin_logged');
    setIsAdminLoggedIn(false);
  };


  // Update Booking Status
  const toggleBookingStatus = (id) => {
    const updated = bookings.map(b => {
      if (b.id === id) {
        const nextStatus = b.status === 'CONFIRMED' ? 'COMPLETED' : 'CONFIRMED';
        return { ...b, status: nextStatus, badgeColor: nextStatus === 'CONFIRMED' ? 'var(--neon-green)' : 'var(--electric-blue)' };
      }
      return b;
    });
    setBookings(updated);
    localStorage.setItem('darur_bookings', JSON.stringify(updated));
  };

  // Delete Booking
  const deleteBooking = (id) => {
    const updated = bookings.filter(b => b.id !== id);
    setBookings(updated);
    localStorage.setItem('darur_bookings', JSON.stringify(updated));
  };

  // Update Inventory Price
  const savePriceEdit = (id) => {
    if (!newPrice || isNaN(newPrice)) return;
    const updated = inventory.map(item => {
      if (item.id === id) {
        return { ...item, price: parseInt(newPrice, 10) };
      }
      return item;
    });
    setInventory(updated);
    localStorage.setItem('darur_inventory', JSON.stringify(updated));
    setEditPriceId(null);
    setNewPrice('');
  };

  if (!isAdminLoggedIn) {
    return (
      <div className="page-wrapper admin-login-page flex-center bg-cream">
        {/* Decorative elements */}
        <div className="decor-dot dot-1 bg-blue"></div>
        <div className="decor-dot dot-2 bg-green"></div>
        <div className="decor-dot dot-3 bg-coral"></div>
        <div className="decor-dot dot-4 bg-yellow"></div>

        <motion.div
          className="brutal-card admin-login-card"
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="text-center mb-lg">
            <span className="section-label" style={{ background: 'var(--sunny-yellow)' }}>
              // SECURE ACCESS
            </span>
            <h2 className="text-mono mt-xs">ADMIN GATEWAY</h2>
            <p className="text-sm text-secondary">Authorized personnel only</p>
          </div>

          {loginError && (
            <div className="auth-error-banner text-mono mb-md text-center">
              ⚠ {loginError}
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="auth-form">
            <div className="form-group mb-md">
              <label htmlFor="username">ADMIN USERNAME</label>
              <input
                type="text"
                id="username"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                className="brutal-input"
                placeholder="admin"
                required
              />
            </div>
            <div className="form-group mb-lg">
              <label htmlFor="adminPassword">ADMIN PASSWORD</label>
              <input
                type="password"
                id="adminPassword"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="brutal-input"
                placeholder="••••••••"
                required
              />
            </div>
            <button type="submit" className="brutal-btn brutal-btn--primary w-full">
              SECURE LOGIN
            </button>
          </form>
          
          <div className="text-center mt-md">
            <p className="text-xs text-mono text-muted">Hint: admin / daruradmin123</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="page-wrapper admin-page">
      {/* Hero Banner */}
      <section className="admin-banner bg-cream">
        <div className="container">
          <div className="banner-flex">
            <div>
              <span className="section-label">// ADMIN PANEL</span>
              <h1 className="admin-title">STUDIO COMMAND</h1>
              <p className="text-mono">Authorized Access • Live Data Monitor</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
              <div className="admin-status-badge text-mono bg-yellow">
                🟢 ONLINE - MULTI-DEVICE
              </div>
              <button 
                onClick={handleAdminLogout}
                className="brutal-btn brutal-btn--sm brutal-btn--ghost"
                style={{ padding: '6px 12px', minHeight: 'unset' }}
              >
                LOG OUT
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Summary Widgets */}
      <section className="section admin-stats-widgets pb-xs">
        <div className="container">
          <div className="grid-4">
            <div className="brutal-card stat-widget bg-blue text-light">
              <span className="label text-mono text-light">EST. REVENUE</span>
              <h2 className="value">{stats.revenue}</h2>
            </div>
            <div className="brutal-card stat-widget bg-green">
              <span className="label text-mono">SWIM BOOKINGS</span>
              <h2 className="value">{stats.bookingsCount}</h2>
            </div>
            <div className="brutal-card stat-widget bg-coral text-light">
              <span className="label text-mono text-light">SHOP ORDERS</span>
              <h2 className="value">{stats.ordersCount}</h2>
            </div>
            <div className="brutal-card stat-widget bg-yellow">
              <span className="label text-mono">CUSTOMER INQUIRIES</span>
              <h2 className="value">{stats.inquiriesCount}</h2>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="admin-content section">
        <div className="container">
          <div className="admin-tabs mb-xl">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`brutal-btn brutal-btn--sm ${activeTab === 'bookings' ? 'brutal-btn--primary' : 'brutal-btn--ghost'}`}
            >
              <LuCalendar /> SWIMMING BOOKINGS
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`brutal-btn brutal-btn--sm ${activeTab === 'orders' ? 'brutal-btn--primary' : 'brutal-btn--ghost'}`}
            >
              <LuPackage /> SHOP ORDERS
            </button>
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`brutal-btn brutal-btn--sm ${activeTab === 'inquiries' ? 'brutal-btn--primary' : 'brutal-btn--ghost'}`}
            >
              <LuMessageSquare /> INQUIRIES
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`brutal-btn brutal-btn--sm ${activeTab === 'settings' ? 'brutal-btn--primary' : 'brutal-btn--ghost'}`}
            >
              <LuSettings /> PRICE MANAGEMENT
            </button>
          </div>

          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-mono mb-lg">LANE RESERVATIONS</h2>
              <div className="table-responsive">
                <table className="brutal-table">
                  <thead>
                    <tr>
                      <th>CUSTOMER</th>
                      <th>CONTACT</th>
                      <th>DATE &amp; TIME</th>
                      <th>TOTAL</th>
                      <th>STATUS</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((b) => (
                      <tr key={b.id}>
                        <td className="font-bold">{b.user || 'Guest User'}</td>
                        <td className="text-mono">{b.phone || 'N/A'}</td>
                        <td className="text-mono">{b.date} | {b.time}</td>
                        <td className="text-mono font-bold">{b.price}</td>
                        <td>
                          <span 
                            className="brutal-badge text-mono cursor-pointer"
                            style={{ backgroundColor: b.status === 'CONFIRMED' ? 'var(--neon-green)' : 'var(--electric-blue)' }}
                            onClick={() => toggleBookingStatus(b.id)}
                            title="Click to toggle status"
                          >
                            {b.status}
                          </span>
                        </td>
                        <td>
                          <button
                            onClick={() => deleteBooking(b.id)}
                            className="brutal-btn brutal-btn--sm brutal-btn--coral"
                            style={{ padding: '4px 8px', minHeight: 'unset' }}
                          >
                            <LuTrash2 />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-mono mb-lg">ACCESSORIES SALES</h2>
              <div className="table-responsive">
                <table className="brutal-table">
                  <thead>
                    <tr>
                      <th>ORDER ID</th>
                      <th>CUSTOMER</th>
                      <th>ITEMS PURCHASED</th>
                      <th>TOTAL AMOUNT</th>
                      <th>SHIPPING</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o) => (
                      <tr key={o.id}>
                        <td className="text-mono font-bold">#{o.id}</td>
                        <td>{o.user}</td>
                        <td className="text-sm">{o.items}</td>
                        <td className="text-mono font-bold">{o.total}</td>
                        <td>
                          <span className="brutal-badge brutal-badge--yellow text-mono">
                            {o.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Inquiries Tab */}
          {activeTab === 'inquiries' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-mono mb-lg">GYM &amp; POOL MESSAGES</h2>
              <div className="inquiry-grid">
                {inquiries.map((inq) => (
                  <div key={inq.id} className="brutal-card inquiry-card">
                    <div className="inq-header mb-sm">
                      <span className="brutal-badge brutal-badge--coral text-mono">{inq.type}</span>
                      <span className="text-mono text-sm">{inq.date}</span>
                    </div>
                    <h3 className="inq-name font-bold mb-xs">{inq.name}</h3>
                    <p className="text-mono text-sm text-secondary mb-sm">📞 {inq.phone} | ✉ {inq.email || 'N/A'}</p>
                    <div className="brutal-divider"></div>
                    <p className="inq-msg italic">{inq.message}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-mono mb-lg">CATALOG PRICE EDITOR</h2>
              <p className="mb-lg">Update accessory prices. These changes will save in local storage and affect the Shop page catalog immediately.</p>
              <div className="table-responsive">
                <table className="brutal-table">
                  <thead>
                    <tr>
                      <th>PRODUCT NAME</th>
                      <th>CATEGORY</th>
                      <th>CURRENT PRICE</th>
                      <th>UPDATE PRICE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventory.map((item) => (
                      <tr key={item.id}>
                        <td className="font-bold">{item.name}</td>
                        <td>
                          <span className="brutal-badge brutal-badge--blue text-mono">{item.category}</span>
                        </td>
                        <td className="text-mono font-bold">₹{item.price}</td>
                        <td>
                          {editPriceId === item.id ? (
                            <div className="flex gap-xs items-center">
                              <input
                                type="number"
                                className="brutal-input price-input"
                                value={newPrice}
                                onChange={(e) => setNewPrice(e.target.value)}
                                placeholder="New price"
                                style={{ width: '100px', padding: '6px' }}
                              />
                              <button
                                onClick={() => savePriceEdit(item.id)}
                                className="brutal-btn brutal-btn--sm brutal-btn--green"
                                style={{ padding: '6px' }}
                              >
                                <LuCheck />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => { setEditPriceId(item.id); setNewPrice(item.price.toString()); }}
                              className="brutal-btn brutal-btn--sm brutal-btn--ghost"
                              style={{ padding: '6px 12px' }}
                            >
                              EDIT PRICE
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
