import { getSession } from "next-auth/react";
import ExplorePublish from "../../components/Publish/ExplorePublish";

function ExplorePublishPage({ articles }: any) {
    return <ExplorePublish data={articles} />
}

export async function getServerSideProps(context: any) {
    const session = await getSession({ req: context.req });
    const { req } = context;
    const { cookie } = req.headers;

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

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

export default ExplorePublishPage;