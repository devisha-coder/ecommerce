import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../utils/api';
import ProductCard from '../components/ProductCard';

const categories = ['All', 'Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Beauty', 'Toys'];

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);

  const category = searchParams.get('category') || '';
  const search = searchParams.get('search') || '';
  const sort = searchParams.get('sort') || 'newest';
  const page = Number(searchParams.get('page') || 1);

  const [searchInput, setSearchInput] = useState(search);

  useEffect(() => {
    setLoading(true);
    const params = { page, sort, limit: 12 };
    if (category) params.category = category;
    if (search) params.search = search;
    getProducts(params)
      .then(r => { setProducts(r.data.products); setTotal(r.data.total); setPages(r.data.pages); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [category, search, sort, page]);

  const updateParam = (key, value) => {
    const p = new URLSearchParams(searchParams);
    if (value) p.set(key, value); else p.delete(key);
    p.delete('page');
    setSearchParams(p);
  };

  return (
    <div className="container" style={{ paddingTop: 48, paddingBottom: 80 }}>
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, marginBottom: 8 }}>
          {category || 'All Products'}
        </h1>
        <p style={{ color: '#9a9a8a' }}>{total} products found</p>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 32, flexWrap: 'wrap', alignItems: 'center' }}>
        {/* Search */}
        <form style={{ flex: '1 1 280px', display: 'flex', gap: 8 }} onSubmit={e => { e.preventDefault(); updateParam('search', searchInput); }}>
          <input placeholder="Search products…" value={searchInput} onChange={e => setSearchInput(e.target.value)} style={{ flex: 1 }} />
          <button type="submit" className="btn-primary" style={{ padding: '12px 20px' }}>Search</button>
        </form>

        {/* Sort */}
        <select value={sort} onChange={e => updateParam('sort', e.target.value)} style={{ flex: '0 0 180px' }}>
          <option value="newest">Newest First</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {/* Category tabs */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 40, flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => updateParam('category', cat === 'All' ? '' : cat)}
            style={{ padding: '8px 20px', borderRadius: 999, border: '1px solid', fontSize: 13, fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s',
              background: (cat === 'All' ? !category : category === cat) ? '#c8a96e' : 'transparent',
              color: (cat === 'All' ? !category : category === cat) ? '#0d0d0d' : '#9a9a8a',
              borderColor: (cat === 'All' ? !category : category === cat) ? '#c8a96e' : '#2a2a2a' }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Products grid */}
      {loading ? <div className="loading">Loading products…</div> : products.length === 0 ? (
        <div className="loading" style={{ flexDirection: 'column', gap: 16 }}>
          <span style={{ fontSize: 48 }}>🔍</span>
          <span>No products found. Try adjusting your filters.</span>
        </div>
      ) : (
        <>
          <div className="grid-products">
            {products.map(p => <ProductCard key={p._id} product={p} />)}
          </div>

          {/* Pagination */}
          {pages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 48 }}>
              {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => { const sp = new URLSearchParams(searchParams); sp.set('page', p); setSearchParams(sp); }}
                  style={{ width: 40, height: 40, borderRadius: 8, border: '1px solid', fontSize: 14, fontWeight: 500, cursor: 'pointer',
                    background: page === p ? '#c8a96e' : 'transparent', color: page === p ? '#0d0d0d' : '#9a9a8a', borderColor: page === p ? '#c8a96e' : '#2a2a2a' }}>
                  {p}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
