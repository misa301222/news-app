import { Box, Button, Container, Divider, Flex, FormLabel, Heading, Img, Input, Text } from "@chakra-ui/react";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { FaSearch, FaUsers } from "react-icons/fa";
import { motion } from 'framer-motion';
import Link from "next/link";

interface User {
    userId: number,
    fullName: string,
    email: string,
    role: number,
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

function SearchUsers() {
    const [searchUser, setSearchUser] = useState<string>();
    const [users, setUsers] = useState<User[]>();
    const [userProfiles, setUserProfiles] = useState<UserProfile[]>();
    const [isEmpty, setIsEmpty] = useState<boolean>(false);

    const handleOnChangeSearchUser = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchUser(event.target.value);
    }

    async function searchUsers() {
        const response = await fetch(`/api/userProfile/getUserByFullNameOrEmail/${searchUser}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET',
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong!');
        }

        return data;
    }

    const handleOnSubmitSearchForm = async (event: SyntheticEvent) => {
        event.preventDefault();

        const response = await searchUsers();
        console.log(response);
        setUserProfiles(response);
        if (response.length) {
            setIsEmpty(false);
        } else {
            setIsEmpty(true);
        }
    }

    return (
        <Box>
            <Container maxW={'container.xl'}>
                <Heading mt={'2rem'} textAlign={'center'}>Search Users <FaUsers></FaUsers></Heading>
                <Divider></Divider>

                <Box p={'3'} mt={'1rem'} shadow={'md'}>
                    <form onSubmit={handleOnSubmitSearchForm}>
                        <Flex gap={'1rem'} mt={'2rem'} mb={'2rem'} direction={'row'} alignItems={'center'}>
                            <FormLabel textAlign={'end'}>Email</FormLabel>
                            <Input onChange={handleOnChangeSearchUser} type={'text'} maxLength={256} placeholder={'Search by Email....'} />
                            <Button disabled={!searchUser} type="submit"><FaSearch fontSize={'2rem'}></FaSearch>&nbsp; Search </Button>
                        </Flex>
                    </form>
                </Box>

                <Box p={'2'} mt={'5rem'}>
                    <Flex wrap={'wrap'} gap={'2rem'}>
                        {
                            !isEmpty ?
                                userProfiles?.map((element: UserProfile, index: number) => (
                                    <motion.div
                                        style={{
                                            backgroundColor: `${element.coverImageURL ? '' : '#2D3748'}`,
                                            color: 'white',
                                            borderRadius: '13px',
                                            width: '23rem',
                                            height: '10rem',
                                            backgroundImage: `${element.coverImageURL ? `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${element.coverImageURL})` : ''}`,
                                            backgroundSize: 'cover',
                                            padding: '1rem',
                                            cursor: 'pointer'
                                        }}
                                        key={index}
                                        whileHover={{
                                            scale: 1.1
                                        }}
                                        animate={{
                                            type: 'spring',
                                            opacity: 1
                                        }}
                                        initial={{
                                            opacity: 0
                                        }}
                                    >
                                        <Link href={`/profile/${element.email}`}>
                                            <Flex direction={'row'}>
                                                <Box w={'20%'}>
                                                    <Img src={`${element.profileImageURL ? `${element.profileImageURL}` : `/static/images/Blank.png`}`}
                                                        mx={'auto'} borderRadius={'full'} boxSize={'70px'} objectFit={'cover'} />
                                                </Box>
                                                <Box w={'80%'}>
                                                    <Heading textAlign={'center'} fontSize={'1rem'}>{element.email}</Heading>
                                                    <Box p={'5'}>
                                                        <Text noOfLines={3}>{element.aboutMe}</Text>
                                                    </Box>
                                                </Box>
                                            </Flex>
                                        </Link>
                                    </motion.div>
                                ))
                                :
                                <motion.div
                                    initial={{
                                        opacity: 0
                                    }}
                                    animate={{
                                        opacity: 1
                                    }}>
                                    <Heading>There's no Users...</Heading>
                                </motion.div>
                        }
                    </Flex>
                </Box>
            </Container>
        </Box>
    )
}

export default SearchUsers;