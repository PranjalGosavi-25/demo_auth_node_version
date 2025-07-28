import { Loader } from '@components/Common';
import onlyGuest from '@components/Hoc/onlyGuest';
import SignUp from '@components/SignUp/SignUp';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

function Page() {
  const router = useRouter();
  useEffect(() => {
    router.push('/login');
  }, []);

  // return <SignUp />;
  return <Loader fullScreen />;
}

export default onlyGuest(Page);
