import React from 'react';
import OTPVerificationForm from './OTPVerificationForm';
import { useRouter } from 'next/router';
import { AuthService } from '@services/AuthService';
import { useQuery } from 'react-query';
import { Loader } from '@components/Common';
import { State } from '@components/Common';
import { StateEnum } from '@enums/common';
import DarkGradientLayout from '@components/Common/DarkGradientLayout';

function OrganisationOTPVerification() {
  const router = useRouter();
  const token = router.query.token as string;

  const { data, isLoading, error } = useQuery(
    [AuthService.GET_OTP_USER_DATA_BY_TOKEN, { token }],
    () => AuthService.getOtpUserDataByToken({ token }),
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
        backToLoginUrl={`/organization/${router.query.organizationId}/login`}
      />
    );
  }

  return (
    <DarkGradientLayout>
      <div className="flex flex-col items-center">
        {data?.company?.logoUrl && (
          <div className="w-full flex justify-center items-center my-4">
            <img
              src={data?.company?.logoUrl}
              alt=""
              className="h-20 object-contain"
            />
          </div>
        )}

        <div className="flex flex-col items-start p-9 gap-8 max-w-md sm:min-w-[400px] bg-white border border-solid border-gray-300 rounded-xl">
          <div className="">
            <p className="text-gray-900 text-3xl font-semibold">
              Verify your account
            </p>
            <p className="text-gray-600 text-base mt-3">
              {data?.company?.name}
            </p>
          </div>
          <div className="flex flex-col items-center w-full">
            <p className="text-gray-500 mb-4">
              Enter the verification code sent to your email address.
            </p>
            <OTPVerificationForm token={token} />
          </div>
          <div>
            <p className="text-gray-600 font-inter font-normal text-sm">
              Need Assistance? <br /> Contact{' '}
              <a
                href="mailto:support@newtral.io"
                className="text-primary-700 font-inter font-semibold text-sm no-underline"
              >
                support@newtral.io
              </a>
            </p>
          </div>
        </div>

        <div className="w-full flex justify-center items-center flex-col gap-2 py-4">
          <img src="/images/poweredByNewtral.svg" alt="" className="w-40" />
        </div>
      </div>
    </DarkGradientLayout>
  );
}

export default OrganisationOTPVerification;
