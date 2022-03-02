import { Box, Container, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { BsFillBookFill, BsFillPlusSquareFill } from "react-icons/bs";
import { FaNewspaper } from "react-icons/fa";
import { RiDeleteBack2Fill } from "react-icons/ri";

function ExplorePublish() {
    const router = useRouter();

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
        </Box>
    )
}

export default ExplorePublish;