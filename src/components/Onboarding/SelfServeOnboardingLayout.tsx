import { Avatar, Button, Divider } from 'antd';
import { HelpCircleOutlineIcon } from '@components/Icons';
import React from 'react';

function SelfServeOnboardingLayout(props: {
  children: React.ReactNode;
  loading?: boolean;
  nextButtonProps: {
    label?: string;
    disabled?: boolean;
    onClick?: () => void;
  };
  previousButtonProps?: {
    label?: string;
    disabled?: boolean;
    onClick?: () => void;
  };
}) {
  const { children, loading, nextButtonProps, previousButtonProps } = props;

  return (
    <div className="bg-dark-gradient h-screen w-screen overflow-auto">
      <div className="flex justify-between items-center w-full px-8 py-4 h-20 max-w-[1680px] mx-auto sticky top-0 z-10 bg-black">
        <div>
          <img src="/images/newtral-white.svg" alt="" />
        </div>
        <div className="flex items-center w-fit" title="Help">
          <span
            className="text-white cursor-pointer"
            onClick={() => {
              if (window.Intercom) {
                window.Intercom('showNewMessage');
              } else {
                window.open('https://help.newtral.io', '_blank');
              }
            }}
          >
            <HelpCircleOutlineIcon />
          </span>
        </div>
      </div>

      <div
        className="w-full flex justify-center items-center py-20"
        style={{ minHeight: 'calc(100vh - 80px)' }}
      >
        {/* <div className="w-full h-full flex flex-col justify-center items-center"> */}
        <div className="w-[90%] sm:w-3/4 max-w-5xl">
          <p className="text-gray-300 text-xl font-medium mb-3 text-left w-full">
            Setup your account
          </p>

          {/* box card */}
          <div className="flex flex-col rounded-2xl shadow overflow-hidden min-h-[450px]">
            {/* top section */}
            <div className="w-full flex-1 flex flex-col gap-16 bg-gray-50 px-4 py-8 sm:px-8 ">
              <div className="">{children}</div>
            </div>

            {/* bottom section */}
            <div className="w-full bg-white flex flex-col-reverse gap-4 sm:flex-row justify-between items-center py-6 px-4 sm:px-8">
              <div>
                <img src="/images/poweredByNewtral.svg" alt="" />
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                {previousButtonProps && (
                  <Button
                    type="text"
                    className="font-semibold text-gray-600 w-full sm:w-auto"
                    onClick={previousButtonProps.onClick}
                    disabled={previousButtonProps.disabled || loading}
                  >
                    Back
                  </Button>
                )}
                <Button
                  className="btn-primary font-semibold w-full sm:w-auto"
                  onClick={nextButtonProps.onClick}
                  disabled={nextButtonProps.disabled}
                  loading={loading}
                >
                  {nextButtonProps.label || 'Next'}
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}

export default SelfServeOnboardingLayout;
