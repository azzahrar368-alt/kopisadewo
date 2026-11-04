import { useState, useEffect } from 'react';
import {
  Navbar,
  Footer,
  Container,
  SectionTitle,
  Beranda,
  OwnerProfile,
  Menu,
  CartModal,
  Reservation,
  EventGallery,
  Contact,
} from '../components';
import '../App.css';

const SECTIONS = ['beranda', 'profil-owner', 'menu', 'reservasi', 'galeri', 'kontak'];

function getInitialSection() {
  if (typeof window !== 'undefined' && window.location.hash) {
    const raw = window.location.hash.replace('#', '');
    if (SECTIONS.includes(raw)) {
      return `#${raw}`;
    }
  }
  return '#beranda';
}

/**
 * Halaman Utama Publik Kopi Sadewo — Pendopo & Roastery
 */
export function HomePage() {
  // State Keranjang Belanja
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('sadewo_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [activeSection, setActiveSection] = useState(getInitialSection);

  // Simpan keranjang ke LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('sadewo_cart', JSON.stringify(cart));
    } catch {
      // Abaikan jika localStorage tidak tersedia
    }
  }, [cart]);

  // Notifikasi Toast
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage('');
    }, 3200);
  };

  // Handler Keranjang Belanja
  const handleAddToCart = (product) => {
    if (!product.is_available) {
      showToast(`Maaf, "${product.name}" sedang habis.`);
      return;
    }

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevCart, { ...product, qty: 1 }];
    });

    showToast(`"${product.name}" ditambahkan ke keranjang pesanan.`);
  };

  const handleUpdateQty = (productId, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, qty: newQty } : item
      )
    );
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    showToast('Menu dihapus dari keranjang.');
  };

  const handleClearCart = () => {
    setCart([]);
    showToast('Keranjang pesanan dikosongkan.');
  };

  // Navigasi Halus
  const scrollToSection = (id) => {
    const cleanId = id.replace('#', '');
    const el = document.getElementById(cleanId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(`#${cleanId}`);
      if (window.history && window.history.pushState) {
        window.history.pushState(null, '', `#${cleanId}`);
      }
    }
  };

  // Deteksi Navigasi Aktif saat Scroll dan Hash Change
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash && SECTIONS.includes(hash.replace('#', ''))) {
        setActiveSection(hash);
      }
    };

    window.addEventListener('hashchange', handleHash);

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollOffset = 140;
          for (const sec of SECTIONS) {
            const el = document.getElementById(sec);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= scrollOffset && rect.bottom > scrollOffset) {
                const targetHash = `#${sec}`;
                setActiveSection(targetHash);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const totalCartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <div className="ks-testpage">
      {/* 1. Header & Navigasi 6 Menu */}
      <Navbar
        activeHref={activeSection}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onCtaClick={() => scrollToSection('reservasi')}
        onNavigate={(href) => scrollToSection(href)}
      />

      {/* Notifikasi Toast Mengambang */}
      {toastMessage && (
        <div className="ks-toast" role="status" aria-live="polite">
          <span className="ks-toast__icon">☕</span>
          <span>{toastMessage}</span>
        </div>
      )}

      <main className="ks-testpage__main">
        {/* MENU 1: BERANDA */}
        <Beranda
          onGoToMenu={() => scrollToSection('menu')}
          onGoToReservation={() => scrollToSection('reservasi')}
        />

        {/* MENU 2: PROFIL OWNER */}
        <OwnerProfile
          onGoToMenu={() => scrollToSection('menu')}
          onGoToReservation={() => scrollToSection('reservasi')}
        />

        {/* MENU 3: DAFTAR MENU & KERANJANG PEMESANAN */}
        <section className="ks-section-wrapper" id="menu">
          <Container size="xl">
            <SectionTitle
              subtitle="SAJIAN PENDOPO SADEWO"
              title="Daftar Seduhan Kopi & Kudapan Joglo"
              description="Disajikan hangat dari racikan biji kopi pilihan tanah Jawa dan camilan rumahan. Silakan pilih sajian yang Anda inginkan untuk langsung dinikmati di pendopo."
              align="center"
              ornament={true}
            />

            <Menu
              cart={cart}
              onAddToCart={handleAddToCart}
              onUpdateQty={handleUpdateQty}
              onOpenCart={() => setIsCartOpen(true)}
            />
          </Container>
        </section>

        {/* MENU 4: RESERVASI TEMPAT */}
        <Reservation />

        {/* MENU 5: EVENT GALLERY */}
        <EventGallery />

        {/* MENU 6: KONTAK & LOKASI */}
        <Contact />
      </main>

      {/* Footer Lengkap */}
      <Footer />

      {/* Modal Keranjang Pesanan & Tombol Floating Cart */}
      <CartModal
        cart={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onOpen={() => setIsCartOpen(true)}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />
    </div>
  );
}

export default HomePage;
