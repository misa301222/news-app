import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import Layout from '../components/NavBar/Layout'
import { SessionProvider } from 'next-auth/react'
import { motion } from 'framer-motion';

function MyApp({ Component, pageProps: { session, ...pageProps }, router }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider>
        <Layout>
          <motion.div key={router.route} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7 }}>
            <Component {...pageProps} />
          </motion.div>
        </Layout>
      </ChakraProvider>
    </SessionProvider>
  )
}

export default MyApp
