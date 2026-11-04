import { Link } from 'react-router-dom';
import { Container } from '../Container/Container';
import './Footer.css';

const CURRENT_YEAR = new Date().getFullYear();

/**
 * Footer component - Kaki halaman Kopi Sadewo
 * Menghadirkan keteduhan kayu jati tua (Espresso) berpadu aksen karamel keemasan,
 * memuat informasi pendopo, navigasi ke-6 menu, jam seduh, kontak person, dan alamat.
 */
export function Footer({ className = '' }) {
  return (
    <footer className={`ks-footer ${className}`.trim()}>
      <Container size="xl">
        <div className="ks-footer__grid">
          {/* Kolom 1: Filosofi & Identitas */}
          <div className="ks-footer__col">
            <h3 className="ks-footer__brand-title">Kopi Sadewo</h3>
            <p className="ks-footer__brand-tagline">"Kehangatan Tradisi di Bawah Naungan Joglo"</p>
            <p className="ks-footer__brand-desc">
              Menghadirkan kehangatan ruang joglo dengan tiang kayu jati yang teduh,
              meracik biji kopi nusantara dengan dedikasi dan kesederhanaan rasa di tanah Jawa.
            </p>
          </div>

          {/* Kolom 2: Navigasi Cepat (6 Menu) */}
          <div className="ks-footer__col">
            <h4 className="ks-footer__col-title">Navigasi Menu</h4>
            <ul className="ks-footer__links">
              <li><a href="#beranda" className="ks-footer__link">1. Beranda</a></li>
              <li><a href="#profil-owner" className="ks-footer__link">2. Profil Owner</a></li>
              <li><a href="#menu" className="ks-footer__link">3. Menu & Keranjang WA</a></li>
              <li><a href="#reservasi" className="ks-footer__link">4. Reservasi Tempat</a></li>
              <li><a href="#galeri" className="ks-footer__link">5. Event Gallery</a></li>
              <li><a href="#kontak" className="ks-footer__link">6. Kontak & Lokasi</a></li>
              <li style={{ marginTop: '6px', paddingTop: '6px', borderTop: '1px dashed rgba(229, 217, 200, 0.2)' }}>
                <Link to="/admin" className="ks-footer__link" style={{ color: 'var(--color-caramel-light)' }}>
                  &bull; Portal Pengelola Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Jam Operasional Seduh */}
          <div className="ks-footer__col">
            <h4 className="ks-footer__col-title">Jadwal Buka</h4>
            <div className="ks-footer__schedule-item">
              <span className="ks-footer__schedule-day">Senin — Jumat</span>
              <span>08.00 — 23.00 WIB</span>
            </div>
            <div className="ks-footer__schedule-item">
              <span className="ks-footer__schedule-day">Sabtu — Minggu</span>
              <span>07.00 — 24.00 WIB</span>
            </div>
            <div className="ks-footer__schedule-item">
              <span className="ks-footer__schedule-day">Kopi Pagi Joglo</span>
              <span style={{ color: 'var(--color-caramel-light)' }}>Mulai pukul 07.00 WIB</span>
            </div>
          </div>

          {/* Kolom 4: Ruang & Kontak */}
          <div className="ks-footer__col">
            <h4 className="ks-footer__col-title">Kontak & Alamat</h4>
            <div className="ks-footer__contact-item">
              <span className="ks-footer__contact-label">Alamat Lengkap:</span>
              <span>Jl. Kaliurang KM 9.5, Sleman, D.I. Yogyakarta 55581</span>
            </div>
            <div className="ks-footer__contact-item">
              <span className="ks-footer__contact-label">Kontak Person & WA:</span>
              <span>Mas Danu (+62 812-3456-7890)</span>
            </div>
            <div className="ks-footer__contact-item">
              <span className="ks-footer__contact-label">Surel (Opsional):</span>
              <span>sapa@kopisadewo.id</span>
            </div>
          </div>
        </div>

        {/* Baris Bawah: Hak Cipta & Motto */}
        <div className="ks-footer__bottom">
          <p className="ks-footer__copyright">
            &copy; {CURRENT_YEAR} Kopi Sadewo. Seluruh hak cipta dilindungi.
          </p>
          <div style={{ fontSize: 'var(--fs-xs)' }}>
            <Link to="/admin" style={{ color: 'var(--color-cream)', opacity: 0.7, textDecoration: 'none' }}>
              Masuk Admin
            </Link>
          </div>
          <p className="ks-footer__motto">
            "Rasa Hangat, Waktu Melambat di Tanah Jawa."
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
