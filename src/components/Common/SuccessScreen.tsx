import { HelpCircleOutlineIcon, CheckCircleOutlineIcon } from '@components/Icons';
import React from 'react';
import { FeaturedIcon } from './FeaturedIcon';
import { Button } from 'antd';
import { CALCOM_LINKS } from '@constants/common';

function SuccessScreen(props: {
  successMessage: string;
  primaryBtnProps?: {
    label: string;
    onClick: () => void;
    loading?: boolean;
  };
  secondaryBtnProps?: {
    label: string;
    onClick: () => void;
    loading?: boolean;
  };
  cardTitle?: string;
  cardDescription?: string;
}) {
  const {
    successMessage,
    primaryBtnProps = {
      label: 'Schedule Demo',
      onClick: () => {
        window.open(CALCOM_LINKS.newtral, '_blank');
      }
    },
    secondaryBtnProps = {
      label: 'Contact Sales',
      onClick: () => {
        window.open(CALCOM_LINKS.newtral, '_blank');
      }
    },
    cardTitle = 'Need help with ESG Data Submission?',
    cardDescription = 'Newtral AI can help you automate your sustainability practices across carbon accounting, ESG compliances, Science-based Target Setting and Emission Reduction.'
  } = props;

  return (
    <div className="bg-dark-gradient h-screen w-screen">
      <div className="flex justify-between items-center w-full px-8 py-4 max-w-[1680px] mx-auto">
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
        className="flex justify-center items-center px-8 py-16"
        style={{ height: 'calc(100vh - 72px)' }}
      >
        <div className="w-full md:w-4/5 max-w-7xl flex flex-col items-center">
          <FeaturedIcon
            icon={CheckCircleOutlineIcon}
            color="gray"
            size={'lg'}
            variant={'double-circle-dark'}
          />
          <p className="text-white text-2xl font-medium mt-8 mb-11 text-center">
            {successMessage}
          </p>
          <div className="flex w-full">
            <div className="rounded-2xl overflow-hidden p-4 md:p-8 bg-gray-100 flex-1">
              <p className="text-gray-900 text-xl font-medium">{cardTitle}</p>
              <p className="text-gray-600 text-sm mt-2 mb-6">
                {cardDescription}
              </p>
              <div className="flex gap-4 flex-col md:flex-row">
                <Button
                  className="btn-secondary font-medium"
                  onClick={primaryBtnProps.onClick}
                >
                  {primaryBtnProps.label}
                </Button>
                <Button
                  className="btn-link-primary font-medium"
                  onClick={secondaryBtnProps.onClick}
                >
                  {secondaryBtnProps.label}
                </Button>
              </div>
            </div>
            {/* <div className="rounded-2xl overflow-hidden bg-primary-50 hidden lg:block">
              <img
                src="/images/avatar.png"
                alt=""
                className="object-cover w-full h-full"
              />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessScreen;
