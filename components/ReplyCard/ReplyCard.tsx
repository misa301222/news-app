import { Box, Button, Container, Divider, Flex, Heading, Img, Stack, Text } from "@chakra-ui/react";
import { motion } from 'framer-motion'
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineComment } from "react-icons/ai";
import { BsFilePost } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import Swal from "sweetalert2";
import Router from 'next/router';

interface UserProfile {
    email: string,
    profileImageURL: string,
    coverImageURL: string,
    aboutMe: string,
    privateProfile: boolean,
    totalPosts: number,
    totalMessages: number
}

interface User {
    userId: number,
    fullName: string,
    email: string,
    role: number
}

function ReplyCard({ data }: any) {
    const [userProfile, setUserProfile] = useState<UserProfile>();
    const [user, setUser] = useState<User>();
    const [currentUser, setCurrentUser] = useState<string>('');

    const getUserProfileByEmail = async () => {
        const response = await fetch(`/api/userProfile/getUserProfileByEmail/${data.createdBy}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET',
        });

        const dataResponse = await response.json();

        if (dataResponse) {
            setUserProfile(dataResponse);
        }
    }

    const getUserByEmail = async () => {
        const response = await fetch(`/api/user/getUserByEmail/${data.createdBy}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET',
        });

        const dataResponse = await response.json();

        if (dataResponse) {
            setUser(dataResponse);
        }
    }

    const deleteSubForumReplyById = async () => {
        let subForumId: number = data.subForumId;

        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to delete your comment?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await fetch(`/api/subForumReply/getSubForumReplyBySubForumReplyId/${data.subForumReplyId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'DELETE',
                });

                const dataResponse = await response.json();
                if (dataResponse) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Message Deleted Successfully!',
                        showConfirmButton: true,
                    }).then(async () => {
                        Router.reload();
                    });
                }
            }
        });
    }

    useEffect(() => {
        getUserProfileByEmail();
        getUserByEmail();
        setCurrentUser(localStorage.getItem('email')!);
    }, []);

    return (
        <Box mb={'2rem'} border={'1px'} p='5' borderColor={'gray.200'} borderRadius={'xl'} shadow={'lg'}>
            {
                userProfile?.email === currentUser ?
                    <Box textAlign={'end'}>
                        <Button bgColor={'red.500'} _hover={{ bgColor: 'red.700' }} type="button" onClick={deleteSubForumReplyById}>X</Button>
                    </Box>
                    : null
            }
            <Flex direction={'row'}>
                <Box w={'20%'}>
                    <Flex direction={'column'} justifyContent={'center'}>
                        <motion.div
                            style={{
                                marginBottom: '1rem',
                                color: 'black'
                            }}
                            whileHover={{
                                scale: 1.1,
                                color: '#F56565'
                            }}
                            animate={{
                                type: 'spring'
                            }}>
                            <Link href={`/profile/${data.createdBy}`}>
                                <Heading isTruncated cursor={'pointer'} textAlign={'center'} fontSize={'xl'}>{user?.fullName}</Heading>
                            </Link>
                        </motion.div>


                        <Img src={`${userProfile?.profileImageURL ? userProfile.profileImageURL : '/static/images/Blank.png'}`} maxW={'8rem'} borderRadius={'xl'}
                            shadow='lg' mx='auto' />

                        <Box p='2' border={"1px"} borderRadius={'xl'} mt={'2rem'} backgroundColor={'gray.50'} color={'black'}>
                            <Flex direction={'row'}>
                                <Box w={'10%'}>
                                    <MdEmail></MdEmail>
                                </Box>

                                <Box w={'35%'}>
                                    <Heading textAlign={'end'} fontSize={'xs'}> Email:</Heading>
                                </Box>

                                <Box w={'55%'}>
                                    <Heading fontSize={'xs'} fontWeight={'normal'} isTruncated>&nbsp;{user?.email}</Heading>
                                </Box>
                            </Flex>

                            <Flex direction={'row'}>
                                <Box w={'10%'}>
                                    <BsFilePost></BsFilePost>
                                </Box>
                                <Box w={'35%'}>
                                    <Heading textAlign={'end'} fontSize={'xs'}>Posts:</Heading>
                                </Box>

                                <Box w={'55%'}>
                                    <Heading fontSize={'xs'} fontWeight={'normal'} isTruncated>&nbsp;{userProfile?.totalPosts}</Heading>
                                </Box>
                            </Flex>

                            <Flex direction={'row'}>
                                <Box w={'10%'}>
                                    <AiOutlineComment></AiOutlineComment>
                                </Box>
                                <Box w={'35%'}>
                                    <Heading textAlign={'end'} fontSize={'xs'}> Messages:</Heading>
                                </Box>

                                <Box w={'55%'}>
                                    <Heading fontSize={'xs'} fontWeight={'normal'} isTruncated>&nbsp;{userProfile?.totalMessages}</Heading>
                                </Box>
                            </Flex>
                        </Box>
                    </Flex>
                </Box>

                <Stack direction='row' h='300px' p={4} borderColor={'black'}>
                    <Divider orientation='vertical' />
                </Stack>

                <Box w={'80%'}>
                    <Container maxW={'container.md'}>
                        <Flex direction={'column'} p='2'>
                            <Box mb={'2rem'}>
                                <Heading textAlign={'center'} fontSize={'xl'} isTruncated></Heading>
                            </Box>

                            <Box color={'black'}>
                                <Text>{data.subForumReplyDescription}</Text>
                            </Box>

                        </Flex>
                    </Container>
                </Box>
            </Flex>
        </Box>
    )
}

export default ReplyCard;