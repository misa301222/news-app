import { Box, Button, FormLabel, Heading, Input, Text } from "@chakra-ui/react";
import { FaUserCheck } from "react-icons/fa";
import { SyntheticEvent, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

function SignUp() {
    const [fullName, setFullName] = useState<string>('');
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const router = useRouter();

    async function register(fullName: string, email: string, password: string) {
        const response = await fetch(`/api/auth/signUpAPI/`, {
            body: JSON.stringify({
                fullName: fullName,
                email: email,
                password: password
            }),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST'
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong!');
        }

        return data;
    }

    const handleOnSubmitForm = async (event: SyntheticEvent) => {
        event.preventDefault();
        const response = await register(fullName, email, password);

        if (response) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Account created Successfully!',
                showConfirmButton: false,
                timer: 900
            }).then(() => {
                setFullName('');
                setEmail('');
                setPassword('');

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'To start using your account you need to login!',
                    showConfirmButton: true,
                }).then(() => {
                    router.push('/login');
                });
            });
        }
    }

    return (
        <div>
            <Box p='6'>
                <Text fontSize={'4xl'} fontWeight={'bold'}>SignUp <FaUserCheck></FaUserCheck></Text>
            </Box>

            <Box p={'10'} shadow={"lg"} width={`35rem`} mx='auto'>
                <form onSubmit={handleOnSubmitForm}>
                    <Box marginBottom={'2rem'}>
                        <FormLabel display={'block'}>
                            <Heading fontSize={'xl'}>Full Name <span style={{ color: 'red' }}>*</span></Heading>
                        </FormLabel>
                        <Input onChange={(e) => setFullName(e.target.value)} value={fullName} placeholder='Full Name' type={'text'}>
                        </Input>
                    </Box>

                    <Box marginBottom={'2rem'}>
                        <FormLabel display={'block'}>
                            <Heading fontSize={'xl'}>Email <span style={{ color: 'red' }}>*</span></Heading>
                        </FormLabel>
                        <Input onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Email' type={'email'}>
                        </Input>
                    </Box>

                    <Box marginBottom={'2rem'}>
                        <FormLabel display={'block'}>
                            <Heading fontSize={'xl'}>Password <span style={{ color: 'red' }}>*</span></Heading>
                        </FormLabel>
                        <Input onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Password' type={'password'}>
                        </Input>
                    </Box>

                    <Box textAlign={'center'}>
                        <Button mx="auto" bg={'red.300'} color={'black'} _hover={{ backgroundColor: 'red.500' }} type='submit'>SignUp</Button>
                    </Box>
                </form>
            </Box>
        </div>
    )
}

export default SignUp;