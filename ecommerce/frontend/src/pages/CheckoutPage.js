import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../utils/api';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ street: '', city: '', state: '', zip: '', country: 'India', paymentMethod: 'COD' });

  const shipping = cartTotal > 500 ? 0 : 49;

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return toast.error('Cart is empty');
    setLoading(true);
    try {
      const { data } = await createOrder({
        items: cart.map(i => ({ product: i._id, quantity: i.quantity })),
        shippingAddress: { street: form.street, city: form.city, state: form.state, zip: form.zip, country: form.country },
        paymentMethod: form.paymentMethod
      });
      clearCart();
      toast.success('Order placed successfully!');
      navigate('/orders');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  const F = ({ label, name, placeholder, required }) => (
    <div className="form-group">
      <label>{label}</label>
      <input name={name} placeholder={placeholder} value={form[name]} onChange={handleChange} required={required} />
    </div>
  );

  return (
    <div className="container" style={{ paddingTop: 48, paddingBottom: 80 }}>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, marginBottom: 40 }}>Checkout</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 40, alignItems: 'start' }}>
        <form onSubmit={handleSubmit}>
          <div style={{ background: '#161616', border: '1px solid #2a2a2a', borderRadius: 12, padding: 32, marginBottom: 24 }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, marginBottom: 24 }}>Shipping Address</h3>
            <F label="Street Address" name="street" placeholder="123 Main Street" required />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <F label="City" name="city" placeholder="Mumbai" required />
              <F label="State" name="state" placeholder="Maharashtra" required />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <F label="ZIP Code" name="zip" placeholder="400001" required />
              <F label="Country" name="country" placeholder="India" required />
            </div>
          </div>

          <div style={{ background: '#161616', border: '1px solid #2a2a2a', borderRadius: 12, padding: 32 }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, marginBottom: 24 }}>Payment Method</h3>
            {['COD', 'Card', 'UPI'].map(method => (
              <label key={method} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, cursor: 'pointer', padding: '14px 16px', border: '1px solid', borderRadius: 8, transition: 'all 0.2s',
                borderColor: form.paymentMethod === method ? '#c8a96e' : '#2a2a2a', background: form.paymentMethod === method ? 'rgba(200,169,110,0.05)' : 'transparent' }}>
                <input type="radio" name="paymentMethod" value={method} checked={form.paymentMethod === method} onChange={handleChange} style={{ width: 'auto', accentColor: '#c8a96e' }} />
                <span style={{ fontWeight: 500 }}>{{ COD: '💵 Cash on Delivery', Card: '💳 Credit / Debit Card', UPI: '📱 UPI Payment' }[method]}</span>
              </label>
            ))}
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', padding: '16px', fontSize: 16, marginTop: 24 }} disabled={loading}>
            {loading ? 'Placing Order…' : `Place Order · ₹${(cartTotal + shipping).toLocaleString()}`}
          </button>
        </form>

        {/* Summary */}
        <div style={{ background: '#161616', border: '1px solid #2a2a2a', borderRadius: 12, padding: 28, position: 'sticky', top: 80 }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, marginBottom: 20 }}>Order Items ({cart.length})</h3>
          {cart.map(i => (
            <div key={i._id} style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'center' }}>
              <img src={i.image} alt={i.name} style={{ width: 52, height: 52, objectFit: 'cover', borderRadius: 6 }} />
              <div style={{ flex: 1, fontSize: 13 }}>
                <div style={{ fontWeight: 500, marginBottom: 2 }}>{i.name}</div>
                <div style={{ color: '#9a9a8a' }}>Qty: {i.quantity}</div>
              </div>
              <div style={{ fontWeight: 600, color: '#c8a96e', fontSize: 14 }}>₹{(i.price * i.quantity).toLocaleString()}</div>
            </div>
          ))}
          <div style={{ borderTop: '1px solid #2a2a2a', paddingTop: 16, marginTop: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#9a9a8a', marginBottom: 8 }}>
              <span>Subtotal</span><span style={{ color: '#f5f0e8' }}>₹{cartTotal.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#9a9a8a', marginBottom: 16 }}>
              <span>Shipping</span><span style={{ color: shipping === 0 ? '#52c478' : '#f5f0e8' }}>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 700 }}>
              <span>Total</span><span style={{ color: '#c8a96e' }}>₹{(cartTotal + shipping).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
