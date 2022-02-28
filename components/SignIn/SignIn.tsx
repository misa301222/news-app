import { Box, Button, Input } from "@chakra-ui/react";
import { SyntheticEvent, useState } from "react";
import { useAuth } from "../../config/hook/auth";

function SignIn() {
    const [userName, setUserName] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const { signInWithEmailAndPasswordAuth } = useAuth();

    const handleOnSubmitForm = async (event: SyntheticEvent) => {
        event.preventDefault();

        await signInWithEmailAndPasswordAuth(userName, password)
            .then((authUser: any) => {
                console.log('ok: ', authUser);
            })
            .catch((error: any) => {
                console.log(error);
            });
    }

    return (
        <div>
            <Box p='6' fontSize={'9xl'}>
                This is SignIn section
            </Box>

            <form onSubmit={handleOnSubmitForm}>
                <Input onChange={(e) => setUserName(e.target.value)} placeholder='UserName'>
                </Input>

                <Input onChange={(e) => setPassword(e.target.value)} placeholder='Password'>
                </Input>

                <Button type='submit'>Login</Button>
            </form>
        </div>
    )
}

export default SignIn;