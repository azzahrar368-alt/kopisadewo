import { useState, useEffect } from 'react';
import { Container } from '../Container/Container';
import { Button } from '../Button/Button';
import './Navbar.css';

/**
 * Navbar component - Navigasi utama responsif Kopi Sadewo
 * Dilengkapi menu hamburger di layar ponsel (target sentuh >= 44px)
 * serta nuansa kayu dan arsitektur joglo yang tenang.
 *
 * @param {Object} props
 * @param {Array<{label: string, href: string}>} [props.links] - Daftar tautan navigasi
 * @param {string} [props.activeHref] - Tautan yang sedang aktif
 * @param {string} [props.className='']
 * @param {Function} [props.onCtaClick] - Aksi klik tombol CTA utama
 */
export function Navbar({
  links = [
    { label: 'Beranda', href: '#beranda' },
    { label: 'Tentang Kami', href: '#tentang' },
    { label: 'Menu Kopi', href: '#menu' },
    { label: 'Ruang Joglo', href: '#joglo' },
    { label: 'Kontak', href: '#kontak' },
  ],
  activeHref = '#beranda',
  className = '',
  onCtaClick,
}) {
  const [isOpen, setIsOpen] = useState(false);

  // Menutup menu saat tombol Escape ditekan
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

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header className={`ks-navbar ${className}`.trim()}>
      <Container size="xl">
        <div className="ks-navbar__inner">
          {/* Logo Brand Kopi Sadewo */}
          <a href="#beranda" className="ks-navbar__brand" onClick={handleLinkClick}>
            <div className="ks-navbar__brand-icon" aria-hidden="true">
              {/* Ikon atap joglo / siluet cangkir kopi */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Desktop CTA Action */}
          <div className="ks-navbar__actions-desktop">
            <Button
              variant="primary"
              size="sm"
              onClick={onCtaClick}
            >
              Pesan Meja
            </Button>
          </div>

          {/* Mobile Hamburger Toggle Button (Minimal 44px touch target) */}
          <button
            type="button"
            className={`ks-navbar__hamburger ${isOpen ? 'ks-navbar__hamburger--open' : ''}`}
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-controls="ks-mobile-menu"
            aria-label={isOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
          >
            <span className="ks-navbar__hamburger-line" />
            <span className="ks-navbar__hamburger-line" />
            <span className="ks-navbar__hamburger-line" />
          </button>
        </div>
      </Container>

      {/* Mobile Drawer Dropdown Menu */}
      <div
        id="ks-mobile-menu"
        className={`ks-navbar__mobile-drawer ${isOpen ? 'ks-navbar__mobile-drawer--open' : ''}`}
        aria-hidden={!isOpen}
      >
        <Container size="xl">
          <div className="ks-navbar__mobile-content">
            <ul className="ks-navbar__mobile-links">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="ks-navbar__mobile-link"
                    onClick={handleLinkClick}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="ks-navbar__mobile-cta">
              <Button
                variant="primary"
                size="md"
                fullWidth
                onClick={() => {
                  handleLinkClick();
                  if (onCtaClick) onCtaClick();
                }}
              >
                Pesan Meja
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
}

export default Navbar;
