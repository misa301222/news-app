import { Box, Button, Container, Divider, Flex, FormLabel, Heading, Image, Img, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, Textarea, useDisclosure } from "@chakra-ui/react";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { BsFilePost } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { AiFillLock, AiOutlineComment } from 'react-icons/ai';
import { motion } from 'framer-motion';
import Link from "next/link";
import { BiImage, BiMessageDetail } from 'react-icons/bi'
import Swal from "sweetalert2";
import ReplyCard from "../ReplyCard/ReplyCard";
import { useRouter } from "next/router";
import PaginationSubForumReply from "../Pagination/PaginationSubForumReply";
import { useSession } from "next-auth/react";

interface SubForum {
    subForumId: number,
    subForumName: string,
    subForumDescription: string,
    subForumImageURL: string[],
    dateCreated: Date,
    createdBy: string,
    isOpen: boolean,
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

interface SubForumReply {
    subForumReplyDescription: string,
    createdBy: string,
    subForumId: number
}

function SeeSubForum({ data }: any) {
    const [subForum, setSubForum] = useState<SubForum>(data.subForum as SubForum);
    const [userProfile, setUserProfile] = useState<UserProfile>(data.userProfile as UserProfile);
    const [user, setUser] = useState<User>(data.user as User);
    const [subForumReply, setSubForumReply] = useState<SubForumReply[]>(data.subForumReply as SubForumReply[]);
    const [newReply, setNewReply] = useState<string>('');
    const [currentUser, setCurrentUser] = useState<string>('');
    const router = useRouter();
    const [selectedImage, setSelectedImage] = useState<string>('');
    const { data: session, status }: any = useSession();

    const { isOpen: isNewReplyOpen, onOpen: onNewReplyOpen, onClose: OnNewReplyClose } = useDisclosure();
    const { isOpen: isViewImageOpen, onOpen: onViewImageOpen, onClose: onViewImageClose } = useDisclosure();

    const handleOnClickImage = (imageURL: string) => {
        setSelectedImage(imageURL);
        onViewImageOpen();
    }

    const handleOnChangeNewReply = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setNewReply(event.target.value);
    }

    const getSubForumsReplies = async () => {
        const response = await fetch(`/api/subForumReply/getSubForumReplyBySubForumId/${subForum.subForumId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET',
        });

        const data = await response.json();
        console.log(data);
        if (data) {
            setSubForumReply(data);
        }
    }

    async function saveNewReply(newReplyEntity: SubForumReply) {
        const response = await fetch(`/api/subForumReply/subForumReplyAPI`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(newReplyEntity)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong!');
        }

        return data;
    }

    async function updateUserProfile(email: string) {
        const response = await fetch(`/api/userProfile/post/addMessageCount/${email}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong!');
        }

        return data;
    }

    const addPlusOneMessage = async () => {
        const { email } = session.user;

        const response = await updateUserProfile(email);
    }

