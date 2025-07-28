import onlyGuest from '@components/Hoc/onlyGuest';
import { WSupplierOnboarding } from '@components/Onboarding/WSupplierOnboarding/WSupplierOnboarding';

const OrganizationOnboardingPage = () => {
  return <WSupplierOnboarding />;
};

export default onlyGuest(OrganizationOnboardingPage);
