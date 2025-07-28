import axios from 'axios';

export const fetcher = async (payload: {
  url: string;
  method?: string;
  data?: any;
  params?: any;
}) => {
  try {
    const { url, method = 'GET', data, params } = payload;

    const response = await axios({
      method,
      url,
      data,
      params,
      withCredentials: true
    });
    return {
      data: response.data,
      error: null
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.response?.data || true
    };
  }
};
