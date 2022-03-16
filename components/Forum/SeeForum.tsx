import { Box, Button, Container, Divider, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdTopic } from "react-icons/md";
import { motion } from 'framer-motion';
import Link from "next/link";
import { FaComments } from "react-icons/fa";
import PaginationSubForum from "../Pagination/PaginationSubForum";
import SubForumCard from "./SubForumCard";

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
                <Heading textAlign={'center'} mt={'2rem'}>Explore SubForums <FaComments></FaComments></Heading>
                <Divider mb={'2rem'}></Divider>

                <Box mt={'2rem'} mb={'2rem'} textAlign={'end'}>
                    <Button onClick={handleOnClickNewTopic}><MdTopic></MdTopic> New Topic</Button>
                </Box>

                <PaginationSubForum data={subForums}
                    RenderComponent={SubForumCard}
                    title="SubForum"
                    pageLimit={0}
                    dataLimit={5} />
            </Container>            
        </Box>
    )
}

export default SeeForum;