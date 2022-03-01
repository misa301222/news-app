import { Box, Button, FormControl, FormLabel, Heading, Input, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { SyntheticEvent, useState } from "react";
import { useSession, signIn } from 'next-auth/react';
import { IoLogIn } from "react-icons/io5";
import Swal from "sweetalert2";

function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const router = useRouter();

    async function login(email: string, password: string) {
        const result: any = await signIn('credentials', {
            redirect: false,
            email: email,
            password: password
        });
        console.log(result);
        if (!result.error) {
            localStorage.setItem('email', email);
            localStorage.setItem('isLoggedIn', JSON.stringify(true));

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Logged In Successfully!',
                showConfirmButton: false,
                timer: 900
            }).then(() => {
                router.push('/');
            });
        } else {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: `${result.error}`,
                showConfirmButton: true,
            });
        }
    }

    const handleOnSubmitForm = async (event: SyntheticEvent) => {
        event.preventDefault();
        await login(email, password);
    }

    return (
        <div>
            <Box p='6'>
                <Text fontSize={'4xl'} fontWeight={'bold'}>Login <IoLogIn> </IoLogIn></Text>
            </Box>

            <Box p='10' shadow={"lg"} width={"35rem"} mx="auto">
                <form onSubmit={handleOnSubmitForm} >
                    <Box marginBottom={'2rem'}>
                        <FormLabel display={'block'}>
                            <Heading fontSize={'xl'}>Email <span style={{ color: 'red' }}>*</span></Heading>
                        </FormLabel>
                        <Input id='email' onChange={(e) => setEmail(e.target.value)} placeholder='Email' type={'email'}>
                        </Input>
                    </Box>

                    <Box marginBottom={'2rem'}>
                        <FormLabel>
                            <Heading fontSize={'xl'}>Password <span style={{ color: 'red' }}>*</span></Heading>
                        </FormLabel>
                        <Input id='password' onChange={(e) => setPassword(e.target.value)} placeholder='Password' type={'password'}>
                        </Input>
                    </Box>
                    <Box textAlign={'center'}>
                        <Button disabled={!email || !password} mx="auto" bg={'red.300'} color={'black'} _hover={{ backgroundColor: 'red.500' }} type='submit'>Login</Button>
                    </Box>
                </form>
            </Box>
        </div>
    )
}

export default Login;