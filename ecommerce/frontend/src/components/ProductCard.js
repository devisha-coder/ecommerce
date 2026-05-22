import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart(product, 1);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <Link to={`/products/${product._id}`}>
      <div style={{ background: '#161616', border: '1px solid #2a2a2a', borderRadius: 12, overflow: 'hidden', transition: 'transform 0.2s, border-color 0.2s', cursor: 'pointer' }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = '#c8a96e55'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = '#2a2a2a'; }}>
        <div style={{ position: 'relative', paddingTop: '66%', overflow: 'hidden' }}>
          <img src={product.image} alt={product.name}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          {product.stock === 0 && (
            <div style={{ position: 'absolute', top: 12, right: 12, background: '#e05252', color: 'white', padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 700 }}>OUT OF STOCK</div>
          )}
          {product.featured && (
            <div style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(200,169,110,0.9)', color: '#0d0d0d', padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 700 }}>FEATURED</div>
          )}
        </div>
        <div style={{ padding: '16px 20px 20px' }}>
          <div style={{ fontSize: 11, color: '#c8a96e', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 6 }}>{product.category}</div>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, color: '#f5f0e8', marginBottom: 8, lineHeight: 1.3 }}>{product.name}</h3>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
            <span style={{ fontSize: 20, fontWeight: 700, color: '#c8a96e' }}>₹{product.price.toLocaleString()}</span>
            <button className="btn-primary" style={{ padding: '8px 16px', fontSize: 13 }}
              onClick={handleAdd} disabled={product.stock === 0}>
              {product.stock === 0 ? 'Sold Out' : 'Add to Cart'}
            </button>
          </div>
          {product.ratings?.count > 0 && (
            <div style={{ marginTop: 8, fontSize: 12, color: '#9a9a8a' }}>
              ⭐ {product.ratings.average.toFixed(1)} ({product.ratings.count} reviews)
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
