import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProduct } from '../utils/api';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    getProduct(id).then(r => setProduct(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="loading">Loading product…</div>;
  if (!product) return <div className="loading">Product not found.</div>;

  return (
    <div className="container" style={{ paddingTop: 60, paddingBottom: 80 }}>
      <Link to="/products" style={{ color: '#9a9a8a', fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 40 }}>
        ← Back to Products
      </Link>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
        {/* Image */}
        <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid #2a2a2a' }}>
          <img src={product.image} alt={product.name} style={{ width: '100%', display: 'block', maxHeight: 480, objectFit: 'cover' }} />
        </div>

        {/* Info */}
        <div>
          <div style={{ fontSize: 11, color: '#c8a96e', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600, marginBottom: 12 }}>{product.category}</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, color: '#f5f0e8', marginBottom: 16, lineHeight: 1.2 }}>{product.name}</h1>

          {product.ratings?.count > 0 && (
            <div style={{ color: '#9a9a8a', fontSize: 14, marginBottom: 20 }}>⭐ {product.ratings.average.toFixed(1)} · {product.ratings.count} reviews</div>
          )}

          <div style={{ fontSize: 36, fontWeight: 700, color: '#c8a96e', marginBottom: 24 }}>₹{product.price.toLocaleString()}</div>

          <p style={{ color: '#9a9a8a', lineHeight: 1.8, marginBottom: 32, fontSize: 15 }}>{product.description}</p>

          <div style={{ marginBottom: 24, color: '#9a9a8a', fontSize: 14 }}>
            {product.stock > 0 ? (
              <span style={{ color: '#52c478' }}>✓ In Stock ({product.stock} available)</span>
            ) : (
              <span style={{ color: '#e05252' }}>✗ Out of Stock</span>
            )}
          </div>

          {/* Quantity + Add */}
          {product.stock > 0 && (
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #2a2a2a', borderRadius: 8, overflow: 'hidden' }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ background: 'transparent', color: '#f5f0e8', width: 44, height: 44, fontSize: 20 }}>−</button>
                <span style={{ width: 44, textAlign: 'center', fontSize: 16, fontWeight: 600 }}>{qty}</span>
                <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} style={{ background: 'transparent', color: '#f5f0e8', width: 44, height: 44, fontSize: 20 }}>+</button>
              </div>
              <button className="btn-primary" style={{ flex: 1, padding: '14px', fontSize: 16 }}
                onClick={() => { addToCart(product, qty); toast.success(`${product.name} added to cart`); }}>
                Add to Cart
              </button>
            </div>
          )}

          {/* Shipping note */}
          <div style={{ background: '#161616', border: '1px solid #2a2a2a', borderRadius: 10, padding: 16, fontSize: 13, color: '#9a9a8a', lineHeight: 1.8 }}>
            🚚 Free shipping on orders above ₹500<br />
            ↩️ Easy 30-day returns<br />
            🔒 Secure checkout
          </div>
        </div>
      </div>
    </div>
  );
}
