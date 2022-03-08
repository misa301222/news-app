import { getSession } from "next-auth/react";
import NewSubForum from "../../components/NewSubForum/NewSubForum";

function NewSubForumPage({ categories }: any) {
    return <NewSubForum data={categories} />
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

    const [responseCategories] = await Promise.all([
        fetch(`${process.env.NEXTAUTH_URL}/api/forumCategory/forumCategoryAPI`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            },
        })
    ]);

    const [categoriesR] = await Promise.all([
        responseCategories.json()
    ]);

    return { props: { categories: categoriesR } }
}

export default NewSubForumPage;