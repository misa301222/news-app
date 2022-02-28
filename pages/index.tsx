import { Box, Button, Input } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Link from 'next/link'
import { SyntheticEvent, useState } from 'react'
import { useAuth } from '../config/hook/auth'

const Home: NextPage = () => {

  return (
    <div>
      <Link href={`/signIn`}>
        <Button>
          Go to SignIn
        </Button>
      </Link>

      <Link href={`/login`}>
        <Button>
          Go to LogIn
        </Button>
      </Link>
    </div>

  )
}

export default Home
