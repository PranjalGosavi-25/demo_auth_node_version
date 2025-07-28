import { Button } from 'antd';
import React from 'react';

function VCPOnboardingLayout(props: {
  children: React.ReactNode;
  title?: string;
  description?: string;
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
    <div className="linear-gradient h-screen w-screen flex justify-center items-center">
      <div className="max-w-7xl w-[90%] sm:w-4/5 h-4/5 flex flex-col rounded-2xl shadow overflow-hidden">
        {/* top section */}
        <div className="w-full flex-1 flex flex-col gap-16 overflow-auto bg-gray-50 px-4 py-8 sm:px-8">
          <div>
            <p className="text-gray-700 font-semibold text-xl sm:text-3xl mb-1">
              {props.title || 'Create a New Account'}
            </p>
            {props.description && (
              <p className="text-gray-700">{props.description}</p>
            )}
          </div>

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
  );
}

export default VCPOnboardingLayout;
