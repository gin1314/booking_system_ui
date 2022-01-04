import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
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
import 'src/__mocks__';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const { settings } = useSettings();

  const theme = createTheme({
    direction: settings.direction,
    responsiveFontSizes: settings.responsiveFontSizes,
    roundedCorners: settings.roundedCorners,
    theme: settings.theme
  });

  return (
    <CacheProvider value={emotionCache}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <SnackbarProvider dense maxSnack={3}>
            <AuthProvider>
              <GlobalStyles />
              <Component {...pageProps} />
            </AuthProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired
};
