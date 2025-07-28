import { IconProps } from '.';

export function XCloseIcon(props: IconProps) {
  const { className } = props;

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      className={`stroke-gray-500 ${className}`}
    >
      <path
        d="M18 6L6 18M6 6L18 18"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
