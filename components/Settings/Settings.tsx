import { Box, Container, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import { FcSettings } from "react-icons/fc";
import { ImProfile } from "react-icons/im";
import { motion } from 'framer-motion';
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdForum } from "react-icons/md";

const enum UserRole {
    USER = 1,
    ADMIN = 2
}

function Settings({ data }: any) {
    const [email, setEmail] = useState<string>(data.email);
    const [role, setRole] = useState<number>(data.role);

    return (
        <Box>
            <Container maxW={'container.xl'} mt={'2rem'}>
                <Box>
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
                </Box>
                {
                    role === UserRole.ADMIN ?
                        <Box textAlign={'center'} mt={'2rem'}>
                            <Heading>Admin Tools</Heading>
                            <Divider mb={'2rem'}></Divider>

                            <Flex>
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
                                    <Link href={`forums/manageForums`}>
                                        <Flex>
                                            <Box w={'30%'}>
                                                <Flex direction={'column'} justifyContent={'center'} alignItems={"center"}>
                                                    <Box mt={'1rem'}>
                                                        <MdForum fontSize={'6rem'}></MdForum>
                                                    </Box>
                                                </Flex>
                                            </Box>

                                            <Box w={'70%'}>
                                                <Container>
                                                    <Heading mt='1rem' fontSize={'xl'} textAlign='center'>Manage Forum</Heading>
                                                    <Divider></Divider>
                                                    <Text>Create, see or delete categories.</Text>
                                                </Container>
                                            </Box>
                                        </Flex>
                                    </Link>
                                </motion.div>
                            </Flex>
                        </Box>
                        : null
                }
            </Container>
        </Box>
    )
}

export default Settings;