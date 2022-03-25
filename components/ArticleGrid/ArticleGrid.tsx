import { Box, Divider, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import Link from "next/link";

interface Article {
    articleId: number,
    articleHeader: string,
    articleSubHeader: string,
    articleMainImageURL: string[],
    articleParagraph: string[],
    articleImageURL: string[],
    datePublished: Date,
    createdBY: string
}

function ArticleGrid({ data }: any) {
    const [articles, setArticles] = useState<Article[]>(data as Article[]);

    useEffect(() => {
        console.log('data changed');
        setArticles(data as Article[]);
    }, [data]);

    return (
        <Box>
            <Flex wrap={"wrap"} gap={'2rem'} justifyContent={'center'}>
                {
                    articles?.map((element: Article, index: number) => (
                        <motion.div key={index}
                            whileHover={{
                                scale: 1.1
                            }}
                            animate={{
                                type: 'spring'
                            }}
                            style={{
                                cursor: 'pointer',
                                borderRadius: '13px',
                                height: '17rem',
                                width: '30rem',
                                padding: '2',
                                boxShadow: '0 .5rem 1rem',
                                backgroundColor: '#2D3748',
                                background: `linear-gradient(0deg, rgba(26,32,44,1) 0%, rgba(45,55,72,1) 50%, rgba(26,32,44,1) 100%)`,
                            }}
                        >
                            <Link href={`/article/${element.articleId}`}>

                                <Box p='2'>
                                    <Box bg={""} h={'3rem'} borderRadius={"lg"}>
                                        <Heading isTruncated color={'red.300'} textAlign={'center'}>{element.articleHeader}</Heading>
                                    </Box>
                                    <Divider></Divider>
                                    <Flex mt={'1rem'}>
                                        <Box w={'40%'}>
                                            <Box>
                                                {element.articleMainImageURL[0] ?
                                                    <Image mx={'auto'} borderRadius={'full'} boxSize={'150px'} objectFit={'cover'} src={element.articleMainImageURL[0]} alt='ArticleMainImage' />
                                                    : null}
                                            </Box>
                                        </Box>

                                        <Box w={'60%'} p={'3'}>
                                            <Text noOfLines={6} color={'white'}>
                                                {element.articleParagraph[0] ? element.articleParagraph[0] : null}
                                            </Text>
                                        </Box>
                                    </Flex>
                                </Box>

                            </Link>
                        </motion.div>
                    ))
                }
            </Flex>
        </Box>
    )
}

export default ArticleGrid;