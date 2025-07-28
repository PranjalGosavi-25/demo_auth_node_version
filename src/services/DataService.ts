import { queryFetcher } from '@utils/queryFetcher';
import config from '@config';

const { CORE_SERVICE } = config.BACKEND_URL;

export class DataService {
  static GET_COUNTRIES = `${CORE_SERVICE}/data/getCountries`;
  static GET_CITIES = `${CORE_SERVICE}/data/getCities`;

  static async getCountries() {
    return queryFetcher({
      url: this.GET_COUNTRIES
    });
  }

  static async getCities(payload: {
    page: number;
    size: number;
    searchKeyword: string | undefined;
    countryCode?: string | undefined;
  }) {
    return queryFetcher({
      url: this.GET_CITIES,
      params: payload
    });
  }
}
