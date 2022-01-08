import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import 'nprogress/nprogress.css';
import 'src/assets/nprogress.css';
import NProgress from 'nprogress';
import router from 'next/router';

import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { SnackbarProvider } from 'notistack';
import { CacheProvider } from '@emotion/react';
import useSettings from 'src/hooks/useSettings';
import { createTheme } from 'src/theme';
import createEmotionCache from 'src/createEmotionCache';
import GlobalStyles from 'src/components/GlobalStyles';
import { AuthProvider } from 'src/contexts/JWTContext';
import store from 'src/store';
import 'src/__mocks__';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const EmptyLayout = ({ children }) => <>{children}</>;
export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const { settings } = useSettings();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => {
      setLoading(true);
      NProgress.start();
    };
    const end = () => {
      setLoading(false);
      NProgress.done();
    };
    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeComplete', end);
    router.events.on('routeChangeError', end);
    return () => {
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeComplete', end);
      router.events.off('routeChangeError', end);
    };
  }, []);

  const theme = createTheme({
    direction: settings.direction,
    responsiveFontSizes: settings.responsiveFontSizes,
    roundedCorners: settings.roundedCorners,
    theme: settings.theme
  });

  const Layout = Component.Layout || EmptyLayout;

  return (
    <CacheProvider value={emotionCache}>
      <ReduxProvider store={store}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <SnackbarProvider dense maxSnack={3}>
              <AuthProvider>
                <GlobalStyles />
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </AuthProvider>
            </SnackbarProvider>
          </ThemeProvider>
        </LocalizationProvider>
      </ReduxProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired
};
