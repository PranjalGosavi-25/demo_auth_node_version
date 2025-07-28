import { Button, Typography } from 'antd';
import { CompanyOnboardingTemplate } from './CompanyOnboardingTemplate';
import { OnboardCompanyTemplateEnum } from '@enums/authEnum';
import { CompanyOnboardingTutorialVideosEnum } from '@enums/companyOnboardingEnum';

import { useState } from 'react';

export const CompanyOnboardingStepThree = (props: {
  handlePreviousStep: () => void;
  template: OnboardCompanyTemplateEnum;
  handleChangeTemplate: (value: OnboardCompanyTemplateEnum) => void;
  completeOnboarding: () => void;
}) => {
  const {
    handlePreviousStep,
    template,
    handleChangeTemplate,
    completeOnboarding
  } = props;

  const [loading, setLoading] = useState(false);

  const handleCompleteOnboarding = async () => {
    setLoading(true);
    await completeOnboarding();
    setLoading(false);
  };

  return (
    <CompanyOnboardingTemplate
      videoURL={CompanyOnboardingTutorialVideosEnum.SELECT_TEMPLATE}
    >
      <div className="w-[360px] space-y-8">
        <Typography className="text-gray-900 text-4xl font-semibold">
          How would you like to start?
        </Typography>

        <div>
          <section
            className={`space-y-2 pl-6 py-4  border-solid border-0 cursor-pointer ${
              template === OnboardCompanyTemplateEnum.Industry
                ? 'border-l-4 border-primary-600'
                : 'ml-1'
            }`}
            onClick={() => {
              handleChangeTemplate(OnboardCompanyTemplateEnum.Industry);
            }}
          >
            <Typography className="text-[20px] text-primary-700 font-semibold">
              Industry Template
            </Typography>
            <Typography className="text-gray-600">
              Audit-level Carbon Accounting and Analysis for your organisation
            </Typography>
          </section>

          <section
            className={`space-y-2 pl-6 py-4 border-solid border-0 cursor-pointer ${
              template === OnboardCompanyTemplateEnum.Blank
                ? 'border-l-4 border-primary-600'
                : 'ml-1'
            }`}
            onClick={() => {
              handleChangeTemplate(OnboardCompanyTemplateEnum.Blank);
            }}
          >
            <Typography className="text-[20px] text-primary-700 font-semibold">
              Start with Blank
            </Typography>
            <Typography className="text-gray-600">
              Comprehensive Climate Reporting and Compliance for all your needs
            </Typography>
          </section>
        </div>

        <Button
          className="btn-primary w-full"
          onClick={handleCompleteOnboarding}
          loading={loading}
        >
          Next
        </Button>
        <Button
          className="w-full text-gray-600 text-sm"
          type="text"
          onClick={handlePreviousStep}
          disabled={loading}
        >
          Go back
        </Button>
      </div>
    </CompanyOnboardingTemplate>
  );
};
