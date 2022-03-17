import { Box, Container, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdForum } from 'react-icons/md';

interface ForumCategory {
    forumCategoryId: number,
    forumCategoryName: string,
    forumCategoryDescription: string,
    totalSubForums?: number,
}

function Explore({ data }: any) {
    const [forumCategories, setForumCategories] = useState<ForumCategory[]>(data);

    async function getTotalSubForums(forumCategoryId: number) {
        const response = await fetch(`/api/subForum/getTotalSubForumsByForumCategoryId/${forumCategoryId}`, {
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

    const getTotals = async () => {
        let forums: ForumCategory[] = [];
        for (let i = 0; i < forumCategories.length; i++) {
            const responseMessage = await getTotalSubForums(forumCategories[i].forumCategoryId);
            forums[i] = forumCategories[i];
            forums[i].totalSubForums = responseMessage._count;
        }

        setForumCategories(forums);
    }

    useEffect(() => {
        // Some synchronous code.

        (async () => {
            await getTotals();
        })();

        return () => {
            // Component unmount code.
        };
    }, []);

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
                                            <Text>Total SubForums: {element.totalSubForums}</Text>
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