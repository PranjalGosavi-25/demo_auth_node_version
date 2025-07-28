import { CheckCircleOutlineIcon } from '@components/Icons';
import { useRouter } from 'next/router';
import { OnboardingLayout } from '@components/Onboarding/OnboardingLayout';
import { AuthService } from '@services/AuthService';
import { message } from 'antd';
import { useState } from 'react';

export const InviteCompleted = (props: { totalSteps: number }) => {
  const { totalSteps } = props;
  const router = useRouter();
  const token = router.query.token;
  const [loading, setLoading] = useState(false);

  async function handleCheckCompleteOnboarding() {
    setLoading(true);
    //@ts-ignore
    const { data, error } = await AuthService.completeUserOnboarding({ token });
    setLoading(false);

    if (error) {
      message.error(error.message);
    } else {
      router.push('/login');
    }
  }

  return (
    <OnboardingLayout
      title={'Congratulations'}
      supportingData={{
        title: 'Account Setup Completed',
        descriptions: [
          'A category of specific emissions-producing business activities contributing to a carbon footprint.'
        ]
      }}
      currentStep={3}
      totalSteps={totalSteps}
      nextButtonProps={{
        visible: true,
        label: 'Go to Login',
        onClick: handleCheckCompleteOnboarding,
        disabled: loading
      }}
    >
      <div
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

        <p className="text-gray-600 font-normal text-md">
          You are one step closer to achieving your ESG Goals.
        </p>
      </div>
    </OnboardingLayout>
  );
};
