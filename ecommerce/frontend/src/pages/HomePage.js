import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFeatured } from '../utils/api';
import ProductCard from '../components/ProductCard';

const categories = ['Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Beauty', 'Toys'];

export default function HomePage() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeatured().then(r => setFeatured(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #0d0d0d 0%, #1a1408 50%, #0d0d0d 100%)', padding: '100px 24px', textAlign: 'center', borderBottom: '1px solid #2a2a2a', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(200,169,110,0.08) 0%, transparent 70%)' }} />
        <div style={{ position: 'relative' }}>
          <div style={{ fontSize: 11, color: '#c8a96e', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: 20, fontWeight: 600 }}>Premium Collection</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 700, color: '#f5f0e8', lineHeight: 1.1, marginBottom: 24 }}>
            Discover <span style={{ color: '#c8a96e', fontStyle: 'italic' }}>Luxury</span><br />at Every Price
          </h1>
          <p style={{ color: '#9a9a8a', fontSize: 18, maxWidth: 480, margin: '0 auto 40px', lineHeight: 1.7 }}>
            Curated products from the world's finest brands, delivered to your door.
          </p>
          <Link to="/products">
            <button className="btn-primary" style={{ fontSize: 16, padding: '14px 40px' }}>Shop Now</button>
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section style={{ padding: '80px 24px' }}>
        <div className="container">
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, marginBottom: 8, textAlign: 'center' }}>Shop by Category</h2>
          <p style={{ color: '#9a9a8a', textAlign: 'center', marginBottom: 48 }}>Find exactly what you're looking for</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 16 }}>
            {categories.map(cat => (
              <Link key={cat} to={`/products?category=${cat}`}>
                <div style={{ background: '#161616', border: '1px solid #2a2a2a', borderRadius: 12, padding: '24px 16px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#c8a96e55'; e.currentTarget.style.background = '#1e1a0e'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a2a2a'; e.currentTarget.style.background = '#161616'; }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>
                    {{'Electronics':'📱','Clothing':'👗','Books':'📚','Home':'🏠','Sports':'⚽','Beauty':'💄','Toys':'🧸'}[cat] || '🛍️'}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: '#f5f0e8' }}>{cat}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {(loading || featured.length > 0) && (
        <section style={{ padding: '0 24px 80px' }}>
          <div className="container">
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, marginBottom: 8 }}>Featured Products</h2>
            <p style={{ color: '#9a9a8a', marginBottom: 40 }}>Handpicked for you</p>
            {loading ? <div className="loading">Loading featured products…</div> : (
              <div className="grid-products">
                {featured.map(p => <ProductCard key={p._id} product={p} />)}
              </div>
            )}
            <div style={{ textAlign: 'center', marginTop: 48 }}>
              <Link to="/products"><button className="btn-outline" style={{ fontSize: 15, padding: '12px 36px' }}>View All Products →</button></Link>
            </div>
          </div>
        </section>
      )}

      {/* Trust badges */}
      <section style={{ background: '#161616', borderTop: '1px solid #2a2a2a', borderBottom: '1px solid #2a2a2a', padding: '48px 24px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32, textAlign: 'center' }}>
            {[['🚚', 'Free Shipping', 'On orders above ₹500'], ['🔒', 'Secure Payment', '100% safe checkout'], ['↩️', 'Easy Returns', '30-day return policy'], ['🎁', 'Gift Wrapping', 'Available on request']].map(([icon, title, sub]) => (
              <div key={title}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{icon}</div>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>{title}</div>
                <div style={{ color: '#9a9a8a', fontSize: 13 }}>{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
