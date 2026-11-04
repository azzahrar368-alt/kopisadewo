# 🚀 Panduan Rilis & Panduan Admin Kopi Sadewo (Online & Go-Public)

Dokumen ini menjelaskan langkah-langkah lengkap untuk:
1. Menggunakan fitur **CRUD Admin & Login Khusus Pengelola** lewat Frontend.
2. Melakukan deployment ke internet agar website **Kopi Sadewo** dapat diakses secara publik dan **muncul di pencarian Google/internet (SEO Searchable)**.

---

## ☕ BAGIAN 1: Mengakses & Menggunakan Portal CRUD Admin

Website Kopi Sadewo kini dilengkapi portal khusus pengelola yang aman terlindungi token JWT.

### 1. Cara Masuk ke Portal Admin
- **URL Khusus:** Buka browser dan arahkan ke: `http://localhost:5173/admin/login` (atau `https://domain-anda.com/admin/login`).
- **Tautan Cepat:** Terdapat tautan **"Portal Pengelola Admin"** di bagian footer paling bawah website.
- **Kredensial Default Bawaan:**
  - **Email:** `admin@kopisadewo.com`
  - **Password:** `SadewoAdmin2026!`
  *(Catatan: Terdapat tombol "Isi Otomatis" di halaman login untuk pengujian cepat).*

### 2. Fitur CRUD yang Dapat Dilakukan Pengelola
- **Tambah Menu Baru (Create):**
  - Klik tombol `+ Tambah Menu Baru`.
  - Masukkan Nama Menu, Kategori, Harga (Rp), Deskripsi Rasa.
  - **Unggah Foto Produk:** Anda dapat memilih tab **"Unggah dari Komputer"** (bisa drag-and-drop atau pilih berkas gambar JPG/PNG/WEBP maks. 5MB) dengan pratinjau instan, atau tab **"Gunakan URL / Contoh"** jika ingin menempelkan link foto.
  - Tentukan apakah status menu "Tersedia" atau "Habis" dan tandai "Unggulan" jika ingin ditampilkan di bagian teratas.
- **Lihat & Cari Menu (Read):**
  - Bilah pencarian instan (live search berdasarkan nama/deskripsi).
  - Filter kategori (*Coffee*, *Non-Coffee*, *Food*, atau kategori kustom).
  - Metrik ringkas: Total Menu, Siap Seduh, Habis (Sold Out), dan Menu Unggulan.
- **Perbarui Menu (Update):**
  - Klik tombol **"Ubah"** untuk mengedit detail lengkap.
  - **Quick Toggle (1-Klik):** Klik tombol status "Tersedia / Habis" pada tabel untuk langsung mengubah ketersediaan produk seketika tanpa harus membuka formulir!
  - **Quick Toggle Favorit:** Klik bintang "★ Unggulan / ☆ Biasa" untuk mengubah status menu favorit.
- **Hapus Menu (Delete):**
  - Klik tombol **"Hapus"** dengan konfirmasi pencegahan ketidaksengajaan.
- **Kelola Kategori:**
  - Klik tombol **"Kelola Kategori"** untuk menambah variasi sajian baru atau menghapus kategori yang tidak lagi digunakan.

---

## 🌐 BAGIAN 2: Tahapan Rilis ke Internet (Bisa Di-search di Google)

Agar website tidak lagi lokal di laptop Anda dan dapat dicari di Google oleh pelanggan di seluruh dunia, berikut tahapan rilis standar modern dengan opsi server gratis / terjangkau:

```
[ Pengunjung Internet ]
          │
          ▼
[ Frontend: Vercel / Netlify ] ─── HTTPS & Global CDN
          │
          ▼ (REST API via JWT)
[ Backend: Render / Railway ]  ─── Node.js Express API
          │
          ▼
[ Database: Neon.tech / Supabase ] (PostgreSQL Cloud)
```

---

### Tahap 1: Menyiapkan Database PostgreSQL Online (Gratis)

