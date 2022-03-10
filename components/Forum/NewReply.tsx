import { Box, Container } from "@chakra-ui/react";
import { useRouter } from "next/router";

function NewReply() {
    const router = useRouter();
    const { subForumId } = router.query;

    return (
        <Box>
            <Container>
                <form>

                </form>
            </Container>
        </Box >
    )
}

export default NewReply;