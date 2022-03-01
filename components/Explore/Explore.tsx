import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface ForumCategory {
    forumCategoryId: number,
    forumCategoryName: string
}

function Explore({ data }: any) {
    const [forumCategories, setForumCategories] = useState<ForumCategory[]>(data);

    return (
        <div>
            {
                forumCategories?.map((element: ForumCategory, index: number) => (
                    <Box key={index}>
                        {element.forumCategoryName}
                    </Box>
                ))
            }
        </div>
    )
}

export default Explore;