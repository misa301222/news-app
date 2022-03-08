import { Box } from "@chakra-ui/react";

function NewSubForum({ data }: any) {
    return (
        <Box>
            New sub
            {
                    JSON.stringify(data)
            }
        </Box>
    )
}

export default NewSubForum;