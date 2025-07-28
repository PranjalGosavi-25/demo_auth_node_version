import { Spin } from 'antd';

interface LoaderProps {
  fullScreen?: boolean;
}

export const Loader = (payload: LoaderProps) => {
  const { fullScreen = false } = payload;
  return (
    <div
      className={`${
        fullScreen ? 'h-screen w-screen flex items-center justify-center ' : ''
      }`}
    >
      <Spin />
    </div>
  );
};
