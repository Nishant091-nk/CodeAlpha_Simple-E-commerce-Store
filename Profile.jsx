import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingBag, CreditCard, MapPin, ChevronRight, Check } from 'lucide-react';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const STEPS = ['Cart Review', 'Shipping', 'Payment'];

export default function Checkout() {
  const { cart, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({ street: '', city: '', state: '', zip: '', country: 'United States' });
  const [payment, setPayment] = useState({ method: 'Card', cardNumber: '', expiry: '', cvv: '' });

  const shipping = subtotal > 100 ? 0 : 10;
  const tax = Math.round(subtotal * 0.15 * 100) / 100;
  const total = subtotal + shipping + tax;

  const handleOrder = async () => {
    setLoading(true);
    try {
      const items = cart.map(i => ({
        product: i.product._id,
        name: i.product.name,
        image: i.product.images?.[0],
        price: i.product.price,
        quantity: i.quantity,
      }));
      await api.post('/orders', { items, shippingAddress: address, paymentMethod: payment.method });
      await clearCart();
      toast.success('Order placed successfully! 🎉');
      navigate('/orders');
    } catch (e) {
      toast.error(e.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
        <ShoppingBag size={56} color="#333" />
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: '#666' }}>Your cart is empty</h2>
        <Link to="/products" className="btn btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '40px 24px' }}>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, marginBottom: 40 }}>Checkout</h1>

      {/* Steps */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 48 }}>
        {STEPS.map((s, i) => (
          <div key={s} style={{ display: 'flex', alignItems: 'center', flex: i < STEPS.length - 1 ? 1 : 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 34, height: 34, borderRadius: '50%',
                background: i < step ? '#4caf7d' : i === step ? '#c9a84c' : '#1e1e1e',
                border: `2px solid ${i < step ? '#4caf7d' : i === step ? '#c9a84c' : '#2a2a2a'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 700,
                color: i <= step ? '#0a0a0a' : '#555',
                transition: 'all 0.3s',
              }}>
                {i < step ? <Check size={16} /> : i + 1}
              </div>
              <span style={{ fontSize: 13, fontWeight: i === step ? 600 : 400, color: i === step ? '#f0ede8' : '#555' }}>{s}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div style={{ flex: 1, height: 1, background: i < step ? '#4caf7d' : '#2a2a2a', margin: '0 16px', transition: 'background 0.3s' }} />
            )}
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 48 }}>
        {/* ─── Left Panel ─── */}
        <div>
          {/* Step 0: Cart Review */}
          {step === 0 && (
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, marginBottom: 24 }}>Review Your Cart</h2>
              {cart.map(item => {
                const p = item.product;
                if (!p) return null;
                const img = p.images?.[0] || `https://picsum.photos/seed/${p._id}/80/80`;
                return (
                  <div key={item._id} style={{ display: 'flex', gap: 16, padding: '20px 0', borderBottom: '1px solid #1e1e1e' }}>
                    <img src={img} alt={p.name} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 6, background: '#1e1e1e' }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, marginBottom: 4 }}>{p.name}</p>
                      <p style={{ color: '#555', fontSize: 13, marginBottom: 8 }}>{p.category}</p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: '#888', fontSize: 13 }}>Qty: {item.quantity}</span>
                        <span style={{ color: '#c9a84c', fontWeight: 700, fontSize: 16 }}>${(p.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
              <button onClick={() => setStep(1)} className="btn btn-primary" style={{ marginTop: 32, padding: '14px 36px', fontSize: 15 }}>
                Continue to Shipping <ChevronRight size={16} />
              </button>
            </div>
          )}

          {/* Step 1: Shipping */}
          {step === 1 && (
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
                <MapPin size={22} color="#c9a84c" /> Shipping Address
              </h2>
              <div style={{ display: 'grid', gap: 16 }}>
                <div>
                  <label style={{ fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: '#888', display: 'block', marginBottom: 8 }}>Street Address</label>
                  <input value={address.street} onChange={e => setAddress(a => ({ ...a, street: e.target.value }))} placeholder="123 Main Street" required />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={{ fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: '#888', display: 'block', marginBottom: 8 }}>City</label>
                    <input value={address.city} onChange={e => setAddress(a => ({ ...a, city: e.target.value }))} placeholder="New York" required />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: '#888', display: 'block', marginBottom: 8 }}>State</label>
                    <input value={address.state} onChange={e => setAddress(a => ({ ...a, state: e.target.value }))} placeholder="NY" required />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={{ fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: '#888', display: 'block', marginBottom: 8 }}>ZIP Code</label>
                    <input value={address.zip} onChange={e => setAddress(a => ({ ...a, zip: e.target.value }))} placeholder="10001" required />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: '#888', display: 'block', marginBottom: 8 }}>Country</label>
                    <input value={address.country} onChange={e => setAddress(a => ({ ...a, country: e.target.value }))} required />
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 16, marginTop: 32 }}>
                <button onClick={() => setStep(0)} className="btn btn-ghost" style={{ padding: '14px 28px' }}>Back</button>
                <button
                  onClick={() => { if (!address.street || !address.city || !address.state || !address.zip) { toast.error('Please fill all fields'); return; } setStep(2); }}
                  className="btn btn-primary" style={{ padding: '14px 36px', fontSize: 15 }}
                >
                  Continue to Payment <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
                <CreditCard size={22} color="#c9a84c" /> Payment
              </h2>

              <div style={{ display: 'flex', gap: 16, marginBottom: 28 }}>
                {['Card', 'PayPal', 'Bank Transfer'].map(m => (
                  <button
                    key={m}
                    onClick={() => setPayment(p => ({ ...p, method: m }))}
                    style={{
                      flex: 1, padding: '12px 0', borderRadius: 4, cursor: 'pointer', fontFamily: 'inherit',
                      background: payment.method === m ? 'rgba(201,168,76,0.1)' : '#141414',
                      border: `1px solid ${payment.method === m ? '#c9a84c' : '#2a2a2a'}`,
                      color: payment.method === m ? '#c9a84c' : '#666', fontSize: 13, fontWeight: 500,
                      transition: 'all 0.2s',
                    }}
                  >
                    {m}
                  </button>
                ))}
              </div>

              {payment.method === 'Card' && (
                <div style={{ display: 'grid', gap: 16 }}>
                  <div>
                    <label style={{ fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: '#888', display: 'block', marginBottom: 8 }}>Card Number</label>
                    <input value={payment.cardNumber} onChange={e => setPayment(p => ({ ...p, cardNumber: e.target.value }))} placeholder="4242 4242 4242 4242" maxLength={19} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div>
                      <label style={{ fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: '#888', display: 'block', marginBottom: 8 }}>Expiry</label>
                      <input value={payment.expiry} onChange={e => setPayment(p => ({ ...p, expiry: e.target.value }))} placeholder="MM/YY" maxLength={5} />
                    </div>
                    <div>
                      <label style={{ fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: '#888', display: 'block', marginBottom: 8 }}>CVV</label>
                      <input value={payment.cvv} onChange={e => setPayment(p => ({ ...p, cvv: e.target.value }))} placeholder="123" maxLength={4} type="password" />
                    </div>
                  </div>
                </div>
              )}

              {payment.method !== 'Card' && (
                <div className="alert alert-info">
                  You'll be redirected to complete payment via {payment.method} after placing the order.
                </div>
              )}

              <div style={{ display: 'flex', gap: 16, marginTop: 32 }}>
                <button onClick={() => setStep(1)} className="btn btn-ghost" style={{ padding: '14px 28px' }}>Back</button>
                <button onClick={handleOrder} className="btn btn-primary" style={{ padding: '14px 36px', fontSize: 15 }} disabled={loading}>
                  {loading ? 'Placing Order...' : `Place Order — $${total.toFixed(2)}`}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ─── Order Summary ─── */}
        <div>
          <div style={{ background: '#141414', border: '1px solid #2a2a2a', borderRadius: 10, padding: 28, position: 'sticky', top: 88 }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, marginBottom: 20 }}>Order Summary</h3>

            <div style={{ marginBottom: 20, maxHeight: 280, overflowY: 'auto' }}>
              {cart.map(item => (
                <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.product?.name}</p>
                    <p style={{ fontSize: 12, color: '#555' }}>× {item.quantity}</p>
                  </div>
                  <span style={{ fontSize: 13, color: '#888', flexShrink: 0, marginLeft: 12 }}>
                    ${(item.product?.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <hr className="divider" />

            {[
              ['Subtotal', `$${subtotal.toFixed(2)}`],
              ['Shipping', shipping === 0 ? 'FREE ✓' : `$${shipping.toFixed(2)}`],
              ['Tax (15%)', `$${tax.toFixed(2)}`],
            ].map(([label, value]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontSize: 13, color: '#666' }}>{label}</span>
                <span style={{ fontSize: 13, color: value.includes('FREE') ? '#4caf7d' : '#888' }}>{value}</span>
              </div>
            ))}

            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 16, borderTop: '1px solid #2a2a2a', marginTop: 8 }}>
              <span style={{ fontWeight: 700, fontSize: 16 }}>Total</span>
              <span style={{ fontWeight: 800, fontSize: 22, color: '#c9a84c' }}>${total.toFixed(2)}</span>
            </div>

            {subtotal > 100 && (
              <div style={{ marginTop: 16, padding: '10px 14px', background: 'rgba(76,175,125,0.1)', border: '1px solid rgba(76,175,125,0.2)', borderRadius: 4, fontSize: 12, color: '#4caf7d' }}>
                🎉 You saved ${shipping === 0 ? '10.00' : '0.00'} on shipping!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
