import { getSession } from "next-auth/react";
import Explore from "../../components/Explore/Explore";

function ExplorePage({ categories }: any) {
    return <Explore data={categories} />
}

// This gets called on every request
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

export default ExplorePage;