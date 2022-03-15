import { getSession } from "next-auth/react";
import SeeSubForum from "../../../components/Forum/SeeSubForum";

function SeeSubForumPage({ subForum, userProfile, user, subForumReply }: any) {
    return <SeeSubForum data={{ subForum, userProfile, user, subForumReply }} />
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

    const { subForumId } = context.params;

    const [responseSubForum] = await Promise.all([
        fetch(`${process.env.NEXTAUTH_URL}/api/subForum/getSubForumById/${subForumId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            },
        })
    ]);

    const [responseR] = await Promise.all([
        responseSubForum.json()
    ]);


    const { createdBy } = responseR;

    const [responseUserProfile, responseUser, responseSubForumReply] = await Promise.all([
        fetch(`${process.env.NEXTAUTH_URL}/api/userProfile/getUserProfileByEmail/${createdBy}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            },
        }),
        fetch(`${process.env.NEXTAUTH_URL}/api/user/getUserByEmail/${createdBy}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            },
        }),
        fetch(`${process.env.NEXTAUTH_URL}/api/subForumReply/getSubForumReplyBySubForumId/${subForumId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            },
        })
    ]);

    const [responseUP, responseU, responseSFR] = await Promise.all([
        responseUserProfile.json(),
        responseUser.json(),
        responseSubForumReply.json()
    ]);


    return { props: { subForum: responseR, userProfile: responseUP, user: responseU, subForumReply: responseSFR } }

}

export default SeeSubForumPage;