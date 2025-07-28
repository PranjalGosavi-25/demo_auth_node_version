import type { AppProps } from 'next/app';
import { ConfigProvider } from 'antd';
import { antdTheme } from 'frontend-utils';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';

import 'antd/dist/reset.css';
import '@styles/globals.scss';
import 'frontend-utils/styles/styles.scss';
import '@utils/axiosInterceptor';

import { AuthProvider } from '@components/Provider';
import { store } from '@redux/store';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false
    }
  }
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ConfigProvider
          theme={{
            token: antdTheme.token
          }}
        >
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </ConfigProvider>
      </Provider>
    </QueryClientProvider>
  );
}
