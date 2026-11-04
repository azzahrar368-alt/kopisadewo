import { useState } from 'react';
import { Container } from '../Container/Container';
import { SectionTitle } from '../SectionTitle/SectionTitle';
import './EventGallery.css';

/**
 * Komponen Menu 5: Event Gallery Kopi Sadewo
 * Menampilkan dokumentasi berbagai kegiatan dan acara yang pernah
 * diselenggarakan di pendopo maupun area Kopi Sadewo.
 */
export function EventGallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const eventsData = [
    {
      id: 1,
      title: 'Malam Akustik di Bawah Naungan Pendopo',
      category: 'musik',
      categoryLabel: 'Live Music Akustik',
      date: 'Setiap Jumat & Sabtu Malam',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
      description: 'Pentas alunan musik akustik folk dan tembang lawas berpadu hangatnya seduhan kopi tubruk, menciptakan malam yang syahdu dan mengesankan bagi seluruh pengunjung pendopo.',
    },
    {
      id: 2,
      title: 'Workshop Manual Brew & Coffee Cupping Merapi',
      category: 'workshop',
      categoryLabel: 'Workshop Kopi',
      date: '14 September 2024',
      image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80',
      description: 'Kelas interaktif mengenal karakter rasa biji kopi Robusta Menoreh dan Arabika Merapi. Peserta belajar langsung teknik tuang V60, aeropress, hingga kalibrasi rasa dari barista Sadewo.',
    },
    {
      id: 3,
      title: 'Kopi Darat Komunitas Vespa & Motor Antik',
      category: 'komunitas',
      categoryLabel: 'Gathering Komunitas',
      date: '28 Oktober 2024',
      image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80',
      description: 'Pertemuan hangat puluhan pecinta skuter klasik dari berbagai penjuru Yogyakarta. Pelataran pendopo joglo dipenuhi koleksi motor antik dengan suasana guyub rukun khas warga.',
    },
    {
      id: 4,
      title: 'Nonton Bareng Semifinal Timnas Indonesia',
      category: 'nobar',
      categoryLabel: 'Nobar & Perayaan',
      date: '2 Mei 2024',
      image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80',
      description: 'Sorak riuh ratusan warga dan mahasiswa memadati pendopo utama di depan layar proyektor besar 120 inci, ditemani wedang rempah hangat dan singkong goreng gurih.',
    },
    {
      id: 5,
      title: 'Syukuran & Intimate Birthday Gathering',
      category: 'nobar',
      categoryLabel: 'Acara Privat',
      date: '19 November 2024',
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80',
      description: 'Perayaan ulang tahun penuh kehangatan di area VIP indoor dan kebun semi-outdoor dengan dekorasi bunga alam dan paket menu hidangan khas dapur Sadewo.',
    },
    {
      id: 6,
      title: 'Pameran Mini Seni Lukis & Kelas Batik Canting',
      category: 'workshop',
      categoryLabel: 'Seni & Budaya',
      date: '10 Desember 2024',
      image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
      description: 'Kolaborasi kreatif bersama seniman muda lokal dalam mengenalkan seni membatik tradisional kepada para penikmat kopi di pendopo samping.',
    },
  ];

  const filterOptions = [
    { key: 'all', label: 'Semua Kegiatan' },
    { key: 'musik', label: 'Live Music' },
    { key: 'workshop', label: 'Workshop Kopi & Seni' },
    { key: 'komunitas', label: 'Gathering Komunitas' },
    { key: 'nobar', label: 'Nobar & Syukuran' },
  ];

  const filteredEvents = eventsData.filter((ev) => {
    if (activeFilter === 'all') return true;
    return ev.category === activeFilter;
  });

  return (
    <section className="ks-gallery" id="galeri">
      <Container size="xl">
        <SectionTitle
          subtitle="DOKUMENTASI KEGIATAN"
          title="Event Gallery Kopi Sadewo"
          description="Rekam jejak kebersamaan, pentas alunan musik akustik, workshop seduhan kopi, dan temu komunitas yang pernah terselenggara di pendopo kami."
          align="center"
          ornament={true}
        />

        {/* Filter Buttons */}
        <div className="ks-gallery__filters">
          {filterOptions.map((opt) => (
            <button
              key={opt.key}
              type="button"
              className={`ks-gallery__filter-btn ${
                activeFilter === opt.key ? 'ks-gallery__filter-btn--active' : ''
              }`}
              onClick={() => setActiveFilter(opt.key)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Grid Dokumentasi Foto */}
        <div className="ks-gallery__grid">
          {filteredEvents.map((ev) => (
            <article
              key={ev.id}
              className="ks-gallery-card"
              onClick={() => setSelectedEvent(ev)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setSelectedEvent(ev)}
            >
              <div className="ks-gallery-card__img-wrap">
                <img
                  src={ev.image}
                  alt={ev.title}
                  className="ks-gallery-card__img"
                  loading="lazy"
                />
                <span className="ks-gallery-card__badge">{ev.categoryLabel}</span>
              </div>

              <div className="ks-gallery-card__body">
                <span className="ks-gallery-card__date">{ev.date}</span>
                <h3 className="ks-gallery-card__title">{ev.title}</h3>
                <p className="ks-gallery-card__desc">{ev.description}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Lightbox Modal Foto */}
        {selectedEvent && (
          <div
            className="ks-gallery-lightbox"
            onClick={() => setSelectedEvent(null)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="ks-gallery-lightbox__content"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="ks-gallery-lightbox__close"
                onClick={() => setSelectedEvent(null)}
                aria-label="Tutup preview dokumentasi"
              >
                ✕
              </button>

              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="ks-gallery-lightbox__img"
              />

              <div className="ks-gallery-lightbox__details">
                <span className="ks-gallery-lightbox__tag">
                  {selectedEvent.categoryLabel} • {selectedEvent.date}
                </span>
                <h3 className="ks-gallery-lightbox__title">{selectedEvent.title}</h3>
                <p className="ks-gallery-lightbox__text">{selectedEvent.description}</p>
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}

export default EventGallery;