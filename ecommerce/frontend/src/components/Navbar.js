import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const styles = {
  nav: { background: '#0d0d0d', borderBottom: '1px solid #2a2a2a', position: 'sticky', top: 0, zIndex: 100 },
  inner: { maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 },
  logo: { fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: '#c8a96e', letterSpacing: '-0.5px' },
  links: { display: 'flex', gap: 32, alignItems: 'center' },
  link: { color: '#9a9a8a', fontSize: 14, fontWeight: 500, transition: 'color 0.2s', letterSpacing: '0.3px' },
  actions: { display: 'flex', gap: 16, alignItems: 'center' },
  cartBtn: { position: 'relative', background: 'transparent', border: '1px solid #2a2a2a', borderRadius: 8, padding: '8px 16px', color: '#f5f0e8', fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 },
  badge: { background: '#c8a96e', color: '#0d0d0d', borderRadius: '50%', width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }
};

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  return (
    <nav style={styles.nav}>
      <div style={styles.inner}>
        <Link to="/" style={styles.logo}>LUXE SHOP</Link>
        <div style={styles.links}>
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/products" style={styles.link}>Shop</Link>
          {user?.role === 'admin' && <Link to="/admin" style={{ ...styles.link, color: '#c8a96e' }}>Admin</Link>}
        </div>
        <div style={styles.actions}>
          <Link to="/cart">
            <button style={styles.cartBtn}>
              🛒 Cart
              {cartCount > 0 && <span style={styles.badge}>{cartCount}</span>}
            </button>
          </Link>
          {user ? (
            <>
              <Link to="/orders" style={{ ...styles.link, color: '#f5f0e8' }}>Orders</Link>
              <button className="btn-outline" style={{ padding: '8px 16px', fontSize: 13 }} onClick={() => { logout(); navigate('/'); }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login"><button className="btn-outline" style={{ padding: '8px 20px', fontSize: 13 }}>Login</button></Link>
              <Link to="/register"><button className="btn-primary" style={{ padding: '8px 20px', fontSize: 13 }}>Sign Up</button></Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
