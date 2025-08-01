import { IconProps } from '.';

export function Edit1Icon(props: IconProps) {
  const { className } = props;

  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      className={`stroke-gray-500 ${className}`}
    >
      <path
        d="M2.39662 15.0973C2.43491 14.7527 2.45405 14.5804 2.50618 14.4194C2.55243 14.2765 2.61778 14.1405 2.70045 14.0152C2.79363 13.8739 2.91621 13.7513 3.16136 13.5061L14.1666 2.5009C15.0871 1.58043 16.5795 1.58043 17.4999 2.5009C18.4204 3.42138 18.4204 4.91376 17.4999 5.83424L6.49469 16.8395C6.24954 17.0846 6.12696 17.2072 5.98566 17.3004C5.86029 17.383 5.72433 17.4484 5.58146 17.4946C5.42042 17.5468 5.24813 17.5659 4.90356 17.6042L2.08325 17.9176L2.39662 15.0973Z"
        stroke-width="1.66667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
