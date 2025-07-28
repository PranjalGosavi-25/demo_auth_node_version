import { fetcher } from '@utils/fetcher';
import config from '@config';
import { LoginActionEnum } from '@enums/authEnum';
import { queryFetcher } from '@utils/queryFetcher';

const { AUTH_SERVICE } = config.BACKEND_URL;

export class AuthService {
  static COMPLETE_USER_ONBOARDING = `${AUTH_SERVICE}/users/completeUserOnboarding`;
  static RESEND_OTP = `${AUTH_SERVICE}/auth/resendOtp`;
  static LOGIN = `${AUTH_SERVICE}/auth/login`;
  static LOGIN_WITH_OTP = `${AUTH_SERVICE}/auth/loginWithOtp`;
  static LOGIN_WITH_COMPANY = `${AUTH_SERVICE}/auth/loginWithCompany`;
  static GET_USER_COMPANIES_BY_TOKEN = `${AUTH_SERVICE}/auth/getUserCompaniesByToken`;
  static GET_OTP_USER_DATA_BY_TOKEN = `${AUTH_SERVICE}/auth/getOtpUserDataByToken`;
  static GOOGLE_OAUTH_LOGIN = `${AUTH_SERVICE}/auth/login/oauth/google`;
  static LOGIN_SUCCESS = `${AUTH_SERVICE}/auth/loginSuccess`;
  static PARTNER_PROGRAM_SIGNUP = `${AUTH_SERVICE}/auth/partnerProgramSignup`;

  static async getCurrentUser() {
    return await fetcher({
      url: `${AUTH_SERVICE}/users/me`
    });
  }

  static async login(payload: {
    emailId: string;
    password: string;
    rememberMe: boolean;
    orgId?: string;
  }) {
    return await fetcher({
      url: `${AUTH_SERVICE}/auth/login`,
      method: 'POST',
      data: payload
    });
  }

  static async logout() {
    return await fetcher({
      url: `${AUTH_SERVICE}/auth/logout`
    });
  }

  static async refreshAccessToken() {
    return await fetcher({
      url: `${AUTH_SERVICE}/auth/refreshToken`
    });
  }

  static async forgotPassword(payload: { emailId: string }) {
    const { emailId } = payload;

    return await fetcher({
      url: `${AUTH_SERVICE}/auth/forgotPassword`,
      method: 'POST',
      data: {
        emailId
      }
    });
  }

  static async verifyUser(payload: {
    token: string;
    password?: string;
    designation?: string;
  }) {
    const { token, password, designation } = payload;

    return await fetcher({
      url: `${AUTH_SERVICE}/users/verifyUser`,
      method: 'POST',
      data: {
        token,
        userPassword: password,
        designation
      }
    });
  }

  static async completeUserOnboarding(payload: { token: string }) {
    const { token } = payload;

    return await fetcher({
      url: this.COMPLETE_USER_ONBOARDING,
      method: 'POST',
      data: {
        token
      }
    });
  }

  static async resetPassword(payload: { token: string; password: string }) {
    const { token, password } = payload;

    return await fetcher({
      url: `${AUTH_SERVICE}/auth/resetPassword`,
      method: 'POST',
      data: {
        token,
        password
      }
    });
  }

  static async resendOtp(payload: { token: string }) {
    return await fetcher({
      url: this.RESEND_OTP,
      method: 'POST',
      data: payload
    });
  }

  static async loginWithOtp(payload: { token: string; otp: string }) {
    return await fetcher({
      url: this.LOGIN_WITH_OTP,
      method: 'POST',
      data: payload
    });
  }

  static async loginWithCompany(payload: { token: string; companyId: string }) {
    return await fetcher({
      url: this.LOGIN_WITH_COMPANY,
      method: 'POST',
      data: payload
    });
  }

  static async getUserCompaniesByToken(payload: { token: string }) {
    return await queryFetcher({
      url: this.GET_USER_COMPANIES_BY_TOKEN,
      params: payload
    });
  }

  static async getOtpUserDataByToken(payload: { token: string }) {
    return await queryFetcher({
      url: this.GET_OTP_USER_DATA_BY_TOKEN,
      params: payload
    });
  }

  static async loginSuccess(payload: { token: string }) {
    return await queryFetcher({
      url: this.LOGIN_SUCCESS,
      params: payload
    });
  }

  static async partnerProgramSignup(payload: { emailId: string }) {
    return await fetcher({
      url: this.PARTNER_PROGRAM_SIGNUP,
      method: 'POST',
      data: payload
    });
  }
}
