import './SectionTitle.css';

/**
 * SectionTitle component - Judul seksi bernuansa pendopo joglo Jawa
 * dengan tipografi elegan, jarak lapang, dan aksen ornamen halus.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.title - Judul utama seksi (Playfair Display)
 * @param {React.ReactNode} [props.children] - Alternatif judul jika props.title kosong
 * @param {React.ReactNode} [props.subtitle] - Label pelengkap di atas judul (Inter uppercase)
 * @param {React.ReactNode} [props.description] - Penjelasan pengantar seksi
 * @param {'left'|'center'|'right'} [props.align='center'] - Posisi perataan teks
 * @param {boolean} [props.ornament=true] - Menampilkan aksen ornamen garis belah ketupat joglo
 * @param {React.ElementType} [props.as='h2'] - Elemen heading yang digunakan
 * @param {string} [props.className='']
 */
export function SectionTitle({
  title,
  children,
  subtitle,
  description,
  align = 'center',
  ornament = true,
  as: HeadingTag = 'h2',
  className = '',
  ...rest
}) {
  const content = title || children;

  const containerClasses = [
    'ks-section-title',
    `ks-section-title--${align}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses} {...rest}>
      {subtitle && (
        <span className="ks-section-title__eyebrow">{subtitle}</span>
      )}

      {content && (
        <HeadingTag className="ks-section-title__heading">
          {content}
        </HeadingTag>
      )}

      {ornament && (
        <div className="ks-section-title__ornament" aria-hidden="true">
          <span className="ks-section-title__ornament-line" />
          <span className="ks-section-title__ornament-diamond" />
          <span className="ks-section-title__ornament-line" />
        </div>
      )}

      {description && (
        <p className="ks-section-title__description">{description}</p>
      )}
    </div>
  );
}

export default SectionTitle;
