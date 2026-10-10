import { Container } from '../Container/Container';
import './Footer.css';

const CURRENT_YEAR = new Date().getFullYear();

/**
 * Footer component - Kaki halaman Kopi Sadewo
 * Menghadirkan keteduhan kayu jati tua (Espresso) berpadu aksen karamel keemasan,
 * memuat informasi pendopo, navigasi, jam seduh, dan kontak.
 *
 * @param {Object} props
 * @param {string} [props.className='']
 */
export function Footer({ className = '' }) {


  return (
    <footer className={`ks-footer ${className}`.trim()}>
      <Container size="xl">
        <div className="ks-footer__grid">
          {/* Kolom 1: Filosofi & Identitas */}
          <div className="ks-footer__col">
            <h3 className="ks-footer__brand-title">Kopi Sadewo</h3>
            <p className="ks-footer__brand-tagline">Pendopo & Roastery Tradisi Jawa</p>
            <p className="ks-footer__brand-desc">
              Menghadirkan kehangatan ruang joglo dengan tiang kayu jati yang teduh,
              meracik biji kopi nusantara dengan dedikasi dan kesederhanaan rasa.
            </p>
          </div>

          {/* Kolom 2: Navigasi Cepat */}
          <div className="ks-footer__col">
            <h4 className="ks-footer__col-title">Tautan</h4>
            <ul className="ks-footer__links">
              <li><a href="#beranda" className="ks-footer__link">Beranda</a></li>
              <li><a href="#tentang" className="ks-footer__link">Tentang Joglo</a></li>
              <li><a href="#menu" className="ks-footer__link">Pilihan Menu</a></li>
              <li><a href="#filosofi" className="ks-footer__link">Filosofi Rasa</a></li>
              <li><a href="#lokasi" className="ks-footer__link">Lokasi & Denah</a></li>
            </ul>
          </div>

          {/* Kolom 3: Jam Operasional Seduh */}
          <div className="ks-footer__col">
            <h4 className="ks-footer__col-title">Waktu Seduh</h4>
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
            <h4 className="ks-footer__col-title">Singgah & Kontak</h4>
            <div className="ks-footer__contact-item">
              <span className="ks-footer__contact-label">Alamat Pendopo:</span>
              <span>Kawasan Asri Kaliurang KM 9, Sleman, D.I. Yogyakarta</span>
            </div>
            <div className="ks-footer__contact-item">
              <span className="ks-footer__contact-label">Reservasi Meja:</span>
              <span>+62 812-3456-7890</span>
            </div>
            <div className="ks-footer__contact-item">
              <span className="ks-footer__contact-label">Surel:</span>
              <span>sapa@kopisadewo.id</span>
            </div>
          </div>
        </div>

        {/* Baris Bawah: Hak Cipta & Motto */}
        <div className="ks-footer__bottom">
          <p className="ks-footer__copyright">
            &copy; {CURRENT_YEAR} Kopi Sadewo. Seluruh hak cipta dilindungi.
          </p>
          <p className="ks-footer__motto">
            "Hangatnya tradisi dalam setiap tegukan kopi."
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
