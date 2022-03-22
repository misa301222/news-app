import { Box, Button, Container, Divider, Flex, FormLabel, Heading, Image, Img, Input, Text } from "@chakra-ui/react";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { RiArticleFill } from "react-icons/ri";
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
    createdBy: string
}

function SearchArticle() {
    const [searchArticle, setSearchArticle] = useState<string>('');
    const [articles, setArticles] = useState<Article[]>();
    const [isEmpty, setIsEmpty] = useState<boolean>(false);

    const handleOnChangeSearchArticle = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchArticle(event.target.value);
    }

    async function searchArticleByArticleHeader(articleHeader: string) {
        const response = await fetch(`/api/article/getArticleByArticleHeader/${articleHeader}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET'
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong!');
        }

        return data;
    }

    const handleOnSubmitArticleSearch = async (event: SyntheticEvent) => {
        event.preventDefault();

        const response = await searchArticleByArticleHeader(searchArticle);
        setArticles(response);
        if (response.length) {
            setIsEmpty(false);
        } else {
            setIsEmpty(true);
        }
    }

    return (
        <Box>
            <Container maxW={'container.xl'}>
                <Heading mt={'2rem'} textAlign={'center'}>Search Article<RiArticleFill></RiArticleFill></Heading>
                <Divider></Divider>

                <Box p={'3'} mt={'1rem'} shadow={'md'}>
                    <form onSubmit={handleOnSubmitArticleSearch}>
                        <Flex gap={'1rem'} mt={'2rem'} mb={'2rem'} direction={'row'} alignItems={'center'}>
                            <FormLabel textAlign={'end'}>Name</FormLabel>
                            <Input onChange={handleOnChangeSearchArticle} type={'text'} maxLength={256} placeholder={'Search by Article Name....'} />
                            <Button disabled={!searchArticle} type="submit"><FaSearch fontSize={'2rem'}></FaSearch>&nbsp; Search </Button>
                        </Flex>
                    </form>
                </Box>


                <Box p={'2'} mt={'5rem'}>
                    <Flex wrap={"wrap"} gap={'2rem'} justifyContent={'center'}>
                        {
                            !isEmpty ?
                                articles?.map((element: Article, index: number) => (
                                    <motion.div key={index}
                                        initial={{
                                            opacity: 0
                                        }}
                                        whileHover={{
                                            scale: 1.1
                                        }}
                                        animate={{
                                            type: 'spring',
                                            opacity: 1
                                        }}
                                        style={{
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <Link href={`/article/${element.articleId}`}>
                                            <Box p={'2'} borderRadius={'2xl'} height={'17rem'} w={'30rem'} bgGradient={'linear(to-b, gray.800, gray.700, gray.800)'}>
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
                                :
                                <motion.div
                                    initial={{
                                        opacity: 0
                                    }}
                                    animate={{
                                        opacity: 1
                                    }}>
                                    <Heading>There's no articles...</Heading>
                                </motion.div>
                        }
                    </Flex>
                </Box>

            </Container>
        </Box>
    )
}

export default SearchArticle;