Pilih salah satu penyedia cloud database PostgreSQL gratis:
1. **Opsi Rekomendasi:** Kunjungi [Neon.tech](https://neon.tech) atau [Supabase.com](https://supabase.com).
2. Buat akun baru & buat project database baru bernama `kopisadewo`.
3. Salin connection string PostgreSQL yang diberikan, contohnya:
   ```
   postgresql://sadewoadmin:xxxxxx@ep-cool-fog-12345.ap-southeast-1.aws.neon.tech/kopisadewo?sslmode=require
   ```
4. Di laptop Anda, jalankan inisialisasi tabel dan seed data awal:
   ```bash
   cd backend
   # Setel sementara variabel DATABASE_URL di .env dengan connection string di atas
   node -e "require('./src/config/db').initDatabase().then(() => process.exit(0))"
   ```
   *(Skema tabel `admins`, `categories`, dan `products` otomatis dibuat di server cloud).*

---

### Tahap 2: Men-deploy Backend API ke Internet

Anda dapat menggunakan **Render.com** (tersedia Free Tier):
1. Unggah kode proyek Anda ke GitHub (buat repository `kopisadewo`).
2. Masuk ke [Render.com](https://render.com) dan pilih **New Web Service**.
3. Hubungkan repository GitHub Anda.
4. Konfigurasikan:
   - **Root Directory:** `backend`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node src/index.js`
5. Masukkan **Environment Variables (Variabel Lingkungan)** di dashboard Render:
   - `NODE_ENV`: `production`
   - `DATABASE_URL`: `(Connection string PostgreSQL dari Tahap 1)`
   - `JWT_SECRET`: `sadewo_kopi_super_secret_jwt_key_2026_prod`
   - `FRONTEND_URL`: `https://kopisadewo.vercel.app` *(atau domain frontend Anda)*
   - `ADMIN_EMAIL`: `admin@kopisadewo.com`
   - `ADMIN_PASSWORD`: `(Sandi rahasia admin pilihan Anda)`
6. Klik **Create Web Service**. Setelah build selesai, Anda akan mendapatkan URL backend publik, misalnya:
   `https://kopisadewo-api.onrender.com`.

---

### Tahap 3: Men-deploy Frontend ke Internet

Gunakan **Vercel** atau **Netlify** (sangat cepat, gratis, dan mendukung HTTPS otomatis):
1. Masuk ke [Vercel.com](https://vercel.com) dengan akun GitHub Anda.
2. Pilih **Add New Project** dan import repository `kopisadewo`.
3. Konfigurasikan project settings:
   - **Framework Preset:** `Vite`
   - **Root Directory:** Klik `Edit` dan pilih folder `frontend`.
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Tambahkan **Environment Variables**:
   - `VITE_API_URL`: Masukkan URL backend dari Tahap 2 (contoh: `https://kopisadewo-api.onrender.com`).
5. Klik **Deploy**.
6. Dalam beberapa detik, website Anda telah rilis online di domain seperti:
   `https://kopisadewo.vercel.app`.
   *(Konfigurasi SPA rewrite `vercel.json` dan `_redirects` telah terpasang, sehingga akses langsung ke `/admin` dan `/admin/login` tidak akan menghasilkan 404).*

---

### Tahap 4: Menggunakan Custom Domain Sendiri (Opsional)
Jika Anda membeli domain (misal `kopisadewo.com` atau `kopisadewo.id` di Niagahoster, Domainesia, atau Namecheap):
1. Di dashboard Vercel, buka **Settings > Domains**.
2. Masukkan nama domain Anda (misal `kopisadewo.com`).
3. Tambahkan DNS Record di tempat Anda membeli domain:
   - Tipe `A` mengarah ke IP Vercel (`76.76.21.21`).
   - Tipe `CNAME` untuk `www` mengarah ke `cname.vercel-dns.com`.
4. Vercel akan otomatis menerbitkan sertifikat keamanan **SSL (HTTPS)** gratis.

---

### Tahap 5: Mendaftarkan Website ke Google (Agar Bisa Disearch di Internet)

Website Kopi Sadewo telah dilengkapi dengan:
- **Meta Tag SEO Lengkap & Open Graph:** Judul editorial, deskripsi Jogja, keyword kuliner/kopi Kaliurang, dan gambar banner media sosial.
- **Schema.org Structured Data (JSON-LD):** Format standar Google untuk entitas *CafeOrCoffeeShop* lengkap dengan alamat, koordinat peta, menu, dan jam operasional.
- **Berkas `robots.txt`:** Mengizinkan robot Google merayapi seluruh halaman publik, sambil melindungi `/admin` agar tetap rahasia.
- **Berkas `sitemap.xml`:** Peta situs resmi untuk perayapan cepat Google.

**Langkah agar langsung terindeks di pencarian Google:**
1. Buka [Google Search Console](https://search.google.com/search-console).
2. Masukkan alamat website online Anda (contoh: `https://kopisadewo.com` atau `https://kopisadewo.vercel.app`).
3. Lakukan verifikasi kepemilikan (metode HTML Tag atau DNS TXT yang disediakan Google).
4. Masuk ke menu **Sitemaps** di Google Search Console.
5. Masukkan URL: `https://kopisadewo.com/sitemap.xml` lalu klik **Submit**.
6. Gunakan fitur **URL Inspection** untuk meminta pengindeksan halaman utama (`Request Indexing`).
7. Dalam 1–3 hari, Google Bot akan memproses situs Anda, dan website Kopi Sadewo resmi muncul di hasil pencarian Google saat orang mengetik *"Kopi Sadewo"*, *"Kopi Sadewo Jogja"*, dll.
