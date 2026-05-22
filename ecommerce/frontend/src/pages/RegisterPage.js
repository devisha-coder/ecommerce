import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) return toast.error('Passwords do not match');
    if (form.password.length < 6) return toast.error('Password must be at least 6 characters');
    const result = await register(form.name, form.email, form.password);
    if (result.success) { toast.success('Account created!'); navigate('/'); }
    else toast.error(result.message);
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: '#c8a96e', marginBottom: 8 }}>LUXE SHOP</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32 }}>Create Account</h2>
          <p style={{ color: '#9a9a8a', marginTop: 8 }}>Join us today</p>
        </div>
        <div style={{ background: '#161616', border: '1px solid #2a2a2a', borderRadius: 16, padding: 36 }}>
          <form onSubmit={handleSubmit}>
            {[['Name', 'name', 'text', 'Your full name'], ['Email', 'email', 'email', 'you@example.com'], ['Password', 'password', 'password', '••••••••'], ['Confirm Password', 'confirm', 'password', '••••••••']].map(([label, name, type, ph]) => (
              <div className="form-group" key={name}>
                <label>{label}</label>
                <input type={type} placeholder={ph} value={form[name]} onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))} required />
              </div>
            ))}
            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '14px', fontSize: 16, marginTop: 8 }} disabled={loading}>
              {loading ? 'Creating account…' : 'Create Account'}
            </button>
          </form>
          <p style={{ textAlign: 'center', marginTop: 24, color: '#9a9a8a', fontSize: 14 }}>
            Already have an account? <Link to="/login" style={{ color: '#c8a96e', fontWeight: 600 }}>Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
