import onlyGuest from '@components/Hoc/onlyGuest';
import OrganisationOTPVerification from '@components/Login/OrganisationOTPVerification';
import React from 'react';

function Page() {
  return <OrganisationOTPVerification />;
}

export default onlyGuest(Page);
