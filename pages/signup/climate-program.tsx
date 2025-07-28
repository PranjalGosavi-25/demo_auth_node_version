import { Loader } from '@components/Common';
import onlyGuest from '@components/Hoc/onlyGuest';
import ClimateProgramSignUp from '@components/SignUp/ClimateProgramSignUp';
import SignUp from '@components/SignUp/SignUp';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

function Page() {
  const router = useRouter();
  useEffect(() => {
    router.push('/login');
  }, []);

  return <Loader fullScreen />;
  // return <ClimateProgramSignUp />;
}

export default onlyGuest(Page);
