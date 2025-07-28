import { State } from '@components/Common';
import { Loader } from '@components/Common';
import DarkGradientLayout from '@components/Common/DarkGradientLayout';
import LoginSignUpLayoutV2 from '@components/Common/LoginSignupLayoutV2';
import { LoginActionEnum } from '@enums/authEnum';
import { StateEnum } from '@enums/common';
import { AuthService } from '@services/AuthService';
import { Tag, message } from 'antd';
import config from 'config';
import { ArrowRightOutlineIcon } from '@components/Icons';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useQuery } from 'react-query';

export function SelectCompanyScreen() {
  const router = useRouter();
  const { token, redirect } = router.query;
  const [loading, setLoading] = useState(false);

  const { data, isLoading, error } = useQuery(
    [AuthService.GET_USER_COMPANIES_BY_TOKEN, { token }],
    () => AuthService.getUserCompaniesByToken({ token: token as string }),
    {
      enabled: !!token
    }
  );

  async function handleLoginWithCompany(companyId: any) {
    setLoading(true);
    const { data, error } = await AuthService.loginWithCompany({
      token: token as string,
      companyId
    });

    if (error) {
      message?.error(error?.message || 'Something went wrong');
    } else {
      if (data?.loginCompleted) {
        router.push(
          (redirect as string) ?? (config.FRONTEND_URL.CARBON_NEWTRAL as string)
        );
      } else if (data?.action == LoginActionEnum.MFA) {
        router.push(`/login/otp-verification?token=${data.token}`);
      }
    }

    setLoading(false);
  }

  if (isLoading) {
    return <Loader />;
  }

  if (error || !token) {
    return (
      <State
        state={StateEnum.Error}
        title={'Unauthorized Access'}
        description={
          'You are not authorized to access this page. Please contact your administrator for more information.'
        }
        backToLoginUrl="/login"
      />
    );
  }

  return (
    <LoginSignUpLayoutV2>
      <div className="flex justify-center items-center w-full h-full">
        <div className="w-4/5 lg:w-3/5 h-fit">
          <div className="flex flex-col items-start text-start mb-8">
            <h1 className="text-gray-700 font-inter font-semibold text-md">
              Your Accounts
            </h1>
            <p className="text-gray-500 font-inter font-medium text-lg">
              {data?.companyList?.length} Accounts are assigned to you
            </p>
          </div>

          {/* Company list */}
          <div className="flex flex-col gap-4 p-4 overflow-auto max-h-96 border border-solid border-gray-200 rounded-xl">
            {data?.companyList?.map((company: any) => {
              return (
                <div
                  key={company.id}
                  className={`p-4 cursor-pointer`}
                  style={{
                    borderRadius: '8px',
                    border: '1px solid var(--gray-200, #E8E9EF)',
                    display: 'grid',
                    gridTemplateColumns: 'auto 40px',
                    gap: '8px'
                  }}
                  onClick={() => {
                    // if (company.user.isActive) {
                    handleLoginWithCompany(company._id);
                    // }
                  }}
                >
                  <div className="flex flex-col gap-2">
                    <p className={`text-gray-900 font-medium text-xl`}>
                      {company.name}
                    </p>

                    {/* <div className="flex items-center gap-2">
                        {company.user?.modules?.map(
                          (moduleData: any, index: number) => {
                            return (
                              <div
                                key={index}
                                className="rounded-xl bg-gray-100 mix-blend-multiply w-fit px-2.5 py-1"
                              >
                                <p className="text-gray-700 text-center font-inter font-medium text-xs leading-4">
                                  {moduleData?.moduleRoleId?.name}
                                </p>
                              </div>
                            );
                          }
                        )}
                        {company.user.isActive && (
                          <Tag
                            className={`w-fit text-xs rounded-xl`}
                            color="error"
                          >
                            Deactivated
                          </Tag>
                        )}
                      </div> */}
                  </div>
                  <div className={`flex items-center`}>
                    <ArrowRightOutlineIcon
                      className="text-gray-600"
                      size={20}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </LoginSignUpLayoutV2>
  );
}

export default SelectCompanyScreen;
