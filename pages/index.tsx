import type { NextPage } from 'next'
import { getSession } from 'next-auth/react';
import Start from '../components/Start/Start';

const Home: NextPage = ({ articles }: any) => {

  return (
    <Start data={articles} />
  )
}

export async function getServerSideProps(context: any) {
  const { req } = context;
  const { cookie } = req.headers;

  const [responseArticles] = await Promise.all([
    fetch(`${process.env.NEXTAUTH_URL}/api/article/getArticleByDateCreatedLastTwenty/articleAPI`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookie
      },
    })
  ]);

  const [responseA] = await Promise.all([
    responseArticles.json()
  ]);

  return { props: { articles: responseA } }
}

export default Home;
