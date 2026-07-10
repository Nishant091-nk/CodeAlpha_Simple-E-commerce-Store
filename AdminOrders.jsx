import { Link } from 'react-router-dom';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartSidebar() {
  const { cart, sidebarOpen, setSidebarOpen, updateItem, removeItem, subtotal } = useCart();

  const shipping = subtotal > 100 ? 0 : subtotal > 0 ? 10 : 0;
  const tax = Math.round(subtotal * 0.15 * 100) / 100;
  const total = subtotal + shipping + tax;

  return (
    <>
      {/* Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.75)',
            zIndex: 199, backdropFilter: 'blur(4px)',
            animation: 'fadeIn 0.2s ease',
          }}
        />
      )}

      {/* Drawer */}
      <div style={{
        position: 'fixed', right: 0, top: 0, bottom: 0,
        width: 440, maxWidth: '100vw',
        background: '#141414',
        borderLeft: '1px solid #2a2a2a',
        zIndex: 200,
        transform: sidebarOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.38s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex', flexDirection: 'column',
        boxShadow: '-8px 0 48px rgba(0,0,0,0.6)',
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid #2a2a2a',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: '#0f0f0f',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <ShoppingBag size={20} color="#c9a84c" />
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22 }}>
              Your Cart
            </h2>
            {cart.length > 0 && (
              <span style={{
                background: '#c9a84c', color: '#0a0a0a',
                borderRadius: '50%', width: 22, height: 22,
                fontSize: 12, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {cart.length}
              </span>
            )}
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            style={{
              background: '#1e1e1e', border: '1px solid #2a2a2a',
              color: '#888', width: 34, height: 34, borderRadius: 4,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#c9a84c'; e.currentTarget.style.color = '#c9a84c'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a2a2a'; e.currentTarget.style.color = '#888'; }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 24px', color: '#444' }}>
              <ShoppingBag size={56} style={{ marginBottom: 16, opacity: 0.2 }} />
              <p style={{ fontSize: 18, fontFamily: "'Playfair Display', serif", marginBottom: 8, color: '#666' }}>
                Your cart is empty
              </p>
              <p style={{ fontSize: 13, marginBottom: 32 }}>Add some products to get started</p>
              <button
                onClick={() => setSidebarOpen(false)}
                className="btn btn-outline"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div>
              {cart.map((item) => {
                const p = item.product;
                if (!p) return null;
                const img = p.images?.[0] || `https://picsum.photos/seed/${p._id}/80/80`;
                const itemTotal = p.price * item.quantity;

                return (
                  <div
                    key={item._id}
                    style={{
                      display: 'flex', gap: 16,
                      padding: '18px 24px',
                      borderBottom: '1px solid #1e1e1e',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#1a1a1a'}
                    onMouseLeave={e => e.currentTarget.style.background = 'none'}
                  >
                    {/* Image */}
                    <Link to={`/products/${p._id}`} onClick={() => setSidebarOpen(false)}>
                      <div style={{ width: 76, height: 76, borderRadius: 6, overflow: 'hidden', background: '#1e1e1e', flexShrink: 0 }}>
                        <img src={img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    </Link>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <Link
                        to={`/products/${p._id}`}
                        onClick={() => setSidebarOpen(false)}
                        style={{ textDecoration: 'none' }}
                      >
                        <p style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: 14, fontWeight: 600,
                          lineHeight: 1.3, marginBottom: 4,
                          overflow: 'hidden', textOverflow: 'ellipsis',
                          display: '-webkit-box', WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}>
                          {p.name}
                        </p>
                      </Link>
                      <p style={{ fontSize: 12, color: '#555', marginBottom: 10 }}>{p.category}</p>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        {/* Qty controls */}
                        <div style={{
                          display: 'flex', alignItems: 'center',
                          background: '#1e1e1e', border: '1px solid #2a2a2a', borderRadius: 4,
                        }}>
                          <button
                            onClick={() => updateItem(p._id, item.quantity - 1)}
                            style={{ background: 'none', border: 'none', color: '#888', padding: '6px 10px', cursor: 'pointer', display: 'flex', transition: 'color 0.2s' }}
                            onMouseEnter={e => e.currentTarget.style.color = '#f0ede8'}
                            onMouseLeave={e => e.currentTarget.style.color = '#888'}
                          >
                            <Minus size={11} />
                          </button>
                          <span style={{ fontSize: 13, fontWeight: 600, padding: '0 10px', minWidth: 24, textAlign: 'center' }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateItem(p._id, item.quantity + 1)}
                            style={{ background: 'none', border: 'none', color: '#888', padding: '6px 10px', cursor: 'pointer', display: 'flex', transition: 'color 0.2s' }}
                            onMouseEnter={e => e.currentTarget.style.color = '#f0ede8'}
                            onMouseLeave={e => e.currentTarget.style.color = '#888'}
                          >
                            <Plus size={11} />
                          </button>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <span style={{ fontWeight: 700, color: '#c9a84c', fontSize: 15 }}>
                            ${itemTotal.toFixed(2)}
                          </span>
                          <button
                            onClick={() => removeItem(p._id)}
                            style={{ background: 'none', border: 'none', color: '#444', display: 'flex', cursor: 'pointer', padding: 4, transition: 'color 0.2s' }}
                            onMouseEnter={e => e.currentTarget.style.color = '#e05555'}
                            onMouseLeave={e => e.currentTarget.style.color = '#444'}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div style={{ padding: '20px 24px', borderTop: '1px solid #2a2a2a', background: '#0f0f0f' }}>
            {/* Promo */}
            {subtotal > 100 && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: 'rgba(76,175,125,0.1)', border: '1px solid rgba(76,175,125,0.2)',
                borderRadius: 4, padding: '8px 12px', marginBottom: 16, fontSize: 12, color: '#4caf7d',
              }}>
                <Tag size={13} /> You've unlocked free shipping!
              </div>
            )}

            {/* Summary */}
            <div style={{ marginBottom: 16 }}>
              {[
                ['Subtotal', `$${subtotal.toFixed(2)}`],
                ['Shipping', shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`],
                ['Tax (15%)', `$${tax.toFixed(2)}`],
              ].map(([label, value]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 13, color: '#666' }}>{label}</span>
                  <span style={{ fontSize: 13, color: value === 'FREE' ? '#4caf7d' : '#888' }}>{value}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid #2a2a2a', marginTop: 4 }}>
                <span style={{ fontWeight: 700, fontSize: 16 }}>Total</span>
                <span style={{ fontWeight: 800, fontSize: 20, color: '#c9a84c' }}>${total.toFixed(2)}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              onClick={() => setSidebarOpen(false)}
              className="btn btn-primary"
              style={{ width: '100%', fontSize: 15, padding: '14px 24px' }}
            >
              Proceed to Checkout <ArrowRight size={16} />
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              style={{
                width: '100%', marginTop: 10,
                background: 'none', border: 'none',
                color: '#555', fontSize: 13, cursor: 'pointer',
                padding: '8px', transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#888'}
              onMouseLeave={e => e.currentTarget.style.color = '#555'}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
