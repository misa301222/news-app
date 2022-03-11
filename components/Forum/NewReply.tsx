import { Box, Button, Container, Divider, FormLabel, Heading, Input, Textarea } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { BiMessageDetail } from "react-icons/bi";

interface SubForumReply {
    subForumReplyDescription: string,
    createdBy: string,
    subForumId: number
}

function NewReply() {
    const router = useRouter();
    const { subForumId } = router.query;
    const [description, setDescription] = useState<string>();

    const handleOnChangeDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    }

    return (
        <Box>
            <Container maxW={'container.lg'}>
                <Heading textAlign={'center'} mt={'2rem'}>New Reply <BiMessageDetail></BiMessageDetail></Heading>
                <Divider></Divider>

                <Box shadow={'xl'} p='5' mt={'2rem'}>
                    <form>
                        <Box mb='2rem'>
                            <FormLabel>
                                Message
                            </FormLabel>
                            <Textarea onChange={handleOnChangeDescription} placeholder="Write your reply here..." rows={5} resize={"none"} />
                        </Box>

                        <Box mb='2rem' textAlign={'center'}>
                            <Button type="submit" mx="auto" bg={'red.300'} color={'black'} _hover={{ backgroundColor: 'red.500' }}>Submit</Button>
                        </Box>
                    </form>
                </Box>
            </Container>
        </Box >
    )
}

export default NewReply;