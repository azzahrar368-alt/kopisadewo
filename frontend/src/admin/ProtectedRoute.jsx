import { Navigate, useLocation } from 'react-router-dom';
import { getAdminToken } from '../services/api';

/**
 * Pelindung Rute Khusus Admin
 * Jika belum login / tidak ada token JWT, redirect ke halaman login admin
 */
export function ProtectedRoute({ children }) {
  const token = getAdminToken();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return children;
}

export default ProtectedRoute;
