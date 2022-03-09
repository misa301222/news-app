import { Box } from "@chakra-ui/react";

function SeeSubForum({ data }: any) {
    return (
        <Box>
            Subforum
            {
                JSON.stringify(data)
            }
        </Box>
    )
}

export default SeeSubForum;