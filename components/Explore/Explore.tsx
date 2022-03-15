import { Box, Container, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdForum } from 'react-icons/md';

interface ForumCategory {
    forumCategoryId: number,
    forumCategoryName: string,
    forumCategoryDescription: string
}

function Explore({ data }: any) {
    const [forumCategories, setForumCategories] = useState<ForumCategory[]>(data);

    return (
        <Box mt={"2rem"}>
            <Container maxW={'container.xl'}>

                <Heading>Forum Categories <MdForum></MdForum> </Heading>

                <Divider mt={'1rem'} mb='2rem'></Divider>

                {
                    forumCategories?.map((element: ForumCategory, index: number) => (
                        <Link href={`/forums/enterForum/${element.forumCategoryId}`} key={index}>
                            <motion.div
                                whileHover={{
                                    scale: 1.05
                                }}
                                animate={{
                                    type: 'spring',
                                }}>
                                <Box mb={'2rem'} cursor={'pointer'} borderRadius={'0.3rem'} shadow={'lg'}>
                                    <Box p='3' backgroundColor={'gray.700'} borderTopRadius={'0.3rem'} color={'white'}>
                                        <Heading size={"lg"} fontWeight={'bold'}>{element.forumCategoryName}</Heading>
                                    </Box>
                                    <Divider borderColor={'black'}></Divider>
                                    <Box p={'2'}>
                                        <Text noOfLines={3} fontWeight={'bold'} pl='0.8rem'>{element.forumCategoryDescription}</Text>
                                    </Box>
                                    <Box p={'2'} fontWeight='bold'>
                                        <Box backgroundColor={'gray.200'} color={'black'} borderRadius={'md'} p='2'>
                                            <Text>Total SubForums: </Text>
                                            <Text>Total Messages: </Text>
                                        </Box>
                                    </Box>
                                </Box>
                            </motion.div>
                        </Link>
                    ))
                }

            </Container>
        </Box>
    )
}

export default Explore;