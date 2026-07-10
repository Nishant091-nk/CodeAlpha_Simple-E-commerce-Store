import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, ShoppingBag, TrendingUp, DollarSign, Users, ArrowRight } from 'lucide-react';
import { AdminLayout } from './AdminLayout';
import api from '../../services/api';

const StatCard = ({ icon: Icon, label, value, color, sub }) => (
  <div style={{
    background: '#111', border: '1px solid #1e1e1e', borderRadius: 10,
    padding: '24px', display: 'flex', flexDirection: 'column', gap: 12,
    transition: 'border-color 0.2s',
  }}
    onMouseEnter={e => e.currentTarget.style.borderColor = color}
    onMouseLeave={e => e.currentTarget.style.borderColor = '#1e1e1e'}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div style={{ width: 44, height: 44, borderRadius: 10, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon size={20} color={color} />
      </div>
    </div>
    <div>
      <div style={{ fontSize: 28, fontWeight: 700, color: '#f0ede8', fontFamily: "'Playfair Display', serif" }}>{value}</div>
      <div style={{ fontSize: 13, color: '#555', marginTop: 4 }}>{label}</div>
      {sub && <div style={{ fontSize: 12, color: '#3a3', marginTop: 6 }}>{sub}</div>}
    </div>
  </div>
);

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, orders: 0, revenue: 0, users: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [prodRes, orderRes] = await Promise.all([
          api.get('/products?limit=1'),
          api.get('/orders'),
        ]);
        const orders = orderRes.data || [];
        const revenue = orders.reduce((acc, o) => acc + (o.totalPrice || 0), 0);
        setStats({
          products: prodRes.data.total || 0,
          orders: orders.length,
          revenue: revenue.toFixed(2),
        });
        setRecentOrders(orders.slice(0, 5));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statusColor = { pending: '#c9a84c', processing: '#5b8dd9', shipped: '#9b59b6', delivered: '#27ae60', cancelled: '#e05555' };

  return (
    <AdminLayout>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, marginBottom: 6 }}>Dashboard</h1>
        <p style={{ color: '#555', fontSize: 14 }}>Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 40 }}>
        <StatCard icon={Package} label="Total Products" value={loading ? '—' : stats.products} color="#c9a84c" />
        <StatCard icon={ShoppingBag} label="Total Orders" value={loading ? '—' : stats.orders} color="#5b8dd9" />
        <StatCard icon={DollarSign} label="Total Revenue" value={loading ? '—' : `$${stats.revenue}`} color="#27ae60" />
      </div>

      {/* Quick Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginBottom: 40 }}>
        <Link to="/admin/products/new" style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '20px 24px', background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 10, textDecoration: 'none', transition: 'all 0.2s', color: '#f0ede8' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.14)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.08)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)'; }}>
          <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(201,168,76,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c9a84c', fontSize: 22, fontWeight: 700 }}>+</div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 15 }}>Add New Product</div>
            <div style={{ fontSize: 12, color: '#666', marginTop: 2 }}>Create a product listing</div>
          </div>
          <ArrowRight size={16} style={{ marginLeft: 'auto', color: '#c9a84c' }} />
        </Link>
        <Link to="/admin/orders" style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '20px 24px', background: 'rgba(91,141,217,0.08)', border: '1px solid rgba(91,141,217,0.2)', borderRadius: 10, textDecoration: 'none', transition: 'all 0.2s', color: '#f0ede8' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(91,141,217,0.14)'; e.currentTarget.style.borderColor = 'rgba(91,141,217,0.4)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(91,141,217,0.08)'; e.currentTarget.style.borderColor = 'rgba(91,141,217,0.2)'; }}>
          <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(91,141,217,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShoppingBag size={20} color="#5b8dd9" />
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 15 }}>Manage Orders</div>
            <div style={{ fontSize: 12, color: '#666', marginTop: 2 }}>Update status & track</div>
          </div>
          <ArrowRight size={16} style={{ marginLeft: 'auto', color: '#5b8dd9' }} />
        </Link>
      </div>

      {/* Recent Orders */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22 }}>Recent Orders</h2>
          <Link to="/admin/orders" style={{ fontSize: 13, color: '#c9a84c', textDecoration: 'none' }}>View all →</Link>
        </div>
        <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 10, overflow: 'hidden' }}>
          {loading ? (
            <div style={{ padding: 40, textAlign: 'center', color: '#444' }}>Loading...</div>
          ) : recentOrders.length === 0 ? (
            <div style={{ padding: 40, textAlign: 'center', color: '#444' }}>No orders yet</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1e1e1e' }}>
                  {['Order ID', 'Customer', 'Total', 'Status', 'Date'].map(h => (
                    <th key={h} style={{ padding: '14px 20px', textAlign: 'left', fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: '#444', fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, idx) => (
                  <tr key={order._id} style={{ borderBottom: idx < recentOrders.length - 1 ? '1px solid #161616' : 'none', transition: 'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#141414'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <td style={{ padding: '14px 20px', fontSize: 13, color: '#c9a84c', fontFamily: 'monospace' }}>#{order._id.slice(-6).toUpperCase()}</td>
                    <td style={{ padding: '14px 20px', fontSize: 13, color: '#f0ede8' }}>{order.user?.name || 'Guest'}</td>
                    <td style={{ padding: '14px 20px', fontSize: 13, color: '#f0ede8', fontWeight: 600 }}>${order.totalPrice?.toFixed(2)}</td>
                    <td style={{ padding: '14px 20px' }}>
                      <span style={{ padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, background: `${statusColor[order.status] || '#555'}18`, color: statusColor[order.status] || '#555', border: `1px solid ${statusColor[order.status] || '#555'}40` }}>
                        {order.status}
                      </span>
                    </td>
                    <td style={{ padding: '14px 20px', fontSize: 12, color: '#555' }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