    const handleOnSubmitNewReply = async (event: SyntheticEvent) => {
        event.preventDefault();
        let currentUser = localStorage.getItem('email')!;
        if (currentUser && newReply) {
            let newReplyEntity: SubForumReply = {
                subForumReplyDescription: newReply,
                createdBy: currentUser,
                subForumId: subForum.subForumId
            }

            await saveNewReply(newReplyEntity).then(response => {
                if (response) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Message Sent Successfully!',
                        showConfirmButton: true,
                    }).then(async () => {
                        OnNewReplyClose();
                        await addPlusOneMessage();
                        await getSubForumsReplies();
                    });
                }
            });
        }
    }

    async function deleteSubForumRepliesBySubForumId() {
        const response = await fetch(`/api/subForumReply/subForumReplyAPI`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'DELETE',
            body: JSON.stringify({
                subForumId: subForum.subForumId
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong!');
        }

        return data;
    }

    const handleOnDeleteSubForum = async () => {

        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to delete your post?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                let forumCategoryId: number = subForum.forumCategoryId;
                const response = await deleteSubForumRepliesBySubForumId();
                const responseSubForum = await deleteSubForumBySubForumId();

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Post Deleted Successfully!',
                    showConfirmButton: true,
                }).then(() => {
                    router.push(`/forums/enterForum/${forumCategoryId}`);
                });
            }
        })
    }

    async function deleteSubForumBySubForumId() {
        const response = await fetch(`/api/subForum/getSubForumById/${subForum.subForumId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'DELETE'
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong!');
        }

        return data;
    }

    useEffect(() => {
        setCurrentUser(localStorage.getItem('email')!);
        console.log('change');
    }, [subForumReply]);



    return (
        <Box>
            <Container mt='2rem' maxW={'container.xl'}>
                <Heading textAlign={'center'} mb={'1rem'}>Topic #{subForum.subForumId}</Heading>
                <Divider mb='2rem'></Divider>

                {
                    currentUser === subForum.createdBy ?
                        <Box mb={'1rem'} textAlign={'end'}>
                            <Button color='white' bgColor={'red.500'} _hover={{ bgColor: 'red.700' }} shadow='md' onClick={handleOnDeleteSubForum}>X</Button>
                        </Box>
                        : null
                }

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
                                            <Heading textAlign={'end'} fontSize={'sm'}>Messages:</Heading>
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
                            <Flex direction={'row'} gap={'2rem'} overflowX={'auto'} justifyContent={'center'} overflowY={'auto'}>
                                {
                                    subForum.subForumImageURL?.map((element: string, index: number) => (
                                        <Img onClick={() => handleOnClickImage(element)} key={index} src={element} maxH={'10rem'} cursor={'pointer'} />
                                    ))
                                }
                            </Flex>
                        </Box>
                        : null
                }

                <Divider borderColor={'black'} mt={'2rem'}></Divider>

                {
                    subForum.isOpen ?
                        <Box>
                            <Box textAlign={'end'} mt={'1rem'}>
                                <Button onClick={onNewReplyOpen} type="button" mx="auto" bg={'red.300'} color={'black'} _hover={{ backgroundColor: 'red.500' }}><BiMessageDetail></BiMessageDetail>Reply</Button>
                            </Box>

                            <Container maxW={'container.xl'}>
                                <Heading textAlign={'center'} mt={'2rem'} mb='1rem'>Replies</Heading>
                                <Divider mb={'2rem'}></Divider>

                                <PaginationSubForumReply data={subForumReply}
                                    RenderComponent={ReplyCard}
                                    title="SubForumReply"
                                    pageLimit={0}
                                    dataLimit={5} />

                            </Container>
                        </Box>
                        :
                        <Container maxW={'container.xl'} mt={'5rem'} mb={'5rem'}>
                            <Flex direction={'row'} mx={'auto'} justifyContent={'center'}>
                                <Flex justifyContent={'center'} alignItems={'center'} w={'50rem'} h={'20rem'} borderRadius={'xl'} shadow={'xl'} bgColor={'gray.200'}>
                                    <Text fontWeight={'bold'}><AiFillLock></AiFillLock>This post was locked by the admin... You won't be able to reply</Text>
                                </Flex>
                            </Flex>
                        </Container>
                }


            </Container>


            <Modal isOpen={isNewReplyOpen} onClose={OnNewReplyClose} size={'xl'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader color={'white'} bgColor={'gray.700'}>New Reply <BiMessageDetail></BiMessageDetail></ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={handleOnSubmitNewReply}>
                            <Box mt={'1rem'} mb={'2rem'}>
                                <FormLabel>
                                    Your Reply
                                </FormLabel>

                                <Textarea onChange={handleOnChangeNewReply} rows={5} resize={'none'} placeholder={'What are you thinking of? ...'} />
                            </Box>

                            <Box textAlign={'end'} mb={'2rem'}>
                                <Button type="submit" disabled={!newReply.length} mx="auto" bg={'red.300'} color={'black'} _hover={{ backgroundColor: 'red.500' }}>Submit</Button>
                            </Box>
                        </form>

                    </ModalBody>
                </ModalContent>
            </Modal>


            <Modal isOpen={isViewImageOpen} onClose={onViewImageClose} size={'full'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader color={'white'} bgColor={'gray.700'}>View Image <BiImage></BiImage></ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Image shadow={'dark-lg'} mx={'auto'} maxH={'90vh'} src={selectedImage} />
                    </ModalBody>
                </ModalContent>
            </Modal>

        </Box>
    )
}

export default SeeSubForum;