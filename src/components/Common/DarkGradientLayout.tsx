import { HelpCircleOutlineIcon } from '@components/Icons';
import React from 'react';

function DarkGradientLayout(props: {
  children: React.ReactNode;
  header?: React.ReactNode;
}) {
  const { children } = props;
  return (
    <div className="bg-dark-gradient h-screen w-screen overflow-auto">
      <div className="sticky top-0 bg-black z-10">
        <div className="flex justify-between items-center w-full px-8 py-4 h-20 max-w-[1680px] mx-auto">
          <div>
            <img src="/images/newtral-white.svg" alt="" />
          </div>
          <div className="flex items-center gap-4 w-fit" title="Help">
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
        </div>
      </div>

      <div
        className="w-full flex justify-center items-center py-20"
        style={{ minHeight: 'calc(100vh - 80px)' }}
      >
        <div className="w-[90%] sm:w-3/4 max-w-5xl">
          <div className="">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default DarkGradientLayout;
