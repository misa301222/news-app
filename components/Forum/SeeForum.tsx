import { Box, Button, Container, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { MdTopic } from "react-icons/md";
import { motion } from 'framer-motion';
import Link from "next/link";

interface SubForum {
    subForumId: number,
    subForumName: string,
    subForumDescription: string,
    subForumImageURL: string[],
    dateCreated: Date,
    createdBy: string,
    forumCategoryId: number
}

function SeeForum({ data }: any) {
    const router = useRouter();
    const [subForums, setSubForums] = useState<SubForum[]>(data as SubForum[]);

    const handleOnClickNewTopic = () => {
        const { forumCategoryId } = router.query;
        router.push({ pathname: `/forums/newSubForum/`, query: { forumCategoryId: forumCategoryId } })
    }

    return (
        <Box>
            <Container maxW={'container.lg'}>
                <Heading textAlign={'center'} mt={'2rem'}>Explore SubForums</Heading>


                <Box mt={'2rem'} textAlign={'end'}>
                    <Button onClick={handleOnClickNewTopic}><MdTopic></MdTopic> New Topic</Button>
                </Box>
            </Container>

            <Box maxW={'90%'} mx='auto' color={'white'}>
                {
                    subForums.map((element: SubForum, index: number) => (
                        <motion.div
                            whileHover={{
                                scale: 1.1
                            }}
                            animate={{
                                type: 'spring'
                            }}
                            key={index}
                            style={{
                                width: '50rem',
                                backgroundColor: '#2D3748',
                                padding: '1rem',
                                borderRadius: '13px',
                                cursor: 'pointer',
                                marginBottom: '2rem'
                            }}>
                            <Link href={`/forums/seeSubForum/${element.subForumId}`}>
                                <Box>
                                    <Heading fontSize={'xl'} color={'red.300'} isTruncated>{element.subForumName}</Heading>
                                    <Text fontWeight={'bold'} isTruncated>- {element.subForumDescription}</Text>
                                </Box>
                            </Link>
                        </motion.div>
                    ))
                }
            </Box>
        </Box>
    )
}

export default SeeForum;