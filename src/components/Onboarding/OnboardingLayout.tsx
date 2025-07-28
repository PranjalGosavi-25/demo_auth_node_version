import { CompanyAccountTypeEnum, SupplierTypeEnum } from '@enums/common';
import { Button, Typography } from 'antd';

interface IOnboardingLayoutProps {
  children: React.ReactNode;
  title: string;
  currentStep: number;
  totalSteps: number;
  loading?: boolean;
  nextButtonProps: {
    label?: string;
    disabled?: boolean;
    onClick?: () => void;
    visible?: boolean;
  };
  previousButtonProps?: {
    label?: string;
    disabled?: boolean;
    onClick?: () => void;
    visible?: boolean;
  };
  supportingData: {
    title: string;
    descriptions: Array<string>;
  };
  tokenData?: any;
}

// OnboardingLayout is a layout component for onboarding pages
export const OnboardingLayout = (props: IOnboardingLayoutProps) => {
  const {
    children,
    title,
    currentStep,
    totalSteps,
    loading,
    nextButtonProps,
    previousButtonProps,
    supportingData,
    tokenData
  } = props;
  return (
    <>
      <div className="layout-container h-screen flex justify-center items-center w-screen">
        <div className="max-w-7xl w-4/5 h-4/5  px-4 flex flex-col">
          {/* <div>
            <img
              src="/images/newtral-text-logo-white.svg"
              alt="logo"
              className="my-4"
            />
          </div> */}

          {/* layout box */}
          <section className="onboarding-container flex-1 flex flex-col overflow-hidden rounded-2xl">
            {/* top section */}
            <section className="grid grid-cols-4 flex-1 overflow-hidden">
              {/* left section */}
              <section className="bg-gray-900 px-8 py-16 col-span-1 rounded-tl-2xl">
                <Typography className="text-white text-2xl font-semibold">
                  {supportingData?.title}
                </Typography>
                <section className="mt-4 flex flex-col gap-2">
                  {supportingData?.descriptions?.map((description, index) => {
                    return (
                      <Typography className="text-gray-200 text-sm" key={index}>
                        {description}
                      </Typography>
                    );
                  })}
                  {tokenData?.company?.accountType ===
                    CompanyAccountTypeEnum.VCP && (
                    <div className="flex flex-col gap-4">
                      <div>
                        <p className="text-gray-200 text-sm">Contact Support</p>
                        <p className="text-gray-100 text-sm font-semibold">
                          support@newtral.io
                        </p>
                        <p className="text-gray-100 text-sm font-semibold">
                          +91-99009-14232
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-200 text-sm">
                          Your Organisation ID
                        </p>
                        <p className="text-gray-100 text-sm font-semibold">
                          #{tokenData?.company?.organizationId}
                        </p>
                      </div>
                    </div>
                  )}
                </section>
              </section>

              {/* right section */}
              <section className="bg-primary-25 px-8 pt-16 pb-3 col-span-3 rounded-tr-2xl flex flex-col overflow-hidden">
                {title && (
                  <Typography className="text-gray-900 text-4xl font-semibold mb-8">
                    {title}
                  </Typography>
                )}
                <section className="overflow-auto flex-1">
                  {/* //max-h-96 h-full */}
                  {children}
                </section>
              </section>
            </section>

            {/* bottom section */}
            <section className="px-8 py-6 bg-white flex justify-between items-center rounded-b-2xl">
              <Typography className="text-gray-700 font-medium text-xl">
                Step {currentStep} of {totalSteps}
              </Typography>

              <section className="flex gap-4">
                {previousButtonProps?.visible && (
                  <Button
                    className="btn-secondary-gray"
                    onClick={previousButtonProps.onClick}
                    disabled={previousButtonProps.disabled || loading}
                  >
                    {previousButtonProps.label || 'Previous'}
                  </Button>
                )}

                {nextButtonProps?.visible && (
                  <Button
                    className="btn-primary"
                    onClick={nextButtonProps.onClick}
                    disabled={nextButtonProps.disabled}
                    loading={loading}
                  >
                    {nextButtonProps.label || 'Next'}
                  </Button>
                )}
              </section>
            </section>
          </section>
        </div>
      </div>

      <style jsx>{`
        .layout-container {
          background: linear-gradient(180deg, #a7a5fc 0%, #c4c3fd 97.92%);
        }

        .onboarding-container {
          box-shadow: 20px 20px 40px 0px rgba(27, 28, 44, 0.1);
          backdrop-filter: blur(15px);
        }
      `}</style>
    </>
  );
};
