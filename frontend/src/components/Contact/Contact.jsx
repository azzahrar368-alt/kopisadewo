import { Container } from '../Container/Container';
import { SectionTitle } from '../SectionTitle/SectionTitle';
import { Button } from '../Button/Button';
import './Contact.css';

const CONTACT_WA = '6281234567890';

/**
 * Menu 6: Kontak & Lokasi Kopi Sadewo
 * Nuansa Homie, Papan Informasi Terbuka & Ramah.
 * Memuat: Kontak Person, Nomor WA, Alamat Lengkap, Jadwal Buka, Surel (opsional), dan Peta Arah.
 */
export function Contact() {
  const handleDirectWA = () => {
    const text = encodeURIComponent(
      'Halo Mas Danu / Admin Kopi Sadewo, saya ingin bertanya seputar menu, ketersediaan meja, atau rute jalan menuju pendopo. Terima kasih!'
    );
    window.open(`https://wa.me/${CONTACT_WA}?text=${text}`, '_blank');
  };

  const handleOpenMaps = () => {
    window.open('https://maps.google.com/?q=Sleman+Yogyakarta', '_blank');
  };

  return (
    <section className="ks-contact" id="kontak">
      <Container size="xl">
        <SectionTitle
          subtitle="INFORMASI & LOKASI PENDOPO"
          title="Pintu Pendopo Kami Selalu Terbuka"
          description="Lepaskan penat dan nikmati sejuknya lereng Merapi. Jika Anda butuh panduan rute atau ingin memastikan ketersediaan tempat, silakan hubungi tim kami."
          align="center"
          ornament={true}
        />

        <div className="ks-contact__grid">
          {/* Kolom Kiri: 4 Bagian Informasi Pendopo */}
          <div className="ks-contact__cards">
            {/* 1. Kontak Person & WhatsApp */}
            <div className="ks-contact-card">
              <span className="ks-contact-card__label">Tuan Rumah & Kontak Person</span>
              <h4 className="ks-contact-card__title">Mas Danu (+62 812-3456-7890)</h4>
              <p className="ks-contact-card__desc">
                Layanan pesan cepat WhatsApp untuk informasi menu, booking tempat, maupun panduan jalan.
              </p>
              <div style={{ marginTop: '10px' }}>
                <Button variant="secondary" size="sm" onClick={handleDirectWA}>
                  Kirim Pesan WhatsApp Langsung
                </Button>
              </div>
            </div>

            {/* 2. Alamat Lengkap */}
            <div className="ks-contact-card">
              <span className="ks-contact-card__label">Alamat Lengkap Pendopo</span>
              <h4 className="ks-contact-card__title">Kawasan Asri Kaliurang KM 9.5</h4>
              <p className="ks-contact-card__desc">
                Jl. Kaliurang KM 9.5, Krikilan, Tegaltirto, Sleman, D.I. Yogyakarta 55581 (sekitar 15 menit ke arah utara dari Ring Road). Jalan aspal lebar, parkir mobil dan motor leluasa.
              </p>
            </div>

            {/* 3. Jadwal Buka & Waktu Seduh */}
            <div className="ks-contact-card">
              <span className="ks-contact-card__label">Waktu Seduh & Jadwal Buka</span>
              <h4 className="ks-contact-card__title">Buka Setiap Hari Tanpa Libur</h4>
              <p className="ks-contact-card__desc">
                • <strong>Senin — Jumat:</strong> 08.00 — 23.00 WIB<br />
                • <strong>Sabtu — Minggu:</strong> 07.00 — 24.00 WIB<br />
                • <strong>Kopi Pagi Joglo:</strong> Buka mulai pukul 07.00 WIB di akhir pekan
              </p>
            </div>

            {/* 4. Surel (Opsional) */}
            <div className="ks-contact-card">
              <span className="ks-contact-card__label">Surel Resmi (Opsional)</span>
              <h4 className="ks-contact-card__title">sapa@kopisadewo.id</h4>
              <p className="ks-contact-card__desc">
                Terbuka untuk kolaborasi acara komunitas, kunjungan kelompok, maupun liputan media.
              </p>
            </div>
          </div>

          {/* Kolom Kanan: Peta Interaktif & Petunjuk Arah */}
          <div className="ks-contact__interactive">
            <div>
              <h3 className="ks-contact__interactive-title">
                Petunjuk Arah Menuju Pendopo
              </h3>
              <p className="ks-contact__interactive-desc">
                Berada di lingkungan tenang berhawa sejuk di lereng Gunung Merapi. Silakan ikuti peta navigasi di bawah ini:
              </p>
            </div>

            <div className="ks-contact__map-frame">
              <iframe
                title="Peta Lokasi Kopi Sadewo"
                className="ks-contact__map-iframe"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.535928813735!2d110.3951559!3d-7.7328905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a5991807d9bf5%3A0xb69680ee111!2sKaliurang%2C%20Sleman%2C%20Yogyakarta!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <Button
              variant="primary"
              size="md"
              fullWidth
              onClick={handleOpenMaps}
            >
              Buka Petunjuk Rute di Google Maps
            </Button>

            <div className="ks-contact__quick-note">
              <strong>Tips Singgah:</strong> Dari Jalan Kaliurang KM 9.5, belok ke arah timur menyusuri jalan desa beraspal halus. Jika ragu dengan belokan, kontak Mas Danu agar kami pandu secara langsung.
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Contact;
