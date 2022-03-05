import { getSession } from "next-auth/react";
import Profile from "../../components/Profile/Profile";

function ProfilePage({ user, userProfile, article }: any) {
    return <Profile data={{ user, userProfile, article }} />
}

export async function getServerSideProps(context: any) {
    const session = await getSession({ req: context.req });
    const { req } = context;
    const { cookie } = req.headers;

    const { email } = context.params;

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    const [responseUser, responseUserProfile, responseArticle] = await Promise.all([
        fetch(`${process.env.NEXTAUTH_URL}/api/user/getUserByEmail/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            },
        }),
        fetch(`${process.env.NEXTAUTH_URL}/api/userProfile/getUserProfileByEmail/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            },
        }),
        fetch(`${process.env.NEXTAUTH_URL}/api/article/getArticleByEmail/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            },
        }),
    ])

    const [userR, userProfileR, articleR] = await Promise.all([
        responseUser.json(),
        responseUserProfile.json(),
        responseArticle.json()
    ]);

    return { props: { user: userR, userProfile: userProfileR, article: articleR } }
}

export default ProfilePage;