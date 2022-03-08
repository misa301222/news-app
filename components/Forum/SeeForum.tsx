import { Box, Button, Container, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { MdTopic } from "react-icons/md";

function SeeForum({ data }: any) {
    const router = useRouter();

    const handleOnClickNewTopic = () => {
        router.push(`/forums/newSubForum/`);
    }

    return (
        <Box>
            <Container maxW={'container.lg'}>
                <Heading textAlign={'center'} mt={'2rem'}>Explore SubForums</Heading>


                <Box mt={'2rem'} textAlign={'end'}>
                    <Button onClick={handleOnClickNewTopic}><MdTopic></MdTopic> New Topic</Button>
                </Box>
                
            </Container>
        </Box>
    )
}

export default SeeForum;