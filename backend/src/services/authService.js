const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../config/db');

// Konfigurasi rahasia JWT
const JWT_SECRET = process.env.JWT_SECRET || 'sadewo_kopi_super_secret_jwt_key_2026';
const JWT_EXPIRES_IN = '24h';

// Akun admin bawaan (fallback in-memory saat database offline)
const FALLBACK_ADMIN = {
  id: 1,
  name: 'Pengelola Kopi Sadewo',
  email: (process.env.ADMIN_EMAIL || 'admin@kopisadewo.com').toLowerCase(),
  // Password default: 'SadewoAdmin2026!'
  passwordHash: '$2b$10$Ki/gg.k.inHVciAza3M2ceufcB02W.3r3eyX75fo8GNN3yfuaPsAG',
  role: 'admin',
};

/**
 * Autentikasi Admin Kopi Sadewo
 * Mendukung verifikasi via database PostgreSQL dan fallback in-memory yang aman.
 */
const login = async (email, password) => {
  if (!email || !password) {
    const error = new Error('Email dan kata sandi wajib diisi');
    error.status = 400;
    throw error;
  }

  const normalizedEmail = String(email).trim().toLowerCase();
  let adminRecord = null;

  // 1. Coba cari di PostgreSQL jika database tersambung
  if (db.isDbConnected()) {
    try {
      const res = await db.query(
        'SELECT id, name, email, password_hash FROM admins WHERE LOWER(email) = $1 LIMIT 1',
        [normalizedEmail]
      );
      if (res.rows.length > 0) {
        adminRecord = res.rows[0];
      }
    } catch (err) {
      console.warn('[AuthService] Gagal memeriksa tabel admins di PostgreSQL:', err.message);
    }
  }

  // 2. Jika database tidak terkoneksi atau belum ada data di DB, periksa kredensial fallback admin
  if (!adminRecord && normalizedEmail === FALLBACK_ADMIN.email) {
    adminRecord = {
      id: FALLBACK_ADMIN.id,
      name: FALLBACK_ADMIN.name,
      email: FALLBACK_ADMIN.email,
      password_hash: FALLBACK_ADMIN.passwordHash,
    };
  }

  if (!adminRecord) {
    const error = new Error('Email atau kata sandi admin tidak sesuai');
    error.status = 401;
    throw error;
  }

  // 3. Verifikasi kata sandi dengan bcrypt
  const isPasswordMatch = await bcrypt.compare(password, adminRecord.password_hash);
  if (!isPasswordMatch) {
    const error = new Error('Email atau kata sandi admin tidak sesuai');
    error.status = 401;
    throw error;
  }

  // 4. Buat JWT Token
  const tokenPayload = {
    id: adminRecord.id,
    name: adminRecord.name,
    email: adminRecord.email,
    role: 'admin',
  };

  const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

  return {
    token,
    admin: {
      id: adminRecord.id,
      name: adminRecord.name,
      email: adminRecord.email,
      role: 'admin',
    },
  };
};

/**
 * Verifikasi token JWT
 */
const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

/**
 * Mengambil profil admin berdasarkan ID & email
 */
const getAdminProfile = async (id, email) => {
  if (db.isDbConnected()) {
    try {
      const res = await db.query(
        'SELECT id, name, email, created_at FROM admins WHERE id = $1 LIMIT 1',
        [id]
      );
      if (res.rows.length > 0) {
        return {
          id: res.rows[0].id,
          name: res.rows[0].name,
          email: res.rows[0].email,
          role: 'admin',
        };
      }
    } catch (err) {
      console.warn('[AuthService] Gagal mengambil profil dari PostgreSQL:', err.message);
    }
  }

  return {
    id: FALLBACK_ADMIN.id,
    name: FALLBACK_ADMIN.name,
    email: email || FALLBACK_ADMIN.email,
    role: 'admin',
  };
};

module.exports = {
  login,
  verifyToken,
  getAdminProfile,
  FALLBACK_ADMIN,
};
