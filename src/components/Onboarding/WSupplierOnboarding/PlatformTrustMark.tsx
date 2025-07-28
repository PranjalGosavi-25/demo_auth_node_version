import { CheckCircleOutlineIcon } from '@components/Icons';
import { OnboardingLayout } from '../OnboardingLayout';
import { useRouter } from 'next/router';
import { CompanyAccountTypeEnum, SupplierTypeEnum } from '@enums/common';
import { useMemo } from 'react';
import { RegionEnum } from '@enums/companyOnboardingEnum';
import { CustomerIoUtils } from '@utils/cutomerio';

const content = [
  {
    title: 'Newtral Offerings',
    description:
      'Newtral AI Platform offers extensive Environment, Social and Governance automated reporting capabilities (BRSR, ESRS, Extended Producer Responsibility Reporting, CDP, GRI) with added advantage of Advanced Analytics, Insights, Benchmarking, Predictive Analytics and more.'
  },
  {
    title: 'Special Offer for Wockhardt’s Value Chain Partners',
    description:
      'As a valued Sustainable Value Chain Partner of Wockhardt, we are pleased to offer Newtral AI platform’s data sharing capabilities without additional charges. This allows you to independently manage and submit your ESG data with Wockhardt directly from the platform. '
  },
  {
    title: 'Assistance Add-on',
    description:
      'Newtral AI offers add-on assistance services that includes dedicated monthly support from Newtral AI team to ensure the accurate and timely collection and mapping of ESG data specific to Wockhardt Limited on your account and managing your ESG account end-to-end at a nominal mutually agreed price.'
  }
];

export const PlatformTrustMark = (props: {
  totalSteps: number;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  tokenData: any;
}) => {
  const { totalSteps, setCurrentStep, tokenData, currentStep } = props;
  const router = useRouter();
  const token = router.query.token;

  function handleNext() {
    CustomerIoUtils.trackEvent({
      eventName: 'onboarding',
      data: {
        step: 'Platform Trust Mark'
      }
    });

    router.push(`/supplier-onboarding/${currentStep + 1}?token=${token}`);

    //@ts-ignore
    setCurrentStep((prev) => prev + 1);
    localStorage.setItem(currentStep.toString(), 'true');
  }

  return (
    <OnboardingLayout
      title={'All-in-one Sustainability Platform'}
      supportingData={{
        title: 'Need help?',
        descriptions: []
      }}
      currentStep={currentStep}
      totalSteps={totalSteps}
      nextButtonProps={{
        visible: true,
        onClick: handleNext
      }}
      tokenData={tokenData}
    >
      <div className="flex flex-col gap-8 pb-5">
        {content.map((data, key) => {
          return (
            <div key={key}>
              <p className="text-primary-700 font-semibold text-lg mb-2">
                {' '}
                {data.title}
              </p>
              <p className="text-gray-600"> {data.description}</p>
            </div>
          );
        })}
      </div>
    </OnboardingLayout>
  );
};
