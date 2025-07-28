import LoginBanner from '@components/Login/LoginBanner';
import React from 'react';

function LoginSignUpLayout(props: {
  heading?: string;
  children: React.ReactNode;
  description?: string;
  showLogo?: boolean;
}) {
  const { heading, children, description, showLogo = true } = props;
  return (
    <div className="flex h-screen">
      <LoginBanner />

      <div className="sm:w-2/5 md:w-1/2 w-full lg:px-16 px-8 sm:py-0 py-10 my-auto flex flex-col gap-8">
        {showLogo && (
          <div>
            <img
              src="/images/newtral-logo.svg"
              alt="Newtral"
              className="h-20 object-contain"
            />
          </div>
        )}

        <div className="">
          {heading && (
            <p className="text-gray-900 text-3xl font-semibold">{heading}</p>
          )}
          {(description && (
            <p className="text-gray-600 text-base mt-3">{description}</p>
          )) || <></>}
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default LoginSignUpLayout;
