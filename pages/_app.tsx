import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthUserProvider } from '../config/hook/auth'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthUserProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthUserProvider>
  )
}

export default MyApp
