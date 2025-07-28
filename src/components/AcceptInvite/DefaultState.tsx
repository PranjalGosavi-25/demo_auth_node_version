import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { InviteProfileSetup } from './InviteProfileSetup';
import { NewtralPlatformDetail } from './NewtralPlatformDetail';
import { InviteCompleted } from './InviteCompleted';

export default function DefaultState(props: {
  token: string;
  tokenData: any;
  setTokenData: (data: any) => void;
}) {
  const { tokenData, setTokenData } = props;
  const router = useRouter();
  const step = router.query.step;

  // const [tokenData, setTokenData] = useState({} as any);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  useEffect(() => {
    setCurrentStep(step ? parseInt(step as string) : 1);

    if (!tokenData?.hasPassword) {
      setCurrentStep(1);
    }
  }, [router.query]);

  return (
    <>
      {currentStep === 1 && (
        <InviteProfileSetup
          totalSteps={totalSteps}
          setCurrentStep={setCurrentStep}
          tokenData={tokenData}
          setTokenData={setTokenData}
        />
      )}
      {currentStep === 2 && (
        <NewtralPlatformDetail
          totalSteps={totalSteps}
          setCurrentStep={setCurrentStep}
          tokenData={tokenData}
        />
      )}
      {currentStep === 3 && <InviteCompleted totalSteps={totalSteps} />}
    </>
  );
}
