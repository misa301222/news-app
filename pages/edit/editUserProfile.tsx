import { getSession } from "next-auth/react";
import EditUserProfile from "../../components/UserProfile/EditUserProfile";

function EditUserProfilePage({ userProfile }: any) {
    return <EditUserProfile data={userProfile} />
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

    const { email }: any = session.user;

    const [responseUserProfile] = await Promise.all([
        fetch(`${process.env.NEXTAUTH_URL}/api/userProfile/getUserProfileByEmail/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            },
        })
    ]);

    const [userProfileR] = await Promise.all([
        responseUserProfile.json()
    ]);

    return { props: { userProfile: userProfileR } }
}

export default EditUserProfilePage;