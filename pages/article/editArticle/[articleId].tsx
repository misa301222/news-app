import { getSession } from "next-auth/react";
import EditArticle from "../../../components/Article/EditArticle";

function EditArticlePage({ article }: any) {
    return <EditArticle data={article} />
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
    ]);

    const [articleR] = await Promise.all([
        responseArticle.json()
    ]);

    return { props: { article: articleR } };
}

export default EditArticlePage;