import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Package, ShoppingBag, Users, LogOut,
  TrendingUp, DollarSign, AlertCircle, ChevronRight, Menu, X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

const NAV = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
  { to: '/admin/products', icon: Package, label: 'Products' },
  { to: '/admin/orders', icon: ShoppingBag, label: 'Orders' },
];

export function AdminLayout({ children }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/'); };

  const isActive = (to, exact) =>
    exact ? location.pathname === to : location.pathname.startsWith(to);

  const sidebarStyle = {
    width: 240, minHeight: '100vh', background: '#0d0d0d',
    borderRight: '1px solid #1e1e1e', display: 'flex', flexDirection: 'column',
    position: 'fixed', top: 0, left: 0, zIndex: 100,
    transform: open ? 'translateX(0)' : undefined,
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0a0a' }}>
      {/* Mobile overlay */}
      {open && (
        <div onClick={() => setOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 99 }} />
      )}

      {/* Sidebar */}
      <aside style={sidebarStyle}>
        {/* Logo */}
        <div style={{ padding: '24px 20px', borderBottom: '1px solid #1e1e1e', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: '#c9a84c', letterSpacing: 2 }}>LUXE</div>
            <div style={{ fontSize: 10, letterSpacing: 3, color: '#444', textTransform: 'uppercase', marginTop: 2 }}>Admin Panel</div>
          </div>
          <button onClick={() => setOpen(false)} style={{ display: 'none', background: 'none', border: 'none', color: '#666', cursor: 'pointer' }} className="admin-close-btn">
            <X size={18} />
          </button>
        </div>

        {/* User Badge */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #1e1e1e' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c9a84c', fontWeight: 700, fontSize: 14 }}>
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#f0ede8' }}>{user?.name}</div>
              <div style={{ fontSize: 11, color: '#c9a84c', textTransform: 'uppercase', letterSpacing: 1 }}>Administrator</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {NAV.map(({ to, icon: Icon, label, exact }) => {
            const active = isActive(to, exact);
            return (
              <Link key={to} to={to}
                onClick={() => setOpen(false)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '10px 12px', borderRadius: 6,
                  background: active ? 'rgba(201,168,76,0.12)' : 'transparent',
                  border: `1px solid ${active ? 'rgba(201,168,76,0.25)' : 'transparent'}`,
                  color: active ? '#c9a84c' : '#666',
                  fontSize: 14, fontWeight: active ? 600 : 400,
                  textDecoration: 'none', transition: 'all 0.15s',
                }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.color = '#f0ede8'; e.currentTarget.style.background = '#141414'; } }}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.color = '#666'; e.currentTarget.style.background = 'transparent'; } }}
              >
                <Icon size={17} />
                {label}
                {active && <ChevronRight size={14} style={{ marginLeft: 'auto', opacity: 0.6 }} />}
              </Link>
            );
          })}
        </nav>

        {/* Footer Nav */}
        <div style={{ padding: '12px', borderTop: '1px solid #1e1e1e', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 6, color: '#555', fontSize: 13, textDecoration: 'none', transition: 'color 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#f0ede8'}
            onMouseLeave={e => e.currentTarget.style.color = '#555'}>
            ← Back to Store
          </Link>
          <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 6, color: '#555', fontSize: 13, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', transition: 'color 0.15s', width: '100%', textAlign: 'left' }}
            onMouseEnter={e => e.currentTarget.style.color = '#e05555'}
            onMouseLeave={e => e.currentTarget.style.color = '#555'}>
            <LogOut size={15} /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ marginLeft: 240, flex: 1, minHeight: '100vh' }}>
        {/* Mobile top bar */}
        <div style={{ display: 'none', padding: '16px 20px', background: '#0d0d0d', borderBottom: '1px solid #1e1e1e', alignItems: 'center', gap: 12 }} className="admin-mobile-bar">
          <button onClick={() => setOpen(true)} style={{ background: 'none', border: 'none', color: '#c9a84c', cursor: 'pointer' }}>
            <Menu size={22} />
          </button>
          <span style={{ fontFamily: "'Playfair Display', serif", color: '#c9a84c', fontSize: 18 }}>LUXE Admin</span>
        </div>
        <div style={{ padding: '32px 36px' }}>
          {children}
        </div>
      </main>

      <style>{`
        @media (max-width: 768px) {
          .admin-mobile-bar { display: flex !important; }
          .admin-close-btn { display: flex !important; }
          main { margin-left: 0 !important; }
          aside { transform: translateX(-100%) !important; }
          aside[style*="translateX(0)"] { transform: translateX(0) !important; }
        }
      `}</style>
    </div>
  );
}
