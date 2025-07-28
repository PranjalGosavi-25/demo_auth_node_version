import { Button, Typography } from 'antd';
import { ArrowLeftOutlineIcon } from 'newtral-icons';
import Link from 'next/link';

export const PageNotFound = (props: { fullScreen?: boolean }) => {
  const { fullScreen } = props;
  return (
    <div
      className={
        fullScreen
          ? 'h-screen w-screen flex items-center justify-center bg-primary-50'
          : ''
      }
    >
      <section>
        <Typography className="text-primary-700 text-base font-semibold">
          404 error
        </Typography>

        <Typography className="text-gray-900 text-6xl pt-3 pb-6">
          Page not found
        </Typography>

        <Typography>
          Sorry, the page you are looking for doesn&apos;t exist
        </Typography>

        <Link href={'/login'}>
          <Button className="btn-primary mt-6 px-4 py-7 rounded-1 flex items-center gap-2 font-semibold text-base">
            <ArrowLeftOutlineIcon />
            Go back to login
          </Button>
        </Link>
      </section>
    </div>
  );
};
