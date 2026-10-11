-- =============================================================================
-- Data Awal (Seed) Kopi Sadewo
-- =============================================================================

-- 1. Kategori Produk (Coffee, Non-Coffee, Food)
INSERT INTO categories (name, slug, description) VALUES
    ('Coffee', 'coffee', 'Aneka sajian seduhan kopi pilihan khas Kopi Sadewo'),
    ('Non-Coffee', 'non-coffee', 'Pilihan minuman segar dan creamy tanpa kandungan kopi'),
    ('Food', 'food', 'Camilan dan hidangan lezat pendamping suasana santai')
ON CONFLICT (slug) DO NOTHING;

-- 2. Produk Contoh (8 Produk, bertanda [ISI] pada deskripsi)
INSERT INTO products (category_id, name, slug, description, price, image_url, is_available, is_featured) VALUES
    (
        (SELECT id FROM categories WHERE slug = 'coffee'),
        'Kopi Susu Sadewo',
        'kopi-susu-sadewo',
        '[ISI] Perpaduan espresso mantap, susu segar gurih, dan manisnya gula aren murni khas racikan Sadewo.',
        18000.00,
        '/images/products/kopi-susu-sadewo.jpg',
        TRUE,
        TRUE
    ),
    (
        (SELECT id FROM categories WHERE slug = 'coffee'),
        'Espresso Joglo',
        'espresso-joglo',
        '[ISI] Ekstraksi murni biji kopi Nusantara dengan crema tebal dan aroma kuat berkarakter.',
        15000.00,
        '/images/products/espresso-joglo.jpg',
        TRUE,
        FALSE
    ),
    (
        (SELECT id FROM categories WHERE slug = 'coffee'),
        'Americano Jawa',
        'americano-jawa',
        '[ISI] Espresso ganda yang dipadukan dengan air mineral dingin menyegarkan, bersih dan beraroma.',
        16000.00,
        '/images/products/americano-jawa.jpg',
        TRUE,
        FALSE
    ),
    (
        (SELECT id FROM categories WHERE slug = 'coffee'),
        'Caffe Latte Rempah',
        'caffe-latte-rempah',
        '[ISI] Kopi susu lembut dengan microfoam halus serta sentuhan rempah kayu manis aromatik.',
        22000.00,
        '/images/products/caffe-latte-rempah.jpg',
        TRUE,
        TRUE
    ),
    (
        (SELECT id FROM categories WHERE slug = 'non-coffee'),
        'Matcha Latte Krajan',
        'matcha-latte-krajan',
        '[ISI] Bubuk matcha premium Jepang dipadukan dengan susu segar yang creamy dan manis seimbang.',
        22000.00,
        '/images/products/matcha-latte-krajan.jpg',
        TRUE,
        TRUE
    ),
    (
        (SELECT id FROM categories WHERE slug = 'non-coffee'),
        'Wedang Cokelat Sadewo',
        'wedang-cokelat-sadewo',
        '[ISI] Cokelat pekat hangat khas Sadewo dengan rasa manis legit dan aroma vanila menenangkan.',
        20000.00,
        '/images/products/wedang-cokelat-sadewo.jpg',
        TRUE,
        FALSE
    ),
    (
        (SELECT id FROM categories WHERE slug = 'food'),
        'Roti Bakar Cokelat Keju',
        'roti-bakar-cokelat-keju',
        '[ISI] Roti tawar tebal panggang dengan lelehan cokelat melimpah dan parutan keju gurih.',
        18000.00,
        '/images/products/roti-bakar-cokelat-keju.jpg',
        TRUE,
        TRUE
    ),
    (
        (SELECT id FROM categories WHERE slug = 'food'),
        'Singkong Goreng Gurih',
        'singkong-goreng-gurih',
        '[ISI] Singkong empuk merekah dengan bumbu bawang ketumbar gurih, camilan pas teman ngopi.',
        14000.00,
        '/images/products/singkong-goreng-gurih.jpg',
        TRUE,
        FALSE
    )
ON CONFLICT (slug) DO NOTHING;
