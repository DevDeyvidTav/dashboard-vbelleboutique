import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';


export default function App({ Component, pageProps }: AppProps) {
  return <Theme>
    <Component {...pageProps} />
    <ToastContainer />
  </Theme>
}
