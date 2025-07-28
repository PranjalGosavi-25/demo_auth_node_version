import { SpecialCloseIcon } from '@components/UI/SpecialIcons';
import { Button } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export function ErrorState() {
  const router = useRouter();

  return (
    <>
      <div className="flex justify-center pt-24">
        <div className="flex flex-col gap-8 max-w-sm">
          <div className="flex flex-col items-center gap-6 text-center">
            <SpecialCloseIcon />
            <div className="flex flex-col gap-3">
              <div className="text-3xl font-semibold">Link Invalid</div>
              <div className="text-base text-gray-600">
                This reset link seems to be invalid. Please send a new request.
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <Button
              type="primary"
              className="font-semibold shadow-xs disabled:bg-primary-200 bg-primary-800 disabled:text-white"
              onClick={() => router.push('/forgot-password')}
            >
              Go to forgot password
            </Button>
          </div>
          <div className="flex justify-center">
            <Link
              href="/login"
              className="text-sm text-gray-600 font-semibold flex items-center gap-2 no-underline"
            >
              <span>
                <Image
                  src="/icons/arrow-left.svg"
                  alt="Arrow left"
                  width={12}
                  height={12}
                />
              </span>
              Back to log in
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
