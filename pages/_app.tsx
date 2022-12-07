import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"

import { ThemeProvider, CssBaseline } from '@mui/material';

import { lightTheme } from '../themes';
import { SWRConfig } from 'swr';
import { AuthProvider, CartProvider, UIProvider } from '../contexts';

import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <SWRConfig value={{
        fetcher: (...args: [key: string]) => fetch(...args).then(res => res.json()),
      }}>
        <AuthProvider>
          <CartProvider>
            <UIProvider>
              <ThemeProvider theme={lightTheme}>
                <CssBaseline />
                <Component {...pageProps} />
              </ThemeProvider>
            </UIProvider>
          </CartProvider>
        </AuthProvider>
      </SWRConfig>
    </SessionProvider >
  )
}
