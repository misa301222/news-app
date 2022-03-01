import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Start from '../components/Start/Start';

const Home: NextPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <Start />
  )
}

export default Home;
