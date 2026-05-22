import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(form.email, form.password);
    if (result.success) { toast.success('Welcome back!'); navigate('/'); }
    else toast.error(result.message);
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: '#c8a96e', marginBottom: 8 }}>LUXE SHOP</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32 }}>Welcome Back</h2>
          <p style={{ color: '#9a9a8a', marginTop: 8 }}>Sign in to your account</p>
        </div>
        <div style={{ background: '#161616', border: '1px solid #2a2a2a', borderRadius: 16, padding: 36 }}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="••••••••" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required />
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '14px', fontSize: 16, marginTop: 8 }} disabled={loading}>
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
          <p style={{ textAlign: 'center', marginTop: 24, color: '#9a9a8a', fontSize: 14 }}>
            Don't have an account? <Link to="/register" style={{ color: '#c8a96e', fontWeight: 600 }}>Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
