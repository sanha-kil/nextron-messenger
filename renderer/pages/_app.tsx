import React from 'react';
import type { AppProps } from 'next/app';
import GlobalStyle from '../styles/GlobalStyles';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}

export default App;
