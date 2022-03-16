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
                                cursor: 'pointer'
                            }}
                        >
                            <Link href={`/article/${element.articleId}`}>
                                <Box bgColor={"gray.700"} p={'2'} borderRadius={'2xl'} height={'17rem'} w={'30rem'}>
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