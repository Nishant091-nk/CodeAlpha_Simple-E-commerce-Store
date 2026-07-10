import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  const columns = [
    {
      title: 'Shop',
      links: [
        { label: 'All Products', to: '/products' },
        { label: 'Electronics', to: '/products?category=Electronics' },
        { label: 'Clothing', to: '/products?category=Clothing' },
        { label: 'Home & Living', to: '/products?category=Home' },
        { label: 'Sports', to: '/products?category=Sports' },
      ],
    },
    {
      title: 'Account',
      links: [
        { label: 'Sign In', to: '/login' },
        { label: 'Create Account', to: '/register' },
        { label: 'My Orders', to: '/orders' },
        { label: 'Profile', to: '/profile' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'FAQ', to: '#' },
        { label: 'Shipping Policy', to: '#' },
        { label: 'Return Policy', to: '#' },
        { label: 'Contact Us', to: '#' },
      ],
    },
  ];

  return (
    <footer style={{ background: '#080808', borderTop: '1px solid #1e1e1e' }}>
      {/* Newsletter */}
      <div style={{
        borderBottom: '1px solid #1e1e1e',
        padding: '48px 0',
        background: 'linear-gradient(135deg, rgba(201,168,76,0.05) 0%, transparent 100%)',
      }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, marginBottom: 8 }}>
            Stay in the Loop
          </h3>
          <p style={{ color: '#555', marginBottom: 24, fontSize: 14 }}>
            Subscribe for exclusive offers and new arrivals
          </p>
          <div style={{ display: 'flex', maxWidth: 420, margin: '0 auto', gap: 0 }}>
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                borderRadius: '4px 0 0 4px', border: '1px solid #2a2a2a',
                borderRight: 'none', fontSize: 14,
              }}
            />
            <button
              className="btn btn-primary"
              style={{ borderRadius: '0 4px 4px 0', whiteSpace: 'nowrap', padding: '12px 20px' }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container" style={{ padding: '60px 24px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <Link to="/" style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, color: '#c9a84c', letterSpacing: 3, display: 'block', marginBottom: 16 }}>
              LUXE
            </Link>
            <p style={{ color: '#444', fontSize: 13, lineHeight: 1.9, marginBottom: 24, maxWidth: 280 }}>
              Curating premium products for the modern lifestyle. Quality you can trust, style you'll love.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a
                  key={i} href="#"
                  style={{
                    width: 36, height: 36, borderRadius: 4,
                    background: '#141414', border: '1px solid #2a2a2a',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#555', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#c9a84c'; e.currentTarget.style.color = '#c9a84c'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a2a2a'; e.currentTarget.style.color = '#555'; }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {columns.map(col => (
            <div key={col.title}>
              <h4 style={{
                fontSize: 11, letterSpacing: 2.5, textTransform: 'uppercase',
                color: '#c9a84c', marginBottom: 20, fontFamily: "'DM Sans', sans-serif",
              }}>
                {col.title}
              </h4>
              <ul style={{ listStyle: 'none' }}>
                {col.links.map(link => (
                  <li key={link.label} style={{ marginBottom: 10 }}>
                    <Link
                      to={link.to}
                      style={{ fontSize: 13, color: '#444', transition: 'color 0.2s', lineHeight: 1.5 }}
                      onMouseEnter={e => e.target.style.color = '#c9a84c'}
                      onMouseLeave={e => e.target.style.color = '#444'}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact strip */}
        <div style={{
          display: 'flex', gap: 32, flexWrap: 'wrap',
          padding: '24px 0', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a',
          marginBottom: 32,
        }}>
          {[
            { Icon: Mail, text: 'support@luxestore.com' },
            { Icon: Phone, text: '+1 (800) LUXE-SHOP' },
            { Icon: MapPin, text: '123 Commerce St, New York, NY' },
          ].map(({ Icon, text }) => (
            <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#444', fontSize: 13 }}>
              <Icon size={14} color="#c9a84c" />
              <span>{text}</span>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <p style={{ fontSize: 12, color: '#333' }}>
            © {year} LUXE Store. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(item => (
              <a
                key={item} href="#"
                style={{ fontSize: 12, color: '#333', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#c9a84c'}
                onMouseLeave={e => e.target.style.color = '#333'}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
