import { Box, Button, color, Container, Divider, Flex, Heading, Image, Img, Text } from "@chakra-ui/react";
import { motion } from 'framer-motion';
import { FaLongArrowAltRight, FaNewspaper } from "react-icons/fa";
import { GiNewspaper } from 'react-icons/gi'
import { IoNewspaperSharp } from "react-icons/io5";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

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

function Start({ data }: any) {
    const [articles] = useState<Article[]>(data as Article[]);
    const router = useRouter();

    const handleOnClickKeepReading = (articleId: number) => {
        router.push(`/article/${articleId}`);
    }

    return (
        <Box>
            <Box style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(static/images/News.jpg)`,
                backgroundSize: 'cover',
                backgroundPosition: 'cover',
                height: '50rem',
                paddingTop: '15rem',
            }}>
                <motion.div
                    style={{
                        minHeight: '25rem',
                        maxWidth: '50rem',
                        margin: '0 auto',
                        color: 'white',
                        backdropFilter: 'blur(5px)',
                        borderRadius: '13px',
                        borderWidth: '1px',
                        // borderColor: 'white'
                    }}
                    initial={{
                        translateX: '5rem',
                        opacity: 0.5
                    }}
                    whileInView={{
                        translateX: '0rem',
                        opacity: 1,
                        transition: {
                            duration: 2,
                            delay: 0.3,
                            type: 'spring',
                        }
                    }}

                    viewport={{
                        once: false
                    }}

                    whileHover={{
                        scale: 1.1,
                    }}
                    transition={{
                        duration: 1,
                        type: 'spring',
                    }}>
                    <Flex direction={'column'} justifyContent={'center'}>
                        <Box p='5'>
                            <Heading mb={'0.5rem'} color={'gray.200'} textAlign={'center'}>Welcome!</Heading>
                            <Divider></Divider>
                        </Box>
                        <Box p='5'>
                            <Text textAlign={'center'} fontWeight={'bold'} fontSize='lg'>Welcome to News App where you can meet wonderful people and publish some interesting articles!</Text>
                        </Box>
                        <Flex direction={'row'} justifyContent='space-evenly' fontSize={'5rem'} color='black'>
                            <Box bgColor={'gray.200'} p='3' borderRadius={'lg'} w={'10rem'} textAlign={'center'}>
                                <FaNewspaper></FaNewspaper>
                            </Box>
                            <Box bgColor={'gray.200'} p='3' borderRadius={'lg'} w={'10rem'} textAlign={'center'}>
                                <GiNewspaper></GiNewspaper>
                            </Box>
                            <Box bgColor={'gray.200'} p='3' borderRadius={'lg'} w={'10rem'} textAlign={'center'}>
                                <IoNewspaperSharp></IoNewspaperSharp>
                            </Box>
                        </Flex>
                    </Flex>
                </motion.div>
            </Box>

            <Container maxW={'container.xl'} mt={'2rem'} mb={'10rem'}>
                <Heading mb={'1rem'} textAlign={'center'}>Welcome to our vast Database of Information!</Heading>
                <Divider borderColor={'black'} mb={'5rem'}></Divider>

                <motion.div
                    style={{
                        width: '80rem',
                        height: '30rem',
                        boxShadow: '0 .5rem 1rem black',
                        margin: '0 auto'
                    }}
                    initial={{
                        translateX: '5rem',
                        opacity: 0.5
                    }}
                    whileInView={{
                        translateX: '0rem',
                        opacity: 1,
                        transition: {
                            duration: 2,
                            delay: 0.3,
                            type: 'spring',
                        }
                    }}
                >
                    <Flex h={'30rem'}>
                        <Box w={'35%'}>
                            <Img h={'100%'} bgSize={'cover'} src='static/images/News.jpg' />
                        </Box>

                        <Box w={'65%'} p={'5'} alignItems={'stretch'}>
                            <Heading textAlign={'center'}>We love to Know Things</Heading>
                            <Divider borderColor={'black'} mb={'2rem'}></Divider>
                            <Flex direction={'column'} alignItems={'center'}>
                                <Text fontWeight={'bold'}>So We Obiously think everyone need to know.</Text>
                            </Flex>
                        </Box>
                    </Flex>
                </motion.div>
            </Container>

            <Container maxW={'container.lg'} mt={'2rem'} mb={'10rem'}>

                <Heading textAlign={'center'}>Latest Articles</Heading>
                <Divider borderColor={'black'} mb={'2rem'}></Divider>

                <Box>
                    <Flex direction={'column'}>
                        {
                            articles?.map((element: Article, index: number) => (
                                <motion.div
                                    key={index}

                                    initial={{
                                        opacity: 0,
                                        translateX: 500
                                    }}

                                    whileInView={{
                                        opacity: 1,
                                        translateX: 0,
                                        transition: {
                                            type: 'spring',
                                            duration: 2,
                                            delay: 0.3
                                        }
                                    }}

                                    viewport={{
                                        once: true
                                    }}
                                >
                                    <Box bgGradient={'linear(to-b, gray.800, gray.700, gray.800)'} color={'white'} borderRadius={'md'} mb={'2rem'} p='3' shadow={'dark-lg'}>
                                        <Container maxW={'container.lg'} mb={'2rem'}>
                                            <Heading color={'red.400'} textAlign={'center'}>{element.articleHeader}</Heading>
                                            <Divider mb={'2rem'} borderColor={'white'}></Divider>
                                            {
                                                element.articleMainImageURL[0] ?
                                                    <Image src={element.articleMainImageURL[0]} maxH={'30rem'} mx={'auto'} borderRadius={'md'} />
                                                    : null
                                            }

                                            {
                                                element.articleParagraph[0] ?
                                                    <Box mt={'2rem'}>
                                                        <Text noOfLines={9} fontWeight={'bold'}>
                                                            {element.articleParagraph[0]}
                                                        </Text>
                                                    </Box>
                                                    :
                                                    <Box mt={'2rem'}>
                                                        <Text noOfLines={9} fontWeight={'bold'}>
                                                            There's no paragraphs...
                                                        </Text>
                                                    </Box>
                                            }
                                            <Box mt={'2rem'} textAlign={'center'}>
                                                <Button onClick={() => handleOnClickKeepReading(element.articleId)} color={'black'}>Keep Reading <FaLongArrowAltRight></FaLongArrowAltRight> </Button>
                                            </Box>

                                        </Container>
                                    </Box>
                                </motion.div>
                            ))
                        }
                    </Flex>
                </Box>
            </Container>

            <Container maxW={'container.lg'} mb={'5rem'}>
                <Link href='/article/searchArticle'><Heading textAlign={'center'} color={"blue.700"} cursor={'pointer'} _hover={{ color: 'blue.300' }}>Search More Articles</Heading></Link>
            </Container>

        </Box>
    )
}

export default Start;