import { useRouter } from 'next/router';
import SelfServeOnboardingLayout from '../SelfServeOnboardingLayout';
import dayjs from 'dayjs';
import { Building07OutlineIcon } from 'newtral-icons';
import { CustomerIoUtils } from '@utils/cutomerio';

export const InvitationDetail = (props: {
  setCurrentStep: (step: number) => void;
  tokenData: any;
  setTokenData: (data: any) => void;
  currentStep: number;
  serverTokenData: any;
}) => {
  const {
    setCurrentStep,
    tokenData,
    setTokenData,
    currentStep,
    serverTokenData
  } = props;
  const router = useRouter();
  const token = router.query.token;

  function handleNext() {
    CustomerIoUtils.trackEvent({
      eventName: 'onboarding',
      data: {
        step: 'Start Onboarding'
      }
    });
    setCurrentStep(currentStep + 1);
    router.push({
      pathname: '/company-onboarding',
      query: { step: currentStep + 1, token: token }
    });
    localStorage.setItem(currentStep.toString(), 'true');
  }

  return (
    <SelfServeOnboardingLayout
      nextButtonProps={{
        onClick: handleNext,
        label: 'Start Onboarding'
      }}
    >
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="rounded-2xl bg-gray-100 w-56 flex items-center justify-center p-8">
          {(serverTokenData?.company.referralCompany?.logoUrl && (
            <img
              src={serverTokenData?.company?.referralCompany?.logoUrl}
              alt=""
              className="w-full h-full object-contain"
            />
          )) || (
            <div className="flex items-center gap-2 flex-col text-center">
              <Building07OutlineIcon className="text-gray-600 w-6 h-6" />
              <p className="text-base text-gray-700 font-semibold flex-1">
                {serverTokenData?.company?.referralCompany?.name}
              </p>
            </div>
          )}
        </div>
        <div className="bg-gray-100 rounded-2xl p-8 flex flex-col gap-8 flex-1">
          <p className="text-gray-700 font-medium text-xl">
            {serverTokenData?.company?.name} have been invited by{' '}
            <span className="font-semibold">
              {serverTokenData?.company?.referralCompany?.name}
            </span>{' '}
            to join the platform.
          </p>
          <p className="text-gray-600 text-sm">
            Newtral AI has partnered with{' '}
            {serverTokenData?.company?.referralCompany?.name} to offer special
            support and pricing for your company.
          </p>
          <p className="text-gray-500 text-sm">
            {dayjs(serverTokenData?.company?.createdAt).format('DD MMM YYYY')}
          </p>
        </div>
      </div>
    </SelfServeOnboardingLayout>
  );
};
