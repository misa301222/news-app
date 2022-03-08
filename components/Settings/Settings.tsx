import { Box, Container, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import { FcSettings } from "react-icons/fc";
import { ImProfile } from "react-icons/im";
import { motion } from 'framer-motion';
import Link from "next/link";
import { useEffect, useState } from "react";

function Settings() {

    const [email, setEmail] = useState<string>();

    useEffect(() => {
        setEmail(localStorage.getItem('email')!);
        console.log(localStorage.getItem('email')!);
    }, [])

    return (
        <Box>
            <Container maxW={'container.xl'} mt={'2rem'}>
                <Heading textAlign={'center'}>Settings <FcSettings></FcSettings></Heading>
                <Divider></Divider>
                <Flex wrap={'wrap'} gap={'2rem'} mt={'2rem'}>
                    <motion.div
                        style={{
                            color: 'white',
                            width: '25rem',
                            height: '8rem',
                            backgroundColor: '#2D3748',
                            borderRadius: '13px',
                            cursor: 'pointer'
                        }}
                        whileHover={{
                            scale: 1.1
                        }}
                        animate={{
                            type: 'spring'
                        }}
                    >
                        <Link href={`edit/editUserProfile/`}>
                            <Flex>
                                <Box w={'30%'}>
                                    <Flex direction={'column'} justifyContent={'center'} alignItems={"center"}>
                                        <Box mt={'1rem'}>
                                            <ImProfile fontSize={'6rem'}></ImProfile>
                                        </Box>
                                    </Flex>
                                </Box>

                                <Box w={'70%'}>
                                    <Container>
                                        <Heading mt='1rem' fontSize={'xl'} textAlign='center'>Edit Profile Info</Heading>
                                        <Divider></Divider>
                                        <Text>Edit Your Profile Information.</Text>
                                    </Container>
                                </Box>
                            </Flex>
                        </Link>
                    </motion.div>
                </Flex>

            </Container>
        </Box>
    )
}

export default Settings;