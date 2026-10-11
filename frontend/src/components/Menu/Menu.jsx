import { useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { Button } from '../Button/Button';
import './Menu.css';

/**
 * Format harga Rupiah
 * @param {number} amount
 * @returns {string}
 */
function formatRupiah(amount) {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return 'Rp 0';
  }
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Komponen Kartu Produk Kopi Sadewo
 */
function ProductCard({ product, onOrder }) {
  const [imageError, setImageError] = useState(false);

  const {
    name = '',
    price = 0,
    category = '',
    image_url = '',
    is_available = true,
    is_featured = false,
  } = product || {};

  return (
    <article className="ks-product-card">
      <div className="ks-product-card__image-container">
        {image_url && !imageError ? (
          <img
            src={image_url}
            alt={name}
            className="ks-product-card__image"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="ks-product-card__image-fallback">
            {/* Siluet Ikon Cangkir Kopi Joglo */}
            <svg
              width="44"
              height="44"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
              <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
              <line x1="6" y1="1" x2="6" y2="4" />
              <line x1="10" y1="1" x2="10" y2="4" />
              <line x1="14" y1="1" x2="14" y2="4" />
            </svg>
            <span className="ks-product-card__image-fallback-text">Kopi Sadewo</span>
          </div>
        )}

        {/* Lencana (Badges) */}
        <div className="ks-product-card__badges">
          {category && (
            <span className="ks-badge ks-badge--category">{category}</span>
          )}

          {is_featured && is_available && (
            <span className="ks-badge ks-badge--featured">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              Favorit
            </span>
          )}

          {!is_available && (
            <span className="ks-badge ks-badge--unavailable">Habis</span>
          )}
        </div>
      </div>

      <div className="ks-product-card__body">
        <h3 className="ks-product-card__title">{name}</h3>

        <div className="ks-product-card__footer">
          <div>
            <div className="ks-product-card__price-label">Harga</div>
            <div className="ks-product-card__price">{formatRupiah(price)}</div>
          </div>

          <Button
            variant="secondary"
            size="sm"
            disabled={!is_available}
            onClick={() => onOrder && onOrder(product)}
            aria-label={`Pesan ${name}`}
          >
            {is_available ? 'Pesan' : 'Habis'}
          </Button>
        </div>
      </div>
    </article>
  );
}

/**
 * Komponen Skeleton Loading
 */
function LoadingSkeleton() {
  return (
    <div>
      <div className="ks-menu-loading" role="status" aria-live="polite">
        <div className="ks-menu-spinner" aria-hidden="true" />
        <p className="ks-menu-loading__text">Memuat Pilihan Menu Kopi Sadewo...</p>
        <span className="ks-menu-loading__subtext">Menyiapkan racikan seduhan terbaik dari pendopo</span>
      </div>

      <div className="ks-menu-grid" aria-hidden="true">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="ks-skeleton-card">
            <div className="ks-skeleton-image ks-skeleton-shimmer" />
            <div className="ks-skeleton-body">
              <div
                className="ks-skeleton-line ks-skeleton-shimmer"
                style={{ width: '65%' }}
              />
              <div
                className="ks-skeleton-line ks-skeleton-shimmer"
                style={{ width: '45%' }}
              />
              <div
                className="ks-skeleton-line ks-skeleton-shimmer"
                style={{ width: '80%', marginTop: 'auto' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Komponen Utama Menu
 * Mengintegrasikan useProducts hook dengan filter kategori,
 * pencarian debounce 300ms, loading state, pesan error ramah,
 * tampilan kosong "Menu tidak ditemukan", dan daftar produk.
 */
export function Menu({ onOrderProduct }) {
  const {
    products,
    loading,
    error,
    search,
    setSearch,
    category,
    setCategory,
    categories,
    refetch,
    resetFilters,
    isEmpty,
  } = useProducts();

  // Daftar kategori dengan opsi 'Semua' di awal
  const categoryOptions = [
    { id: 'all', name: 'Semua', slug: '' },
    ...(categories.length > 0
      ? categories
      : [
          { id: 1, name: 'Coffee', slug: 'coffee' },
          { id: 2, name: 'Non-Coffee', slug: 'non-coffee' },
          { id: 3, name: 'Food', slug: 'food' },
        ]),
  ];

  return (
    <div className="ks-menu-section">
      {/* Kontrol Navigasi: Pencarian Debounce 300ms & Filter Kategori */}
      <div className="ks-menu-controls">
        {/* Kolom Pencarian */}
        <div className="ks-menu-search-wrapper">
          <div className="ks-menu-search-icon" aria-hidden="true">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>

          <input
            type="text"
            className="ks-menu-search-input"
            placeholder="Cari menu kopi, minuman, atau camilan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Kolom pencarian menu"
          />

          {search && (
            <button
              type="button"
              className="ks-menu-search-clear"
              onClick={() => setSearch('')}
              aria-label="Hapus kata kunci pencarian"
              title="Hapus pencarian"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter Kategori */}
        <div
          className="ks-menu-categories"
          role="group"
          aria-label="Filter kategori menu"
        >
          {categoryOptions.map((cat) => {
            const isActive =
              cat.slug === category || (cat.slug === '' && category === '');
            return (
              <button
                key={cat.id || cat.slug}
                type="button"
                className={`ks-menu-category-btn ${
                  isActive ? 'ks-menu-category-btn--active' : ''
                }`}
                onClick={() => setCategory(cat.slug)}
                aria-pressed={isActive}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. Tampilan Loading Sederhana */}
      {loading && <LoadingSkeleton />}

      {/* 2. Pesan Error Ramah dengan Tombol "Coba lagi" */}
      {!loading && error && (
        <div className="ks-menu-error" role="alert">
          <div className="ks-menu-error__icon" aria-hidden="true">
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h3 className="ks-menu-error__title">Gagal Memuat Menu</h3>
          <p className="ks-menu-error__message">
            {error || 'Maaf, terjadi kendala saat memuat menu kopi. Periksa koneksi internet Anda dan silakan coba lagi.'}
          </p>
          <Button variant="primary" size="md" onClick={refetch}>
            Coba lagi
          </Button>
        </div>
      )}

      {/* 3. Tampilan Kosong ("Menu tidak ditemukan") */}
      {isEmpty && (
        <div className="ks-menu-empty">
          <div className="ks-menu-empty__icon" aria-hidden="true">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </div>
          <h3 className="ks-menu-empty__title">Menu tidak ditemukan</h3>
          <p className="ks-menu-empty__desc">
            {search
              ? `Tidak ada sajian yang cocok dengan kata kunci "${search}". Silakan coba kata kunci lain atau pilih kategori yang berbeda.`
              : 'Tidak ada sajian yang ditemukan pada kategori yang dipilih.'}
          </p>
          <Button variant="secondary" size="sm" onClick={resetFilters}>
            Tampilkan Semua Menu
          </Button>
        </div>
      )}

      {/* 4. Daftar Produk dari API */}
      {!loading && !error && products.length > 0 && (
        <div className="ks-menu-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOrder={onOrderProduct}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Menu;
