import { Box, Button, Input } from "@chakra-ui/react";
import { SyntheticEvent, useState } from "react";
import { useAuth } from "../../config/hook/auth";

function Login() {
    const [userName, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isRight, setIsRight] = useState<boolean>(false);

    const { signInWithEmailAndPasswordAuth } = useAuth();

    const handleOnSubmitForm = async (event: SyntheticEvent) => {
        event.preventDefault();

        await signInWithEmailAndPasswordAuth(userName, password)
            .then((authUser: any) => {
                console.log('ok: ', authUser);
                setIsRight(true);
            })
            .catch((error: any) => {
                console.log(error);
                setIsRight(false);
            });
    }

    return (
        <div>
            <Box p='6' fontSize={'9xl'}>
                This is a Login section
            </Box>

            <form onSubmit={handleOnSubmitForm}>
                <Input onChange={(e) => setUserName(e.target.value)} placeholder='UserName'>
                </Input>

                <Input onChange={(e) => setPassword(e.target.value)} placeholder='Password'>
                </Input>

                <Button type='submit'>Login</Button>
            </form>

            {isRight ?
                <Box p='5' fontSize={`2xl`} color={`green`} fontWeight={"bold"} >
                    User is right!
                </Box> :
                <Box p='5' fontSize={`2xl`} color={`red`} fontWeight={"bold"} >
                    User is wrong!
                </Box>
            }
        </div>
    )
}

export default Login;