import { Container } from '../Container/Container';
import { SectionTitle } from '../SectionTitle/SectionTitle';
import { Button } from '../Button/Button';
import './Reservation.css';

const RESERVATION_WA_NUMBER = '6281234567890';

/**
 * Komponen Menu 4: Reservasi Tempat Kopi Sadewo
 * Memuat deskripsi tempat yang bisa dibooking (foto, kapasitas, biaya sewa, fasilitas),
 * kontak pengelola, nomor WhatsApp, serta tombol reservasi otomatis ke WA.
 */
export function Reservation() {
  const rooms = [
    {
      id: 'pendopo-utama',
      name: 'Pendopo Utama Joglo',
      capacity: '40 — 70 Orang',
      rate: 'Rp 350.000 / 3 Jam',
      rateNote: 'Atau Gratis dengan Minimum Order Menu',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
      description: 'Area pendopo joglo terbuka dengan tiang soko guru kayu jati megah dan hembusan angin alami Kaliurang. Sangat cocok untuk gathering komunitas, reuni akbar, pesta syukuran, workshop, dan arisan keluarga.',
      facilities: [
        'Sound System + 2 Mic Wireless',
        'Layar Proyektor Besar 120 inch',
        'Stopkontak Listrik di Setiap Sudut',
        'Pilihan Kursi Jati atau Lesehan Karpet',
        'Akses Parkir Mobil & Motor Luas',
        'Dekat Mushola & Toilet Bersih',
      ],
    },
    {
      id: 'vip-indoor',
      name: 'Ruang VIP Gandhok (Indoor AC)',
      capacity: '12 — 20 Orang',
      rate: 'Rp 200.000 / 2 Jam',
      rateNote: 'Termasuk Welcome Drink Kopi Susu',
      image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=800&q=80',
      description: 'Ruang tertutup berpendingin udara (AC) dengan dinding kaca menghadap taman hijau asri. Dirancang khusus untuk rapat bisnis, presentasi tim, diskusi skripsi, hingga perayaan keluarga yang intim.',
      facilities: [
        'Pendingin Udara (AC) Dingin Nyaman',
        'Smart TV 55" (HDMI & Wireless Casting)',
        'Wi-Fi Dedicated Cepat (100 Mbps)',
        'Whiteboard Kaca + Spidol Lengkap',
        'Stopkontak di Meja Setiap Peserta',
        'Pelayanan Menu Khusus di Ruangan',
      ],
    },
    {
      id: 'kebun-gazebo',
      name: 'Area Semi-Outdoor Gazebo Kebun',
      capacity: '15 — 30 Orang',
      rate: 'Rp 150.000 / 2 Jam',
      rateNote: 'Bisa Negosiasi Paket Camilan',
      image: 'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?auto=format&fit=crop&w=800&q=80',
      description: 'Area taman terbuka berpayung pepohonan rindang dengan pencahayaan lampu temaram estetik di sore dan malam hari. Suasana santai dan akrab yang ramah hewan peliharaan (pet-friendly).',
      facilities: [
        'Udara Terbuka Asri & Teduh Lereng Merapi',
        'Warm Ambient Lighting Sore-Malam',
        'Stopkontak Listrik Tersedia',
        'Dekat Kolam Ikan & Gemercik Air',
        'Pet-Friendly (Ramah Hewan Peliharaan)',
        'Area Merokok Terbuka Nyaman',
      ],
    },
  ];

  // Fungsi booking otomatis via WhatsApp
  const handleBookViaWhatsApp = (room) => {
    const templateBooking =
`Halo Admin Kopi Sadewo, saya ingin melakukan reservasi tempat:

• *Pilihan Area:* ${room.name}
• *Kapasitas:* ${room.capacity}
• *Biaya Sewa:* ${room.rate}

*DATA PEMESAN:*
• *Nama Pemesan:* 
• *Nomor Kontak / WhatsApp:* 
• *Rencana Tanggal & Jam:* 
• *Perkiraan Jumlah Tamu:* 
• *Keperluan Acara:* (Contoh: Rapat / Ulang Tahun / Gathering Komunitas)

Mohon informasi ketersediaan jadwal pada tanggal tersebut. Terima kasih! 🙏`;

    const encoded = encodeURIComponent(templateBooking);
    const url = `https://wa.me/${RESERVATION_WA_NUMBER}?text=${encoded}`;
    window.open(url, '_blank');
  };

  return (
    <section className="ks-reservation" id="reservasi">
      <Container size="xl">
        <SectionTitle
          subtitle="SEWA RUANGAN & TEMPAT"
          title="Reservasi Ruang Joglo Kopi Sadewo"
          description="Sediakan tempat terbaik untuk momen istimewa Anda. Mulai dari pendopo megah, ruang rapat VIP ber-AC, hingga gazebo taman asri dengan fasilitas lengkap."
          align="center"
          ornament={true}
        />

        {/* Grid Kartu Ruangan yang bisa dibooking */}
        <div className="ks-reservation__grid">
          {rooms.map((room) => (
            <div key={room.id} className="ks-room-card">
              <div className="ks-room-card__image-wrap">
                <img
                  src={room.image}
                  alt={room.name}
                  className="ks-room-card__image"
                  loading="lazy"
                />
                <span className="ks-room-card__capacity-badge">
                  {room.capacity}
                </span>
              </div>

              <div className="ks-room-card__body">
                <h3 className="ks-room-card__title">{room.name}</h3>
                <p className="ks-room-card__desc">{room.description}</p>

                {/* Biaya Sewa */}
                <div className="ks-room-card__rate">
                  <div>
                    <span className="ks-room-card__rate-label">Biaya Sewa</span>
                    <div className="ks-room-card__rate-note">{room.rateNote}</div>
                  </div>
                  <span className="ks-room-card__rate-val">{room.rate}</span>
                </div>

                {/* Fasilitas Lengkap */}
                <h4 className="ks-room-card__facilities-title">Fasilitas Termasuk:</h4>
                <ul className="ks-room-card__facilities">
                  {room.facilities.map((fac, idx) => (
                    <li key={idx} className="ks-room-card__facility-item">
                      <span className="ks-room-card__bullet">•</span>
                      <span>{fac}</span>
                    </li>
                  ))}
                </ul>

                {/* Tombol Booking Langsung ke WA */}
                <div className="ks-room-card__action">
                  <Button
                    variant="primary"
                    size="md"
                    fullWidth
                    onClick={() => handleBookViaWhatsApp(room)}
                  >
                    Booking via WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Kotak Kontak Reservasi & Nomor WA */}
        <div className="ks-reservation__contact-box">
          <div className="ks-reservation__contact-header">
            <h3 className="ks-reservation__contact-title">Butuh Konsultasi Penataan Acara?</h3>
            <p className="ks-reservation__contact-desc">
              Tim kami siap membantu menyiapkan konsumsi coffee break, paket prasmanan makanan khas Jawa,
              tata letak panggung, hingga tata meja sesuai kebutuhan acara Anda.
            </p>
          </div>

          <div className="ks-reservation__contact-details">
            <div className="ks-reservation__contact-item">
              <span className="ks-reservation__contact-key">Pengelola:</span>
              <span className="ks-reservation__contact-val">Mas Danu</span>
            </div>

            <div className="ks-reservation__contact-item">
              <span className="ks-reservation__contact-key">WhatsApp:</span>
              <span className="ks-reservation__contact-val">+62 812-3456-7890</span>
            </div>

            <div className="ks-reservation__contact-item">
              <span className="ks-reservation__contact-key">Waktu Konsultasi:</span>
              <span className="ks-reservation__contact-val">08.00 — 21.00 WIB</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Reservation;