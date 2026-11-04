import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { AdminLogin, AdminDashboard, ProtectedRoute } from './admin';

/**
 * Komponen Induk Aplikasi Kopi Sadewo
 * Menangani rute publik dan dasbor khusus admin.
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rute Publik: Website Utama Kopi Sadewo */}
        <Route path="/" element={<HomePage />} />

        {/* Rute Otentikasi Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Rute Dasbor Khusus Admin (Terproteksi Token JWT) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Rute Default / Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
