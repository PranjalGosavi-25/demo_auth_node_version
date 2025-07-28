import TrustedBy from '@components/Common/TrustedBy';
import { CALCOM_LINKS } from '@constants/common';
import { Button, Divider } from 'antd';
import { ArrowUpRightOutlineIcon, HelpCircleOutlineIcon } from '@components/Icons';
import React from 'react';

function LoginSignUpLayoutV2(props: {
  children: React.ReactNode;
  showScheduleMeeting?: boolean;
  rootClassName?: string;
}) {
  const { children, showScheduleMeeting, rootClassName } = props;
  return (
    <div className="h-screen sm:flex block bg-dark-gradient">
      <div className="bg-gray-50 flex justify-between items-center w-full px-8 py-4 h-20 max-w-[1680px] mx-auto sticky top-0 z-10 sm:hidden">
        <div>
          <img src="/images/newtral-text-logo.svg" alt="" />
        </div>
        <div className="flex items-center w-fit" title="Help">
          <span
            className="text-gray-900 cursor-pointer"
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
      <section className="bg-transparent w-3/5 p-16 pr-0 sm:flex flex-col justify-between hidden">
        <div>
          <div className="mb-14">
            <img src="/images/newtral-white.svg" alt="" />
          </div>
          <p className="text-primary-light-gradient text-[40px] font-medium">
            The only sustainability <br /> platform you’ll ever need
          </p>
        </div>

        <div>
          {showScheduleMeeting && (
            <div>
              <p className="text-gray-300 text-lg mb-1.5">
                Interested in Free 1:1 Consultation?
              </p>
              <div
                className="flex items-center gap-3 cursor-pointer w-fit"
                onClick={() => {
                  window.open(CALCOM_LINKS.newtral, '_blank');
                }}
              >
                <p className="text-white text-lg font-semibold ">
                  Schedule Meeting
                </p>
                <ArrowUpRightOutlineIcon className="w-5 h-5 text-white" />
              </div>
            </div>
          )}
          <Divider className="border-gray-300 my-9" />
          <TrustedBy bgColor="bg-transparent" />
        </div>
      </section>
      <section
        className={`bg-gray-50 border w-full sm:w-2/5 sm:rounded-l-2xl rounded-none h-full ${
          rootClassName || ''
        }`}
      >
        {children}
      </section>
    </div>
  );
}

export default LoginSignUpLayoutV2;
