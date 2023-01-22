import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { Poppins } from '@next/font/google'
import { AlertProvider, UIThemeProvider, createTheme } from '@interads/ui'

const inter = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const light = createTheme({
  fontFamily: inter.style.fontFamily,
  palette: {
    primary: '#1E1E24',
    secondary: '#FF7F27',
  },
  alert: {
    root: {
      borderRadius: '1px',
    },
  },
})
export default function App({ Component, pageProps }: AppProps) {
  return (
    <UIThemeProvider theme={light}>
      <AlertProvider>
        <Component {...pageProps} />
      </AlertProvider>
    </UIThemeProvider>
  )
}
