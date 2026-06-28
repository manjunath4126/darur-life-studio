import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuShoppingCart, LuPlus, LuMinus, LuTrash2, LuX, LuEye } from 'react-icons/lu';
import { useCart } from '../context/CartContext.jsx';
import './Shop.css';

export default function Shop() {
  const { items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeQuickViewProduct, setActiveQuickViewProduct] = useState(null);

  const products = useMemo(() => {
    // Get dynamic price from localStorage or default
    const getDynamicPrice = (id, defaultPrice) => {
      const stored = localStorage.getItem('darur_inventory');
      if (stored) {
        try {
          const items = JSON.parse(stored);
          const match = items.find(item => item.id === id);
          if (match) return match.price;
        } catch (e) {}
      }
      return defaultPrice;
    };

    return [
      // Swimming Category
      {
        id: 'swim-1',
        name: 'PRO SWIM CAP',
        price: getDynamicPrice('swim-1', 299),
        category: 'SWIMMING',
        color: 'var(--electric-blue)',
        description: 'Hypoallergenic 100% silicone swim cap. Extremely durable and offers a snug, hydrodynamic fit.',
        imageText: '🏊 CAP'
      },
      {
        id: 'swim-2',
        name: 'ANTI-FOG GOGGLES',
        price: getDynamicPrice('swim-2', 599),
        category: 'SWIMMING',
        color: 'var(--pool-blue)',
        description: 'UV protection, wide-view anti-fog swimming goggles. Leak-proof design with adjustable strap.',
        imageText: '🥽 GOGGLES'
      },
      {
        id: 'swim-3',
        name: 'SWIM TRUNKS (MEN)',
        price: getDynamicPrice('swim-3', 1499),
        category: 'SWIMMING',
        color: 'var(--deep-blue)',
        description: 'Fast-drying swim trunks for professional training. Chlorine-resistant fabric with drawstring.',
        imageText: '🩳 SHORTS'
      },
      {
        id: 'swim-4',
        name: 'ONE-PIECE SUIT (WOMEN)',
        price: getDynamicPrice('swim-4', 1699),
        category: 'SWIMMING',
        color: 'var(--chlorine-green)',
        description: 'Atheletic swimsuit designed for maximum flexibility and minimal drag. UPF 50+ protection.',
        imageText: '🩱 SWIMSUIT'
      },
      {
        id: 'swim-5',
        name: 'SILICONE EAR PLUGS',
        price: getDynamicPrice('swim-5', 199),
        category: 'SWIMMING',
        color: 'var(--neon-green)',
        description: 'Ergonomically shaped soft silicone ear plugs. Blocks water, comfortable to wear.',
        imageText: '👂 PLUGS'
      },
      {
        id: 'swim-6',
        name: 'MICROFIBER TOWEL',
        price: getDynamicPrice('swim-6', 499),
        category: 'SWIMMING',
        color: 'var(--vibrant-coral)',
        description: 'Ultra-absorbent, compact, and quick-drying microfiber towel. Ideal for swimmers.',
        imageText: '🧣 TOWEL'
      },
      // Gym Category
      {
        id: 'gym-1',
        name: 'LEATHER GYM GLOVES',
        price: getDynamicPrice('gym-1', 399),
        category: 'GYM',
        color: 'var(--coral-orange)',
        description: 'Premium leather gym gloves with wrist wraps support. Padded palms for blister prevention.',
        imageText: '🧤 GLOVES'
      },
      {
        id: 'gym-2',
        name: 'BRUTAL SHAKER BOTTLE',
        price: getDynamicPrice('gym-2', 349),
        category: 'GYM',
        color: 'var(--sunny-yellow)',
        description: '700ml leak-proof protein shaker bottle. Equipped with a stainless steel whisk ball.',
        imageText: '🍼 SHAKER'
      },
      {
        id: 'gym-3',
        name: 'RESISTANCE BAND SET',
        price: getDynamicPrice('gym-3', 599),
        category: 'GYM',
        color: 'var(--electric-blue)',
        description: 'Set of 3 heavy-duty latex bands for stretching, yoga, and strength workouts.',
        imageText: '🎗️ BANDS'
      }
    ];
  }, []);


  const filteredProducts = categoryFilter === 'ALL' 
    ? products 
    : products.filter(p => p.category === categoryFilter);

  return (
    <div className="page-wrapper shop-page">
      {/* Hero Banner */}
      <section className="shop-hero text-center">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="section-label">// GEAR &amp; ACCESSORIES</span>
            <h1 className="shop-title">
              STUDIO SHOP
            </h1>
            <p className="shop-subtitle">Premium equipment and accessories for pool &amp; gym.</p>
          </motion.div>
        </div>
      </section>

      {/* Main Shop Catalog */}
      <section className="section shop-catalog">
        <div className="container">
          {/* Header Controls */}
          <div className="shop-controls mb-xl">
            {/* Filter Buttons */}
            <div className="filter-buttons">
              {['ALL', 'SWIMMING', 'GYM'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`brutal-btn brutal-btn--sm ${categoryFilter === cat ? 'brutal-btn--primary' : 'brutal-btn--ghost'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="brutal-btn brutal-btn--primary brutal-cart-trigger"
            >
              <LuShoppingCart className="icon" />
              <span>CART ({totalItems})</span>
            </button>
          </div>

          {/* Product Grid */}
          <div className="grid-3">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                className="brutal-card product-card"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
              >
                {/* Visual Placeholder Area */}
                <div className="product-visual" style={{ backgroundColor: product.color }}>
                  <span className="visual-text">{product.imageText}</span>
                  <button 
                    className="quick-view-btn"
                    onClick={() => setActiveQuickViewProduct(product)}
                  >
                    <LuEye />
                  </button>
                </div>

                <div className="product-details mt-md">
                  <span className={`brutal-badge ${product.category === 'SWIMMING' ? 'brutal-badge--blue' : 'brutal-badge--coral'} text-mono mb-xs`}>
                    {product.category}
                  </span>
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-meta mt-sm">
                    <span className="product-price text-mono">₹{product.price}</span>
                    <button
                      onClick={() => addToCart(product)}
                      className="brutal-btn brutal-btn--sm brutal-btn--blue"
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="cart-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
            />
            {/* Drawer */}
            <motion.div
              className="cart-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <div className="cart-header">
                <h2 className="text-mono">YOUR CART</h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="brutal-btn brutal-btn--sm brutal-btn--ghost close-cart-btn"
                >
                  <LuX />
                </button>
              </div>

              <div className="cart-content">
                {items.length === 0 ? (
                  <div className="empty-cart text-center py-xl">
                    <p className="text-mono mb-md">YOUR CART IS EMPTY</p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="brutal-btn brutal-btn--primary"
                    >
                      START SHOPPING
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="cart-items-list">
                      {items.map((item) => (
                        <div key={item.id} className="cart-item brutal-card">
                          <div className="item-info">
                            <h4 className="item-name">{item.name}</h4>
                            <span className="item-price text-mono">₹{item.price}</span>
                          </div>
                          <div className="item-controls">
                            <div className="quantity-controls">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="qty-btn"
                              >
                                <LuMinus />
                              </button>
                              <span className="qty-val text-mono">{item.quantity}</span>
                              <button
                                onClick={() => addToCart(item)}
                                className="qty-btn"
                              >
                                <LuPlus />
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="remove-item-btn"
                            >
                              <LuTrash2 />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="cart-summary brutal-card mt-xl">
                      <div className="summary-row">
                        <span>SUBTOTAL:</span>
                        <span className="text-mono font-bold">₹{totalPrice}</span>
                      </div>
                      <div className="summary-row">
                        <span>GST (18%):</span>
                        <span className="text-mono">₹{Math.round(totalPrice * 0.18)}</span>
                      </div>
                      <div className="brutal-divider"></div>
                      <div className="summary-row total-row">
                        <span>TOTAL:</span>
                        <span className="text-mono font-bold text-lg">
                          ₹{totalPrice + Math.round(totalPrice * 0.18)}
                        </span>
                      </div>
                      <button className="brutal-btn brutal-btn--primary w-full mt-md">
                        CHECKOUT & PAY
                      </button>
                      <button
                        onClick={clearCart}
                        className="brutal-btn brutal-btn--ghost w-full mt-xs"
                      >
                        CLEAR ALL
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Quick View Modal */}
      <AnimatePresence>
        {activeQuickViewProduct && (
          <>
            <motion.div
              className="quick-view-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveQuickViewProduct(null)}
            />
            <motion.div
              className="quick-view-modal brutal-card"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
            >
              <button
                onClick={() => setActiveQuickViewProduct(null)}
                className="close-modal-btn brutal-btn brutal-btn--sm brutal-btn--ghost"
              >
                <LuX />
              </button>

              <div className="modal-grid">
                <div 
                  className="modal-visual" 
                  style={{ backgroundColor: activeQuickViewProduct.color }}
                >
                  <span className="modal-visual-text">{activeQuickViewProduct.imageText}</span>
                </div>
                <div className="modal-details">
                  <span className="brutal-badge brutal-badge--yellow text-mono mb-xs">
                    {activeQuickViewProduct.category}
                  </span>
                  <h2 className="modal-title mb-sm">{activeQuickViewProduct.name}</h2>
                  <p className="modal-desc mb-md">{activeQuickViewProduct.description}</p>
                  <h3 className="modal-price text-mono mb-lg">₹{activeQuickViewProduct.price}</h3>
                  <button
                    onClick={() => {
                      addToCart(activeQuickViewProduct);
                      setActiveQuickViewProduct(null);
                    }}
                    className="brutal-btn brutal-btn--primary w-full"
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
