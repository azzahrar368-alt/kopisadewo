import { useState } from 'react';
import { Navbar, Footer, Button, Container, SectionTitle, Menu } from './components';
import './App.css';

/**
 * Halaman Uji Sementara Komponen & Desain Sistem Kopi Sadewo
 * Menampilkan Navbar, Footer, Button, Container, dan SectionTitle
 * dengan palet warna, tipografi, dan nuansa rumah joglo Jawa.
 */
function App() {
  const [clickNotice, setClickNotice] = useState('');

  const handleTestClick = (name) => {
    setClickNotice(`Tombol "${name}" berhasil diklik! Target sentuh responsif.`);
    setTimeout(() => {
      setClickNotice('');
    }, 3500);
  };

  // Palet Warna Kopi Sadewo
  const palette = [
    {
      name: 'Espresso',
      role: 'Warna Primer / Kayu Jati Tua',
      hex: '#2C1A11',
      bgStyle: '#2C1A11',
      textLight: true,
      desc: 'Warna soko guru kayu jati tua, keteduhan struktur joglo, dan kepekatan kopi hitam.',
    },
    {
      name: 'Mocha',
      role: 'Warna Sekunder / Kayu Hangat',
      hex: '#7A533C',
      bgStyle: '#7A533C',
      textLight: true,
      desc: 'Sentuhan kayu jati hangat, tanah liat bakar, dan kopi susu rempah.',
    },
    {
      name: 'Cream',
      role: 'Latar Belakang / Kapur Adem',
      hex: '#FAF6F0',
      bgStyle: '#FAF6F0',
      textLight: false,
      desc: 'Latar dinding kapur joglo, anyaman bambu sejuk, ruang nafas lapang nan tenang.',
    },
    {
      name: 'Putih',
      role: 'Permukaan Kartu / Kontras',
      hex: '#FFFFFF',
      bgStyle: '#FFFFFF',
      textLight: false,
      desc: 'Permukaan kartu bersih, kejernihan kontras, dan ruang kosong minimalis.',
    },
    {
      name: 'Caramel',
      role: 'Aksen Emas / Gula Aren',
      hex: '#C68B59',
      bgStyle: '#C68B59',
      textLight: true,
      desc: 'Aksen ukiran keemasan joglo, manisnya gula aren, dan peneduh tatapan mata.',
    },
  ];

  return (
    <div className="ks-testpage">
      {/* 1. Komponen Navbar (Responsif + Hamburger Menu di Mobile) */}
      <Navbar
        onCtaClick={() => handleTestClick('Reservasi di Navbar')}
      />

      <main className="ks-testpage__main">
        {/* Notifikasi Uji Interaksi */}
        {clickNotice && (
          <div
            style={{
              position: 'fixed',
              bottom: '24px',
              right: '24px',
              zIndex: 9999,
              backgroundColor: 'var(--color-espresso)',
              color: 'var(--color-cream)',
              padding: '12px 20px',
              borderRadius: '8px',
              boxShadow: 'var(--shadow-elevated)',
              border: '1px solid var(--color-caramel)',
              fontSize: '14px',
              animation: 'fadeIn 0.3s ease',
            }}
          >
            {clickNotice}
          </div>
        )}

        {/* 2. Hero Preview Section */}
        <section className="ks-hero-section" id="beranda">
          <Container size="lg">
            <div className="ks-hero-badge">
              <span className="ks-hero-badge__dot" />
              <span>Halaman Uji Desain Sistem Kopi Sadewo</span>
            </div>

            <h1 className="ks-hero-title">
              Kehangatan Tradisi di Bawah Naungan Joglo
            </h1>

            <p className="ks-hero-subtitle">
              Sentuhan arsitektur kayu jati yang tenang, keleluasaan ruang pendopo berhawa sejuk,
              dan kejujuran rasa seduhan kopi nusantara yang disajikan tanpa tergesa-gesa.
            </p>

            <div className="ks-hero-cta">
              <Button
                variant="primary"
                size="lg"
                onClick={() => handleTestClick('Jelajahi Menu (Hero)')}
              >
                Pesan Cangkir Pertama
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => handleTestClick('Tentang Joglo (Hero)')}
              >
                Telusuri Nuansa Joglo
              </Button>
            </div>
          </Container>
        </section>

        {/* 3. Showcase Palet Warna & Tipografi */}
        <section className="ks-section-wrapper" id="tentang">
          <Container size="xl">
            <SectionTitle
              subtitle="DASAR DESAIN SISTEM"
              title="Palet Warna & Tipografi Kopi Sadewo"
              description="Perpaduan warna alam kayu jati Jawa (Espresso, Mocha, Caramel) berpadu latar dinding kapur sejuk (Cream, Putih), dipadukan tipografi Playfair Display yang berwibawa dan Inter yang jernih."
              align="center"
              ornament={true}
            />

            {/* Grid Palet Warna */}
            <div className="ks-palette-grid">
              {palette.map((item) => (
                <div key={item.name} className="ks-swatch-card">
                  <div
                    className="ks-swatch-color"
                    style={{ backgroundColor: item.bgStyle }}
                  >
                    <span className="ks-swatch-hex">{item.hex}</span>
                  </div>
                  <div className="ks-swatch-info">
                    <h3 className="ks-swatch-name">{item.name}</h3>
                    <p className="ks-swatch-role">{item.role}</p>
                    <p className="ks-swatch-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Kotak Tipografi */}
            <div className="ks-typography-box">
              <div className="ks-type-col">
                <span className="ks-type-label">Font Judul — Playfair Display</span>
                <p className="ks-type-sample-heading">
                  "Kopi Sadewo: Rasa Hangat, Waktu Melambat di Tanah Jawa."
                </p>
                <p className="ks-type-sample-body">
                  Digunakan untuk tajuk utama (h1 – h3), memancarkan keanggunan klasik,
                  wibawa arsitektur joglo, dan keramahan tradisi masa lampau.
                </p>
              </div>

              <div className="ks-type-col">
                <span className="ks-type-label">Font Isi — Inter</span>
                <p className="ks-type-sample-body" style={{ fontSize: '1.1rem', color: 'var(--color-espresso)' }}>
                  Keterbacaan optimal pada setiap ukuran layar sentuh.
                </p>
                <p className="ks-type-sample-body">
                  Digunakan untuk teks paragraf, tombol navigasi, label menu, dan jam operasional.
                  Proporsional, bersih, dengan garis modern yang tidak melelahkan mata.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* 4. Showcase Komponen SectionTitle */}
        <section className="ks-section-wrapper ks-section-wrapper--alt" id="filosofi">
          <Container size="xl">
            <SectionTitle
              subtitle="KOMPONEN SECTIONTITLE"
              title="Uji Variasi Penataan Judul Seksi"
              description="Komponen SectionTitle mendukung perataan tengah atau kiri, label eyebrow kapital, ornamen belah ketupat kayu joglo halus, serta deskripsi pengantar yang lapang."
              align="center"
              ornament={true}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', marginTop: '2rem' }}>
              {/* Contoh Rata Kiri */}
              <div style={{ backgroundColor: 'var(--color-white)', padding: '2.5rem', borderRadius: '8px', border: '1px solid var(--border-primary)' }}>
                <SectionTitle
                  subtitle="CONTOH RATA KIRI"
                  title="Soko Guru: Pilar Keteduhan & Ketenangan"
                  description="Empat tiang kayu jati utama yang menopang atap tumpang sari, menghadirkan rasa aman dan ruang hening bagi setiap tamu yang singgah."
                  align="left"
                  ornament={true}
                />
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleTestClick('Telusuri Arsitektur')}
                >
                  Pelajari Struktur Soko Guru
                </Button>
              </div>

              {/* Contoh Rata Tengah */}
              <div style={{ backgroundColor: 'var(--color-white)', padding: '2.5rem', borderRadius: '8px', border: '1px solid var(--border-primary)' }}>
                <SectionTitle
                  subtitle="CONTOH RATA TENGAH"
                  title="Kejujuran Biji Kopi Nusantara"
                  description="Dari lereng Gunung Merapi hingga perbukitan Menoreh, setiap biji dipetik matang dan disangrai dengan ketelitian tinggi."
                  align="center"
                  ornament={true}
                />
              </div>
            </div>
          </Container>
        </section>

        {/* 5. Daftar Menu Kopi & Camilan Sadewo (Data dari Backend API) */}
        <section className="ks-section-wrapper" id="menu">
          <Container size="xl">
            <SectionTitle
              subtitle="DAFTAR MENU PILIHAN"
              title="Seduhan Kopi Nusantara & Camilan Joglo"
              description="Disajikan segar dari racikan biji kopi pilihan tanah Jawa, dinikmati perlahan di bawah keteduhan atap pendopo."
              align="center"
              ornament={true}
            />

            <Menu
              onOrderProduct={(product) =>
                handleTestClick(`Pesanan: ${product.name}`)
              }
            />
          </Container>
        </section>

        {/* 6. Showcase Komponen Button (Varian Primary & Secondary) */}
        <section className="ks-section-wrapper ks-section-wrapper--alt" id="tombol">
          <Container size="xl">
            <SectionTitle
              subtitle="KOMPONEN BUTTON"
              title="Varian Tombol & Target Sentuh Ergonomis"
              description="Memenuhi kaidah aksesibilitas mobile dengan target sentuh tinggi minimal 44px (touch target), varian Primary & Secondary bernuansa kayu jati dan karamel."
              align="center"
              ornament={true}
            />

            <div className="ks-button-showcase">
              {/* Kartu Uji Varian Primary */}
              <div className="ks-button-card">
                <h3 className="ks-button-card__title">1. Varian Primary (Espresso + Karamel)</h3>
                <p className="ks-button-card__desc">
                  Dipakai untuk aksi utama, tombol konfirmasi reservasi, dan panggilan aksi penting.
                </p>

                <div className="ks-button-row">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleTestClick('Primary Small (44px)')}
                  >
                    Primary Kecil (sm - 44px)
                  </Button>
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => handleTestClick('Primary Medium (48px)')}
                  >
                    Primary Sedang (md - 48px)
                  </Button>
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => handleTestClick('Primary Besar (52px)')}
                  >
                    Primary Besar (lg - 52px)
                  </Button>
                  <Button
                    variant="primary"
                    size="md"
                    iconLeft={
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    }
                    onClick={() => handleTestClick('Primary + Ikon Kiri')}
                  >
                    Dengan Ikon
                  </Button>
                  <Button
                    variant="primary"
                    size="md"
                    disabled
                  >
                    Nonaktif (Disabled)
                  </Button>
                </div>

                <div className="ks-touch-target-banner">
                  <span className="ks-touch-target-badge">Tinggi: ≥ 44px</span>
                  <span>Setiap ukuran tombol (sm, md, lg) menjamin tinggi sentuh minimal 44px ramah jari.</span>
                </div>
              </div>

              {/* Kartu Uji Varian Secondary */}
              <div className="ks-button-card">
                <h3 className="ks-button-card__title">2. Varian Secondary (Karamel Outlined)</h3>
                <p className="ks-button-card__desc">
                  Dipakai untuk aksi sekunder, filter kategori, navigasi tambahan, atau tombol batal.
                </p>

                <div className="ks-button-row">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleTestClick('Secondary Small (44px)')}
                  >
                    Secondary Kecil (sm - 44px)
                  </Button>
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={() => handleTestClick('Secondary Medium (48px)')}
                  >
                    Secondary Sedang (md - 48px)
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => handleTestClick('Secondary Besar (52px)')}
                  >
                    Secondary Besar (lg - 52px)
                  </Button>
                  <Button
                    variant="secondary"
                    size="md"
                    iconRight={
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    }
                    onClick={() => handleTestClick('Secondary + Ikon Kanan')}
                  >
                    Tautan Menu
                  </Button>
                  <Button
                    variant="secondary"
                    size="md"
                    disabled
                  >
                    Nonaktif (Disabled)
                  </Button>
                </div>

                <div className="ks-touch-target-banner">
                  <span className="ks-touch-target-badge">Responsif</span>
                  <span>Batas garis karamel kontras dan transisi keemasan saat diarahkan kursor.</span>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* 6. Showcase Nuansa Joglo & Komponen Container */}
        <section className="ks-section-wrapper ks-section-wrapper--alt" id="joglo">
          <Container size="xl">
            <SectionTitle
              subtitle="PENGALAMAN RUANG JOGLO"
              title="Keselarasan Ruang & Kesederhanaan"
              description="Tata letak bernafas lega dengan ruang kosong yang melimpah, menghadirkan hembusan ketenangan khas pendopo Jawa tempo doeloe."
              align="center"
              ornament={true}
            />

            <div className="ks-joglo-cards">
              <div className="ks-joglo-card">
                <div className="ks-joglo-card__icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 21h18M5 21V7l7-4 7 4v14" />
                  </svg>
                </div>
                <h3 className="ks-joglo-card__title">Kayu Jati Berumur</h3>
                <p className="ks-joglo-card__text">
                  Struktur atap dan tiang soko guru dirawat dari kayu jati pilihan, menyebarkan aroma khas kayu alami yang menenangkan saat hujan turun.
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleTestClick('Selengkapnya - Kayu Jati')}
                >
                  Selengkapnya
                </Button>
              </div>

              <div className="ks-joglo-card">
                <div className="ks-joglo-card__icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3" />
                  </svg>
                </div>
                <h3 className="ks-joglo-card__title">Seduhan Tanpa Tergesa</h3>
                <p className="ks-joglo-card__text">
                  Setiap cangkir kopi tubruk, V60, maupun racikan espresso disajikan dengan penuh penghayatan, menjaga cita rasa asli dari tanah asalnya.
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleTestClick('Selengkapnya - Seduhan')}
                >
                  Selengkapnya
                </Button>
              </div>

              <div className="ks-joglo-card">
                <div className="ks-joglo-card__icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                  </svg>
                </div>
                <h3 className="ks-joglo-card__title">Angin & Cahaya Alami</h3>
                <p className="ks-joglo-card__text">
                  Pendopo terbuka mengalirkan hawa sejuk alami tanpa pendingin udara berlebih, menciptakan ruang perjumpaan yang akrab dan santai.
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleTestClick('Selengkapnya - Angin Alami')}
                >
                  Selengkapnya
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </main>

      {/* 7. Komponen Footer */}
      <Footer id="kontak" />
    </div>
  );
}

export default App;
