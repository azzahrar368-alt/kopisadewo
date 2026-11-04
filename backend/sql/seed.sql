-- =============================================================================
-- Data Awal (Seed) Kopi Sadewo
-- Berdasarkan Buku Menu Fisik Asli Kopi Sadewo
-- =============================================================================

-- 1. Kategori Produk
INSERT INTO categories (name, slug, description) VALUES
    ('Seduhan Kopi', 'coffee', 'Aneka sajian seduhan kopi manual brew (Tubruk, Vietnam Drip, V60 / Japanese) dan racikan kopi khas Sadewo'),
    ('Teh & Rempah', 'teh-rempah', 'Seduhan teh segar Tambi Wonosobo, teh racikan khusus, serta aneka rempah tradisional berkhasiat'),
    ('Kekinian (Ice / Hot)', 'kekinian', 'Pilihan minuman susu segar murni, olahan cokelat pekat, red velvet, greentea, taro, dan varian kekinian'),
    ('Jajanan', 'food', 'Camilan dan gorengan gurih renyah pendamping suasana santai di pendopo Kopi Sadewo')
ON CONFLICT (slug) DO UPDATE SET 
    name = EXCLUDED.name,
    description = EXCLUDED.description;

-- 2. Produk Sesuai Menu Asli Kopi Sadewo
INSERT INTO products (category_id, name, slug, description, price, image_url, is_available, is_featured) VALUES
    -- Seduhan Kopi
    (
        (SELECT id FROM categories WHERE slug = 'coffee'),
        'Kopi Klothok Jahe',
        'kopi-klothok-jahe',
        'kopi yang direbus bareng jahe merah, manunggaling kopi lan jahe',
        9000.00,
        'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80',
        TRUE,
        TRUE
    ),
    (
        (SELECT id FROM categories WHERE slug = 'coffee'),
        'Kopi Susu Kental Manis',
        'kopi-susu-kental-manis',
        'Seduhan kopi mantap dengan rasa manis gurih dari susu kental manis.',
        10000.00,
        'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80',
        TRUE,
        FALSE
    ),
    (
        (SELECT id FROM categories WHERE slug = 'coffee'),
        'Kopi Susu (Fresh) Gula Aren',
        'kopi-susu-fresh-gula-aren',
        'Perpaduan kopi mantap, susu murni fresh gurih, dan legitnya gula aren alami khas Sadewo.',
        15000.00,
        'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80',
        TRUE,
        TRUE
    ),
    (
        (SELECT id FROM categories WHERE slug = 'coffee'),
        'Chocoffe (Cokelat Kopi)',
        'chocoffe-cokelat-kopi',
        'Perpaduan harmonis antara kelezatan cokelat pekat dan aroma kopi pilihan.',
        14000.00,
        'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=600&q=80',
        TRUE,
        FALSE
    ),
    (
        (SELECT id FROM categories WHERE slug = 'coffee'),
        'Kopi Tubruk - Robusta Sadewo',
        'kopi-tubruk-robusta-sadewo',
        'Kopi seduh tubruk tradisional menggunakan biji Robusta khas racikan Sadewo.',
        5000.00,
        'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
        TRUE,
        TRUE
    ),
    (
        (SELECT id FROM categories WHERE slug = 'coffee'),
        'Kopi Tubruk - Robusta Single Origin',
        'kopi-tubruk-robusta-single-origin',
        'Kopi tubruk dengan karakter kuat dan body tebal dari biji Robusta Single Origin.',
        9000.00,
        'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=600&q=80',
        TRUE,
        FALSE
    ),
    (
        (SELECT id FROM categories WHERE slug = 'coffee'),
        'Kopi Tubruk - Robusta Kebumen',
        'kopi-tubruk-robusta-kebumen',
        'Kopi tubruk khas Robusta Kebumen dengan aroma wangi dan kepahitan seimbang.',
        10000.00,
        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80',
        TRUE,
        FALSE
    ),
    (
        (SELECT id FROM categories WHERE slug = 'coffee'),
        'Kopi Tubruk - Special Blend',
        'kopi-tubruk-special-blend',
        'Seduhan tubruk racikan istimewa perpaduan biji kopi pilihan Sadewo.',
        9000.00,
        'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
        TRUE,
        FALSE
    ),
    (
        (SELECT id FROM categories WHERE slug = 'coffee'),
        'Kopi Tubruk - Arabica Sadewo',
        'kopi-tubruk-arabica-sadewo',
        'Seduhan tubruk biji Arabica Sadewo dengan aroma harum dan tingkat keasaman lembut.',
        10000.00,
        'https://images.unsplash.com/photo-1551030173-122aabc4489c?auto=format&fit=crop&w=600&q=80',
        TRUE,
        FALSE
    ),
    (
        (SELECT id FROM categories WHERE slug = 'coffee'),
        'Kopi Tubruk - Arabica Single Origin',
        'kopi-tubruk-arabica-single-origin',
        'Kopi tubruk Arabica Single Origin pilihan dengan nuansa cita rasa kompleks.',
        14000.00,
        'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=600&q=80',
        TRUE,
        FALSE
    ),
    (
        (SELECT id FROM categories WHERE slug = 'coffee'),
        'Kopi Tubruk - Arabica Wine',
        'kopi-tubruk-arabica-wine',
        'Seduhan tubruk biji fermentasi Arabica Wine beraroma fruity unik dan manis alami.',
        15000.00,
        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80',
        TRUE,
        FALSE
    ),
    (
        (SELECT id FROM categories WHERE slug = 'coffee'),
        'Vietnam Drip - Robusta Sadewo',
        'vietnam-drip-robusta-sadewo',
        'Kopi tetes lambat Robusta Sadewo berpadu manis dan gurihnya susu kental manis.',
        9000.00,
        'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80',
        TRUE,
        FALSE
    ),
    (
        (SELECT id FROM categories WHERE slug = 'coffee'),
        'Vietnam Drip - Robusta Single Origin',
        'vietnam-drip-robusta-single-origin',
        'Vietnam drip pekat dari Robusta Single Origin dengan layer susu manis legit.',
        12000.00,
        'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80',
        TRUE,
        FALSE
    ),
    (
        (SELECT id FROM categories WHERE slug = 'coffee'),
        'Vietnam Drip - Robusta Kebumen',
        'vietnam-drip-robusta-kebumen',
        'Ekstraksi lambat Robusta Kebumen disajikan di atas lapisan susu kental manis.',
        13000.00,
        'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80',
        TRUE,
        FALSE
    ),
    (
        (SELECT id FROM categories WHERE slug = 'coffee'),
        'Vietnam Drip - Special Blend',
        'vietnam-drip-special-blend',
        'Vietnam drip racikan Special Blend Sadewo yang berkarakter kuat dan creamy.',
        12000.00,
        'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80',
        TRUE,
        FALSE
    ),
    (
        (SELECT id FROM categories WHERE slug = 'coffee'),
        'Vietnam Drip - Arabica Sadewo',
        'vietnam-drip-arabica-sadewo',
        'Seduhan drip Arabica Sadewo yang lembut berpadu manisnya susu kental manis.',
        11000.00,
        'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80',
        TRUE,
        FALSE
    ),
    (
        (SELECT id FROM categories WHERE slug = 'coffee'),
        'Vietnam Drip - Arabica Single Origin',
        'vietnam-drip-arabica-single-origin',
        'Vietnam drip biji Arabica Single Origin premium dengan aroma sedap dan rasa manis pas.',
        15000.00,
        'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80',
        TRUE,
        FALSE
    ),
    (
        (SELECT id FROM categories WHERE slug = 'coffee'),
        'Vietnam Drip - Arabica Wine',
        'vietnam-drip-arabica-wine',
        'Sensasi asam manis winey dari fermentasi Arabica Wine berpadu susu kental manis.',
        17000.00,
        'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80',
        TRUE,
        FALSE
    ),
    (
        (SELECT id FROM categories WHERE slug = 'coffee'),
        'V60 - Robusta Sadewo',
        'v60-robusta-sadewo',
        'Seduhan pour over V60 biji Robusta Sadewo, hasil seduhan bersih dan mantap (Japanese +2k).',
        9000.00,
        'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=600&q=80',
        TRUE,
        FALSE
    ),
    (
        (SELECT id FROM categories WHERE slug = 'coffee'),
        'V60 - Robusta Single Origin',
        'v60-robusta-single-origin',
        'Manual brew V60 Robusta Single Origin dengan kejelasan rasa yang optimal (Japanese +2k).',
        12000.00,
        'https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=600&q=80',
        TRUE,
        FALSE
    ),
    (
        (SELECT id FROM categories WHERE slug = 'coffee'),
        'V60 - Robusta Kebumen',
        'v60-robusta-kebumen',
        'Pour over V60 Robusta Kebumen dengan aroma wangi dan ekstraksi bersih (Japanese +2k).',
        14000.00,
        'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=600&q=80',
        TRUE,
        FALSE
    ),
    (
        (SELECT id FROM categories WHERE slug = 'coffee'),
        'V60 - Special Blend',
        'v60-special-blend',
        'Seduhan manual brew V60 racikan Special Blend pilihan barista Sadewo (Japanese +2k).',
        12000.00,
        'https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=600&q=80',
        TRUE,
        FALSE
    ),
    (
        (SELECT id FROM categories WHERE slug = 'coffee'),
        'V60 - Arabica Sadewo',
        'v60-arabica-sadewo',
        'Pour over V60 Arabica Sadewo bercita rasa bersih, floral, dan acidity segar (Japanese +2k).',
        12000.00,
        'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=600&q=80',
        TRUE,
        FALSE
    ),
    (
        (SELECT id FROM categories WHERE slug = 'coffee'),
        'V60 - Arabica Single Origin',
        'v60-arabica-single-origin',
        'Manual brew V60 biji Arabica Single Origin dengan kompleksitas rasa tinggi (Japanese +2k).',
        15000.00,
        'https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=600&q=80',
        TRUE,
        FALSE
    ),
    (
        (SELECT id FROM categories WHERE slug = 'coffee'),
        'V60 - Arabica Wine',
        'v60-arabica-wine',
        'Pour over V60 biji Arabica Wine dengan aroma fruity fermentasi yang eksotis (Japanese +2k).',
        18000.00,
        'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=600&q=80',
        TRUE,
        TRUE
    ),

    -- Teh & Rempah
    (
        (SELECT id FROM categories WHERE slug = 'teh-rempah'),
        'Teh',
        'teh',
        'teh segar hari ini',
        3000.00,
        'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
        TRUE,
        FALSE
    ),
    (
        (SELECT id FROM categories WHERE slug = 'teh-rempah'),
        'Teh Tambi',
        'teh-tambi',
        'teh murni tambi wonosobo',
        6000.00,
        'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80',
        TRUE,
        TRUE
    ),
    (
        (SELECT id FROM categories WHERE slug = 'teh-rempah'),
        'Teh Wingi',
        'teh-wingi',
        'teh dengan rasa asem ekstra vit C',
        8000.00,
        'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80',
        TRUE,
        FALSE
    ),
    (
        (SELECT id FROM categories WHERE slug = 'teh-rempah'),
        'Teh Herbal',
        'teh-herbal',
        'teh dicampur dengan resep rahasia ada rasa mintnya',
        10000.00,
        'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=600&q=80',
        TRUE,
        FALSE
    ),
    (
        (SELECT id FROM categories WHERE slug = 'teh-rempah'),
        'Lychee Tea',
        'lychee-tea',
        'teh leci best seller pokoknya',
        8000.00,
        'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
        TRUE,
        TRUE
    ),
    (
        (SELECT id FROM categories WHERE slug = 'teh-rempah'),
        'Teh Simbah',
        'teh-simbah',
        'teh jahe sereh madu',
        12000.00,
        'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
        TRUE,
        FALSE
    ),
    (
        (SELECT id FROM categories WHERE slug = 'teh-rempah'),
        'Empon-Empon',
        'empon-empon',
        'campuran berbagai rempah Jahe Merah, Sereh, Kencur, Temulawak, Kunyit, dan Jeruk Nipis.',
        18000.00,
        'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80',
        TRUE,
        TRUE
    ),
    (
        (SELECT id FROM categories WHERE slug = 'teh-rempah'),
        'Jahe Merah Madu',
        'jahe-merah-madu',
        'sudah jelas gak perlu diperjelas',
        6000.00,
        'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=600&q=80',
        TRUE,
        FALSE
    ),

    -- Kekinian (Ice / Hot)
    (
        (SELECT id FROM categories WHERE slug = 'kekinian'),
        'Lime Orange',
        'lime-orange',
        'Perpaduan kesegaran jeruk nipis dan jeruk manis (Ice / Hot).',
        6000.00,
        'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
        TRUE,
        FALSE
    ),
    (
        (SELECT id FROM categories WHERE slug = 'kekinian'),
        'Susu Kental Manis',
        'susu-kental-manis',
        'Sajian susu kental manis klasik hangat atau dingin yang legit.',
        5000.00,
        'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80',
        TRUE,
        FALSE
    ),
    (
        (SELECT id FROM categories WHERE slug = 'kekinian'),
        'Susu Kental Manis Gula Aren',
        'susu-kental-manis-gula-aren',
        'Susu kental manis gurih berpadu dengan manis harum gula aren asli.',
        7000.00,
        'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80',
        TRUE,
        FALSE
    ),
    (
        (SELECT id FROM categories WHERE slug = 'kekinian'),
        'Fresh Milk',
        'fresh-milk',
        'Susu murni segar pilihan yang gurih, alami, dan creamy.',
        9000.00,
        'https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?auto=format&fit=crop&w=600&q=80',
        TRUE,
        FALSE
    ),
    (
        (SELECT id FROM categories WHERE slug = 'kekinian'),
        'Fresh Milk with Aren Sugar',
        'fresh-milk-with-aren-sugar',
        'Susu murni segar berpadu manis legitnya sirup gula aren alami.',
        10000.00,
        'https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?auto=format&fit=crop&w=600&q=80',
        TRUE,
        FALSE
    ),
    (
        (SELECT id FROM categories WHERE slug = 'kekinian'),
        'Creamy Yummy',
        'creamy-yummy',
        'Minuman manis creamy spesial favorit racikan pendopo Kopi Sadewo.',
        12000.00,
        'https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=600&q=80',
        TRUE,
        TRUE
    ),
    (
        (SELECT id FROM categories WHERE slug = 'kekinian'),
        'Chocolate (Pure Cokelat)',
        'chocolate-pure-cokelat',
        'Olahan cokelat murni pekat yang manis legit dan memanjakan lidah.',
        12000.00,
        'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=600&q=80',
        TRUE,
        TRUE
    ),
    (
        (SELECT id FROM categories WHERE slug = 'kekinian'),
        'Red Velvet',
        'red-velvet',
        'Minuman red velvet lembut beraroma manis gurih khas cake istimewa.',
        10000.00,
        'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80',
        TRUE,
        FALSE
    ),
    (
        (SELECT id FROM categories WHERE slug = 'kekinian'),
        'Greentea',
        'greentea',
        'Seduhan matcha teh hijau aromatik yang menenangkan dan creamy.',
        11000.00,
        'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80',
        TRUE,
        FALSE
    ),
    (
        (SELECT id FROM categories WHERE slug = 'kekinian'),
        'Taro',
        'taro',
        'Minuman talas ungu manis legit berpadu kelembutan susu creamy.',
        10000.00,
        'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=600&q=80',
        TRUE,
        FALSE
    ),
    (
        (SELECT id FROM categories WHERE slug = 'kekinian'),
        'Vanilla',
        'vanilla',
        'Susu beraroma vanila wangi lembut yang menyejukkan hati.',
        9000.00,
        'https://images.unsplash.com/photo-1553787499-6f9133860278?auto=format&fit=crop&w=600&q=80',
        TRUE,
        FALSE
    ),
    (
        (SELECT id FROM categories WHERE slug = 'kekinian'),
        'Milk Tea',
        'milk-tea',
        'Kombinasi klasik teh wangi pilihan dan kelembutan susu creamy.',
        8000.00,
        'https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&w=600&q=80',
        TRUE,
        FALSE
    ),

    -- Jajanan
    (
        (SELECT id FROM categories WHERE slug = 'food'),
        'French Fries',
        'french-fries',
        'Kentang goreng gurih renyah dengan taburan bumbu lezat disajikan hangat.',
        7000.00,
        'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80',
        TRUE,
        FALSE
    ),
    (
        (SELECT id FROM categories WHERE slug = 'food'),
        'Banana Fries (Isi 6)',
        'banana-fries-isi-6',
        'Pisang goreng krispi manis gurih isi 6 potong teman setia ngopi.',
        7000.00,
        'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80',
        TRUE,
        TRUE
    ),
    (
        (SELECT id FROM categories WHERE slug = 'food'),
        'Mendoan Fries (Isi 4)',
        'mendoan-fries-isi-4',
        'Tempe mendoan krispi isi 4 dengan irisan daun bawang gurih dan cocolan cabai.',
        7000.00,
        'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
        TRUE,
        TRUE
    ),
    (
        (SELECT id FROM categories WHERE slug = 'food'),
        'Bodin Fries',
        'bodin-fries',
        'Singkong goreng (bodin) empuk merekah berbumbu bawang gurih renyah.',
        7000.00,
        'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
        TRUE,
        TRUE
    ),
    (
        (SELECT id FROM categories WHERE slug = 'food'),
        'Tahu Walik (Isi 5)',
        'tahu-walik-isi-5',
        'Tahu walik goreng renyah isi 5 dengan tekstur krispi di luar dan gurih di dalam.',
        8000.00,
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
        TRUE,
        TRUE
    ),
    (
        (SELECT id FROM categories WHERE slug = 'food'),
        'Java Choco Cake (Isi 6)',
        'java-choco-cake-isi-6',
        'Kue cokelat manis legit lembut khas Jawa isi 6 potong.',
        8000.00,
        'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
        TRUE,
        FALSE
    ),
    (
        (SELECT id FROM categories WHERE slug = 'food'),
        'Noodle',
        'noodle',
        'Mie seduh gurih lezat disajikan hangat dengan taburan bawang goreng.',
        6000.00,
        'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80',
        TRUE,
        FALSE
    ),
    (
        (SELECT id FROM categories WHERE slug = 'food'),
        'Noodle with Egg',
        'noodle-with-egg',
        'Mie seduh gurih lengkap disajikan dengan tambahan telur spesial.',
        10000.00,
        'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=600&q=80',
        TRUE,
        FALSE
    )
ON CONFLICT (slug) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    price = EXCLUDED.price,
    image_url = EXCLUDED.image_url,
    is_available = EXCLUDED.is_available,
    is_featured = EXCLUDED.is_featured;

-- 3. Akun Admin Awal (Password: SadewoAdmin2026!)
INSERT INTO admins (name, email, password_hash) VALUES
    ('Pengelola Kopi Sadewo', 'admin@kopisadewo.com', '$2b$10$Ki/gg.k.inHVciAza3M2ceufcB02W.3r3eyX75fo8GNN3yfuaPsAG')
ON CONFLICT (email) DO NOTHING;
