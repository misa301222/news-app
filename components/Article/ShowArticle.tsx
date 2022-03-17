import { Box, Center, Container, Divider, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { motion } from 'framer-motion';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Link from "next/link";
import { BsFillPenFill } from "react-icons/bs";

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

interface User {
    userId: number,
    fullName: string,
    email: string,
    password: string,
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

function ShowArticle({ data }: any) {
    const [article, setArticle] = useState<Article>(data.article as Article);
    const [user, setUser] = useState<User>(data.user as User);
    const [userProfile, setUserProfile] = useState<UserProfile>(data.userProfile as UserProfile);

    return (
        <Box>
            <Container maxW={'container.xl'} mt={'2rem'} backgroundColor={'gray.100'} p='4' borderRadius={'xl'} shadow={"xl"}>
                <Heading textAlign={'center'}>{article.articleHeader}</Heading>
                <Divider borderColor={'black'}></Divider>
                <Flex direction={'column'} alignItems={'center'} mt='2rem'>
                    <Box>
                        {/* <Image src={article.articleMainImageURL[0]} /> */}
                        <Carousel showThumbs={false} infiniteLoop>
                            {article.articleMainImageURL?.map((slide: string, index: number) => {
                                return <Image key={index} src={slide} height="auto" width="90rem" />;
                            })}
                        </Carousel>
                    </Box>
                    <Box>
                        <Text fontWeight={'bold'}>{article.articleSubHeader}</Text>
                    </Box>
                </Flex>

                <Flex>
                    <Box p='5'>
                        {
                            article.articleParagraph?.map((text: string, index: number) => (
                                <Text mb={'1rem'} flexWrap={"wrap"} key={index}>{index} - {text}</Text>
                            ))
                        }
                    </Box>
                </Flex>
            </Container>

            <Container maxW={'container.md'} mt='10rem'>
                <Heading mb='2rem' textAlign={'center'}>Author <BsFillPenFill></BsFillPenFill></Heading>
                <Divider borderColor={'black'}></Divider>
            </Container>

            <motion.div
                initial={{
                    opacity: 0.5,
                    translateX: '5rem'
                }}
                whileInView={{
                    opacity: 1,
                    translateX: '0rem'
                }}
                style={{
                    width: '50%',
                    margin: '0 auto'
                }}>
                <Container maxW={'container.md'} mt={'2rem'} mb={'10rem'} backgroundColor={'gray.700'} p='5' shadow={'dark-lg'} style={{
                    backgroundImage: `${userProfile.coverImageURL ? `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${userProfile.coverImageURL})` : ''}`,
                    backgroundPosition: `${userProfile.coverImageURL ? 'cover' : ''}`,
                    backgroundRepeat: `${userProfile.coverImageURL ? 'no-repeat' : ''}`,
                    backgroundSize: `${userProfile.coverImageURL ? 'cover' : ''}`
                }}>
                    <Flex>
                        <Box>
                            <Link href={`/profile/${userProfile.email}`}>
                                <Image cursor={'pointer'} mx={'auto'} borderRadius={'full'} boxSize={'150px'} objectFit={'cover'} src={userProfile.profileImageURL ? userProfile.profileImageURL : '/static/images/Blank.png'} />
                            </Link>
                        </Box>

                        <Center height={'10rem'} pl='2rem'>
                            <Divider orientation="vertical" borderColor={'white'}></Divider>
                        </Center>

                        <Box ml={'2rem'}>
                            <motion.div
                                whileHover={{
                                    scale: 1.1,
                                    color: '#C53030'
                                }}
                                animate={{
                                    type: 'spring'
                                }}
                                style={{
                                    cursor: 'pointer',
                                    color: '#FC8181'
                                }}>
                                <Link href={`/profile/${userProfile.email}`}>
                                    <Heading color={''}>
                                        {user.fullName}
                                    </Heading>
                                </Link>
                            </motion.div>

                            <Heading color={'white'} fontSize={'xl'}> {userProfile.email} </Heading>
                        </Box>
                    </Flex>
                </Container>
            </motion.div>
        </Box>
    )
}

export default ShowArticle;