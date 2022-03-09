import { getSession } from "next-auth/react";
import SeeSubForum from "../../../components/Forum/SeeSubForum";

function SeeSubForumPage({ subForum }: any) {
    return <SeeSubForum data={subForum} />
}

export async function getServerSideProps(context: any) {
    const session = await getSession({ req: context.req });
    const { req } = context;
    const { cookie } = req.headers;

    const { subForumId } = context.params;

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    const [responseSubForum] = await Promise.all([
        fetch(`${process.env.NEXTAUTH_URL}/api/subForum/getSubForumById/${subForumId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            },
        }),
    ]);

    const [responseR] = await Promise.all([
        responseSubForum.json()
    ]);

    return { props: { subForum: responseR } }

}

export default SeeSubForumPage;