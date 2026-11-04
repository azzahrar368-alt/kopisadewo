import { Container } from '../Container/Container';
import { Button } from '../Button/Button';
import './Beranda.css';

/**
 * Menu 1: Beranda Kopi Sadewo
 * Pendekatan Visual: Modern Heritage, Warm Minimalism, & Editorial Design.
 * Memuat: Logo, Foto Coffee Shop, Deskripsi Usaha, Jadwal Buka, Kontak Person,
 * Alamat Lengkap, Surel, Tagline, Informasi Biji Kopi, dan Tombol Menu & Reservasi.
 */
export function Beranda({ onGoToMenu, onGoToReservation }) {
  const coffeeBeans = [
    {
      id: 'robusta-menoreh',
      name: 'Robusta Menoreh',
      type: 'Single Origin Robusta',
      origin: 'Kulon Progo & Lereng Menoreh',
      roast: 'Medium-Dark Roast',
      notes: 'Dark chocolate, earthy, spicy aroma, body mantap',
      desc: 'Biji kopi dari perbukitan Menoreh berhawa sejuk. Dipetik merah sempurna, disangrai dengan profil mantap untuk menghasilkan seduhan kopi tubruk pekat dan Kopi Susu Aren Sadewo yang gurih seimbang.',
    },
    {
      id: 'arabika-merapi',
      name: 'Arabika Lereng Merapi',
      type: 'Single Origin Arabika',
      origin: 'Cangkringan, Sleman (1.200 mdpl)',
      roast: 'Medium Roast',
      notes: 'Floral, citrus manis, brown sugar, clean aftertaste',
      desc: 'Ditanam di tanah vulkanik lereng Gunung Merapi yang kaya mineral. Memiliki keasaman buah yang lembut dan rasa manis tebu alami saat diseduh metode pour-over V60 atau Japanese Iced Coffee.',
    },
    {
      id: 'sadewo-blend',
      name: 'Sadewo Joglo Blend',
      type: 'Signature Roastery Blend',
      origin: '50% Arabika Temanggung + 50% Robusta Menoreh',
      roast: 'Medium Roast',
      notes: 'Karamel, kacang panggang, lembut di lambung',
      desc: 'Racikan andalan sangrai Sadewo yang menyeimbangkan keharuman floral Arabika dan ketegasan Robusta lokal. Menghadirkan cangkir kopi yang ramah dinikmati kapan saja di bawah pendopo.',
    },
  ];

  return (
    <section className="ks-beranda" id="beranda">
      <Container size="xl">
        {/* Hero Editorial Utama */}
        <div className="ks-beranda__hero">
          <div className="ks-beranda__content">
            {/* Label Lokasi Sederhana & Bersahaja */}
            <span className="ks-beranda__location-tag">
              Kaliurang, Sleman — Daerah Istimewa Yogyakarta
            </span>

            {/* Sapaan Hangat */}
            <span className="ks-beranda__greeting">Sugeng Rawuh ing Pendopo</span>

            {/* Headline yang Proporsional & Matang */}
            <h1 className="ks-beranda__title">
              Kehangatan Tradisi di Bawah<br className="ks-hero-br" /> Naungan Rumah Joglo
            </h1>

            {/* Deskripsi Tentang Kopi Sadewo */}
            <p className="ks-beranda__desc">
              Kopi Sadewo adalah kedai kopi bernuansa joglo Jawa yang lahir dari kerinduan akan suasana rumah simbah. 
              Di bawah tiang kayu jati tua dan hembusan angin alami Kaliurang, kami menyajikan kopi nusantara 
              yang diseduh perlahan sebagai teman berbincang dan rehat dari hiruk pikuk keseharian.
            </p>

            {/* Tombol Aksi (CTA) */}
            <div className="ks-beranda__actions">
              <Button
                variant="primary"
                size="md"
                onClick={onGoToMenu}
              >
                Lihat Daftar Menu
              </Button>

              <Button
                variant="secondary"
                size="md"
                onClick={onGoToReservation}
              >
                Reservasi Ruang Joglo
              </Button>
            </div>

            {/* Catatan Singgah & Informasi Pokok (Jadwal, Kontak, Alamat, Surel) */}
            <div className="ks-beranda__guide-strip">
              <div className="ks-beranda__guide-item">
                <span className="ks-beranda__guide-label">Jadwal Buka & Seduh</span>
                <span className="ks-beranda__guide-val">
                  Senin — Jumat: 08.00 — 23.00 WIB<br />
                  Sabtu — Minggu: 07.00 — 24.00 WIB
                </span>
              </div>

              <div className="ks-beranda__guide-item">
                <span className="ks-beranda__guide-label">Kontak Person</span>
                <span className="ks-beranda__guide-val">
                  Mas Danu (+62 812-3456-7890)<br />
                  Layanan pesan cepat WhatsApp
                </span>
              </div>

              <div className="ks-beranda__guide-item">
                <span className="ks-beranda__guide-label">Alamat Lengkap</span>
                <span className="ks-beranda__guide-val">
                  Jl. Kaliurang KM 9.5, Sleman, D.I. Yogyakarta 55581
                </span>
              </div>

              <div className="ks-beranda__guide-item">
                <span className="ks-beranda__guide-label">Surel (Opsional)</span>
                <span className="ks-beranda__guide-val">
                  sapa@kopisadewo.id
                </span>
              </div>
            </div>
          </div>

          {/* Fotografi Arsitektur Pendopo */}
          <div className="ks-beranda__photo-col">
            <div className="ks-beranda__photo-wrap">
              <img
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80"
                alt="Suasana Ruang Pendopo Rumah Joglo Kopi Sadewo"
                className="ks-beranda__photo-img"
                loading="eager"
              />
            </div>
            <p className="ks-beranda__photo-caption">
              Pendopo Utama Kopi Sadewo — Suasana teduh kayu jati berpadu cahaya matahari alami Kaliurang.
            </p>
          </div>
        </div>

        {/* Informasi Mengenai Jenis Biji Kopi yang Digunakan */}
        <div className="ks-beranda__roastery">
          <div className="ks-beranda__roastery-header">
            <span className="ks-beranda__roastery-eyebrow">Pilihan Sangrai Sadewo</span>
            <h2 className="ks-beranda__roastery-title">Biji Kopi Asli Tanah Jawa</h2>
            <p className="ks-beranda__roastery-sub">
              Bermitra langsung dengan petani lokal di lereng Merapi dan pegunungan Menoreh. 
              Dipanen saat petik merah, diproses dengan ketelitian tinggi, dan disangrai segar setiap pekan.
            </p>
          </div>

          <div className="ks-beranda__beans-grid">
            {coffeeBeans.map((bean) => (
              <article key={bean.id} className="ks-cupping-card">
                <div className="ks-cupping-card__header">
                  <span className="ks-cupping-card__type">{bean.type}</span>
                  <h3 className="ks-cupping-card__name">{bean.name}</h3>
                </div>

                <p className="ks-cupping-card__desc">{bean.desc}</p>

                <div className="ks-cupping-card__notes">
                  <div><strong>Asal Panen:</strong> {bean.origin}</div>
                  <div><strong>Profil Sangrai:</strong> {bean.roast}</div>
                  <div><strong>Catatan Rasa:</strong> {bean.notes}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Beranda;
