import { Box, Button, Container, Divider, Flex, Heading, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsFillBookFill, BsFillPlusSquareFill } from "react-icons/bs";
import { FaNewspaper } from "react-icons/fa";
import { MdArticle } from "react-icons/md";
import { RiDeleteBack2Fill } from "react-icons/ri";

interface Article {
    articleHeader: string,
    articleSubHeader: string,
    articleMainImageURL: string[],
    articleParagraph: string[],
    articleImageURL: string[],
    createdBY: string
}

function ExplorePublish() {
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [articles, setArticles] = useState<Article[]>();

    const handleOnClickSeeArtticles = async () => {
        onOpen();
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

    const handleOnCickPublishArticle = () => {
        router.push('/publish/publish');
    }

    return (
        <Box>
            <Container maxW={'container.xl'} mt='2rem'>
                <Box>
                    <Heading>Publish <FaNewspaper></FaNewspaper></Heading>
                    <Divider></Divider>

                    <Flex justifyContent={'space-evenly'} mt={'2rem'} cursor='pointer'>
                        <motion.div
                            whileHover={{
                                scale: 1.1
                            }}
                            animate={{
                                type: 'spring'

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
                            onClick={async () => handleOnClickSeeArtticles()}
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
            </Container>

            <Modal onClose={onClose} size={'full'} isOpen={isOpen}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader bg={'gray.700'} fontSize={'2xl'} color={'white'}>Your Articles <MdArticle></MdArticle></ModalHeader>
                    <ModalCloseButton color={'white'} />
                    <ModalBody>
                        <Container>
                            {
                                articles?.map((element: Article, index: number) => (
                                    <Box key={index}>
                                        {/* TODO CREATE NEW ARTICLE COMPONENT AND REDIRECT HERE */}
                                        <Link href={`/`}>
                                            {element.articleHeader}
                                        </Link>
                                    </Box>
                                ))
                            }
                        </Container>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </Box>
    )
}

export default ExplorePublish;