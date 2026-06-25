import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext.jsx';
import './AccessoryCard.css';

export default function AccessoryCard({ id, name, price, category, color, icon: Icon }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart({ id, name, price, category });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <motion.div
      className="accessory-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4 }}
    >
      <div
        className="accessory-card__icon-section"
        style={{ backgroundColor: color }}
      >
        <Icon className="accessory-card__icon" />
      </div>

      <div className="accessory-card__body">
        {category && (
          <span className="accessory-card__category">{category}</span>
        )}
        <h4 className="accessory-card__name">{name}</h4>
        <span className="accessory-card__price">₹{price.toLocaleString('en-IN')}</span>

        <div className="accessory-card__actions">
          <button
            className={`brutal-btn brutal-btn--primary brutal-btn--sm accessory-card__add-btn${added ? ' accessory-card__add-btn--added' : ''}`}
            onClick={handleAddToCart}
            type="button"
          >
            {added ? '✓ ADDED' : 'ADD TO CART'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
