import { Box, Center, Container, Divider, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

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
    privateProfile: boolean,
    profileImageURL: string,
    coverImageURL: string,
    totalPosts: number,
    totalMessages: number,
    role: number,
}

function ShowArticle({ data }: any) {
    const [article, setArticle] = useState<Article>(data.article);
    const [user, setUser] = useState<User>(data.user);

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
                <Heading mb='2rem' textAlign={'center'}>Author</Heading>
                <Divider borderColor={'black'}></Divider>
            </Container>

            <Container maxW={'container.md'} mt={'2rem'} mb={'10rem'} backgroundColor={'gray.700'} p='5' shadow={'dark-lg'} style={{
                backgroundImage: `${user.coverImageURL ? `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${user.coverImageURL})` : ''}`,
                backgroundPosition: `${user.coverImageURL ? 'cover' : ''}`,
                backgroundRepeat: `${user.coverImageURL ? 'no-repeat' : ''}`,
                backgroundSize: `${user.coverImageURL ? 'cover' : ''}`
            }}>
                <Flex>
                    <Box>
                        <Image mx={'auto'} borderRadius={'full'} boxSize={'150px'} objectFit={'cover'} src={user.profileImageURL} />
                    </Box>

                    <Center height={'10rem'} pl='2rem'>
                        <Divider orientation="vertical" borderColor={'white'}></Divider>
                    </Center>

                    <Box>
                        <Heading color={'red.300'}>
                            {user.fullName}
                        </Heading>

                        <Heading color={'white'} fontSize={'xl'}> {user.email} </Heading>
                    </Box>
                </Flex>
            </Container>
        </Box>
    )
}

export default ShowArticle;