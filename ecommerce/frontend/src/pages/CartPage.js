import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  if (cart.length === 0) return (
    <div className="container" style={{ paddingTop: 80, paddingBottom: 80, textAlign: 'center' }}>
      <div style={{ fontSize: 64, marginBottom: 24 }}>🛒</div>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, marginBottom: 16 }}>Your cart is empty</h2>
      <p style={{ color: '#9a9a8a', marginBottom: 32 }}>Looks like you haven't added anything yet.</p>
      <Link to="/products"><button className="btn-primary" style={{ fontSize: 16, padding: '14px 36px' }}>Start Shopping</button></Link>
    </div>
  );

  const shipping = cartTotal > 500 ? 0 : 49;

  return (
    <div className="container" style={{ paddingTop: 48, paddingBottom: 80 }}>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, marginBottom: 40 }}>Shopping Cart</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 40, alignItems: 'start' }}>
        {/* Items */}
        <div>
          {cart.map(item => (
            <div key={item._id} style={{ display: 'flex', gap: 20, padding: '24px 0', borderBottom: '1px solid #2a2a2a', alignItems: 'center' }}>
              <img src={item.image} alt={item.name} style={{ width: 90, height: 90, objectFit: 'cover', borderRadius: 8, border: '1px solid #2a2a2a' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: '#c8a96e', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600, marginBottom: 4 }}>{item.category}</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, marginBottom: 4 }}>{item.name}</div>
                <div style={{ color: '#c8a96e', fontSize: 17, fontWeight: 700 }}>₹{item.price.toLocaleString()}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #2a2a2a', borderRadius: 8, overflow: 'hidden' }}>
                <button onClick={() => updateQuantity(item._id, item.quantity - 1)} style={{ background: 'transparent', color: '#f5f0e8', width: 36, height: 36, fontSize: 18 }}>−</button>
                <span style={{ width: 36, textAlign: 'center', fontSize: 15, fontWeight: 600 }}>{item.quantity}</span>
                <button onClick={() => updateQuantity(item._id, item.quantity + 1)} style={{ background: 'transparent', color: '#f5f0e8', width: 36, height: 36, fontSize: 18 }}>+</button>
              </div>
              <div style={{ textAlign: 'right', minWidth: 90 }}>
                <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 8 }}>₹{(item.price * item.quantity).toLocaleString()}</div>
                <button onClick={() => removeFromCart(item._id)} style={{ background: 'transparent', color: '#e05252', fontSize: 12, fontWeight: 500 }}>Remove</button>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 20, textAlign: 'right' }}>
            <button onClick={clearCart} style={{ background: 'transparent', color: '#9a9a8a', fontSize: 13 }}>Clear Cart</button>
          </div>
        </div>

        {/* Summary */}
        <div style={{ background: '#161616', border: '1px solid #2a2a2a', borderRadius: 12, padding: 28, position: 'sticky', top: 80 }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, marginBottom: 24 }}>Order Summary</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, color: '#9a9a8a', fontSize: 14 }}>
            <span>Subtotal</span><span style={{ color: '#f5f0e8' }}>₹{cartTotal.toLocaleString()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20, color: '#9a9a8a', fontSize: 14 }}>
            <span>Shipping</span>
            <span style={{ color: shipping === 0 ? '#52c478' : '#f5f0e8' }}>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
          </div>
          {shipping > 0 && <div style={{ background: '#1e1e1e', borderRadius: 8, padding: '10px 14px', fontSize: 12, color: '#9a9a8a', marginBottom: 20 }}>
            Add ₹{(500 - cartTotal).toLocaleString()} more for free shipping
          </div>}
          <div style={{ borderTop: '1px solid #2a2a2a', paddingTop: 20, marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 20, fontWeight: 700 }}>
              <span>Total</span><span style={{ color: '#c8a96e' }}>₹{(cartTotal + shipping).toLocaleString()}</span>
            </div>
          </div>
          <Link to="/checkout">
            <button className="btn-primary" style={{ width: '100%', padding: '16px', fontSize: 16 }}>Proceed to Checkout</button>
          </Link>
          <Link to="/products">
            <button className="btn-outline" style={{ width: '100%', padding: '14px', fontSize: 14, marginTop: 12 }}>Continue Shopping</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
