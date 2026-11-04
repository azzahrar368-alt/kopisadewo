import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  getProducts,
  getCategories,
  createProduct,
  updateProduct,
  deleteProduct,
  createCategory,
  deleteCategory,
  getAdminUser,
  logoutAdmin,
  getFullImageUrl,
} from '../services/api';
import { ProductFormModal } from './ProductFormModal';
import { CategoryModal } from './CategoryModal';
import './AdminDashboard.css';

const formatRupiah = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount || 0);
};

export function AdminDashboard() {
  const navigate = useNavigate();
  const adminUser = getAdminUser();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // State Modal Produk & Kategori
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  // State Toast Notifikasi
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 3500);
  };

  // Muat data produk dan kategori
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [prodsData, catsData] = await Promise.all([
        getProducts(),
        getCategories(),
      ]);
      setProducts(prodsData || []);
      setCategories(catsData || []);
    } catch (err) {
      showToast(err.message || 'Gagal memuat data.', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Handler Logout
  const handleLogout = async () => {
    if (window.confirm('Apakah Anda yakin ingin keluar dari dasbor admin?')) {
      await logoutAdmin();
      navigate('/admin/login', { replace: true });
    }
  };

  // Handler Tambah & Edit Produk
  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setIsProductModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = async (payload, existingId) => {
    try {
      if (existingId) {
        const updated = await updateProduct(existingId, payload);
        setProducts((prev) =>
          prev.map((p) => (p.id === existingId ? { ...p, ...updated } : p))
        );
        showToast(`Produk "${payload.name}" berhasil diperbarui.`);
      } else {
        const created = await createProduct(payload);
        setProducts((prev) => [...prev, created]);
        showToast(`Produk "${payload.name}" berhasil ditambahkan ke menu.`);
      }
      setIsProductModalOpen(false);
    } catch (err) {
      showToast(err.message || 'Gagal menyimpan produk.', 'error');
      throw err;
    }
  };

  // Handler Hapus Produk
  const handleDeleteProduct = async (product) => {
    const confirmMessage = `Hapus menu "${product.name}" secara permanen?`;
    if (!window.confirm(confirmMessage)) return;

    try {
      await deleteProduct(product.id);
      setProducts((prev) => prev.filter((p) => p.id !== product.id));
      showToast(`Produk "${product.name}" telah dihapus.`);
    } catch (err) {
      showToast(err.message || 'Gagal menghapus produk.', 'error');
    }
  };

  // Handler Toggle Cepat Ketersediaan (Ready / Sold Out)
  const handleToggleAvailability = async (product) => {
    const newStatus = !product.is_available;
    // Optimistic Update
    setProducts((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, is_available: newStatus } : p))
    );

    try {
      await updateProduct(product.id, { is_available: newStatus });
      showToast(
        `Status "${product.name}" diubah menjadi: ${newStatus ? 'Tersedia' : 'Habis (Sold Out)'}`
      );
    } catch (err) {
      // Revert jika gagal
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? { ...p, is_available: !newStatus } : p))
      );
      showToast(err.message || 'Gagal memperbarui status ketersediaan.', 'error');
    }
  };

  // Handler Toggle Cepat Unggulan
  const handleToggleFeatured = async (product) => {
    const newStatus = !product.is_featured;
    setProducts((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, is_featured: newStatus } : p))
    );

    try {
      await updateProduct(product.id, { is_featured: newStatus });
      showToast(
        `Status favorit "${product.name}" diubah menjadi: ${newStatus ? 'Unggulan' : 'Biasa'}`
      );
    } catch (err) {
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? { ...p, is_featured: !newStatus } : p))
      );
      showToast(err.message || 'Gagal memperbarui status unggulan.', 'error');
    }
  };

  // Handler Kategori
  const handleAddCategory = async (catData) => {
    const newCat = await createCategory(catData);
    setCategories((prev) => [...prev, newCat]);
    showToast(`Kategori "${catData.name}" berhasil ditambahkan.`);
  };

  const handleDeleteCategory = async (catId) => {
    await deleteCategory(catId);
    setCategories((prev) => prev.filter((c) => c.id !== catId));
    showToast('Kategori berhasil dihapus.');
  };

  // Filter produk berdasarkan kategori dan pencarian
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat =
        selectedCategory === 'all' ||
        p.category_slug === selectedCategory ||
        p.category?.toLowerCase() === selectedCategory.toLowerCase();
      const q = search.trim().toLowerCase();
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [products, selectedCategory, search]);

  // Statistik Ringkas
  const stats = useMemo(() => {
    const total = products.length;
    const available = products.filter((p) => p.is_available).length;
    const soldOut = total - available;
    const featured = products.filter((p) => p.is_featured).length;
    return { total, available, soldOut, featured };
  }, [products]);

  return (
    <div className="ks-admin-page">
      {/* Toast Notification */}
      {toast.show && (
        <div className={`ks-admin-toast ks-admin-toast--${toast.type}`} role="alert">
          <span className="ks-admin-toast__icon">
            {toast.type === 'error' ? '!' : '✓'}
          </span>
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header Dasbor */}
      <header className="ks-admin-header">
        <div className="ks-admin-header__inner">
          <div className="ks-admin-header__brand">
            <div className="ks-admin-header__logo" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L3 8v3h18V8L12 2z" />
                <path d="M5 11v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8" />
                <path d="M9 16h6" />
              </svg>
            </div>
            <div>
              <h1 className="ks-admin-header__title">Kopi Sadewo</h1>
              <span className="ks-admin-header__tagline">Dasbor Pengelola &bull; Pendopo & Roastery</span>
            </div>
          </div>

          <div className="ks-admin-header__actions">
            <div className="ks-admin-user-badge">
              <span className="ks-admin-user-badge__avatar">☕</span>
              <span className="ks-admin-user-badge__name">
                {adminUser?.name || 'Administrator'}
              </span>
            </div>
            <Link to="/" className="ks-admin-btn-secondary" target="_blank" rel="noopener noreferrer">
              Lihat Website
            </Link>
            <button
              type="button"
              className="ks-admin-btn-logout"
              onClick={handleLogout}
            >
              Keluar
            </button>
          </div>
        </div>
      </header>

      {/* Konten Utama Dasbor */}
      <main className="ks-admin-main">
        {/* Ringkasan Kartu Statistik */}
        <section className="ks-admin-stats-grid">
          <div className="ks-admin-stat-card">
            <span className="ks-admin-stat-card__label">Total Menu Produk</span>
            <div className="ks-admin-stat-card__val">{stats.total}</div>
            <span className="ks-admin-stat-card__desc">Menu aktif terdaftar</span>
          </div>
          <div className="ks-admin-stat-card ks-admin-stat-card--success">
            <span className="ks-admin-stat-card__label">Menu Siap Seduh</span>
            <div className="ks-admin-stat-card__val">{stats.available}</div>
            <span className="ks-admin-stat-card__desc">Tersedia untuk tamu</span>
          </div>
          <div className="ks-admin-stat-card ks-admin-stat-card--warning">
            <span className="ks-admin-stat-card__label">Menu Habis</span>
            <div className="ks-admin-stat-card__val">{stats.soldOut}</div>
            <span className="ks-admin-stat-card__desc">Status Sold Out di menu</span>
          </div>
          <div className="ks-admin-stat-card ks-admin-stat-card--accent">
            <span className="ks-admin-stat-card__label">Menu Unggulan</span>
            <div className="ks-admin-stat-card__val">{stats.featured}</div>
            <span className="ks-admin-stat-card__desc">Ditampilkan favorit</span>
          </div>
        </section>

        {/* Bilah Aksi & Filter */}
        <section className="ks-admin-toolbar">
          <div className="ks-admin-toolbar__search-wrap">
            <svg className="ks-admin-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              className="ks-admin-search-input"
              placeholder="Cari nama menu atau deskripsi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                type="button"
                className="ks-admin-search-clear"
                onClick={() => setSearch('')}
              >
                &times;
              </button>
            )}
          </div>

          <div className="ks-admin-toolbar__filters">
            <select
              className="ks-admin-filter-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">Semua Kategori ({categories.length})</option>
              {categories.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>

            <button
              type="button"
              className="ks-admin-btn-secondary"
              onClick={() => setIsCategoryModalOpen(true)}
            >
              Kelola Kategori
            </button>

            <button
              type="button"
              className="ks-admin-btn-primary-action"
              onClick={handleOpenAddModal}
            >
              + Tambah Menu Baru
            </button>
          </div>
        </section>

        {/* Tabel / Daftar Produk */}
        <section className="ks-admin-table-container">
          {loading ? (
            <div className="ks-admin-loading-state">
              <div className="ks-admin-spinner-large" />
              <p>Memuat sajian menu Kopi Sadewo...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="ks-admin-empty-state">
              <span className="ks-admin-empty-icon">☕</span>
              <h3>Tidak ada menu yang sesuai</h3>
              <p>Coba periksa kata kunci pencarian atau pilih kategori yang berbeda.</p>
              {search && (
                <button
                  type="button"
                  className="ks-admin-btn-secondary"
                  onClick={() => { setSearch(''); setSelectedCategory('all'); }}
                >
                  Reset Filter
                </button>
              )}
            </div>
          ) : (
            <div className="ks-admin-table-wrapper">
              <table className="ks-admin-table">
                <thead>
                  <tr>
                    <th>Foto</th>
                    <th>Nama & Deskripsi</th>
                    <th>Kategori</th>
                    <th>Harga</th>
                    <th style={{ textAlign: 'center' }}>Ketersediaan</th>
                    <th style={{ textAlign: 'center' }}>Favorit</th>
                    <th style={{ textAlign: 'right' }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((p) => (
                    <tr key={p.id}>
                      {/* Thumbnail Foto */}
                      <td className="ks-admin-td-image">
                        <img
                          src={getFullImageUrl(p.image_url) || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80'}
                          alt={p.name}
                          className="ks-admin-thumb"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80';
                          }}
                        />
                      </td>

                      {/* Nama & Deskripsi */}
                      <td className="ks-admin-td-info">
                        <strong className="ks-admin-prod-name">{p.name}</strong>
                        <p className="ks-admin-prod-desc">{p.description || '—'}</p>
                      </td>

                      {/* Kategori Badge */}
                      <td>
                        <span className="ks-admin-badge ks-admin-badge--category">
                          {p.category || 'Coffee'}
                        </span>
                      </td>

                      {/* Harga */}
                      <td className="ks-admin-td-price">
                        <strong>{formatRupiah(p.price)}</strong>
                      </td>

                      {/* Toggle Ketersediaan */}
                      <td style={{ textAlign: 'center' }}>
                        <button
                          type="button"
                          className={`ks-admin-status-pill ${p.is_available ? 'ks-admin-status-pill--ready' : 'ks-admin-status-pill--empty'}`}
                          onClick={() => handleToggleAvailability(p)}
                          title="Klik untuk mengubah ketersediaan"
                        >
                          <span className="ks-admin-status-dot" />
                          <span>{p.is_available ? 'Tersedia' : 'Habis'}</span>
                        </button>
                      </td>

                      {/* Toggle Unggulan */}
                      <td style={{ textAlign: 'center' }}>
                        <button
                          type="button"
                          className={`ks-admin-featured-btn ${p.is_featured ? 'ks-admin-featured-btn--active' : ''}`}
                          onClick={() => handleToggleFeatured(p)}
                          title={p.is_featured ? 'Menu Unggulan (Klik untuk non-aktifkan)' : 'Jadikan Menu Unggulan'}
                        >
                          {p.is_featured ? '★ Unggulan' : '☆ Biasa'}
                        </button>
                      </td>

                      {/* Tombol Aksi: Edit & Hapus */}
                      <td className="ks-admin-td-actions">
                        <button
                          type="button"
                          className="ks-admin-action-btn ks-admin-action-btn--edit"
                          onClick={() => handleOpenEditModal(p)}
                        >
                          Ubah
                        </button>
                        <button
                          type="button"
                          className="ks-admin-action-btn ks-admin-action-btn--delete"
                          onClick={() => handleDeleteProduct(p)}
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      {/* Modal Tambah/Edit Produk */}
      <ProductFormModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onSave={handleSaveProduct}
        product={editingProduct}
        categories={categories}
      />

      {/* Modal Kelola Kategori */}
      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        categories={categories}
        onAddCategory={handleAddCategory}
        onDeleteCategory={handleDeleteCategory}
      />
    </div>
  );
}

export default AdminDashboard;
