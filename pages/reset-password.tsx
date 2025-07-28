import onlyGuest from '@components/Hoc/onlyGuest';
import DefaultState from '@components/ResetPassword/DefaultState';
import { ErrorState } from '@components/ResetPassword/ErrorState';
import { SuccessState } from '@components/ResetPassword/SuccessState';
import { Loader } from '@components/Common';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function ResetPasswordPage() {
  const router = useRouter();
  const [status, setStatus] = useState<
    'loading' | 'default' | 'error' | 'success'
  >('loading');
  const [token, setToken] = useState('');

  useEffect(() => {
    if (router.isReady) {
      const token = router.query.token as string;

      if (!token) {
        setStatus('error');
      } else {
        try {
          const decoded = jwtDecode(token);

          setToken(token);
          setStatus('default');
        } catch (err) {
          setStatus('error');
        }
      }
    }
  }, [router.query]);

  function markSuccess() {
    setStatus('success');
  }

  function markFailed() {
    setStatus('error');
  }

  return (
    <>
      {status == 'default' && (
        <DefaultState
          markSuccess={markSuccess}
          markFailed={markFailed}
          token={token}
        />
      )}
      {status == 'loading' && <Loader />}
      {status == 'error' && <ErrorState />}
      {status == 'success' && <SuccessState />}
    </>
  );
}

export default onlyGuest(ResetPasswordPage);
