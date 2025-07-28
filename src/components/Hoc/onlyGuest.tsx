import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@redux/hooks';
import config from 'config';

// Hoc for Guest Routes
const onlyGuest = (Component: React.FunctionComponent) => {
  const Auth = (props: any) => {
    //checking if user is authenticated
    const { isAuthenticated } = useAppSelector((state) => state.auth);

    // Loading State
    const [loading, setLoading] = useState(true);

    // Redirecting to carbon.newtral.io if user is authenticated
    useEffect(() => {
      if (isAuthenticated) {
        window.location.href = config.FRONTEND_URL.CARBON_NEWTRAL;
      } else {
        setLoading(false);
      }
    }, [isAuthenticated]);

    // If user is logged in, return original component
    return !loading && <Component {...props} />;
  };

  return Auth;
};

export default onlyGuest;
