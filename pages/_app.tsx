import type { AppProps } from 'next/app'
import { ThemeProvider, CssBaseline } from '@mui/material';

import { lightTheme } from '../themes';
import '../styles/globals.css'
import { SWRConfig } from 'swr';
import { UIProvider } from '../contexts';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{
      fetcher: (...args: [key: string]) => fetch(...args).then(res => res.json()),
    }}>
      <UIProvider>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </UIProvider>
    </SWRConfig>
  )
}
