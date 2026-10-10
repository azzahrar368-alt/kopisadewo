import './Container.css';

/**
 * Container component - Pembungkus tata letak dengan batasan lebar responsif
 * dan jarak sisi bernuansa lega khas pendopo Kopi Sadewo.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {'sm'|'md'|'lg'|'xl'|'2xl'|'full'} [props.size='xl']
 * @param {string} [props.className='']
 * @param {boolean} [props.padding=true]
 * @param {React.ElementType} [props.as='div']
 */
export function Container({
  children,
  size = 'xl',
  className = '',
  padding = true,
  as: Component = 'div',
  ...rest
}) {
  const classes = [
    'ks-container',
    `ks-container--size-${size}`,
    padding ? 'ks-container--padding' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  );
}

export default Container;
