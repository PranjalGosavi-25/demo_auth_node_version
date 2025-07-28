interface IFeaturedIconProps {
  variant?:
    | 'circle'
    | 'double-circle-light'
    | 'double-circle-dark'
    | 'square'
    | 'glass-square'
    | 'outline-square';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  icon: React.FunctionComponent<any>;
  color?: 'primary' | 'gray' | 'warning' | 'success' | 'error';
  iconProps?: {
    className?: string;
  };
}

const SIZE_CLASS_MAP = {
  xs: 'w-6 h-6',
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
  xl: 'w-14 h-14'
};

const ICON_SIZE_MAP = {
  xs: 10,
  sm: 13.33,
  md: 16.66,
  lg: 20,
  xl: 23.33
};

const BORDER_SIZE_MAP = {
  xs: 2,
  sm: 4,
  md: 6,
  lg: 8,
  xl: 10
};

export function FeaturedIcon(props: IFeaturedIconProps) {
  const { variant = 'circle', size = 'md', icon: Icon, color } = props;

  /** This is for tailwind to generate the classes dynamically */
  const classes =
    'bg-primary-100 bg-gray-100 bg-warning-100 bg-success-100 bg-error-100 border-2 border-4 border-6 border-8 border-10 border-primary-50 border-gray-50 border-warning-50 border-success-50 border-error-50 text-primary-600 text-gray-600 text-warning-600 text-success-600 text-error-600 text-white  bg-primary-600 bg-gray-600 bg-warning-600 bg-success-600 bg-error-600 border-primary-700 border-gray-700 border-warning-700 border-success-700 border-error-700 rounded-4 rounded-6 rounded-8 rounded-10 rounded-12';

  const VARIANT_CLASS_MAP: any = {
    circle: `rounded-full bg-${color}-100`,
    'double-circle-light': `rounded-full bg-${color}-100 border-${BORDER_SIZE_MAP[size]} border-solid border-${color}-50`,
    'double-circle-dark': `rounded-full bg-${color}-600 border-${BORDER_SIZE_MAP[size]} border-solid border-${color}-700`,
    square: `bg-${color}-100 rounded-${BORDER_SIZE_MAP[size] + 2}`,
    'glass-square': `rounded-${BORDER_SIZE_MAP[size] + 2} glass-square`,
    'outline-square': `rounded-${
      BORDER_SIZE_MAP[size] + 2
    } shadow-xs border-solid border-gray-200 rounded-${
      BORDER_SIZE_MAP[size] + 2
    }`
  };

  const getIconClassName = () => {
    if (
      variant == 'circle' ||
      variant == 'double-circle-light' ||
      variant === 'square'
    ) {
      return `text-${color}-600`;
    } else if (variant == 'glass-square' || variant == 'double-circle-dark') {
      return `text-white`;
    } else if (variant == 'outline-square') {
      return `text-gray-700`;
    }

    return '';
  };

  return (
    <div
      className={`flex items-center justify-center box-border ${SIZE_CLASS_MAP[size]} ${VARIANT_CLASS_MAP[variant]}`}
    >
      <Icon
        height={ICON_SIZE_MAP[size]}
        width={ICON_SIZE_MAP[size]}
        className={`${props.iconProps?.className || getIconClassName()}`}
      />

      <style jsx>
        {`
          .glass-square {
            background: rgba(255, 255, 255, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.6);
            backdrop-filter: blur(8px);
          }
        `}
      </style>
    </div>
  );
}
