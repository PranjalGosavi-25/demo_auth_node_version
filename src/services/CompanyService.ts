import config from '@config';
import {
  CompanyOnboardActionEnum,
  RegionEnum
} from '@enums/companyOnboardingEnum';
import { fetcher } from '@utils/fetcher';
import { queryFetcher } from '@utils/queryFetcher';

const { AUTH_SERVICE } = config.BACKEND_URL;

export class CompanyService {
  static CHECK_ONBOARDING_TOKEN_URL = `${AUTH_SERVICE}/company/checkOnboardingToken`;
  static GET_ONBOARD_COMPANY_FORM_DATA_URL = `${AUTH_SERVICE}/data/onboardCompanyFormData`;
  static COMPLETE_ONBOARDING_URL = `${AUTH_SERVICE}/company/completeOnboarding`;
  static GET_COMPANY_LOGO_BY_ORG_ID = `${AUTH_SERVICE}/company/getCompanyLogoByOrgId`;
  static VERIFY_COMPANY_INVITE_TOKEN = `${AUTH_SERVICE}/company/verifyCompanyInviteToken`;
  static UPDATE_COMPANY_BY_INVITE_TOKEN = `${AUTH_SERVICE}/company/updateCompanyByInviteToken`;
  static CHECK_COMPLETE_ONBOARDING = `${AUTH_SERVICE}/company/checkCompleteOnboarding`;
  static VERIFY_COMPANY_CONNECTION_TOKEN = `${AUTH_SERVICE}/company/verifyCompanyConnectionToken`;
  static MAKE_COMPANY_CONNECTION_BY_TOKEN = `${AUTH_SERVICE}/company/makeCompanyConnectionByToken`;
  static UPDATE_ONBOARDING_COMPANY_BY_TOKEN = `${AUTH_SERVICE}/company/updateOnboardingCompanyByInviteToken`;
  static UPDATE_SELF_SERVE_COMPANY_BY_TOKEN = `${AUTH_SERVICE}/company/updateSelfServeCompanyByToken`;
  static GET_SELF_SERVE_COMPANY_BY_TOKEN = `${AUTH_SERVICE}/company/getSelfServeCompanyByToken`;
  static COMPLETE_SELF_SERVE_COMPANY_ONBOARDING = `${AUTH_SERVICE}/company/completeSelfServeCompanyOnboarding`;

  static async checkOnboardingToken(token: string) {
    return await queryFetcher({
      url: CompanyService.CHECK_ONBOARDING_TOKEN_URL,
      params: {
        token
      }
    });
  }

  static async getOnboardCompanyFormData() {
    return await queryFetcher({
      url: CompanyService.GET_ONBOARD_COMPANY_FORM_DATA_URL
    });
  }

  static async completeOnboarding(payload: {
    companyName: string;
    userName: string;
    userPassword: string;
    token: string;
    industry: string;
    companySize: string;
    experienceInCarbonAccounting: string;
    template: string;
    countryCode?: string;
    locations?: string[];
  }) {
    return await fetcher({
      url: CompanyService.COMPLETE_ONBOARDING_URL,
      method: 'POST',
      data: payload
    });
  }

  static async getCompanyLogoByOrgId(orgId: string) {
    return await queryFetcher({
      url: CompanyService.GET_COMPANY_LOGO_BY_ORG_ID,
      params: {
        organizationId: orgId
      }
    });
  }

  static async verifyCompanyInviteToken(token: string) {
    return await queryFetcher({
      url: CompanyService.VERIFY_COMPANY_INVITE_TOKEN,
      params: {
        token
      }
    });
  }

  static async updateCompanyByInviteToken(payload: {
    token: string;
    action: CompanyOnboardActionEnum;
    companyName?: string;
    userName?: string;
    designation?: string;
    password?: string;
    sector?: string;
    industry?: string;
    subIndustry?: string;
    size?: string;
    billingInfo?: {
      businessName: string;
      gstNumber: string;
      billingAddress: string;
      zipCode: string;
      state: string;
      country: string;
      contactPersonName: string;
      contactPersonNumber: string;
      contactPersonEmail: string;
    };
    region?: RegionEnum;
  }) {
    return await fetcher({
      url: CompanyService.UPDATE_COMPANY_BY_INVITE_TOKEN,
      method: 'POST',
      data: payload
    });
  }

  static async checkCompleteOnboarding(payload: { token: string }) {
    return await fetcher({
      url: CompanyService.CHECK_COMPLETE_ONBOARDING,
      params: payload
    });
  }

  static async verifyCompanyConnectionToken(payload: { token: string }) {
    return await queryFetcher({
      url: CompanyService.VERIFY_COMPANY_CONNECTION_TOKEN,
      params: payload
    });
  }

  static async makeCompanyConnectionByToken(payload: {
    token: string;
    receiverCompanyId: string;
  }) {
    return await fetcher({
      url: CompanyService.MAKE_COMPANY_CONNECTION_BY_TOKEN,
      method: 'POST',
      data: payload
    });
  }

  static async updateOnboardingCompanyByToken(payload: {
    token: string;
    action: CompanyOnboardActionEnum;
    companyName?: string;
    userName?: string;
    dataHostingRegion?: RegionEnum;
    password?: string;
  }) {
    return await fetcher({
      url: CompanyService.UPDATE_ONBOARDING_COMPANY_BY_TOKEN,
      method: 'POST',
      data: payload
    });
  }

  static async updateSelfServeCompanyByToken(payload: {
    token: string;
    companyData: {
      name: string;
      dataHostingRegion: RegionEnum;
      size: string;
      subIndustry: string;
      revenue: number;
    };
  }) {
    return await fetcher({
      url: CompanyService.UPDATE_SELF_SERVE_COMPANY_BY_TOKEN,
      method: 'POST',
      data: payload
    });
  }

  static async getSelfServeCompanyByToken(token: string) {
    return await queryFetcher({
      url: CompanyService.GET_SELF_SERVE_COMPANY_BY_TOKEN,
      params: {
        token
      }
    });
  }

  static async completeSelfServeCompanyOnboarding(payload: { token: string }) {
    return await fetcher({
      url: CompanyService.COMPLETE_SELF_SERVE_COMPANY_ONBOARDING,
      method: 'POST',
      data: payload
    });
  }
}
