import { useState, useEffect } from 'react';
import { getProducts, createProduct, deleteProduct, getAllOrders, updateOrderStatus } from '../utils/api';
import { toast } from 'react-toastify';

const CATEGORIES = ['Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Beauty', 'Toys', 'Other'];
const blank = { name: '', description: '', price: '', category: 'Electronics', image: '', stock: '', featured: false };

export default function AdminPage() {
  const [tab, setTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState(blank);
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (tab === 'products') {
      setLoading(true);
      getProducts({ limit: 50 }).then(r => setProducts(r.data.products)).finally(() => setLoading(false));
    } else {
      setLoading(true);
      getAllOrders().then(r => setOrders(r.data)).finally(() => setLoading(false));
    }
  }, [tab]);

  const handleAdd = async (e) => {
    e.preventDefault();
    setAdding(true);
    try {
      await createProduct({ ...form, price: Number(form.price), stock: Number(form.stock) });
      toast.success('Product added!');
      setForm(blank);
      const r = await getProducts({ limit: 50 });
      setProducts(r.data.products);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add product');
    } finally { setAdding(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try { await deleteProduct(id); setProducts(p => p.filter(x => x._id !== id)); toast.success('Deleted'); }
    catch { toast.error('Failed to delete'); }
  };

  const handleStatusChange = async (orderId, field, value) => {
    try {
      await updateOrderStatus(orderId, { [field]: value });
      setOrders(o => o.map(x => x._id === orderId ? { ...x, [field]: value } : x));
      toast.success('Status updated');
    } catch { toast.error('Failed to update'); }
  };

  const tabStyle = (t) => ({ padding: '10px 24px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14, background: tab === t ? '#c8a96e' : 'transparent', color: tab === t ? '#0d0d0d' : '#9a9a8a' });

  return (
    <div className="container" style={{ paddingTop: 48, paddingBottom: 80 }}>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, marginBottom: 8 }}>Admin Dashboard</h1>
      <p style={{ color: '#9a9a8a', marginBottom: 36 }}>Manage products and orders</p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 40, background: '#161616', border: '1px solid #2a2a2a', borderRadius: 10, padding: 6, width: 'fit-content' }}>
        <button style={tabStyle('products')} onClick={() => setTab('products')}>Products ({products.length})</button>
        <button style={tabStyle('orders')} onClick={() => setTab('orders')}>Orders ({orders.length})</button>
      </div>

      {tab === 'products' && (
        <>
          {/* Add Product Form */}
          <div style={{ background: '#161616', border: '1px solid #c8a96e44', borderRadius: 12, padding: 28, marginBottom: 40 }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, marginBottom: 24 }}>Add New Product</h3>
            <form onSubmit={handleAdd}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label>Name</label>
                  <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label>Category</label>
                  <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label>Price (₹)</label>
                  <input type="number" min="0" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} required />
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label>Stock</label>
                  <input type="number" min="0" value={form.stock} onChange={e => setForm(f => ({ ...f, stock: e.target.value }))} required />
                </div>
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} placeholder="https://…" />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} required style={{ resize: 'vertical' }} />
              </div>
              <label style={{ display: 'flex', gap: 10, alignItems: 'center', cursor: 'pointer', marginBottom: 20, fontSize: 14 }}>
                <input type="checkbox" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} style={{ width: 'auto', accentColor: '#c8a96e' }} />
                Mark as Featured
              </label>
              <button type="submit" className="btn-primary" style={{ padding: '12px 32px' }} disabled={adding}>
                {adding ? 'Adding…' : '+ Add Product'}
              </button>
            </form>
          </div>

          {/* Products table */}
          {loading ? <div className="loading">Loading…</div> : (
            <div style={{ background: '#161616', border: '1px solid #2a2a2a', borderRadius: 12, overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #2a2a2a', background: '#1e1e1e' }}>
                    {['Product', 'Category', 'Price', 'Stock', 'Featured', 'Actions'].map(h => (
                      <th key={h} style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, color: '#9a9a8a', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p._id} style={{ borderBottom: '1px solid #2a2a2a' }}>
                      <td style={{ padding: '14px 20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <img src={p.image} alt={p.name} style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 6 }} />
                          <span style={{ fontSize: 14, fontWeight: 500 }}>{p.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: '14px 20px', fontSize: 13, color: '#9a9a8a' }}>{p.category}</td>
                      <td style={{ padding: '14px 20px', fontSize: 14, color: '#c8a96e', fontWeight: 600 }}>₹{p.price.toLocaleString()}</td>
                      <td style={{ padding: '14px 20px', fontSize: 14 }}>{p.stock}</td>
                      <td style={{ padding: '14px 20px' }}>{p.featured ? '⭐' : '—'}</td>
                      <td style={{ padding: '14px 20px' }}>
                        <button className="btn-danger" style={{ padding: '6px 14px', fontSize: 12 }} onClick={() => handleDelete(p._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {tab === 'orders' && (
        loading ? <div className="loading">Loading…</div> : (
          <div style={{ background: '#161616', border: '1px solid #2a2a2a', borderRadius: 12, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #2a2a2a', background: '#1e1e1e' }}>
                  {['Order ID', 'Customer', 'Total', 'Payment', 'Order Status', 'Payment Status'].map(h => (
                    <th key={h} style={{ padding: '14px 20px', textAlign: 'left', fontSize: 12, color: '#9a9a8a', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o._id} style={{ borderBottom: '1px solid #2a2a2a' }}>
                    <td style={{ padding: '14px 20px', fontFamily: 'monospace', fontSize: 12, color: '#c8a96e' }}>{o._id.slice(-8)}</td>
                    <td style={{ padding: '14px 20px', fontSize: 13 }}>{o.user?.name || 'N/A'}</td>
                    <td style={{ padding: '14px 20px', fontWeight: 700, color: '#c8a96e' }}>₹{o.total.toLocaleString()}</td>
                    <td style={{ padding: '14px 20px', fontSize: 13, color: '#9a9a8a' }}>{o.paymentMethod}</td>
                    <td style={{ padding: '14px 20px' }}>
                      <select value={o.orderStatus} onChange={e => handleStatusChange(o._id, 'orderStatus', e.target.value)} style={{ fontSize: 13, padding: '6px 10px' }}>
                        {['Processing', 'Shipped', 'Delivered', 'Cancelled'].map(s => <option key={s}>{s}</option>)}
                      </select>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <select value={o.paymentStatus} onChange={e => handleStatusChange(o._id, 'paymentStatus', e.target.value)} style={{ fontSize: 13, padding: '6px 10px' }}>
                        {['Pending', 'Paid', 'Failed'].map(s => <option key={s}>{s}</option>)}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  );
}
