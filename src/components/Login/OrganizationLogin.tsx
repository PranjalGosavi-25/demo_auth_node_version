import React, { useEffect, useState } from 'react';
import { CompanyService } from '@services/CompanyService';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { Loader } from '@components/Common';
import OrganizationForgetPassword from './OrganizationForgetPassword';
import DarkGradientLayout from '@components/Common/DarkGradientLayout';
import OrgnisationLoginForm from './OrgnisationLoginForm';

export enum LoginTabsEnum {
  LOGIN = 'login',
  FORGET_PASSWORD = 'forgetPassword'
}

function OrganizationLogin() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(LoginTabsEnum.LOGIN) as any;

  useEffect(() => {
    if (router.query.form) {
      setActiveTab(router.query.form as any);
    } else {
      setActiveTab(LoginTabsEnum.LOGIN);
    }
  }, [router.query.form]);

  const { data, error, isLoading } = useQuery(
    [
      CompanyService.getCompanyLogoByOrgId,
      { organizationId: router.query.organizationId }
    ],
    () =>
      CompanyService.getCompanyLogoByOrgId(
        router.query.organizationId as string
      ),
    { enabled: !!router.query.organizationId }
  );

  if (isLoading) {
    return <Loader />;
  }

  function handleChangeTab(tab: string) {
    setActiveTab(tab);
    router.push({
      query: {
        ...router.query,
        form: tab
      }
    });
  }

  return (
    <DarkGradientLayout>
      <div className="flex flex-col items-center">
        {data?.logoUrl && (
          <div className="w-full flex justify-center items-center my-4">
            <img src={data?.logoUrl} alt="" className="h-20 object-contain" />
          </div>
        )}

        <div className="flex flex-col items-start p-9 gap-8 max-w-md sm:min-w-[400px] bg-white border border-solid border-gray-300 rounded-xl">
          <div className="">
            <p className="text-gray-900 text-3xl font-semibold">
              {activeTab == LoginTabsEnum.LOGIN ? 'Sign In' : 'Forgot Password'}
            </p>
            <p className="text-gray-600 text-base mt-3">{data?.companyName}</p>
          </div>
          <div className="w-full">
            {activeTab == LoginTabsEnum.LOGIN && (
              <OrgnisationLoginForm setActiveTab={handleChangeTab} />
            )}

            {activeTab == LoginTabsEnum.FORGET_PASSWORD && (
              <OrganizationForgetPassword
                setActiveTab={handleChangeTab}
                setEmailSent={() => {}}
              />
            )}
          </div>
          <div>
            <p className="text-gray-600 font-inter font-normal text-sm">
              Need Assistance? <br /> Contact{' '}
              <a
                href="mailto:support@newtral.io"
                className="text-primary-700 font-inter font-semibold text-sm no-underline"
              >
                support@newtral.io
              </a>
            </p>
          </div>
        </div>

        <div className="w-full flex justify-center items-center flex-col gap-2 py-4">
          <img src="/images/poweredByNewtral.svg" alt="" className="w-40" />
        </div>
      </div>
    </DarkGradientLayout>
  );
}

export default OrganizationLogin;
