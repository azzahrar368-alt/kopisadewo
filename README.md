# Kopi Sadewo — Pendopo & Roastery

Website kedai kopi bernuansa joglo Jawa yang menghadirkan kehangatan tradisi Nusantara dengan sentuhan modern editorial. Dilengkapi antarmuka pemesanan interaktif (WhatsApp Order), sistem reservasi tempat joglo, galeri acara, serta **Portal Pengelola Admin (CRUD Menu & Kategori)** terproteksi JWT.

---

## 🛠️ Arsitektur & Teknologi

- **Frontend:** React 19, React Router 7, Vite, Vanilla CSS dengan Design Tokens Kopi Sadewo (Espresso, Terracotta, Cream Parchment).
- **Backend:** Node.js, Express 5, JSON Web Token (JWT), Bcrypt, CORS.
- **Database:** PostgreSQL (dengan In-Memory Data Fallback mode otomatis untuk kemudahan pengembangan).
- **SEO & Searchability:** Open Graph, Twitter Cards, Schema.org JSON-LD (CafeOrCoffeeShop), `robots.txt`, dan `sitemap.xml`.

---

## 🔐 Portal Khusus Admin (CRUD Menu)

- **Halaman Login Admin:** `/admin/login`
- **Dasbor Admin:** `/admin`
- **Kredensial Default:**
  - **Email:** `admin@kopisadewo.com`
  - **Password:** `SadewoAdmin2026!`
- **Fitur Dasbor Admin:**
  - Tambah menu baru dengan pratinjau gambar langsung.
  - Ubah detail produk (nama, kategori, harga, deskripsi).
  - Quick-toggle status ketersediaan (*Tersedia* / *Habis/Sold Out*).
  - Quick-toggle status unggulan (*★ Unggulan* / *☆ Biasa*).
  - Hapus produk menu dengan konfirmasi keamanan.
  - Kelola kategori produk (*Coffee*, *Non-Coffee*, *Food*, dsb).

---

## 🚀 Panduan Rilis ke Internet (Deployment & SEO)

Untuk merilis website ke internet agar dapat diakses publik dan dicari di Google:
Lihat panduan lengkap di: **[DEPLOYMENT.md](file:///c:/Users/ASUS/kopisadewo/DEPLOYMENT.md)**.
