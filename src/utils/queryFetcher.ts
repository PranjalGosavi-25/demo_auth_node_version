import axios from 'axios';

export const queryFetcher = async (payload: {
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

    return response.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};
