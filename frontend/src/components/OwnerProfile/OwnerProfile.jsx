import { Container } from '../Container/Container';
import { Button } from '../Button/Button';
import './OwnerProfile.css';

/**
 * Menu 2: Profil Owner Kopi Sadewo
 * Nuansa Homie, Cerita Otentik, & Bersahaja.
 * Memuat: Foto, Nama, Motivasi Membangun Sadewo Kopi, dan Button Ke Menu & Reservasi.
 */
export function OwnerProfile({ onGoToMenu, onGoToReservation }) {
  const owner = {
    name: 'Bp. Raden Dananjaya Sadewo',
    role: 'Pendiri & Penyangrai Kopi Sadewo',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    quote: '"Kopi di tanah Jawa bukan semata perihal kafein, melainkan sarana srawung — jembatan rasa yang merekatkan persaudaraan di bawah naungan pendopo."',
    chapters: [
      {
        tag: 'I. Kerinduan Suasana Pendopo Simbah',
        desc: 'Masa kecil saya dihabiskan di teras rumah joglo simbah di perbukitan. Saya selalu rindu aroma wajan tanah liat saat simbah menyangrai kopi tubruk, bunyi hujan di atas genteng lempung, dan rasa damai saat warga duduk melingkar tanpa sekat formalitas.',
      },
      {
        tag: 'II. Menghargai Jerih Payah Petani Kopi Lokal',
        desc: 'Saat berkunjung ke kebun-kebun kopi di lereng Merapi dan pegunungan Menoreh, saya melihat dedikasi luar biasa para petani merawat pohon kopi mereka. Kopi Sadewo berdiri dengan komitmen membeli langsung hasil panen petik merah dengan harga yang adil dan bermartabat.',
      },
      {
        tag: 'III. Membangun Ruang yang Terbuka untuk Siapa Saja',
        desc: 'Kami ingin Kopi Sadewo menjadi tempat singgah yang ramah. Mahasiswa yang butuh ketenangan belajar, kawan komunitas yang ingin berbagi cerita, hingga keluarga yang ingin bernostalgia, semuanya kami sambut layaknya tamu yang pulang ke rumah sendiri.',
      },
    ],
  };

  return (
    <section className="ks-owner" id="profil-owner">
      <Container size="xl">
        <div className="ks-owner__wrapper">
          {/* Foto Owner Tradisional */}
          <div className="ks-owner__photo-col">
            <div className="ks-owner__photo-wrap">
              <img
                src={owner.photo}
                alt={`Potret ${owner.name}`}
                className="ks-owner__photo-img"
                loading="lazy"
              />
            </div>
            <div className="ks-owner__photo-caption">
              <h3 className="ks-owner__photo-name">{owner.name}</h3>
              <p className="ks-owner__photo-role">{owner.role}</p>
            </div>
          </div>

          {/* Kisah & Motivasi Membangun Sadewo Kopi */}
          <div className="ks-owner__content-col">
            <span className="ks-owner__eyebrow">Catatan dari Sang Pemilik</span>
            <h2 className="ks-owner__heading">Secarik Kisah di Balik Kopi Sadewo</h2>

            <blockquote className="ks-owner__quote">
              {owner.quote}
            </blockquote>

            <div className="ks-owner__story-flow">
              {owner.chapters.map((chap, idx) => (
                <div key={idx} className="ks-owner__story-block">
                  <h3 className="ks-owner__story-title">{chap.tag}</h3>
                  <p className="ks-owner__story-desc">{chap.desc}</p>
                </div>
              ))}
            </div>

            {/* Button Ke Menu & Reservasi */}
            <div className="ks-owner__actions">
              <Button
                variant="primary"
                size="md"
                onClick={onGoToMenu}
              >
                Pilih Menu Favorit
              </Button>

              <Button
                variant="secondary"
                size="md"
                onClick={onGoToReservation}
              >
                Reservasi Ruang Joglo
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default OwnerProfile;