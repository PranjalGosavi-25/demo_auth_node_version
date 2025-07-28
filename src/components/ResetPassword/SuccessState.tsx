import {
  SpecialCheckCircleIcon,
  SpecialCloseIcon
} from '@components/UI/SpecialIcons';
import { Button } from 'antd';
import { useRouter } from 'next/router';

export function SuccessState() {
  const router = useRouter();

  return (
    <>
      <div className="flex justify-center pt-24">
        <div className="flex flex-col gap-8 max-w-sm">
          <div className="flex flex-col items-center gap-6 text-center">
            <SpecialCheckCircleIcon />
            <div className="flex flex-col gap-3">
              <div className="text-3xl font-semibold">Password reset</div>
              <div className="text-base text-gray-600">
                Your password has been successfully reset. Click below to log in
                magically.
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <Button
              type="primary"
              className="font-semibold shadow-xs disabled:bg-primary-200 bg-primary-800 disabled:text-white"
              onClick={() => router.push('/login')}
            >
              Go to Login
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
