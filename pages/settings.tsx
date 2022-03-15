import { getSession } from "next-auth/react";
import Settings from "../components/Settings/Settings";

function SettingsPage({ user }: any) {
    return <Settings data={user} />
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

    const [responseUser] = await Promise.all([
        fetch(`${process.env.NEXTAUTH_URL}/api/user/getUserByEmail/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            },
        })
    ]);

    const [userR] = await Promise.all([
        responseUser.json()
    ]);

    return { props: { user: userR } };

}


export default SettingsPage;