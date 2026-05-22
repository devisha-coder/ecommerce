export default function Footer() {
  return (
    <footer style={{ background: '#0d0d0d', borderTop: '1px solid #2a2a2a', padding: '40px 24px', marginTop: 80 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: '#c8a96e', marginBottom: 8 }}>LUXE SHOP</div>
          <p style={{ color: '#9a9a8a', fontSize: 13 }}>Premium products, curated for you.</p>
        </div>
        <p style={{ color: '#9a9a8a', fontSize: 13 }}>© {new Date().getFullYear()} LuxeShop. All rights reserved.</p>
      </div>
    </footer>
  );
}
