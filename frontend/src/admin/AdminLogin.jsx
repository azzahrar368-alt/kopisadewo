import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { loginAdmin, getAdminToken } from '../services/api';
import './AdminLogin.css';

export function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Jika sudah memiliki token aktif, langsung arahkan ke dasbor
  useEffect(() => {
    if (getAdminToken()) {
      const target = location.state?.from?.pathname || '/admin';
      navigate(target, { replace: true });
    }
  }, [navigate, location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password) {
      setErrorMessage('Harap isi email dan kata sandi admin.');
      return;
    }

    try {
      setLoading(true);
      await loginAdmin(email.trim(), password);
      const target = location.state?.from?.pathname || '/admin';
      navigate(target, { replace: true });
    } catch (err) {
      setErrorMessage(err.message || 'Gagal masuk. Periksa kembali email dan kata sandi Anda.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@kopisadewo.com');
    setPassword('SadewoAdmin2026!');
    setErrorMessage('');
  };

  return (
    <div className="ks-admin-login-page">
      <div className="ks-admin-login-card">
        {/* Header Kartu */}
        <div className="ks-admin-login-card__header">
          <div className="ks-admin-login-card__icon" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L3 8v3h18V8L12 2z" />
              <path d="M5 11v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8" />
              <path d="M9 16h6" />
            </svg>
          </div>
          <h1 className="ks-admin-login-card__title">Portal Pengelola</h1>
          <p className="ks-admin-login-card__subtitle">
            Kopi Sadewo &bull; Pendopo & Roastery
          </p>
        </div>

        {/* Pesan Kesalahan */}
        {errorMessage && (
          <div className="ks-admin-login-alert" role="alert">
            <span className="ks-admin-login-alert__icon">&times;</span>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Formulir Login */}
        <form onSubmit={handleSubmit} className="ks-admin-login-form">
          <div className="ks-admin-form-group">
            <label htmlFor="admin-email" className="ks-admin-form-label">
              Alamat Surel (Email)
            </label>
            <input
              id="admin-email"
              type="email"
              className="ks-admin-form-input"
              placeholder="admin@kopisadewo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
              autoFocus
            />
          </div>

          <div className="ks-admin-form-group">
            <label htmlFor="admin-password" className="ks-admin-form-label">
              Kata Sandi (Password)
            </label>
            <div className="ks-admin-password-wrapper">
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                className="ks-admin-form-input ks-admin-form-input--password"
                placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
              />
              <button
                type="button"
                className="ks-admin-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                aria-label={showPassword ? 'Sembunyikan sandi' : 'Tampilkan sandi'}
              >
                {showPassword ? 'Tutup' : 'Lihat'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="ks-admin-btn-primary"
            disabled={loading}
          >
            {loading ? (
              <span className="ks-admin-btn-spinner-wrap">
                <span className="ks-admin-spinner" />
                <span>Memproses Masuk...</span>
              </span>
            ) : (
              'Masuk ke Dasbor Admin'
            )}
          </button>
        </form>

        {/* Kotak Bantuan Kredensial Bawaan */}
        <div className="ks-admin-demo-box">
          <div className="ks-admin-demo-box__header">
            <span className="ks-admin-demo-box__badge">Kredensial Default</span>
            <button
              type="button"
              className="ks-admin-demo-box__action"
              onClick={handleFillDemo}
            >
              Isi Otomatis
            </button>
          </div>
          <div className="ks-admin-demo-box__content">
            <p><strong>Email:</strong> admin@kopisadewo.com</p>
            <p><strong>Sandi:</strong> SadewoAdmin2026!</p>
          </div>
        </div>

        {/* Tautan Kembali */}
        <div className="ks-admin-login-card__footer">
          <Link to="/" className="ks-admin-back-link">
            &larr; Kembali ke Website Kopi Sadewo
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
