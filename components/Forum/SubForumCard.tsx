import { Box, Button, Container, Divider, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { motion } from 'framer-motion';
import Link from "next/link";

function SubForumCard({ data }: any) {

    return (
        <motion.div
            whileHover={{
                scale: 1.1
            }}
            animate={{
                type: 'spring'
            }}
            style={{
                width: '50rem',
                backgroundColor: '#2D3748',
                padding: '1rem',
                borderRadius: '13px',
                cursor: 'pointer',
                marginBottom: '2rem'
            }}>
            <Link href={`/forums/seeSubForum/${data.subForumId}`}>
                <Flex>
                    <Box w={'75%'}>
                        <Heading fontSize={'2xl'} color={'red.300'} isTruncated>{data.subForumName}</Heading>
                        <Text fontWeight={'bold'} isTruncated>- {data.subForumDescription}</Text>
                        <Text fontStyle={'italic'}>SubForum Created by: {data.createdBy}</Text>
                        <Text>({data.subForumImageURL.length}) Image(s)</Text>
                    </Box>

                    <Box w={'25%'}>
                        <Flex wrap={'wrap'} gap={'0.5rem'} justifyContent={'center'}>
                            {
                                data.subForumImageURL?.filter((imageURL: string, index: number) => index < 2).map((imageURL: string) => (
                                    <Image key={imageURL} mt={'1rem'} src={imageURL} maxW={'5rem'} maxH={'5rem'} />
                                ))

                            }
                        </Flex>
                    </Box>
                </Flex>
            </Link>
        </motion.div>
    )
}

export default SubForumCard;