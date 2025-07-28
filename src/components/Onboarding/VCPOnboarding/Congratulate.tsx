import React, { useState } from 'react';
import VCPOnboardingLayout from './VCPOnboardingLayout';
import { useRouter } from 'next/router';
import { CompanyService } from '@services/CompanyService';
import { CustomerIoUtils } from '@utils/cutomerio';
import config from 'config';
import { message } from 'antd';

function Congratulate(props: { tokenData: any }) {
  const { tokenData } = props;
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const token = router?.query?.token;

  async function handleCompleteOnboarding() {
    setLoading(true);
    const { data, error } = await CompanyService.checkCompleteOnboarding({
      token: token as string
    });

    if (!error) {
      CustomerIoUtils.trackEvent({
        eventName: 'onboarding_completed',
        data: {}
      });
      localStorage.clear();
      router.push(config.FRONTEND_URL.CARBON_NEWTRAL as string);
    } else {
      message.error(error?.message || 'Something went wrong');
    }
    setLoading(false);
  }

  return (
    <VCPOnboardingLayout
      loading={loading}
      title={'Congratulations'}
      description={`You're account is setup.`}
      nextButtonProps={{
        onClick: handleCompleteOnboarding,
        label: 'Go to Dashboard'
      }}
    >
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-8">
        <div className="bg-white rounded-lg overflow-hidden px-6 py-8 flex flex-col gap-4">
          <p className="text-gray-600 sm:text-lg">
            You are on Basic Plan of Newtral.
          </p>
          <div className="text-gray-600 sm:text-lg">
            {(tokenData?.company?.referralCompanyName && (
              <p>
                You can now exchange your Environmental, Social, and Governance
                (ESG) Data with{' '}
                <span className="font-bold">
                  {tokenData?.company?.referralCompanyName}
                </span>{' '}
                via Newtral AI Platform.
              </p>
            )) || (
              <p>
                You can now exchange your Environmental, Social, and Governance
                (ESG) Data via Newtral AI Platform.
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-center w-full">
          <div>
            <img
              src="/images/onboardingComplete.svg"
              alt=""
              className="object-contain w-full sm:w-fit"
            />
          </div>
        </div>
      </div>
    </VCPOnboardingLayout>
  );
}

export default Congratulate;
