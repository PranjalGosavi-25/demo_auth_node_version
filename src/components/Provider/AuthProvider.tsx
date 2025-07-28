import { useEffect, useState } from 'react';

import { Loader } from '@components/Common';
import { AuthService } from '@services/AuthService';
import { useRouter } from 'next/router';
import { useAppDispatch } from '@redux/hooks';
import { login } from '@redux/auth';
import config from '@config';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const initializeAuth = async () => {
    const { data, error } = await AuthService.getCurrentUser();

    if (data) {
      dispatch(login(data));
    }

    setLoading(false);
  };

  useEffect(() => {
    initializeAuth();
  }, []);

  useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      //@ts-ignore
      if (window?.analytics) {
        //@ts-ignore
        window.analytics.page();
      }
    });

    return () => {
      router.events.off('routeChangeComplete', () => {});
    };
  }, [router.events]);

  if (loading) {
    return <Loader fullScreen />;
  }

  return <>{children}</>;
};
