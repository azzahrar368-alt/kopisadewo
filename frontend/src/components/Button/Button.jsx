import './Button.css';

/**
 * Button component - Tombol dengan varian Primary dan Secondary
 * Mengusung estetika kayu jati joglo Jawa, transisi lembut,
 * serta memastikan target sentuh ergonomis minimal 44px di mobile.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Label atau konten tombol
 * @param {'primary'|'secondary'} [props.variant='primary'] - Gaya tampilan tombol
 * @param {'sm'|'md'|'lg'} [props.size='md'] - Ukuran tombol (semua >= 44px tinggi)
 * @param {React.ElementType} [props.as] - Elemen tag kustom (misal: 'a' atau Link)
 * @param {string} [props.href] - URL jika digunakan sebagai tautan
 * @param {'button'|'submit'|'reset'} [props.type='button'] - Atribut type untuk tombol native
 * @param {boolean} [props.disabled=false] - Status nonaktif
 * @param {React.ReactNode} [props.iconLeft] - Ikon di sisi kiri label
 * @param {React.ReactNode} [props.iconRight] - Ikon di sisi kanan label
 * @param {boolean} [props.fullWidth=false] - Lebar penuh 100%
 * @param {string} [props.className='']
 * @param {Function} [props.onClick]
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  as,
  href,
  type = 'button',
  disabled = false,
  iconLeft,
  iconRight,
  fullWidth = false,
  className = '',
  ...rest
}) {
  const Component = as || (href ? 'a' : 'button');

  const classes = [
    'ks-button',
    `ks-button--${variant}`,
    `ks-button--${size}`,
    fullWidth ? 'ks-button--full-width' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const componentProps = {
    className: classes,
    ...rest,
  };

  if (Component === 'button') {
    componentProps.type = type;
    componentProps.disabled = disabled;
  } else if (disabled) {
    componentProps['aria-disabled'] = true;
    componentProps.tabIndex = -1;
  }

  if (href) {
    componentProps.href = href;
  }

  return (
    <Component {...componentProps}>
      {iconLeft && (
        <span className="ks-button__icon ks-button__icon--left" aria-hidden="true">
          {iconLeft}
        </span>
      )}
      <span>{children}</span>
      {iconRight && (
        <span className="ks-button__icon ks-button__icon--right" aria-hidden="true">
          {iconRight}
        </span>
      )}
    </Component>
  );
}

export default Button;
