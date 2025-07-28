import { Loader } from '@components/Common';
import { useAppSelector } from '@redux/hooks';
import config from 'config';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function Home() {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = config.FRONTEND_URL.CARBON_NEWTRAL;
    } else {
      router.push('/login');
    }
  }, [isAuthenticated]);

  return <Loader fullScreen />;
}

export default Home;
