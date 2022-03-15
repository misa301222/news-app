import { getSession } from "next-auth/react";
import ManageForums from "../../components/Forum/ManageForums";

function manageForumsPage({ forumCategories }: any) {
    return <ManageForums data={forumCategories} />
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

    const [responseForumCategories] = await Promise.all([
        fetch(`${process.env.NEXTAUTH_URL}/api/forumCategory/forumCategoryAPI`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            },
        })
    ]);

    const [responseFC] = await Promise.all([
        responseForumCategories.json()
    ]);

    return { props: { forumCategories: responseFC } };

}

export default manageForumsPage;