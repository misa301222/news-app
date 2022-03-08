import { getSession } from "next-auth/react";
import SeeForum from "../../../components/Forum/SeeForum";

function ForumCategoryIdPage({ subForums }: any) {
    return <SeeForum data={subForums} />
}

export async function getServerSideProps(context: any) {
    const session = await getSession({ req: context.req });
    const { req } = context;
    const { cookie } = req.headers;

    const { forumCategoryId } = context.params;
    
    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    const [responseSubForums] = await Promise.all([
        fetch(`${process.env.NEXTAUTH_URL}/api/subForum/getSubForumsByForumCategoryId/${forumCategoryId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            },
        })
    ]);

    const [responseS] = await Promise.all([
        responseSubForums.json()
    ]);

    return { props: { subForums: responseS } }

}

export default ForumCategoryIdPage;