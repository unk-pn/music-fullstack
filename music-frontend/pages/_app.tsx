import React from 'react';
import { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import './global.css'
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
// import { ThemeProvider, createTheme } from '@mui/material/styles';

// const darkTheme = createTheme({
//   palette: {
//     mode: 'dark',
//   },
// });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <MantineProvider defaultColorScheme="dark" >
        {/* <ThemeProvider theme={darkTheme}> */}
          <Component {...pageProps} />
        {/* </ThemeProvider> */}
      </MantineProvider> 
    </RecoilRoot>
  );
}

export default MyApp;