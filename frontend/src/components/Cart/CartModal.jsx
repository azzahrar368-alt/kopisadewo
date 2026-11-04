import { useState } from 'react';
import './CartModal.css';

/**
 * Nomor WhatsApp Resmi Kopi Sadewo
 */
export const SADEWO_WA_NUMBER = '62895321087770';

/**
 * Helper Format Rupiah
 */
export function formatRupiah(amount) {
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
 * Komponen Modal Keranjang & Tombol Keranjang Melayang (Floating Cart)
 * Memungkinkan pengunjung memilih beberapa menu, melihat total harga,
 * dan langsung checkout ke WhatsApp Sadewo dengan otomatisasi pesan terformat.
 */
export function CartModal({
  cart = [],
  isOpen = false,
  onClose,
  onOpen,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
}) {
  const [customerName, setCustomerName] = useState('');
  const [orderType, setOrderType] = useState('Dine-in (Makan di Tempat)');
  const [tableNumber, setTableNumber] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');

  // Hitung total item & total harga
  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  // Fungsi checkout otomatisasi ke WhatsApp Sadewo
  const handleCheckoutToWhatsApp = () => {
    if (cart.length === 0) {
      alert('Keranjang pesanan Anda masih kosong!');
      return;
    }

    if (!customerName.trim()) {
      alert('Silakan masukkan Nama Pemesan terlebih dahulu.');
      return;
    }

    let detailPesanan = '';
    cart.forEach((item, index) => {
      const subtotal = item.price * item.qty;
      detailPesanan += `${index + 1}. *${item.name}* (${item.qty}x) = ${formatRupiah(subtotal)}\n`;
    });

    const infoMeja = orderType.includes('Dine-in')
      ? `${orderType} ${tableNumber ? `- No. Meja: ${tableNumber}` : ''}`
      : orderType;

    const pesanWA =
`Halo Kopi Sadewo, saya ingin memesan menu:

*DETAIL PESANAN:*
${detailPesanan}-----------------------------------------
*TOTAL PEMBAYARAN: ${formatRupiah(totalPrice)}*

*DATA PEMESAN:*
• *Nama Pemesan:* ${customerName.trim()}
• *Tipe Pesanan:* ${infoMeja}
• *Catatan Khusus:* ${customerNotes.trim() ? customerNotes.trim() : 'Tidak ada catatan'}

Mohon konfirmasi ketersediaan dan rincian pembayarannya. Terima kasih! 🙏☕`;

    const encodedText = encodeURIComponent(pesanWA);
    const waUrl = `https://wa.me/${SADEWO_WA_NUMBER}?text=${encodedText}`;

    window.open(waUrl, '_blank');
  };

  return (
    <>
      {/* 1. Floating Cart Button (Tampil jika ada minimal 1 item di keranjang) */}
      {totalItems > 0 && !isOpen && (
        <button
          type="button"
          className="ks-cart-floating"
          onClick={onOpen}
          aria-label={`Buka keranjang pesanan (${totalItems} item)`}
        >
          <div className="ks-cart-floating__icon-wrap">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span className="ks-cart-floating__badge">{totalItems}</span>
          </div>
          <span className="ks-cart-floating__text">Keranjang Pesanan</span>
          <span className="ks-cart-floating__total">{formatRupiah(totalPrice)}</span>
        </button>
      )}

      {/* 2. Modal Popup Keranjang */}
      {isOpen && (
        <div className="ks-cart-overlay" onClick={onClose} role="dialog" aria-modal="true">
          <div className="ks-cart-modal" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="ks-cart-modal__header">
              <div className="ks-cart-modal__header-left">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                <div>
                  <h3 className="ks-cart-modal__title">Lembar Bon Pesanan</h3>
                  <p className="ks-cart-modal__subtitle">Pendopo & Dapur Kopi Sadewo</p>
                </div>
              </div>
              <button
                type="button"
                className="ks-cart-modal__close"
                onClick={onClose}
                aria-label="Tutup keranjang"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="ks-cart-modal__body">
              {cart.length === 0 ? (
                <div className="ks-cart-empty">
                  <div className="ks-cart-empty__icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="9" cy="21" r="1" />
                      <circle cx="20" cy="21" r="1" />
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                  </div>
                  <h4 className="ks-cart-empty__title">Keranjang Masih Kosong</h4>
                  <p>Silakan pilih menu seduhan kopi atau camilan joglo favorit Anda terlebih dahulu.</p>
                </div>
              ) : (
                <>
                  {/* Daftar Item */}
                  <ul className="ks-cart-items">
                    {cart.map((item) => (
                      <li key={item.id} className="ks-cart-item">
                        <div className="ks-cart-item__info">
                          <span className="ks-cart-item__name">{item.name}</span>
                          <span className="ks-cart-item__price">{formatRupiah(item.price)}</span>
                        </div>

                        {/* Stepper Kuantitas */}
                        <div className="ks-cart-stepper">
                          <button
                            type="button"
                            className="ks-cart-stepper__btn"
                            onClick={() => onUpdateQty(item.id, item.qty - 1)}
                            aria-label="Kurangi kuantitas"
                          >
                            -
                          </button>
                          <span className="ks-cart-stepper__qty">{item.qty}</span>
                          <button
                            type="button"
                            className="ks-cart-stepper__btn"
                            onClick={() => onUpdateQty(item.id, item.qty + 1)}
                            aria-label="Tambah kuantitas"
                          >
                            +
                          </button>
                        </div>

                        {/* Subtotal Item */}
                        <div className="ks-cart-item__subtotal">
                          {formatRupiah(item.price * item.qty)}
                        </div>

                        {/* Tombol Hapus */}
                        <button
                          type="button"
                          className="ks-cart-item__del"
                          onClick={() => onRemoveItem(item.id)}
                          title="Hapus dari keranjang"
                          aria-label={`Hapus ${item.name}`}
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                        </button>
                      </li>
                    ))}
                  </ul>

                  {/* Form Detail Pemesan */}
                  <div className="ks-cart-form">
                    <h4 className="ks-cart-form__title">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      Informasi Pemesan
                    </h4>

                    <div className="ks-cart-field">
                      <label htmlFor="customerName">Nama Pemesan *</label>
                      <input
                        type="text"
                        id="customerName"
                        className="ks-cart-input"
                        placeholder="Contoh: Mas Danu / Mbak Anisa"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        required
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '8px' }}>
                      <div className="ks-cart-field">
                        <label htmlFor="orderType">Tipe Pesanan</label>
                        <select
                          id="orderType"
                          className="ks-cart-select"
                          value={orderType}
                          onChange={(e) => setOrderType(e.target.value)}
                        >
                          <option value="Dine-in (Makan di Tempat)">Dine-in (Di Tempat)</option>
                          <option value="Takeaway (Bawa Pulang)">Takeaway (Bawa Pulang)</option>
                        </select>
                      </div>

                      {orderType.includes('Dine-in') && (
                        <div className="ks-cart-field">
                          <label htmlFor="tableNumber">No. Meja</label>
                          <input
                            type="text"
                            id="tableNumber"
                            className="ks-cart-input"
                            placeholder="Contoh: 04"
                            value={tableNumber}
                            onChange={(e) => setTableNumber(e.target.value)}
                          />
                        </div>
                      )}
                    </div>

                    <div className="ks-cart-field">
                      <label htmlFor="customerNotes">Catatan Khusus (Opsional)</label>
                      <textarea
                        id="customerNotes"
                        className="ks-cart-textarea"
                        rows="2"
                        placeholder="Contoh: Less sugar, kopi hitam tanpa ampas, singkong ekstra renyah..."
                        value={customerNotes}
                        onChange={(e) => setCustomerNotes(e.target.value)}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Modal Footer */}
            {cart.length > 0 && (
              <div className="ks-cart-modal__footer">
                <div className="ks-cart-total-row">
                  <span className="ks-cart-total-label">Total Pesanan ({totalItems} item):</span>
                  <span className="ks-cart-total-val">{formatRupiah(totalPrice)}</span>
                </div>

                <button
                  type="button"
                  className="ks-cart-wa-btn"
                  onClick={handleCheckoutToWhatsApp}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Kirim Pesanan ke WhatsApp Sadewo
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default CartModal;
