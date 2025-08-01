import { IconProps } from '.';

export function FilterLinesIcon(props: IconProps) {
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
        d="M6 12H18M3 6H21M9 18H15"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
