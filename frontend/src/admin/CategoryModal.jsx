import { useState } from 'react';
import './ProductFormModal.css';

export function CategoryModal({
  isOpen,
  onClose,
  categories = [],
  onAddCategory,
  onDeleteCategory,
}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleAdd = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Nama kategori wajib diisi.');
      return;
    }

    try {
      setSaving(true);
      await onAddCategory({
        name: name.trim(),
        description: description.trim(),
      });
      setName('');
      setDescription('');
    } catch (err) {
      setError(err.message || 'Gagal menambahkan kategori.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, catName) => {
    if (!window.confirm(`Yakin ingin menghapus kategori "${catName}"?`)) {
      return;
    }
    setError('');
    try {
      await onDeleteCategory(id);
    } catch (err) {
      setError(err.message || 'Gagal menghapus kategori.');
    }
  };

  return (
    <div className="ks-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="ks-modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '560px' }}>
        <div className="ks-modal-header">
          <div className="ks-modal-header__title-wrap">
            <span className="ks-modal-header__tag">Pengaturan</span>
            <h2 className="ks-modal-header__title">Kelola Kategori Menu</h2>
          </div>
          <button type="button" className="ks-modal-close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        {error && (
          <div className="ks-modal-alert">
            <span>&bull;</span>
            <span>{error}</span>
          </div>
        )}

        <div style={{ padding: '20px 28px' }}>
          {/* Daftar Kategori Saat Ini */}
          <h3 style={{ fontSize: 'var(--fs-sm)', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '10px' }}>
            Daftar Kategori ({categories.length})
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
            {categories.map((c) => (
              <div
                key={c.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  backgroundColor: 'var(--color-cream-subtle)',
                  borderRadius: '6px',
                  border: '1px solid var(--border-primary)',
                }}
              >
                <div>
                  <strong style={{ display: 'block', fontSize: 'var(--fs-sm)', color: 'var(--text-primary)' }}>
                    {c.name}
                  </strong>
                  <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>
                    Slug: {c.slug} {c.description && `— ${c.description}`}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(c.id, c.name)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#9B1C1C',
                    cursor: 'pointer',
                    fontSize: 'var(--fs-xs)',
                    padding: '4px 8px',
                    borderRadius: '4px',
                  }}
                  title="Hapus Kategori"
                >
                  Hapus
                </button>
              </div>
            ))}
          </div>

          {/* Form Tambah Kategori */}
          <form onSubmit={handleAdd} style={{ borderTop: '1px solid var(--border-primary)', paddingTop: '18px' }}>
            <h3 style={{ fontSize: 'var(--fs-sm)', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '12px' }}>
              Tambah Kategori Baru
            </h3>
            <div className="ks-modal-group" style={{ marginBottom: '12px' }}>
              <label className="ks-modal-label">Nama Kategori *</label>
              <input
                type="text"
                className="ks-modal-input"
                placeholder="Misal: Mocktail Nusantara"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="ks-modal-group" style={{ marginBottom: '16px' }}>
              <label className="ks-modal-label">Deskripsi Singkat</label>
              <input
                type="text"
                className="ks-modal-input"
                placeholder="Keterangan singkat kategori ini..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="ks-modal-btn-submit"
              style={{ width: '100%' }}
              disabled={saving}
            >
              {saving ? 'Menyimpan...' : '+ Tambahkan Kategori'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CategoryModal;
