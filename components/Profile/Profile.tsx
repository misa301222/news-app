import { Box, Container, Divider, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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

interface Article {
    articleId: number,
    articleHeader: string,
    articleSubHeader: string,
    articleMainImageURL: string[],
    articleParagraph: string[],
    articleImageURL: string[],
    datePublished: Date,
    createdBy: string
}

function Profile({ data }: any) {
    const [user, setUser] = useState<User>(data.user);
    const [userProfile, setUserProfile] = useState<UserProfile>(data.userProfile);
    const [articles, setArticles] = useState<Article[]>(data.article);

    useEffect(() => {
        console.log(userProfile);
    }, [])

    return (
        <Box>
            <Box h={'25rem'} style={{
                backgroundImage: `${userProfile.coverImageURL ? `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),  url(${userProfile.coverImageURL})` : ''}`,
                backgroundPosition: `${userProfile.coverImageURL ? 'cover' : ''}`,
                backgroundRepeat: `${userProfile.coverImageURL ? 'no-repeat' : ''}`,
                backgroundSize: `${userProfile.coverImageURL ? 'cover' : ''}`
            }}>
            </Box>

            <Flex direction={"row"} mt={'-7rem'}>
                <Box w={'30%'}>
                    <Container bgColor={'gray.700'} h={"40rem"} maxW={'25rem'} shadow={'2xl'}>
                        <Flex direction={'column'}>
                            <Box mt={'1rem'}>
                                <Image shadow={"dark-lg"} mx={'auto'} objectFit={'cover'} borderRadius={'full'} boxSize={'15rem'}
                                    src={`${userProfile.profileImageURL ? userProfile.profileImageURL : ''}`} />
                            </Box>

                            <Box color={'white'} mt='1rem' textAlign={'center'} mb='1rem'>
                                <Heading>{user.fullName}</Heading>
                                <Text fontSize={'xl'}>{user.email}</Text>
                                <Divider mt={'1rem'}></Divider>
                            </Box>

                            <Box color={'white'} mt='1rem' textAlign={'center'} mb='1rem'>
                                <Container>
                                    <Flex>
                                        <Box>
                                            <Text>Messages: {userProfile.totalMessages}</Text>
                                            <Text>Posts: {userProfile.totalPosts}</Text>
                                        </Box>
                                    </Flex>
                                </Container>
                            </Box>
                        </Flex>
                    </Container>
                </Box>

                <Box w={'70%'}>
                    <Flex direction={'column'} justifyContent={'space-evenly'} gap={'2rem'} color={'white'}>
                        <Box w={'90%'} h={'40rem'} bgColor={'gray.700'} p={'5'} shadow={"dark-lg"}>
                            <Heading textAlign={'center'}>About Me</Heading>
                            <Divider></Divider>
                            <Text>{userProfile.aboutMe}</Text>
                        </Box>

                        <Box w={'90%'} h={'19rem'} bgColor={'gray.700'} p={'5'} shadow={"dark-lg"}>
                            <Heading textAlign={'center'}>Published Articles</Heading>
                            <Divider></Divider>
                            <Container maxW={'container.lg'} mt={'3rem'}>
                                <Flex wrap={'wrap'}>
                                    {
                                        articles ?
                                            articles.map((element: Article, index: number) => (
                                                <Link key={index} href={`/article/${element.articleId}`}>
                                                    <motion.div
                                                        style={{
                                                            backgroundImage: `${element.articleMainImageURL[0] ? `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${element.articleMainImageURL[0]})` : ''}`,
                                                            backgroundRepeat: 'no-repeat',
                                                            backgroundPosition: `${element.articleMainImageURL[0] ? 'cover' : ''}`,
                                                            backgroundSize: `${element.articleMainImageURL[0] ? 'cover' : ''}`,
                                                            width: '25rem',
                                                            height: '10rem',
                                                            borderRadius: '10px',
                                                            padding: '2',
                                                            cursor: 'pointer'
                                                        }}
                                                        whileHover={{
                                                            scale: 1.2
                                                        }}
                                                        animate={{
                                                            type: 'spring'
                                                        }}
                                                    >
                                                        <Flex direction={'column'}>
                                                            <Heading fontSize={'xl'} textAlign={'center'} color={'white'}>{element.articleHeader}</Heading>
                                                        </Flex>
                                                    </motion.div>
                                                </Link>
                                            ))
                                            :
                                            <Heading textAlign={'center'} mt={'5rem'} color={'red.600'}>It seems this user has not published any article!</Heading>
                                    }
                                </Flex>
                            </Container>
                        </Box>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    )

}

export default Profile;