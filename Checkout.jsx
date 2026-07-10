import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Eye, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const StarRating = ({ rating, size = 13 }) => (
  <div style={{ display: 'flex', gap: 2 }}>
    {[1, 2, 3, 4, 5].map(s => (
      <Star
        key={s} size={size}
        fill={s <= Math.round(rating) ? '#c9a84c' : 'none'}
        color={s <= Math.round(rating) ? '#c9a84c' : '#333'}
      />
    ))}
  </div>
);

export default function ProductCard({ product }) {
  const { addToCart, loading } = useCart();
  const [hovered, setHovered] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const img = product.images?.[0] || `https://picsum.photos/seed/${product._id || product.name}/400/400`;
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock < 5;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#141414',
        border: `1px solid ${hovered ? '#c9a84c' : '#2a2a2a'}`,
        borderRadius: 10,
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: hovered ? 'translateY(-5px)' : 'none',
        boxShadow: hovered ? '0 16px 48px rgba(0,0,0,0.5)' : 'none',
        position: 'relative',
      }}
    >
      {/* Badges */}
      <div style={{ position: 'absolute', top: 12, left: 12, zIndex: 2, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {discount > 0 && <span className="badge badge-gold">-{discount}%</span>}
        {product.featured && <span className="badge badge-info">Featured</span>}
        {isLowStock && <span className="badge badge-danger">Low Stock</span>}
        {isOutOfStock && <span className="badge badge-muted">Sold Out</span>}
      </div>

      {/* Wishlist */}
      <button
        onClick={(e) => { e.preventDefault(); setWishlisted(w => !w); }}
        style={{
          position: 'absolute', top: 12, right: 12, zIndex: 2,
          background: 'rgba(20,20,20,0.8)', border: 'none',
          width: 36, height: 36, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', transition: 'all 0.2s',
          transform: hovered ? 'scale(1)' : 'scale(0.85)',
          opacity: hovered ? 1 : 0,
        }}
      >
        <Heart
          size={16}
          fill={wishlisted ? '#e05555' : 'none'}
          color={wishlisted ? '#e05555' : '#888'}
        />
      </button>

      {/* Image */}
      <Link to={`/products/${product._id}`}>
        <div style={{
          aspectRatio: '4/3', overflow: 'hidden',
          background: '#1a1a1a', position: 'relative',
        }}>
          <img
            src={img}
            alt={product.name}
            loading="lazy"
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: hovered ? 'scale(1.07)' : 'scale(1)',
              filter: isOutOfStock ? 'grayscale(50%)' : 'none',
            }}
          />
          {/* Quick view overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(0,0,0,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.3s',
          }}>
            <span style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'rgba(10,10,10,0.8)', color: '#f0ede8',
              padding: '8px 16px', borderRadius: 4, fontSize: 12,
              letterSpacing: 1, textTransform: 'uppercase',
              border: '1px solid rgba(201,168,76,0.4)',
            }}>
              <Eye size={13} /> Quick View
            </span>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div style={{ padding: '16px 18px 18px' }}>
        <div style={{ marginBottom: 8 }}>
          <span style={{ fontSize: 10, color: '#c9a84c', textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 600 }}>
            {product.brand}
          </span>
          <span style={{ fontSize: 10, color: '#333', margin: '0 6px' }}>·</span>
          <span style={{ fontSize: 10, color: '#555', textTransform: 'uppercase', letterSpacing: 1 }}>
            {product.category}
          </span>
        </div>

        <Link to={`/products/${product._id}`}>
          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 16, fontWeight: 600,
            lineHeight: 1.35, marginBottom: 10,
            color: hovered ? '#f0ede8' : '#ddd',
            transition: 'color 0.2s',
            display: '-webkit-box', WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>
            {product.name}
          </h3>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <StarRating rating={product.rating || 0} />
          <span style={{ fontSize: 12, color: '#555' }}>
            {product.rating?.toFixed(1) || '0.0'} ({product.numReviews || 0})
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: 22, fontWeight: 700, color: '#c9a84c' }}>
              ${product.price?.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span style={{ fontSize: 13, color: '#444', textDecoration: 'line-through', marginLeft: 8 }}>
                ${product.originalPrice}
              </span>
            )}
          </div>

          <button
            onClick={() => !isOutOfStock && addToCart(product._id)}
            disabled={isOutOfStock || loading}
            className="btn btn-primary btn-sm"
            style={{ gap: 6, padding: '8px 14px' }}
          >
            <ShoppingCart size={13} />
            {isOutOfStock ? 'Sold Out' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
}
