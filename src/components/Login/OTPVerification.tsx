import { useRouter } from 'next/router';
import OTPVerificationForm from './OTPVerificationForm';
import { useQuery } from 'react-query';
import { Loader } from '@components/Common';
import { State } from '@components/Common';
import { StateEnum } from '@enums/common';
import { AuthService } from '@services/AuthService';
import LoginSignUpLayoutV2 from '@components/Common/LoginSignupLayoutV2';

export function OTPVerification() {
  const router = useRouter();
  const token = router.query.token as string | undefined;

  const { data, isLoading, error } = useQuery(
    [AuthService.GET_OTP_USER_DATA_BY_TOKEN, { token }],
    () => AuthService.getOtpUserDataByToken({ token: token as string }),
    {
      enabled: !!token
    }
  );

  if (isLoading) {
    return <Loader />;
  }

  if (error || !token) {
    return (
      <State
        state={StateEnum.Error}
        title={'Unauthorized Access'}
        description={
          'You are not authorized to access this page. Please contact your administrator for more information.'
        }
        backToLoginUrl="/login"
      />
    );
  }

  return (
    <LoginSignUpLayoutV2>
      <div className="flex justify-center items-center w-full h-full">
        <div className="w-4/5 lg:w-3/5 h-fit">
          <div className="flex flex-col items-start text-start mb-8">
            <h1 className="text-gray-700 font-inter font-semibold text-md">
              Verify your account
            </h1>
            <p className="text-gray-500">
              Enter the verification code sent to your email address.
            </p>
          </div>

          <OTPVerificationForm token={token} />
        </div>
      </div>
    </LoginSignUpLayoutV2>
  );
}

export default OTPVerification;
