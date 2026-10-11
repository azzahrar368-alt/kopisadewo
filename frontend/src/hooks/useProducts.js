import { useState, useEffect, useCallback, useRef } from 'react';
import { getProducts, getCategories } from '../services/api';

/**
 * Custom hook useProducts untuk mengelola state produk, pencarian (debounce 300ms),
 * filter kategori, status pemuatan (loading), pesan error, dan fungsi coba lagi (retry).
 *
 * @param {Object} [options={}] - Opsi inisialisasi
 * @param {string} [options.category=''] - Kategori awal (slug)
 * @param {string} [options.search=''] - Kata kunci pencarian awal
 * @param {number} [options.debounceMs=300] - Durasi debounce pencarian dalam milidetik
 * @returns {Object} State dan handler produk
 */
export function useProducts(options = {}) {
  const debounceDelay = typeof options.debounceMs === 'number' ? options.debounceMs : 300;

  // State untuk pencarian (langsung untuk input responsif)
  const [search, setSearch] = useState(options.search || '');

  // State untuk nilai pencarian setelah debounce 300ms
  const [debouncedSearch, setDebouncedSearch] = useState(options.search || '');

  // State kategori yang dipilih (slug, '' berarti semua)
  const [category, setCategory] = useState(options.category || '');

  // State data produk, status pemuatan, dan error
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State kategori produk dari API
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);

  // Counter pemicu muat ulang manual (Coba lagi)
  const [reloadKey, setReloadKey] = useState(0);

  // Gunakan ref untuk melacak apakah komponen masih terpasang (mounted)
  const isMountedRef = useRef(true);

  // 1. Debounce pencarian dengan durasi 300ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, debounceDelay);

    return () => {
      clearTimeout(timer);
    };
  }, [search, debounceDelay]);

  // 2. Mengambil data kategori produk dari API
  useEffect(() => {
    let active = true;
    setCategoriesLoading(true);

    getCategories()
      .then((data) => {
        if (active) {
          setCategories(Array.isArray(data) ? data : []);
        }
      })
      .catch(() => {
        // Fallback kategori default jika API kategori belum siap
        if (active) {
          setCategories([
            { id: 1, name: 'Coffee', slug: 'coffee' },
            { id: 2, name: 'Non-Coffee', slug: 'non-coffee' },
            { id: 3, name: 'Food', slug: 'food' },
          ]);
        }
      })
      .finally(() => {
        if (active) {
          setCategoriesLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  // 3. Mengambil data produk berdasarkan kategori & debouncedSearch
  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    getProducts({
      category: category || undefined,
      search: debouncedSearch || undefined,
    })
      .then((data) => {
        if (active) {
          setProducts(Array.isArray(data) ? data : []);
          setError(null);
        }
      })
      .catch((err) => {
        if (active) {
          // Pesan error yang ramah pengguna
          const friendlyMessage =
            err?.message ||
            'Maaf, terjadi kendala saat memuat menu kopi. Periksa koneksi internet Anda dan silakan coba lagi.';
          setError(friendlyMessage);
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [category, debouncedSearch, reloadKey]);

  // 4. Fungsi Coba Lagi (Retry / Refetch)
  const refetch = useCallback(() => {
    setReloadKey((prev) => prev + 1);
  }, []);

  // Handler cepat untuk reset filter & pencarian
  const resetFilters = useCallback(() => {
    setSearch('');
    setDebouncedSearch('');
    setCategory('');
  }, []);

  // Indikator apakah hasil kosong
  const isEmpty = !loading && !error && products.length === 0;

  return {
    products,
    loading,
    isLoading: loading,
    error,
    search,
    setSearch,
    debouncedSearch,
    category,
    setCategory,
    categories,
    categoriesLoading,
    refetch,
    retry: refetch, // Alias
    resetFilters,
    isEmpty,
  };
}

export default useProducts;
