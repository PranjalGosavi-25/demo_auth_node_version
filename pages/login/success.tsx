import { Loader } from '@components/Common';
import onlyGuest from '@components/Hoc/onlyGuest';
import Login from '@components/Login/Login';
import { AuthService } from '@services/AuthService';
import { message } from 'antd';
import config from 'config';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';

function Page() {
  const router = useRouter();
  const token = router.query.token as string;
  const redirect = router.query.redirect as string;

  const { data, isLoading, error } = useQuery(
    [AuthService.LOGIN_SUCCESS, { token }],
    () => AuthService.loginSuccess({ token }),
    {
      enabled: !!token,
      onSettled(data, error) {
        if (error) {
          router.push('/login');
        } else if (data?.loginCompleted) {
          router.push(
            (redirect as string) ??
              (config.FRONTEND_URL.CARBON_NEWTRAL as string)
          );
        }
      }
    }
  );

  return <Loader fullScreen />;
}

export default onlyGuest(Page);
