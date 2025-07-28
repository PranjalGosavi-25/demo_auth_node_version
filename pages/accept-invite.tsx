import { useRouter } from 'next/router';
import onlyGuest from '@components/Hoc/onlyGuest';
import { useEffect, useMemo, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { AuthService } from '@services/AuthService';
import { Loader } from '@components/Common';
import { ErrorState } from '@components/AcceptInvite/ErrorState';
import { SuccessState } from '@components/AcceptInvite/SuccessState';
import DefaultState from '@components/AcceptInvite/DefaultState';

function AcceptInvitePage() {
  const router = useRouter();
  const [status, setStatus] = useState<
    'loading' | 'active' | 'inActive' | 'error'
  >('loading');
  const [tokenData, setTokenData] = useState({} as any);

  const token = router.query.token as string;
  useEffect(() => {
    if (router.isReady) {
      if (!token) {
        setStatus('error');
      } else {
        try {
          // const decoded = jwtDecode(token);

          handleVerifyUser(token);
        } catch (err) {
          setStatus('error');
        }
      }
    }
  }, [router.query]);

  async function handleVerifyUser(token: string) {
    const { data, error } = await AuthService.verifyUser({ token });

    if (error) {
      setStatus('error');
    } else {
      setTokenData(data);
      if (data?.isVerified) {
        if (data.isOnboarded) {
          // Done
          setStatus('active');
        } else {
          // New password
          setStatus('inActive');
        }
      } else {
        setStatus('inActive');
      }
    }
  }

  return (
    <>
      {status === 'loading' && <Loader fullScreen />}
      {status === 'active' && <SuccessState />}
      {status === 'inActive' && (
        <DefaultState
          token={token}
          // markSuccess={markSuccess}
          // markFailed={markFailed}
          tokenData={tokenData}
          setTokenData={setTokenData}
        />
      )}
      {status === 'error' && <ErrorState />}
    </>
  );
}

export default onlyGuest(AcceptInvitePage);
