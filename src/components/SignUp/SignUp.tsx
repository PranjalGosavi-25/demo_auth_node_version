import { FormField } from '@components/Common';
import LoginSignUpLayoutV2 from '@components/Common/LoginSignupLayoutV2';
import { AuthService } from '@services/AuthService';
import { Button } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

function SignUp() {
  const router = useRouter();
  return (
    <LoginSignUpLayoutV2 showScheduleMeeting>
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col gap-4 w-4/5 lg:w-3/5 h-fit">
          <Button
            className="btn-primary font-semibold"
            onClick={() => router.push('/signup/climate-program')}
          >
            Already Part of Climate Program
          </Button>
          <Button
            className="btn-secondary-gray font-semibold flex items-center justify-center gap-3"
            onClick={() => router.push(AuthService.GOOGLE_OAUTH_LOGIN)}
          >
            <div>
              <img src="/images/google-icon.svg" alt="" width={24} />
            </div>
            Sign Up with Google
          </Button>
          <div className="text-sm text-center mt-4">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-primary-700 font-semibold">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </LoginSignUpLayoutV2>
  );
}

export default SignUp;
