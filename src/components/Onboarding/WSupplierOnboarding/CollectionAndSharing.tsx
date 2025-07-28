import {
  Building07OutlineIcon,
  CheckCircleOutlineIcon
} from '@components/Icons';
import { OnboardingLayout } from '../OnboardingLayout';
import { useRouter } from 'next/router';
import { CompanyAccountTypeEnum, SupplierTypeEnum } from '@enums/common';
import { CompanyService } from '@services/CompanyService';
import config from 'config';
import { message } from 'antd';
import { useState } from 'react';
import ConsentBox from '../ConsentBox';
import { CustomerIoUtils } from '@utils/cutomerio';

export const CollectionAndSharing = (props: {
  totalSteps: number;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  tokenData: any;
}) => {
  const { totalSteps, currentStep, setCurrentStep, tokenData } = props;
  const router = useRouter();
  const token = router.query.token;
  const [loading, setLoading] = useState(false);
  const [isAgree, setIsAgree] = useState(true);

  const contents = [
    // {
    //   icon: CheckCircleOutlineIcon,
    //   text: 'No calls, followups or email exchanges needed'
    // },
    {
      icon: CheckCircleOutlineIcon,
      text: 'Stay Compliant with latest ESG and Sustainability Standards without additional effort'
    }
  ];

  async function handleCheckCompleteOnboarding() {
    setLoading(true);
    const { data, error } = await CompanyService.checkCompleteOnboarding({
      token: token as string
    });

    if (!error) {
      localStorage.clear();
      router.push(config.FRONTEND_URL.CARBON_NEWTRAL as string);
    } else {
      message.error(error?.message || 'Something went wrong');
      // CustomerIoUtils.trackOnboardingCompleteEvent({
      //   user: tokenData?.user,
      //   company: tokenData?.company
      // });

      CustomerIoUtils.trackEvent({
        eventName: 'onboarding_completed',
        data: {
          step: 'Collection & Sharing'
        }
      });
    }
    setLoading(false);
  }

  function handlePrevious() {
    switch (tokenData?.company?.accountType) {
      case CompanyAccountTypeEnum.VCP:
        router.push(`/supplier-onboarding/${currentStep - 1}?token=${token}`);

        break;
    }
    //@ts-ignore
    setCurrentStep((prev) => prev - 1);
  }

  return (
    <OnboardingLayout
      title={``}
      supportingData={{
        title: 'Need help?',
        descriptions: []
      }}
      currentStep={currentStep}
      totalSteps={totalSteps}
      nextButtonProps={{
        visible: true,

        onClick: handleCheckCompleteOnboarding,
        label: 'Finish',
        disabled: !isAgree
      }}
      previousButtonProps={{
        visible: true,
        onClick: handlePrevious
      }}
      loading={loading}
      tokenData={tokenData}
    >
      <div className="flex flex-col gap-4">
        <div className="bg-gray-900 text-white px-6 py-4 flex items-center gap-4 text-sm font-semibold rounded-lg shadow-xs">
          <div className="flex items-center gap-2">
            <Building07OutlineIcon className="text-white" />
            <p className="text-lg">{tokenData?.company?.referralCompanyName}</p>
          </div>
          {/* Icon removed: SwitchHorizontal01OutlineIcon does not exist */}
          <div className="flex items-center gap-2">
            <Building07OutlineIcon className="text-white" />
            <p className="text-lg">{tokenData?.company?.name}</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-xs flex flex-col gap-2.5 px-6 py-8">
          <div className="flex flex-col gap-4">
            <div
              className="gap-3 items-center"
              style={{
                display: 'grid',
                gridTemplateColumns: '25px auto'
              }}
            >
              <CheckCircleOutlineIcon
                className="text-primary-600"
                size={24}
              />

              <p className="text-gray-600 font-normal text-md">
                Exchange ESG Data Directly with{' '}
                <span>{tokenData?.company?.referralCompanyName}</span> without
                hassle
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {contents.map((data, key) => {
              return (
                <div
                  key={key}
                  className="gap-3 items-center"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '25px auto'
                  }}
                >
                  {
                    <data.icon
                      className="text-primary-600"
                      size={24}
                    />
                  }
                  <p className="text-gray-600 font-normal text-md">
                    {' '}
                    {data.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <ConsentBox
          isAgree={isAgree}
          setIsAgree={setIsAgree}
          companyName={tokenData?.company?.referralCompanyName}
        />
      </div>
    </OnboardingLayout>
  );
};
