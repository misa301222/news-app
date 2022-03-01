import { useSession } from "next-auth/react";
import { useEffect } from "react";

function Start() {
    const { data: session, status } = useSession();

    return (
        <div>
            {JSON.stringify(session)}
        </div>
    )
}

export default Start;