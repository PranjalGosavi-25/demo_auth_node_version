import React from 'react';

function LoginBanner() {
  return (
    <div className="w-[60%] hidden sm:block">
      <div className="bg-[url('/images/bg-img.jpg')] bg-no-repeat lg:px-32 px-20  bg-cover h-full pt-28 ">
        <img src="/images/Stars.svg" alt="" />
        <p className="lg:text-7xl text-5xl font-medium text-white mt-12 mb-6">
          Start your <br /> sustainability <br /> journey with <br /> Newtral.
        </p>
        <p className="text-primary-200 text-xl font-medium">
          Empower your Sustainability team with Newtral.
        </p>
      </div>
    </div>
  );
}

export default LoginBanner;
