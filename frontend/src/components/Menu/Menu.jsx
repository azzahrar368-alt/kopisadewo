import { useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { Button } from '../Button/Button';
import { getFullImageUrl } from '../../services/api';
import './Menu.css';

/**
 * Format harga Rupiah
 */
function formatRupiah(amount) {
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
 * Fallback Produk Kopi Sadewo (jika backend belum menyala)
 * Sesuai Buku Menu Asli Kopi Sadewo
 */
const DEFAULT_FALLBACK_PRODUCTS = [
  // --- SEDUHAN KOPI ---
  {
    id: 1,
    category_id: 1,
    category: 'Seduhan Kopi',
    category_slug: 'coffee',
    name: 'Kopi Klothok Jahe',
    slug: 'kopi-klothok-jahe',
    description: 'kopi yang direbus bareng jahe merah, manunggaling kopi lan jahe',
    price: 9000,
    image_url: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80',
    is_available: true,
    is_featured: true,
  },
  {
    id: 2,
    category_id: 1,
    category: 'Seduhan Kopi',
    category_slug: 'coffee',
    name: 'Kopi Susu Kental Manis',
    slug: 'kopi-susu-kental-manis',
    description: 'Seduhan kopi mantap dengan rasa manis gurih dari susu kental manis.',
    price: 10000,
    image_url: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80',
    is_available: true,
    is_featured: false,
  },
  {
    id: 3,
    category_id: 1,
    category: 'Seduhan Kopi',
    category_slug: 'coffee',
    name: 'Kopi Susu (Fresh) Gula Aren',
    slug: 'kopi-susu-fresh-gula-aren',
    description: 'Perpaduan kopi mantap, susu murni fresh gurih, dan legitnya gula aren alami khas Sadewo.',
    price: 15000,
    image_url: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80',
    is_available: true,
    is_featured: true,
  },
  {
    id: 4,
    category_id: 1,
    category: 'Seduhan Kopi',
    category_slug: 'coffee',
    name: 'Chocoffe (Cokelat Kopi)',
    slug: 'chocoffe-cokelat-kopi',
    description: 'Perpaduan harmonis antara kelezatan cokelat pekat dan aroma kopi pilihan.',
    price: 14000,
    image_url: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=600&q=80',
    is_available: true,
    is_featured: false,
  },
  {
    id: 5,
    category_id: 1,
    category: 'Seduhan Kopi',
    category_slug: 'coffee',
    name: 'Kopi Tubruk - Robusta Sadewo',
    slug: 'kopi-tubruk-robusta-sadewo',
    description: 'Kopi seduh tubruk tradisional menggunakan biji Robusta khas racikan Sadewo.',
    price: 5000,
    image_url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    is_available: true,
    is_featured: true,
  },
  {
    id: 6,
    category_id: 1,
    category: 'Seduhan Kopi',
    category_slug: 'coffee',
    name: 'Kopi Tubruk - Robusta Single Origin',
    slug: 'kopi-tubruk-robusta-single-origin',
    description: 'Kopi tubruk dengan karakter kuat dan body tebal dari biji Robusta Single Origin.',
    price: 9000,
    image_url: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=600&q=80',
    is_available: true,
    is_featured: false,
  },
  {
    id: 7,
    category_id: 1,
    category: 'Seduhan Kopi',
    category_slug: 'coffee',
    name: 'Kopi Tubruk - Robusta Kebumen',
    slug: 'kopi-tubruk-robusta-kebumen',
    description: 'Kopi tubruk khas Robusta Kebumen dengan aroma wangi dan kepahitan seimbang.',
    price: 10000,
    image_url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80',
    is_available: true,
    is_featured: false,
  },
  {
    id: 8,
    category_id: 1,
    category: 'Seduhan Kopi',
    category_slug: 'coffee',
    name: 'Kopi Tubruk - Special Blend',
    slug: 'kopi-tubruk-special-blend',
    description: 'Seduhan tubruk racikan istimewa perpaduan biji kopi pilihan Sadewo.',
    price: 9000,
    image_url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    is_available: true,
    is_featured: false,
  },
  {
    id: 9,
    category_id: 1,
    category: 'Seduhan Kopi',
    category_slug: 'coffee',
    name: 'Kopi Tubruk - Arabica Sadewo',
    slug: 'kopi-tubruk-arabica-sadewo',
    description: 'Seduhan tubruk biji Arabica Sadewo dengan aroma harum dan tingkat keasaman lembut.',
    price: 10000,
    image_url: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?auto=format&fit=crop&w=600&q=80',
    is_available: true,
    is_featured: false,
  },
  {
    id: 10,
    category_id: 1,
    category: 'Seduhan Kopi',
    category_slug: 'coffee',
    name: 'Kopi Tubruk - Arabica Single Origin',
    slug: 'kopi-tubruk-arabica-single-origin',
    description: 'Kopi tubruk Arabica Single Origin pilihan dengan nuansa cita rasa kompleks.',
    price: 14000,
    image_url: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=600&q=80',
    is_available: true,
    is_featured: false,
  },
  {
    id: 11,
    category_id: 1,
    category: 'Seduhan Kopi',
    category_slug: 'coffee',
    name: 'Kopi Tubruk - Arabica Wine',
    slug: 'kopi-tubruk-arabica-wine',
    description: 'Seduhan tubruk biji fermentasi Arabica Wine beraroma fruity unik dan manis alami.',
    price: 15000,
    image_url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80',
    is_available: true,
    is_featured: false,
  },
  {
    id: 12,
    category_id: 1,
    category: 'Seduhan Kopi',
    category_slug: 'coffee',
    name: 'Vietnam Drip - Robusta Sadewo',
    slug: 'vietnam-drip-robusta-sadewo',
    description: 'Kopi tetes lambat Robusta Sadewo berpadu manis dan gurihnya susu kental manis.',
    price: 9000,
    image_url: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80',
    is_available: true,
    is_featured: false,
  },
  {
    id: 13,
    category_id: 1,
    category: 'Seduhan Kopi',
    category_slug: 'coffee',
    name: 'Vietnam Drip - Robusta Single Origin',
    slug: 'vietnam-drip-robusta-single-origin',
    description: 'Vietnam drip pekat dari Robusta Single Origin dengan layer susu manis legit.',
    price: 12000,
    image_url: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80',
    is_available: true,
    is_featured: false,
  },
  {
    id: 14,
    category_id: 1,
    category: 'Seduhan Kopi',
    category_slug: 'coffee',
    name: 'Vietnam Drip - Robusta Kebumen',
    slug: 'vietnam-drip-robusta-kebumen',
    description: 'Ekstraksi lambat Robusta Kebumen disajikan di atas lapisan susu kental manis.',
    price: 13000,
    image_url: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80',
    is_available: true,
    is_featured: false,
  },
  {
    id: 15,
    category_id: 1,
    category: 'Seduhan Kopi',
    category_slug: 'coffee',
    name: 'Vietnam Drip - Special Blend',
    slug: 'vietnam-drip-special-blend',
    description: 'Vietnam drip racikan Special Blend Sadewo yang berkarakter kuat dan creamy.',
    price: 12000,
    image_url: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80',
    is_available: true,
    is_featured: false,
  },
  {
    id: 16,
    category_id: 1,
    category: 'Seduhan Kopi',
    category_slug: 'coffee',
    name: 'Vietnam Drip - Arabica Sadewo',
    slug: 'vietnam-drip-arabica-sadewo',
    description: 'Seduhan drip Arabica Sadewo yang lembut berpadu manisnya susu kental manis.',
    price: 11000,
    image_url: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80',
    is_available: true,
    is_featured: false,
  },
  {
    id: 17,
    category_id: 1,
    category: 'Seduhan Kopi',
    category_slug: 'coffee',
    name: 'Vietnam Drip - Arabica Single Origin',
    slug: 'vietnam-drip-arabica-single-origin',
    description: 'Vietnam drip biji Arabica Single Origin premium dengan aroma sedap dan rasa manis pas.',
    price: 15000,
    image_url: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80',
    is_available: true,
    is_featured: false,
  },
  {
    id: 18,
    category_id: 1,
    category: 'Seduhan Kopi',
    category_slug: 'coffee',
    name: 'Vietnam Drip - Arabica Wine',
    slug: 'vietnam-drip-arabica-wine',
    description: 'Sensasi asam manis winey dari fermentasi Arabica Wine berpadu susu kental manis.',
    price: 17000,
    image_url: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80',
    is_available: true,
    is_featured: false,
  },
  {
    id: 19,
    category_id: 1,
    category: 'Seduhan Kopi',
    category_slug: 'coffee',
    name: 'V60 - Robusta Sadewo',
    slug: 'v60-robusta-sadewo',
    description: 'Seduhan pour over V60 biji Robusta Sadewo, hasil seduhan bersih dan mantap (Japanese +2k).',
    price: 9000,
    image_url: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=600&q=80',
    is_available: true,
    is_featured: false,
  },
  {
    id: 20,
    category_id: 1,
    category: 'Seduhan Kopi',
    category_slug: 'coffee',
    name: 'V60 - Robusta Single Origin',
    slug: 'v60-robusta-single-origin',
    description: 'Manual brew V60 Robusta Single Origin dengan kejelasan rasa yang optimal (Japanese +2k).',
    price: 12000,
    image_url: 'https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=600&q=80',
    is_available: true,
    is_featured: false,
  },
  {
    id: 21,
    category_id: 1,
    category: 'Seduhan Kopi',
    category_slug: 'coffee',
    name: 'V60 - Robusta Kebumen',
    slug: 'v60-robusta-kebumen',
    description: 'Pour over V60 Robusta Kebumen dengan aroma wangi dan ekstraksi bersih (Japanese +2k).',
    price: 14000,
    image_url: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=600&q=80',
    is_available: true,
    is_featured: false,
  },
  {
    id: 22,
    category_id: 1,
    category: 'Seduhan Kopi',
    category_slug: 'coffee',
    name: 'V60 - Special Blend',
    slug: 'v60-special-blend',
    description: 'Seduhan manual brew V60 racikan Special Blend pilihan barista Sadewo (Japanese +2k).',
    price: 12000,
    image_url: 'https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=600&q=80',
    is_available: true,
    is_featured: false,
  },
  {
    id: 23,
    category_id: 1,
    category: 'Seduhan Kopi',
    category_slug: 'coffee',
    name: 'V60 - Arabica Sadewo',
    slug: 'v60-arabica-sadewo',
    description: 'Pour over V60 Arabica Sadewo bercita rasa bersih, floral, dan acidity segar (Japanese +2k).',
    price: 12000,
    image_url: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=600&q=80',
    is_available: true,
    is_featured: false,
  },
  {
    id: 24,
    category_id: 1,
    category: 'Seduhan Kopi',
    category_slug: 'coffee',
    name: 'V60 - Arabica Single Origin',
    slug: 'v60-arabica-single-origin',
    description: 'Manual brew V60 biji Arabica Single Origin dengan kompleksitas rasa tinggi (Japanese +2k).',
    price: 15000,
    image_url: 'https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=600&q=80',
    is_available: true,
    is_featured: false,
  },
  {
    id: 25,
    category_id: 1,
    category: 'Seduhan Kopi',
    category_slug: 'coffee',
    name: 'V60 - Arabica Wine',
    slug: 'v60-arabica-wine',
    description: 'Pour over V60 biji Arabica Wine dengan aroma fruity fermentasi yang eksotis (Japanese +2k).',
    price: 18000,
    image_url: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=600&q=80',
    is_available: true,
    is_featured: true,
  },

  // --- TEH & REMPAH ---
  {
    id: 26,
    category_id: 2,
    category: 'Teh & Rempah',
    category_slug: 'teh-rempah',
    name: 'Teh',
    slug: 'teh',
    description: 'teh segar hari ini',
    price: 3000,
    image_url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
    is_available: true,
    is_featured: false,
  },
  {
    id: 27,
    category_id: 2,
    category: 'Teh & Rempah',
    category_slug: 'teh-rempah',
    name: 'Teh Tambi',
    slug: 'teh-tambi',
    description: 'teh murni tambi wonosobo',
    price: 6000,
    image_url: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80',
    is_available: true,
    is_featured: true,
  },
  {
    id: 28,
    category_id: 2,
    category: 'Teh & Rempah',
    category_slug: 'teh-rempah',
    name: 'Teh Wingi',
    slug: 'teh-wingi',
    description: 'teh dengan rasa asem ekstra vit C',
    price: 8000,
    image_url: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80',
    is_available: true,
    is_featured: false,
  },
  {
    id: 29,
    category_id: 2,
    category: 'Teh & Rempah',
    category_slug: 'teh-rempah',
    name: 'Teh Herbal',
    slug: 'teh-herbal',
    description: 'teh dicampur dengan resep rahasia ada rasa mintnya',
    price: 10000,
    image_url: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=600&q=80',
    is_available: true,
    is_featured: false,
  },
  {
    id: 30,
    category_id: 2,
    category: 'Teh & Rempah',
    category_slug: 'teh-rempah',
    name: 'Lychee Tea',
    slug: 'lychee-tea',
    description: 'teh leci best seller pokoknya',
    price: 8000,
    image_url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
    is_available: true,
    is_featured: true,
  },
  {
    id: 31,
    category_id: 2,
    category: 'Teh & Rempah',
    category_slug: 'teh-rempah',
    name: 'Teh Simbah',
    slug: 'teh-simbah',
    description: 'teh jahe sereh madu',
    price: 12000,
    image_url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
    is_available: true,
    is_featured: false,
  },
  {
    id: 32,
    category_id: 2,
    category: 'Teh & Rempah',
    category_slug: 'teh-rempah',
    name: 'Empon-Empon',
    slug: 'empon-empon',
    description: 'campuran berbagai rempah Jahe Merah, Sereh, Kencur, Temulawak, Kunyit, dan Jeruk Nipis.',
    price: 18000,
    image_url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80',
    is_available: true,
    is_featured: true,
  },
  {
    id: 33,
    category_id: 2,
    category: 'Teh & Rempah',
    category_slug: 'teh-rempah',
    name: 'Jahe Merah Madu',
    slug: 'jahe-merah-madu',
    description: 'sudah jelas gak perlu diperjelas',
    price: 6000,
    image_url: 'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=600&q=80',
    is_available: true,
    is_featured: false,
  },

  // --- KEKINIAN (ICE / HOT) ---
  {
    id: 34,
    category_id: 3,
    category: 'Kekinian (Ice / Hot)',
    category_slug: 'kekinian',
    name: 'Lime Orange',
    slug: 'lime-orange',
    description: 'Perpaduan kesegaran jeruk nipis dan jeruk manis (Ice / Hot).',
    price: 6000,
    image_url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
    is_available: true,
    is_featured: false,
  },
  {
    id: 35,
    category_id: 3,
    category: 'Kekinian (Ice / Hot)',
    category_slug: 'kekinian',
    name: 'Susu Kental Manis',
    slug: 'susu-kental-manis',
    description: 'Sajian susu kental manis klasik hangat atau dingin yang legit.',
    price: 5000,
    image_url: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80',
    is_available: true,
    is_featured: false,
  },
  {
    id: 36,
    category_id: 3,
    category: 'Kekinian (Ice / Hot)',
    category_slug: 'kekinian',
    name: 'Susu Kental Manis Gula Aren',
    slug: 'susu-kental-manis-gula-aren',
    description: 'Susu kental manis gurih berpadu dengan manis harum gula aren asli.',
    price: 7000,
    image_url: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80',
    is_available: true,
    is_featured: false,
  },
  {
    id: 37,
    category_id: 3,
    category: 'Kekinian (Ice / Hot)',
    category_slug: 'kekinian',
    name: 'Fresh Milk',
    slug: 'fresh-milk',
    description: 'Susu murni segar pilihan yang gurih, alami, dan creamy.',
    price: 9000,
    image_url: 'https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?auto=format&fit=crop&w=600&q=80',
    is_available: true,
    is_featured: false,
  },
  {
    id: 38,
    category_id: 3,
    category: 'Kekinian (Ice / Hot)',
    category_slug: 'kekinian',
    name: 'Fresh Milk with Aren Sugar',
    slug: 'fresh-milk-with-aren-sugar',
    description: 'Susu murni segar berpadu manis legitnya sirup gula aren alami.',
    price: 10000,
    image_url: 'https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?auto=format&fit=crop&w=600&q=80',
    is_available: true,
    is_featured: false,
  },
  {
    id: 39,
    category_id: 3,
    category: 'Kekinian (Ice / Hot)',
    category_slug: 'kekinian',
    name: 'Creamy Yummy',
    slug: 'creamy-yummy',
    description: 'Minuman manis creamy spesial favorit racikan pendopo Kopi Sadewo.',
    price: 12000,
    image_url: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=600&q=80',
    is_available: true,
    is_featured: true,
  },
  {
    id: 40,
    category_id: 3,
    category: 'Kekinian (Ice / Hot)',
    category_slug: 'kekinian',
    name: 'Chocolate (Pure Cokelat)',
    slug: 'chocolate-pure-cokelat',
    description: 'Olahan cokelat murni pekat yang manis legit dan memanjakan lidah.',
    price: 12000,
    image_url: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=600&q=80',
    is_available: true,
    is_featured: true,
  },
  {
    id: 41,
    category_id: 3,
    category: 'Kekinian (Ice / Hot)',
    category_slug: 'kekinian',
    name: 'Red Velvet',
    slug: 'red-velvet',
    description: 'Minuman red velvet lembut beraroma manis gurih khas cake istimewa.',
    price: 10000,
    image_url: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80',
    is_available: true,
    is_featured: false,
  },
  {
    id: 42,
    category_id: 3,
    category: 'Kekinian (Ice / Hot)',
    category_slug: 'kekinian',
    name: 'Greentea',
    slug: 'greentea',
    description: 'Seduhan matcha teh hijau aromatik yang menenangkan dan creamy.',
    price: 11000,
    image_url: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80',
    is_available: true,
    is_featured: false,
  },
  {
    id: 43,
    category_id: 3,
    category: 'Kekinian (Ice / Hot)',
    category_slug: 'kekinian',
    name: 'Taro',
    slug: 'taro',
    description: 'Minuman talas ungu manis legit berpadu kelembutan susu creamy.',
    price: 10000,
    image_url: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=600&q=80',
    is_available: true,
    is_featured: false,
  },
  {
    id: 44,
    category_id: 3,
    category: 'Kekinian (Ice / Hot)',
    category_slug: 'kekinian',
    name: 'Vanilla',
    slug: 'vanilla',
    description: 'Susu beraroma vanila wangi lembut yang menyejukkan hati.',
    price: 9000,
    image_url: 'https://images.unsplash.com/photo-1553787499-6f9133860278?auto=format&fit=crop&w=600&q=80',
    is_available: true,
    is_featured: false,
  },
  {
    id: 45,
    category_id: 3,
    category: 'Kekinian (Ice / Hot)',
    category_slug: 'kekinian',
    name: 'Milk Tea',
    slug: 'milk-tea',
    description: 'Kombinasi klasik teh wangi pilihan dan kelembutan susu creamy.',
    price: 8000,
    image_url: 'https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&w=600&q=80',
    is_available: true,
    is_featured: false,
  },

  // --- JAJANAN ---
  {
    id: 46,
    category_id: 4,
    category: 'Jajanan',
    category_slug: 'food',
    name: 'French Fries',
    slug: 'french-fries',
    description: 'Kentang goreng gurih renyah dengan taburan bumbu lezat disajikan hangat.',
    price: 7000,
    image_url: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80',
    is_available: true,
    is_featured: false,
  },
  {
    id: 47,
    category_id: 4,
    category: 'Jajanan',
    category_slug: 'food',
    name: 'Banana Fries (Isi 6)',
    slug: 'banana-fries-isi-6',
    description: 'Pisang goreng krispi manis gurih isi 6 potong teman setia ngopi.',
    price: 7000,
    image_url: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80',
    is_available: true,
    is_featured: true,
  },
  {
    id: 48,
    category_id: 4,
    category: 'Jajanan',
    category_slug: 'food',
    name: 'Mendoan Fries (Isi 4)',
    slug: 'mendoan-fries-isi-4',
    description: 'Tempe mendoan krispi isi 4 dengan irisan daun bawang gurih dan cocolan cabai.',
    price: 7000,
    image_url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
    is_available: true,
    is_featured: true,
  },
  {
    id: 49,
    category_id: 4,
    category: 'Jajanan',
    category_slug: 'food',
    name: 'Bodin Fries',
    slug: 'bodin-fries',
    description: 'Singkong goreng (bodin) empuk merekah berbumbu bawang gurih renyah.',
    price: 7000,
    image_url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
    is_available: true,
    is_featured: true,
  },
  {
    id: 50,
    category_id: 4,
    category: 'Jajanan',
    category_slug: 'food',
    name: 'Tahu Walik (Isi 5)',
    slug: 'tahu-walik-isi-5',
    description: 'Tahu walik goreng renyah isi 5 dengan tekstur krispi di luar dan gurih di dalam.',
    price: 8000,
    image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    is_available: true,
    is_featured: true,
  },
  {
    id: 51,
    category_id: 4,
    category: 'Jajanan',
    category_slug: 'food',
    name: 'Java Choco Cake (Isi 6)',
    slug: 'java-choco-cake-isi-6',
    description: 'Kue cokelat manis legit lembut khas Jawa isi 6 potong.',
    price: 8000,
    image_url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
    is_available: true,
    is_featured: false,
  },
  {
    id: 52,
    category_id: 4,
    category: 'Jajanan',
    category_slug: 'food',
    name: 'Noodle',
    slug: 'noodle',
    description: 'Mie seduh gurih lezat disajikan hangat dengan taburan bawang goreng.',
    price: 6000,
    image_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80',
    is_available: true,
    is_featured: false,
  },
  {
    id: 53,
    category_id: 4,
    category: 'Jajanan',
    category_slug: 'food',
    name: 'Noodle with Egg',
    slug: 'noodle-with-egg',
    description: 'Mie seduh gurih lengkap disajikan dengan tambahan telur spesial.',
    price: 10000,
    image_url: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=600&q=80',
    is_available: true,
    is_featured: false,
  },
];

/**
 * Komponen Kartu Produk
 */
function ProductCard({ product, inCartQty = 0, onAddToCart, onUpdateQty }) {
  const [imageError, setImageError] = useState(false);

  const {
    id,
    name = '',
    price = 0,
    category = '',
    image_url = '',
    is_available = true,
    is_featured = false,
    description = '',
  } = product || {};

  return (
    <article className="ks-product-card">
      <div className="ks-product-card__image-container">
        {image_url && !imageError ? (
          <img
            src={getFullImageUrl(image_url)}
            alt={name}
            className="ks-product-card__image"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="ks-product-card__image-fallback">
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
              <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
              <line x1="6" y1="1" x2="6" y2="4" />
              <line x1="10" y1="1" x2="10" y2="4" />
              <line x1="14" y1="1" x2="14" y2="4" />
            </svg>
            <span className="ks-product-card__image-fallback-text">Kopi Sadewo</span>
          </div>
        )}

        {/* Lencana (Badges): Kategori & Ketersediaan */}
        <div className="ks-product-card__badges">
          {category && (
            <span className="ks-badge ks-badge--category">{category}</span>
          )}

          <div className="ks-product-card__status-wrap">
            {is_featured && is_available && (
              <span className="ks-badge ks-badge--featured">
                Pilihan Pendopo
              </span>
            )}

            {!is_available && (
              <span className="ks-badge ks-badge--sold">Habis</span>
            )}
          </div>
        </div>
      </div>

      <div className="ks-product-card__body">
        <h3 className="ks-product-card__title">{name}</h3>
        {description && <p className="ks-product-card__desc">{description}</p>}

        <div className="ks-product-card__footer">
          <div>
            <div className="ks-product-card__price-label">Harga</div>
            <div className="ks-product-card__price">{formatRupiah(price)}</div>
          </div>

          {/* Aksi Keranjang: Stepper jika sudah dipilih, Tombol jika belum */}
          <div>
            {!is_available ? (
              <Button variant="secondary" size="sm" disabled>
                Habis
              </Button>
            ) : inCartQty > 0 ? (
              <div className="ks-card-stepper" title="Sesuaikan jumlah pesanan">
                <button
                  type="button"
                  className="ks-card-stepper__btn"
                  onClick={() => onUpdateQty(id, inCartQty - 1)}
                  aria-label="Kurangi kuantitas"
                >
                  -
                </button>
                <span className="ks-card-stepper__qty">{inCartQty}</span>
                <button
                  type="button"
                  className="ks-card-stepper__btn"
                  onClick={() => onUpdateQty(id, inCartQty + 1)}
                  aria-label="Tambah kuantitas"
                >
                  +
                </button>
              </div>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={() => onAddToCart(product)}
                iconLeft={
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                }
              >
                Pesan
              </Button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

/**
 * Komponen Utama Menu Kopi Sadewo
 * Memuat Nama Menu, Kategori, Harga, Available/Sold, serta integrasi keranjang
 */
export function Menu({ cart = [], onAddToCart, onUpdateQty, onOpenCart }) {
  const {
    products: apiProducts,
    loading,
    error,
    search,
    setSearch,
    category,
    setCategory,
    categories,
    resetFilters,
  } = useProducts();

  // Gunakan data dari API, atau fallback jika API belum menyala
  const rawProducts = apiProducts && apiProducts.length > 0 ? apiProducts : DEFAULT_FALLBACK_PRODUCTS;

  // Filter lokal untuk search & category
  const filteredProducts = rawProducts.filter((item) => {
    const matchCategory =
      !category ||
      category === 'all' ||
      item.category?.toLowerCase() === category.toLowerCase() ||
      item.category_slug?.toLowerCase() === category.toLowerCase();

    const matchSearch =
      !search ||
      item.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.description?.toLowerCase().includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  const categoryOptions = [
    { id: 'all', name: 'Semua Sajian', slug: '' },
    ...(categories && categories.length > 0
      ? categories.map((cat) => ({ id: cat.id, name: cat.name, slug: cat.slug }))
      : [
          { id: 1, name: 'Seduhan Kopi', slug: 'coffee' },
          { id: 2, name: 'Teh & Rempah', slug: 'teh-rempah' },
          { id: 3, name: 'Kekinian (Ice / Hot)', slug: 'kekinian' },
          { id: 4, name: 'Jajanan', slug: 'food' },
        ]),
  ];

  // Helper cek kuantitas di keranjang
  const getItemQty = (productId) => {
    const found = cart.find((i) => i.id === productId);
    return found ? found.qty : 0;
  };

  return (
    <div className="ks-menu-section">
      {/* Search & Category Controls */}
      <div className="ks-menu-controls">
        {/* Input Pencarian */}
        <div className="ks-menu-search-wrapper">
          <div className="ks-menu-search-icon" aria-hidden="true">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>

          <input
            type="text"
            className="ks-menu-search-input"
            placeholder="Cari seduhan kopi, minuman, atau camilan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Kolom pencarian menu"
          />

          {search && (
            <button
              type="button"
              className="ks-menu-search-clear"
              onClick={() => setSearch('')}
              aria-label="Hapus pencarian"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter Kategori: Kopi, Teh & Rempah, Kekinian, Jajanan */}
        <div className="ks-menu-categories" role="group" aria-label="Filter kategori menu">
          {categoryOptions.map((cat) => {
            const isActive =
              cat.slug === category || (cat.slug === '' && category === '');
            return (
              <button
                key={cat.id || cat.slug}
                type="button"
                className={`ks-menu-category-btn ${
                  isActive ? 'ks-menu-category-btn--active' : ''
                }`}
                onClick={() => setCategory(cat.slug)}
                aria-pressed={isActive}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid Produk */}
      {filteredProducts.length > 0 ? (
        <div className="ks-menu-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              inCartQty={getItemQty(product.id)}
              onAddToCart={onAddToCart}
              onUpdateQty={onUpdateQty}
            />
          ))}
        </div>
      ) : (
        <div className="ks-menu-empty">
          <h3 className="ks-menu-empty__title">Menu Tidak Ditemukan</h3>
          <p className="ks-menu-empty__desc">
            Tidak ada sajian yang sesuai dengan kriteria "{search}". Coba cari kata kunci lain.
          </p>
          <Button variant="secondary" size="sm" onClick={resetFilters}>
            Tampilkan Semua Menu
          </Button>
        </div>
      )}
    </div>
  );
}

export default Menu;
