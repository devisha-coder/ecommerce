import { useState, useEffect } from 'react';
import { getMyOrders } from '../utils/api';

const statusColor = { Processing: '#c8a96e', Shipped: '#52c4c4', Delivered: '#52c478', Cancelled: '#e05252' };

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyOrders().then(r => setOrders(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Loading orders…</div>;

  return (
    <div className="container" style={{ paddingTop: 48, paddingBottom: 80 }}>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, marginBottom: 40 }}>My Orders</h1>
      {orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>📦</div>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, marginBottom: 8 }}>No orders yet</h3>
          <p style={{ color: '#9a9a8a' }}>Your order history will appear here.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {orders.map(order => (
            <div key={order._id} style={{ background: '#161616', border: '1px solid #2a2a2a', borderRadius: 12, padding: 28 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <div style={{ fontSize: 12, color: '#9a9a8a', marginBottom: 4 }}>Order ID</div>
                  <div style={{ fontFamily: 'monospace', fontSize: 13, color: '#c8a96e' }}>{order._id}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 12, color: '#9a9a8a', marginBottom: 6 }}>{new Date(order.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                  <span style={{ background: `${statusColor[order.orderStatus]}22`, color: statusColor[order.orderStatus], border: `1px solid ${statusColor[order.orderStatus]}44`, padding: '4px 12px', borderRadius: 999, fontSize: 12, fontWeight: 600 }}>
                    {order.orderStatus}
                  </span>
                </div>
              </div>

              <div style={{ borderTop: '1px solid #2a2a2a', paddingTop: 16, marginBottom: 16 }}>
                {order.items.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: i < order.items.length - 1 ? 12 : 0 }}>
                    <img src={item.image} alt={item.name} style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 6, border: '1px solid #2a2a2a' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 15, fontWeight: 500 }}>{item.name}</div>
                      <div style={{ fontSize: 13, color: '#9a9a8a' }}>Qty: {item.quantity} × ₹{item.price.toLocaleString()}</div>
                    </div>
                    <div style={{ fontWeight: 600, color: '#c8a96e' }}>₹{(item.price * item.quantity).toLocaleString()}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #2a2a2a', paddingTop: 16, flexWrap: 'wrap', gap: 12 }}>
                <div style={{ fontSize: 13, color: '#9a9a8a' }}>
                  Payment: <span style={{ color: '#f5f0e8' }}>{order.paymentMethod}</span> ·{' '}
                  <span style={{ color: order.paymentStatus === 'Paid' ? '#52c478' : '#c8a96e' }}>{order.paymentStatus}</span>
                </div>
                <div style={{ fontWeight: 700, fontSize: 18 }}>Total: <span style={{ color: '#c8a96e' }}>₹{order.total.toLocaleString()}</span></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
