import { CheckCircleOutlineIcon } from '@components/Icons';
import { useRouter } from 'next/router';
import { CompanyAccountTypeEnum, SupplierTypeEnum } from '@enums/common';
import { OnboardingLayout } from '@components/Onboarding/OnboardingLayout';
import { RegionEnum } from '@enums/companyOnboardingEnum';
import { useMemo } from 'react';

const contents = [
  {
    text: 'Mange, Track and Optimise your Energy, Carbon Footprint, Waste, Water and Logistics footprint, Social and Governance Data in an automated manner'
  },
  {
    text: 'Automated Reporting of SEBI mandated BRSR'
  },
  {
    text: 'BRSR ESG Data management, tracking and Reporting'
  },
  {
    text: 'Advanced ESG analytics for your company'
  }
];

const EuContents = [
  {
    text: 'Collect and Manage ESG Data across Environmental, Social and Governance Parameters in a single platform'
  },
  { text: 'Analyse GHG Emissions across Scope 1, 2 and 3 categories' },
  { text: 'Collaborate and Create ESG Reports directly from the platform' },
  {
    text: 'Analyse and Track ESG Metrics in near-real-time using Newtral Dashboards'
  }
];

export const NewtralPlatformDetail = (props: {
  totalSteps: number;
  setCurrentStep: (step: number) => void;
  tokenData: any;
}) => {
  const { totalSteps, setCurrentStep, tokenData } = props;
  const router = useRouter();
  const token = router.query.token;
  const step = router.query.step;

  function handleNext() {
    router.push(`/accept-invite?token=${token}&step=3`);
    setCurrentStep(3);
    localStorage.setItem('2', 'true');
  }

  function handlePrevious() {
    router.push(`/accept-invite?token=${token}&step=1`);
    setCurrentStep(1);
  }

  const contentData =
    tokenData?.region === RegionEnum.EU ? EuContents : contents;

  const title = useMemo(() => {
    let titleText = '';

    if (tokenData?.region === RegionEnum.EU) {
      titleText = 'All-in-one Sustainability Platform';
    } else {
      if (tokenData?.accountType == CompanyAccountTypeEnum.VCP) {
        titleText = 'Newtral AI Platform for ESG Supply Chain';
      } else if (
        tokenData?.accountType == CompanyAccountTypeEnum.Organization
      ) {
        titleText = 'Newtral AI Platform for Organisation';
      }
    }

    return titleText;
  }, [tokenData]);

  return (
    <OnboardingLayout
      title={title}
      supportingData={{
        title: 'Platform Overview',
        descriptions:
          tokenData?.region === RegionEnum.EU
            ? [
                'Newtral platform helps you build your single source of truth for ESG.'
              ]
            : tokenData?.accountType == CompanyAccountTypeEnum.Organization
              ? [
                  'Newtral helps you measure, track and manage your footprint at facility level.',
                  'You can always edit details later or add more facilities.'
                ]
              : []
      }}
      currentStep={2}
      totalSteps={totalSteps}
      nextButtonProps={{
        visible: true,
        onClick: handleNext
      }}
      previousButtonProps={{
        visible: true,
        onClick: handlePrevious
      }}
    >
      <div className="flex flex-col gap-4 pb-5">
        {contentData.map((data, key) => {
          return (
            <div
              key={key}
              className="gap-3"
              style={{
                display: 'grid',
                gridTemplateColumns: '25px auto'
              }}
            >
              {
                <CheckCircleOutlineIcon
                  className="text-primary-600"
                  size={24}
                />
              }
              <p className="text-gray-600 font-normal text-md"> {data.text}</p>
            </div>
          );
        })}
      </div>
    </OnboardingLayout>
  );
};
