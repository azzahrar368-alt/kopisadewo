import { useState, useEffect, useRef } from 'react';
import { uploadProductImage, getFullImageUrl } from '../services/api';
import './ProductFormModal.css';

const DEFAULT_IMAGE_PRESETS = [
  { label: 'Kopi Susu / Latte', url: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80' },
  { label: 'Espresso', url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80' },
  { label: 'Americano / Black', url: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?auto=format&fit=crop&w=600&q=80' },
  { label: 'Matcha / Teh Hijau', url: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80' },
  { label: 'Cokelat Hangat', url: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=600&q=80' },
  { label: 'Roti Panggang / Toast', url: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80' },
  { label: 'Camilan Goreng', url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80' },
];

export function ProductFormModal({
  isOpen,
  onClose,
  onSave,
  product = null,
  categories = [],
}) {
  const isEditing = Boolean(product && product.id);
  const fileInputRef = useRef(null);

  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Mode Pemilihan Gambar: 'upload' (Unggah Berkas) atau 'url' (Tautan URL)
  const [imageMode, setImageMode] = useState('upload');
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState('');

  // Sinkronkan state saat product berubah atau modal dibuka
  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setCategoryId(product.category_id || (categories[0]?.id ?? ''));
      setPrice(product.price ? String(product.price) : '');
      setDescription(product.description || '');
      setImageUrl(product.image_url || '');
      setIsAvailable(product.is_available !== undefined ? product.is_available : true);
      setIsFeatured(Boolean(product.is_featured));
      setUploadedFileName(product.image_url ? 'Foto Produk Saat Ini' : '');
    } else {
      setName('');
      setCategoryId(categories[0]?.id ? String(categories[0].id) : '1');
      setPrice('');
      setDescription('');
      setImageUrl('');
      setIsAvailable(true);
      setIsFeatured(false);
      setUploadedFileName('');
    }
    setError('');
    setImageMode('upload');
    setUploading(false);
  }, [product, categories, isOpen]);

  if (!isOpen) return null;

  // Handler saat file dipilih untuk diunggah
  const handleFileProcess = async (file) => {
    if (!file) return;

    // Validasi tipe berkas
    if (!file.type.startsWith('image/')) {
      setError('Berkas harus berupa gambar (JPG, PNG, WEBP, atau GIF).');
      return;
    }

    // Validasi ukuran berkas (Maks 5MB)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      setError(`Ukuran foto terlalu besar (${(file.size / (1024 * 1024)).toFixed(1)}MB). Batas maksimal adalah 5MB.`);
      return;
    }

    try {
      setUploading(true);
      setError('');
      setUploadedFileName(file.name);

      // Unggah ke backend
      const result = await uploadProductImage(file);
      setImageUrl(result.url);
    } catch (err) {
      setError(err.message || 'Gagal mengunggah foto. Pastikan server backend sedang aktif.');
      setUploadedFileName('');
    } finally {
      setUploading(false);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  };

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  };

  const handleRemovePhoto = () => {
    setImageUrl('');
    setUploadedFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Nama produk wajib diisi.');
      return;
    }

    const numPrice = Number(price);
    if (isNaN(numPrice) || numPrice < 0) {
      setError('Harga harus berupa angka dan tidak boleh kurang dari 0.');
      return;
    }

    const finalImage = imageUrl.trim() || DEFAULT_IMAGE_PRESETS[0].url;

    const payload = {
      name: name.trim(),
      category_id: Number(categoryId) || 1,
      price: numPrice,
      description: description.trim(),
      image_url: finalImage,
      is_available: Boolean(isAvailable),
      is_featured: Boolean(isFeatured),
    };

    try {
      setSaving(true);
      await onSave(payload, product?.id);
      onClose();
    } catch (err) {
      setError(err.message || 'Gagal menyimpan data produk.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="ks-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="ks-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="ks-modal-header">
          <div className="ks-modal-header__title-wrap">
            <span className="ks-modal-header__tag">
              {isEditing ? 'Perbarui Menu' : 'Menu Baru'}
            </span>
            <h2 className="ks-modal-header__title">
              {isEditing ? `Edit Produk: ${product.name}` : 'Tambah Produk Kopi Sadewo'}
            </h2>
          </div>
          <button
            type="button"
            className="ks-modal-close-btn"
            onClick={onClose}
            aria-label="Tutup formulir"
          >
            &times;
          </button>
        </div>

        {error && (
          <div className="ks-modal-alert">
            <span>&bull;</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="ks-modal-form">
          <div className="ks-modal-grid-2">
            {/* Nama Produk */}
            <div className="ks-modal-group">
              <label className="ks-modal-label" htmlFor="prod-name">
                Nama Produk *
              </label>
              <input
                id="prod-name"
                type="text"
                className="ks-modal-input"
                placeholder="Misal: Kopi Susu Sadewo Aren"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Kategori */}
            <div className="ks-modal-group">
              <label className="ks-modal-label" htmlFor="prod-category">
                Kategori *
              </label>
              <select
                id="prod-category"
                className="ks-modal-select"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="ks-modal-grid-2">
            {/* Harga */}
            <div className="ks-modal-group">
              <label className="ks-modal-label" htmlFor="prod-price">
                Harga (Rp) *
              </label>
              <input
                id="prod-price"
                type="number"
                min="0"
                step="500"
                className="ks-modal-input"
                placeholder="18000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            {/* Status Ketersediaan & Unggulan */}
            <div className="ks-modal-group">
              <label className="ks-modal-label">Status & Tampilan</label>
              <div className="ks-modal-checkbox-row">
                <label className="ks-modal-checkbox-label">
                  <input
                    type="checkbox"
                    checked={isAvailable}
                    onChange={(e) => setIsAvailable(e.target.checked)}
                  />
                  <span>Tersedia (Ready Stock)</span>
                </label>
                <label className="ks-modal-checkbox-label">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                  />
                  <span>Produk Unggulan (Favorit)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Deskripsi */}
          <div className="ks-modal-group">
            <label className="ks-modal-label" htmlFor="prod-desc">
              Deskripsi Rasa & Bahan
            </label>
            <textarea
              id="prod-desc"
              rows={2}
              className="ks-modal-textarea"
              placeholder="Ceritakan racikan kopi atau sajian makanan ini..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Bagian Foto Produk (Unggah Berkas / Tautan URL) */}
          <div className="ks-modal-group">
            <div className="ks-modal-image-tabs-header">
              <label className="ks-modal-label" style={{ marginBottom: 0 }}>
                Foto Produk
              </label>
              <div className="ks-modal-tab-pills">
                <button
                  type="button"
                  className={`ks-modal-tab-pill ${imageMode === 'upload' ? 'ks-modal-tab-pill--active' : ''}`}
                  onClick={() => setImageMode('upload')}
                >
                  📁 Unggah dari Komputer
                </button>
                <button
                  type="button"
                  className={`ks-modal-tab-pill ${imageMode === 'url' ? 'ks-modal-tab-pill--active' : ''}`}
                  onClick={() => setImageMode('url')}
                >
                  🔗 Gunakan URL / Contoh
                </button>
              </div>
            </div>

            {/* MODE 1: UNGGAH DARI KOMPUTER */}
            {imageMode === 'upload' && (
              <div className="ks-modal-upload-section">
                <input
                  ref={fileInputRef}
                  type="file"
                  id="prod-file-upload"
                  accept="image/png, image/jpeg, image/jpg, image/webp, image/gif"
                  style={{ display: 'none' }}
                  onChange={handleFileInputChange}
                  disabled={uploading}
                />

                <div
                  className={`ks-modal-dropzone ${isDragging ? 'ks-modal-dropzone--dragging' : ''} ${uploading ? 'ks-modal-dropzone--uploading' : ''}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {uploading ? (
                    <div className="ks-modal-dropzone-loading">
                      <div className="ks-admin-spinner" style={{ width: '24px', height: '24px', borderWidth: '3px' }} />
                      <p>Mengunggah foto ke server...</p>
                    </div>
                  ) : imageUrl ? (
                    <div className="ks-modal-dropzone-has-file">
                      <img
                        src={getFullImageUrl(imageUrl)}
                        alt="Foto Terunggah"
                        className="ks-modal-dropzone-preview-img"
                      />
                      <div className="ks-modal-dropzone-file-info">
                        <strong>✓ Foto Siap Digunakan</strong>
                        <span>{uploadedFileName || 'Foto lokal tersimpan'}</span>
                        <div className="ks-modal-dropzone-actions" onClick={(e) => e.stopPropagation()}>
                          <button
                            type="button"
                            className="ks-modal-dropzone-change-btn"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            Ganti Foto
                          </button>
                          <button
                            type="button"
                            className="ks-modal-dropzone-delete-btn"
                            onClick={handleRemovePhoto}
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="ks-modal-dropzone-empty">
                      <div className="ks-modal-dropzone-icon">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="17 8 12 3 7 8" />
                          <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                      </div>
                      <p className="ks-modal-dropzone-text">
                        <strong>Klik untuk pilih foto</strong> atau seret & lepas (drag-and-drop) berkas ke sini
                      </p>
                      <span className="ks-modal-dropzone-hint">
                        Format didukung: JPG, PNG, WEBP, GIF (Maks. 5 MB)
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* MODE 2: TAUTAN URL / PRESET */}
            {imageMode === 'url' && (
              <div className="ks-modal-url-section">
                <input
                  id="prod-image-url"
                  type="url"
                  className="ks-modal-input"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />

                <div className="ks-modal-presets">
                  <span className="ks-modal-presets__title">Atau pilih contoh foto:</span>
                  <div className="ks-modal-presets__list">
                    {DEFAULT_IMAGE_PRESETS.map((p) => (
                      <button
                        key={p.label}
                        type="button"
                        className={`ks-modal-preset-btn ${imageUrl === p.url ? 'ks-modal-preset-btn--active' : ''}`}
                        onClick={() => setImageUrl(p.url)}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {imageUrl && (
                  <div className="ks-modal-image-preview">
                    <img
                      src={getFullImageUrl(imageUrl)}
                      alt="Pratinjau Foto Produk"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <span className="ks-modal-image-preview__caption">Pratinjau Foto URL</span>
                    </div>
                    <button
                      type="button"
                      className="ks-modal-preset-clear-btn"
                      onClick={() => setImageUrl('')}
                    >
                      Hapus
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="ks-modal-footer">
            <button
              type="button"
              className="ks-modal-btn-cancel"
              onClick={onClose}
              disabled={saving || uploading}
            >
              Batal
            </button>
            <button
              type="submit"
              className="ks-modal-btn-submit"
              disabled={saving || uploading}
            >
              {saving ? 'Menyimpan Perubahan...' : uploading ? 'Mengunggah Foto...' : isEditing ? 'Simpan Perubahan' : 'Tambahkan ke Menu'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductFormModal;
