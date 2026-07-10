import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Truck, RefreshCw, Star, ChevronRight } from 'lucide-react';
import api from '../services/api';
import ProductCard from '../components/ProductCard';

const CATEGORIES = [
  { name: 'Electronics', emoji: '💻', color: '#4a9eff' },
  { name: 'Clothing', emoji: '👗', color: '#ff6b9d' },
  { name: 'Books', emoji: '📚', color: '#c9a84c' },
  { name: 'Home', emoji: '🏡', color: '#4caf7d' },
  { name: 'Sports', emoji: '⚽', color: '#ff8c42' },
  { name: 'Beauty', emoji: '✨', color: '#a855f7' },
];

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/products/featured')
      .then(r => setFeatured(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* ─── Hero ─── */}
      <section style={{
        minHeight: '88vh',
        display: 'flex', alignItems: 'center',
        position: 'relative', overflow: 'hidden',
        background: 'radial-gradient(ellipse at 25% 60%, #1a1408 0%, #0a0a0a 55%), radial-gradient(ellipse at 80% 20%, #0d100a 0%, transparent 60%)',
      }}>
        {/* Decorative elements */}
        <div style={{ position: 'absolute', top: '10%', right: '8%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '5%', right: '20%', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '30%', right: '12%', width: 1, height: 200, background: 'linear-gradient(transparent, rgba(201,168,76,0.3), transparent)', pointerEvents: 'none' }} />

        <div className="container">
          <div style={{ maxWidth: 620, animation: 'fadeUp 0.7s ease forwards' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
              <div style={{ height: 1, width: 40, background: '#c9a84c' }} />
              <span style={{ fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', color: '#c9a84c', fontWeight: 600 }}>
                Premium Collection 2025
              </span>
            </div>

            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(44px, 6.5vw, 80px)',
              lineHeight: 1.08, marginBottom: 28,
              color: '#f0ede8', fontWeight: 700,
            }}>
              Where Style
              <br />
              Meets{' '}
              <em style={{ color: '#c9a84c', fontStyle: 'italic' }}>Excellence</em>
            </h1>

            <p style={{
              color: '#666', fontSize: 18, lineHeight: 1.9,
              marginBottom: 44, maxWidth: 500,
            }}>
              Explore a handpicked selection of premium products crafted for those who demand nothing but the finest.
            </p>

            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link to="/products" className="btn btn-primary btn-lg">
                Shop Collection <ArrowRight size={18} />
              </Link>
              <Link to="/products?featured=true" className="btn btn-outline btn-lg">
                View Featured
              </Link>
            </div>

            {/* Social proof */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 48 }}>
              <div style={{ display: 'flex' }}>
                {[1, 2, 3, 4].map(i => (
                  <div key={i} style={{ width: 36, height: 36, borderRadius: '50%', background: `hsl(${i * 60}, 30%, 25%)`, border: '2px solid #0a0a0a', marginLeft: i > 1 ? -10 : 0 }} />
                ))}
              </div>
              <div>
                <div style={{ display: 'flex', gap: 2, marginBottom: 2 }}>
                  {[1,2,3,4,5].map(s => <Star key={s} size={12} fill="#c9a84c" color="#c9a84c" />)}
                </div>
                <span style={{ fontSize: 12, color: '#555' }}>Trusted by 10,000+ customers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Trust Badges ─── */}
      <section style={{ padding: '0', background: '#0d0d0d', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {[
              { icon: <Truck size={20} />, title: 'Free Shipping', desc: 'On all orders over $100' },
              { icon: <Shield size={20} />, title: 'Secure Checkout', desc: 'Bank-grade encryption' },
              { icon: <RefreshCw size={20} />, title: '30-Day Returns', desc: 'Hassle-free returns' },
            ].map((f, i) => (
              <div key={f.title} style={{
                display: 'flex', alignItems: 'center', gap: 16,
                padding: '24px 32px',
                borderRight: i < 2 ? '1px solid #1a1a1a' : 'none',
              }}>
                <div style={{ color: '#c9a84c', flexShrink: 0 }}>{f.icon}</div>
                <div>
                  <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{f.title}</p>
                  <p style={{ color: '#555', fontSize: 12 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Categories ─── */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
            <div>
              <span style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#c9a84c', display: 'block', marginBottom: 8 }}>Browse</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36 }}>Shop by Category</h2>
            </div>
            <Link to="/products" style={{ color: '#c9a84c', fontSize: 13, display: 'flex', alignItems: 'center', gap: 4 }}>
              View All <ChevronRight size={14} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 16 }}>
            {CATEGORIES.map(cat => (
              <Link
                key={cat.name}
                to={`/products?category=${cat.name}`}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  padding: '24px 12px',
                  background: '#141414', border: '1px solid #2a2a2a',
                  borderRadius: 10, textDecoration: 'none',
                  transition: 'all 0.25s', cursor: 'pointer',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = cat.color; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 12px 32px rgba(0,0,0,0.4)`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a2a2a'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <span style={{ fontSize: 32, marginBottom: 12 }}>{cat.emoji}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: 1 }}>{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Featured Products ─── */}
      <section style={{ padding: '80px 0', background: '#080808' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48 }}>
            <div>
              <span style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#c9a84c', display: 'block', marginBottom: 8 }}>Handpicked</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36 }}>Featured Products</h2>
            </div>
            <Link to="/products" className="btn btn-ghost btn-sm">
              View All <ArrowRight size={14} />
            </Link>
          </div>

          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24 }}>
              {Array(8).fill(0).map((_, i) => (
                <div key={i} className="skeleton" style={{ aspectRatio: '0.75', borderRadius: 10 }} />
              ))}
            </div>
          ) : featured.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#444' }}>
              <p style={{ fontSize: 16 }}>No featured products yet.</p>
              <Link to="/products" className="btn btn-outline" style={{ marginTop: 20 }}>Browse All Products</Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24 }}>
              {featured.slice(0, 8).map(p => <ProductCard key={p._id} product={p} />)}
            </div>
          )}
        </div>
      </section>

      {/* ─── CTA Banner ─── */}
      <section style={{
        padding: '100px 0',
        background: 'linear-gradient(135deg, #0f0c03, #0a0a0a 50%, #030a05)',
        borderTop: '1px solid #1e1e1e',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(201,168,76,0.06), transparent 60%)', pointerEvents: 'none' }} />
        <div className="container" style={{ textAlign: 'center', position: 'relative' }}>
          <span style={{ fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', color: '#c9a84c', display: 'block', marginBottom: 20 }}>
            Members Only
          </span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 5vw, 56px)', marginBottom: 20, lineHeight: 1.2 }}>
            Unlock Exclusive Access
          </h2>
          <p style={{ color: '#555', fontSize: 16, marginBottom: 40, maxWidth: 480, margin: '0 auto 40px' }}>
            Create an account to save favorites, track orders, and access member-only deals.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <Link to="/register" className="btn btn-primary btn-lg">
              Join Free — No CC Required
            </Link>
            <Link to="/login" className="btn btn-ghost btn-lg">
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
