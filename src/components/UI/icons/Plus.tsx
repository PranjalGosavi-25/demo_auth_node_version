import { IconProps } from '.';

export function PlusIcon(props: IconProps) {
  const { className } = props;

  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      className={`${className ? className : 'stroke-gray-500'}`}
    >
      <path
        d="M9.99996 4.16797V15.8346M4.16663 10.0013H15.8333"
        stroke-width="1.66667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
