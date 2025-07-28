import onlyGuest from '@components/Hoc/onlyGuest';
import OTPVerification from '@components/Login/OTPVerification';
import React from 'react';

function Page() {
  return <OTPVerification />;
}

export default onlyGuest(Page);
