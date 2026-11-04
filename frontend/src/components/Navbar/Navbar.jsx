import { useState, useEffect } from 'react';
import { Container } from '../Container/Container';
import './Navbar.css';

/**
 * Navbar — Navigasi Utama Kopi Sadewo
 * Menampilkan ke-6 menu utama dengan proporsi editorial yang seimbang:
 * 1. Beranda (#beranda)
 * 2. Profil Owner (#profil-owner)
 * 3. Menu (#menu)
 * 4. Reservasi (#reservasi)
 * 5. Event Gallery (#galeri)
 * 6. Kontak (#kontak)
 */
export function Navbar({
  links = [
    { label: 'Beranda', href: '#beranda' },
    { label: 'Profil Owner', href: '#profil-owner' },
    { label: 'Menu', href: '#menu' },
    { label: 'Reservasi', href: '#reservasi' },
    { label: 'Event Gallery', href: '#galeri' },
    { label: 'Kontak', href: '#kontak' },
  ],
  activeHref = '#beranda',
  className = '',
  cartCount = 0,
  onOpenCart,
  onCtaClick,
  onNavigate,
}) {
  const [isOpen, setIsOpen] = useState(false);

  // Menutup mobile drawer saat Escape ditekan
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLinkClick = (e, href) => {
    setIsOpen(false);
    if (onNavigate) {
      e.preventDefault();
      onNavigate(href);
    }
  };

  return (
    <header className={`ks-navbar ${className}`.trim()}>
      <Container size="xl">
        <div className="ks-navbar__inner">
          {/* Logo Brand Kopi Sadewo */}
          <a
            href="#beranda"
            className="ks-navbar__brand"
            onClick={(e) => handleLinkClick(e, '#beranda')}
          >
            <div className="ks-navbar__brand-icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L3 8v3h18V8L12 2z" />
                <path d="M5 11v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8" />
                <path d="M9 16h6" />
              </svg>
            </div>
            <div className="ks-navbar__brand-text">
              <span className="ks-navbar__brand-title">Kopi Sadewo</span>
              <span className="ks-navbar__brand-subtitle">Pendopo & Roastery</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="ks-navbar__nav-desktop" aria-label="Navigasi Utama">
            <ul className="ks-navbar__links">
              {links.map((link) => {
                const isActive = activeHref === link.href;
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className={`ks-navbar__link ${isActive ? 'ks-navbar__link--active' : ''}`}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Desktop Actions: Bon Pesanan (Sekunder) + Reservasi (CTA Utama) */}
          <div className="ks-navbar__actions-desktop">
            {onOpenCart && (
              <button
                type="button"
                className="ks-navbar__cart-btn"
                onClick={onOpenCart}
                aria-label={`Buka bon pesanan (${cartCount} item)`}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                <span>Bon Pesanan</span>
                {cartCount > 0 && (
                  <span className="ks-navbar__cart-badge">
                    {cartCount}
                  </span>
                )}
              </button>
            )}

            <button
              type="button"
              className="ks-navbar__cta-btn"
              onClick={onCtaClick}
            >
              Reservasi
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className={`ks-navbar__hamburger ${isOpen ? 'ks-navbar__hamburger--open' : ''}`}
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-controls="ks-mobile-menu"
            aria-label={isOpen ? 'Tutup navigasi' : 'Buka navigasi'}
          >
            <span className="ks-navbar__hamburger-line" />
            <span className="ks-navbar__hamburger-line" />
            <span className="ks-navbar__hamburger-line" />
          </button>
        </div>
      </Container>

      {/* Mobile Drawer */}
      <div
        id="ks-mobile-menu"
        className={`ks-navbar__mobile-drawer ${isOpen ? 'ks-navbar__mobile-drawer--open' : ''}`}
        aria-hidden={!isOpen}
      >
        <Container size="xl">
          <div className="ks-navbar__mobile-content">
            <ul className="ks-navbar__mobile-links">
              {links.map((link) => {
                const isActive = activeHref === link.href;
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className={`ks-navbar__mobile-link ${isActive ? 'ks-navbar__mobile-link--active' : ''}`}
                      onClick={(e) => handleLinkClick(e, link.href)}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="ks-navbar__mobile-actions">
              {onOpenCart && (
                <button
                  type="button"
                  className="ks-navbar__cart-btn"
                  style={{ width: '100%', justifyContent: 'center', padding: '10px' }}
                  onClick={() => {
                    setIsOpen(false);
                    onOpenCart();
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                  <span>Buka Bon Pesanan ({cartCount})</span>
                </button>
              )}

              <button
                type="button"
                className="ks-navbar__cta-btn"
                style={{ width: '100%', padding: '12px' }}
                onClick={() => {
                  setIsOpen(false);
                  if (onCtaClick) onCtaClick();
                }}
              >
                Reservasi Ruang Joglo
              </button>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
}

export default Navbar;
