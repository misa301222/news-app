import { getSession } from "next-auth/react";
import ShowArticle from "../../components/Article/ShowArticle";

function ShowArticlePage({ article, user }: any) {
    return <ShowArticle data={{ article, user }} />;
}

export async function getServerSideProps(context: any) {
    const session = await getSession({ req: context.req });
    const { req } = context;
    const { cookie } = req.headers;

    const { articleId } = context.params;

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    const [responseArticle] = await Promise.all([
        fetch(`${process.env.NEXTAUTH_URL}/api/article/getArticleByArticleId/${articleId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            },
        }),
    ])

    const [articleR] = await Promise.all([
        responseArticle.json()
    ]);

    let { createdBy } = articleR;

    const [responseUser] = await Promise.all([
        fetch(`${process.env.NEXTAUTH_URL}/api/user/getUserByEmail/${createdBy}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            },
        }),
    ])

    const [userR] = await Promise.all([
        responseUser.json()
    ]);

    return { props: { article: articleR, user: userR } }

}

export default ShowArticlePage;