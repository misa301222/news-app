import { Box, Button, Container, Divider, Flex, Heading, Img, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { BsFilePost } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { AiOutlineComment } from 'react-icons/ai';
import { motion } from 'framer-motion';
import Link from "next/link";
import { BiMessageDetail } from 'react-icons/bi'

interface SubForum {
    subForumId: number,
    subForumName: string,
    subForumDescription: string,
    subForumImageURL: string[],
    dateCreated: Date,
    createdBy: string,
    forumCategoryId: number
}

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
    password: string,
    role: number,
}

function SeeSubForum({ data }: any) {
    const [subForum, setSubForum] = useState<SubForum>(data.subForum as SubForum);
    const [userProfile, setUserProfile] = useState<UserProfile>(data.userProfile as UserProfile);
    const [user, setUser] = useState<User>(data.user as User);

    return (
        <Box>
            <Container mt='2rem' maxW={'container.xl'}>
                <Heading textAlign={'center'} mb={'1rem'}>Topic #{subForum.subForumId}</Heading>
                <Divider mb='2rem'></Divider>

                <Box backgroundColor={''} border='1px' borderColor={'gray.200'} p='5' borderRadius={'xl'} shadow={'lg'}>
                    <Flex direction={'row'}>
                        <Box w={'20%'}>
                            <Flex direction={'column'} justifyContent={'center'}>

                                <motion.div
                                    style={{
                                        marginBottom: '1rem'
                                    }}
                                    whileHover={{
                                        scale: 1.1,
                                        color: '#F56565'
                                    }}
                                    animate={{
                                        type: 'spring'
                                    }}>
                                    <Link href={`/profile/${user.email}`}>
                                        <Heading isTruncated cursor={'pointer'} textAlign={'center'} fontSize={'xl'}>{user.fullName}</Heading>
                                    </Link>
                                </motion.div>


                                <Img src={`${userProfile.profileImageURL ? userProfile.profileImageURL : '/static/images/Blank.png'}`} maxW={'8rem'} borderRadius={'xl'}
                                    shadow='lg' mx='auto' />

                                <Box p='2' border={"1px"} borderRadius={'xl'} mt={'2rem'} backgroundColor={'gray.50'} color={'black'}>
                                    <Flex direction={'row'}>
                                        <Box w={'10%'}>
                                            <MdEmail></MdEmail>
                                        </Box>

                                        <Box w={'35%'}>
                                            <Heading textAlign={'end'} fontSize={'sm'}> Email:</Heading>
                                        </Box>

                                        <Box w={'55%'}>
                                            <Heading fontSize={'sm'} fontWeight={'normal'} isTruncated>&nbsp;{userProfile.email}</Heading>
                                        </Box>
                                    </Flex>

                                    <Flex direction={'row'}>
                                        <Box w={'10%'}>
                                            <BsFilePost></BsFilePost>
                                        </Box>
                                        <Box w={'35%'}>
                                            <Heading textAlign={'end'} fontSize={'sm'}>Total Posts:</Heading>
                                        </Box>

                                        <Box w={'55%'}>
                                            <Heading fontSize={'sm'} fontWeight={'normal'} isTruncated>&nbsp;{userProfile.totalPosts}</Heading>
                                        </Box>
                                    </Flex>

                                    <Flex direction={'row'}>
                                        <Box w={'10%'}>
                                            <AiOutlineComment></AiOutlineComment>
                                        </Box>
                                        <Box w={'35%'}>
                                            <Heading textAlign={'end'} fontSize={'sm'}> Messages:</Heading>
                                        </Box>

                                        <Box w={'55%'}>
                                            <Heading fontSize={'sm'} fontWeight={'normal'} isTruncated>&nbsp;{userProfile.totalMessages}</Heading>
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
                                        <Heading textAlign={'center'} fontSize={'xl'} isTruncated>{subForum.subForumName}</Heading>
                                    </Box>

                                    <Box>
                                        <Text>{subForum.subForumDescription}</Text>
                                    </Box>

                                </Flex>
                            </Container>
                        </Box>
                    </Flex>
                </Box>

                {
                    subForum.subForumImageURL[0] ?
                        <Box mt={'2rem'} backgroundColor={''} border='1px' borderColor={'gray.200'} p='5' borderRadius={'xl'} shadow={'lg'}>
                            <Heading mb='2rem' textAlign={'center'}>Attached Images</Heading>
                            <Flex direction={'row'} gap={'2rem'} overflowX={'auto'} justifyContent={'center'}>
                                {
                                    subForum.subForumImageURL?.map((element: string, index: number) => (
                                        <Img key={index} src={element} maxH={'10rem'} cursor={'pointer'} />
                                    ))
                                }
                            </Flex>
                        </Box>
                        : null
                }

                <Divider borderColor={'black'} mt={'2rem'}></Divider>

                <Box textAlign={'end'} mt={'1rem'}>
                    <Link href={{ pathname: `/forums/newReply/${subForum.subForumId}` }}
                    >
                        <Button type="submit" mx="auto" bg={'red.300'} color={'black'} _hover={{ backgroundColor: 'red.500' }}><BiMessageDetail></BiMessageDetail>Reply</Button>
                    </Link>
                </Box>

            </Container>
        </Box>
    )
}

export default SeeSubForum;