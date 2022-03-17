import { Box, Button, Container, Divider, Flex, Heading, Image, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text, useDisclosure } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { SyntheticEvent, useState } from "react";
import { BsFillBookFill, BsFillPlusSquareFill } from "react-icons/bs";
import { FaCompass, FaNewspaper } from "react-icons/fa";
import { MdArticle } from "react-icons/md";
import { RiDeleteBack2Fill } from "react-icons/ri";
import Swal from "sweetalert2";
import ArticleGrid from "../ArticleGrid/ArticleGrid";

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

function ExplorePublish({ data }: any) {
    const router = useRouter();
    const { isOpen: isShowOpen, onOpen: onShowOpen, onClose: onShowClose } = useDisclosure();
    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
    const [articles, setArticles] = useState<Article[]>();
    const [selectedArticleId, setSelectedArticleId] = useState<number>(0);
    const [articlesExplore, setArticlesExplore] = useState<Article[]>(data as Article[]);

    const handleOnClickSeeArticles = async () => {
        onShowOpen();
        const email: string = localStorage.getItem('email')!;
        if (email) {
            const response = await fetch(`/api/article/getArticleByEmail/${email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong!');
            }

            setArticles(data);
        }
    }

    const handleOnClickDeleteArticles = async () => {
        onDeleteOpen();
        const email: string = localStorage.getItem('email')!;
        if (email) {
            const response = await fetch(`/api/article/getArticleByEmail/${email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong!');
            }

            setArticles(data);
        }
    }

    async function deleteArticle(selectedArticleId: number) {
        const response = await fetch(`/api/article/getArticleByArticleId/${selectedArticleId}`, {
            method: 'DELETE',
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

    const handleOnSubmitDeleteArticle = async (event: SyntheticEvent) => {
        event.preventDefault();

        const response = await deleteArticle(selectedArticleId);

        if (response) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Article Deleted!',
                showConfirmButton: true,
            }).then(async () => {
                onDeleteClose();
                const dataArticleExplore = await getArticleByDateCreatedLastTwenty();
                setArticlesExplore(dataArticleExplore);
            });
        }
    }

    async function getArticleByDateCreatedLastTwenty() {
        const response = await fetch(`/api/article/getArticleByDateCreatedLastTwenty/articleAPI`, {
            method: 'GET',
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

    const handleOnCickPublishArticle = () => {
        router.push('/publish/publish');
    }

    return (
        <Box>
            <Container maxW={'container.xl'} mt='2rem'>
                <Box>
                    <Heading>Publish <FaNewspaper></FaNewspaper></Heading>
                    <Divider></Divider>

                    <Flex wrap={"wrap"} justifyContent={'center'} gap={'5rem'} mt={'2rem'} cursor='pointer'>
                        <motion.div
                            whileHover={{
                                scale: 1.1
                            }}
                            initial={{
                                opacity: 0.8,
                                translateX: '1.5rem'
                            }}
                            whileInView={{
                                opacity: 1,
                                translateX: '0rem',
                                transition: {
                                    type: 'spring',
                                    duration: 1
                                }
                            }}
                            animate={{
                                type: 'spring',
                            }}
                            onClick={() => handleOnCickPublishArticle()}
                        >
                            <Box p='1' bgColor={'gray.700'} color={'white'} borderRadius={"xl"} w={'22rem'} h={'8rem'} shadow={'dark-lg'}>
                                <Flex direction={'row'}>
                                    <Box p='2'>
                                        <Text fontWeight='bold' fontSize={'5rem'} color='blue.300'>
                                            <BsFillPlusSquareFill></BsFillPlusSquareFill>
                                        </Text>
                                    </Box>

                                    <Box mx='auto' p='2'>
                                        <Flex direction={'column'}>
                                            <Heading color={'red.300'} textAlign={'center'} fontSize={'2xl'}>Publish Article</Heading>
                                            <Divider></Divider>
                                            <Box mt='0.5rem' fontWeight={'bold'} p='2'><Text>Add a new Article, lot of text and images!</Text></Box>
                                        </Flex>
                                    </Box>
                                </Flex>
                            </Box>
                        </motion.div>

                        <motion.div
                            whileHover={{
                                scale: 1.1
                            }}
                            animate={{
                                type: 'spring'

                            }}
                            initial={{
                                opacity: 0.8,
                                translateX: '1.5rem'
                            }}
                            whileInView={{
                                opacity: 1,
                                translateX: '0rem',
                                transition: {
                                    type: 'spring',
                                    duration: 1
                                }
                            }}
                            onClick={async () => handleOnClickSeeArticles()}
                        >
                            <Box p='1' bgColor={'gray.700'} color={'white'} borderRadius={"xl"} w={'22rem'} h={'8rem'} shadow={'dark-lg'}>
                                <Flex direction={'row'}>
                                    <Box p='2'>
                                        <Text fontWeight='bold' fontSize={'5rem'} color='gray.200'>
                                            <BsFillBookFill></BsFillBookFill>
                                        </Text>
                                    </Box>

                                    <Box mx='auto' p='2'>
                                        <Flex direction={'column'}>
                                            <Heading color={'red.300'} textAlign={'center'} fontSize={'2xl'}>See Your Articles</Heading>
                                            <Divider></Divider>
                                            <Box mt='0.5rem' fontWeight={'bold'} p='2'><Text>See all your written articles.</Text></Box>
                                        </Flex>
                                    </Box>
                                </Flex>
                            </Box>
                        </motion.div>

                        <motion.div
                            whileHover={{
                                scale: 1.1
                            }}
                            animate={{
                                type: 'spring'

                            }}
                            initial={{
                                opacity: 0.8,
                                translateX: '1.5rem'
                            }}
                            whileInView={{
                                opacity: 1,
                                translateX: '0rem',
                                transition: {
                                    type: 'spring',
                                    duration: 1
                                }
                            }}
                            onClick={async () => handleOnClickDeleteArticles()}
                        >
                            <Box p='1' bgColor={'gray.700'} color={'white'} borderRadius={"xl"} w={'22rem'} h={'8rem'} shadow={'dark-lg'}>
                                <Flex direction={'row'}>
                                    <Box p='2'>
                                        <Text color={'red.500'} fontWeight='bold' fontSize={'5rem'}>
                                            <RiDeleteBack2Fill></RiDeleteBack2Fill>
                                        </Text>
                                    </Box>

                                    <Box mx='auto' p='2'>
                                        <Flex direction={'column'}>
                                            <Heading color={'red.300'} textAlign={'center'} fontSize={'2xl'}>Delete An Article</Heading>
                                            <Divider></Divider>
                                            <Box mt='0.5rem' fontWeight={'bold'} p='2'><Text>Delete articles published by you.</Text></Box>
                                        </Flex>
                                    </Box>
                                </Flex>
                            </Box>
                        </motion.div>
                    </Flex>
                </Box>

                <Box mt={'5rem'} mb={'10rem'}>
                    <Heading textAlign={'center'} mb={'1rem'}>Explore <FaCompass></FaCompass></Heading>
                    <Divider mb={'2rem'}></Divider>
                    <Box mb={'1rem'} textAlign={'end'}>
                        <Button onClick={() => router.push('/article/searchArticle')} color='white' bgColor={'red.400'} _hover={{ bgColor: 'red.500' }} shadow='md'>Search Articles</Button>
                    </Box>
                    <ArticleGrid data={articlesExplore} />
                </Box>

            </Container>

            <Modal onClose={onShowClose} size={'full'} isOpen={isShowOpen}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader bg={'gray.700'} fontSize={'2xl'} color={'white'}>Your Articles <MdArticle></MdArticle></ModalHeader>
                    <ModalCloseButton color={'white'} />
                    <ModalBody>
                        <Container maxW={'full'} mt={'1rem'}>
                            <Flex wrap={"wrap"} gap={'5rem'} justifyContent={'center'}>
                                {
                                    articles?.map((element: Article, index: number) => (
                                        <motion.div key={index}
                                            whileHover={{
                                                scale: 1.1
                                            }}
                                            animate={{
                                                type: 'spring'
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
                        </Container>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onShowClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal onClose={onDeleteClose} size={'lg'} isOpen={isDeleteOpen}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader bg={'gray.700'} fontSize={'2xl'} color={'white'}>Your Articles <MdArticle></MdArticle></ModalHeader>
                    <ModalCloseButton color={'white'} />
                    <ModalBody>
                        <Container maxW={'full'} mt={'1rem'}>
                            <form onSubmit={handleOnSubmitDeleteArticle}>
                                <Box mb='2rem'>
                                    <Select onChange={(e) => setSelectedArticleId(Number(e.target.value))}>
                                        <option value={0}>Select a value</option>
                                        {
                                            articles?.map((element: Article, index: number) => (
                                                <option key={index} value={element.articleId}>
                                                    {element.articleHeader}
                                                </option>
                                            ))
                                        }
                                    </Select>
                                </Box>

                                <Box textAlign={'center'}>
                                    <Button type="submit" disabled={selectedArticleId === 0} mx="auto" bg={'red.300'} color={'black'} _hover={{ backgroundColor: 'red.500' }}>Submit</Button>
                                </Box>
                            </form>
                        </Container>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onDeleteClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </Box>
    )
}

export default ExplorePublish;