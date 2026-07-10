import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, User, LogOut, Search, Menu, X, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { itemCount, setSidebarOpen } = useCart();
  const [search, setSearch] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?keyword=${encodeURIComponent(search.trim())}`);
      setSearch('');
    }
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Shop' },
    { to: '/products?category=Electronics', label: 'Electronics' },
    { to: '/products?category=Clothing', label: 'Clothing' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path.split('?')[0]) && path !== '/';
  };

  return (
    <>
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: scrolled ? 'rgba(10,10,10,0.98)' : 'rgba(10,10,10,0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid #1e1e1e',
        transition: 'background 0.3s',
        boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.6)' : 'none',
      }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', height: 68, gap: 32 }}>
            {/* Logo */}
            <Link to="/" style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 26, fontWeight: 700,
              color: '#c9a84c', letterSpacing: 3,
              flexShrink: 0, textDecoration: 'none',
            }}>
              LUXE
            </Link>

            {/* Nav Links — Desktop */}
            <div style={{ display: 'flex', gap: 28, flex: 1 }} className="desktop-nav">
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to} to={to}
                  style={{
                    fontSize: 13, letterSpacing: 1.2, textTransform: 'uppercase',
                    color: isActive(to) ? '#c9a84c' : '#666',
                    transition: 'color 0.2s', fontWeight: 500,
                    borderBottom: isActive(to) ? '1px solid #c9a84c' : '1px solid transparent',
                    paddingBottom: 2,
                  }}
                  onMouseEnter={e => !isActive(to) && (e.target.style.color = '#f0ede8')}
                  onMouseLeave={e => !isActive(to) && (e.target.style.color = '#666')}
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Search */}
            <form onSubmit={handleSearch} style={{
              display: 'flex', alignItems: 'center',
              background: '#141414', border: '1px solid #2a2a2a',
              borderRadius: 4, overflow: 'hidden',
              flex: 1, maxWidth: 280, transition: 'border-color 0.2s',
            }}
              onFocus={e => e.currentTarget.style.borderColor = '#c9a84c'}
              onBlur={e => e.currentTarget.style.borderColor = '#2a2a2a'}
            >
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search products..."
                style={{
                  background: 'transparent', border: 'none',
                  padding: '9px 14px', fontSize: 13, flex: 1,
                  color: '#f0ede8', outline: 'none', width: 'auto',
                  boxShadow: 'none',
                }}
              />
              <button type="submit" style={{
                background: 'none', border: 'none', padding: '9px 12px',
                color: '#555', display: 'flex', cursor: 'pointer',
                transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.color = '#c9a84c'}
                onMouseLeave={e => e.currentTarget.style.color = '#555'}
              >
                <Search size={15} />
              </button>
            </form>

            {/* Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
              {/* Cart */}
              <button
                onClick={() => setSidebarOpen(true)}
                style={{
                  position: 'relative', background: 'none', border: 'none',
                  color: '#f0ede8', padding: 10, borderRadius: 4,
                  transition: 'color 0.2s', display: 'flex',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#c9a84c'}
                onMouseLeave={e => e.currentTarget.style.color = '#f0ede8'}
              >
                <ShoppingBag size={20} />
                {itemCount > 0 && (
                  <span style={{
                    position: 'absolute', top: 4, right: 4,
                    background: '#c9a84c', color: '#0a0a0a',
                    borderRadius: '50%', width: 17, height: 17,
                    fontSize: 10, fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    animation: 'fadeIn 0.2s ease',
                  }}>
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </button>

              {/* User */}
              {user ? (
                <div ref={userMenuRef} style={{ position: 'relative' }}>
                  <button
                    onClick={() => setUserMenuOpen(o => !o)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      background: '#1e1e1e', border: '1px solid #2a2a2a',
                      color: '#f0ede8', padding: '8px 14px', borderRadius: 4,
                      fontSize: 13, transition: 'border-color 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = '#c9a84c'}
                    onMouseLeave={e => { if (!userMenuOpen) e.currentTarget.style.borderColor = '#2a2a2a'; }}
                  >
                    <User size={15} />
                    <span style={{ maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {user.name.split(' ')[0]}
                    </span>
                    <ChevronDown size={13} style={{ transition: 'transform 0.2s', transform: userMenuOpen ? 'rotate(180deg)' : 'none' }} />
                  </button>

                  {userMenuOpen && (
                    <div style={{
                      position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                      background: '#141414', border: '1px solid #2a2a2a',
                      borderRadius: 8, minWidth: 180, zIndex: 200,
                      boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
                      animation: 'fadeIn 0.15s ease',
                    }}>
                      <div style={{ padding: '12px 16px', borderBottom: '1px solid #2a2a2a' }}>
                        <p style={{ fontSize: 13, fontWeight: 600 }}>{user.name}</p>
                        <p style={{ fontSize: 12, color: '#555' }}>{user.email}</p>
                      </div>
                      {[
                        { to: '/orders', label: 'My Orders' },
                        { to: '/profile', label: 'Profile' },
                        ...(user.role === 'admin' ? [{ to: '/admin', label: 'Admin Dashboard' }] : []),
                      ].map(item => (
                        <Link
                          key={item.to} to={item.to}
                          onClick={() => setUserMenuOpen(false)}
                          style={{
                            display: 'block', padding: '10px 16px',
                            fontSize: 13, color: '#888', transition: 'all 0.15s',
                          }}
                          onMouseEnter={e => { e.target.style.color = '#f0ede8'; e.target.style.background = '#1e1e1e'; }}
                          onMouseLeave={e => { e.target.style.color = '#888'; e.target.style.background = 'none'; }}
                        >
                          {item.label}
                        </Link>
                      ))}
                      <div style={{ borderTop: '1px solid #2a2a2a' }}>
                        <button
                          onClick={() => { logout(); setUserMenuOpen(false); navigate('/'); }}
                          style={{
                            width: '100%', padding: '10px 16px', textAlign: 'left',
                            background: 'none', border: 'none', color: '#e05555',
                            fontSize: 13, display: 'flex', alignItems: 'center', gap: 8,
                            cursor: 'pointer', transition: 'background 0.15s',
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = '#1e1e1e'}
                          onMouseLeave={e => e.currentTarget.style.background = 'none'}
                        >
                          <LogOut size={14} /> Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ display: 'flex', gap: 8 }}>
                  <Link to="/login" className="btn btn-ghost btn-sm">Login</Link>
                  <Link to="/register" className="btn btn-primary btn-sm">Sign Up</Link>
                </div>
              )}

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(o => !o)}
                style={{ background: 'none', border: 'none', color: '#f0ede8', padding: 8, display: 'none' }}
                className="mobile-menu-btn"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div style={{
            background: '#0f0f0f', borderTop: '1px solid #1e1e1e',
            padding: '16px 24px', animation: 'fadeIn 0.2s ease',
          }}>
            {navLinks.map(({ to, label }) => (
              <Link key={to} to={to} style={{
                display: 'block', padding: '12px 0',
                borderBottom: '1px solid #1a1a1a',
                fontSize: 14, color: isActive(to) ? '#c9a84c' : '#888',
                letterSpacing: 1, textTransform: 'uppercase',
              }}>
                {label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
