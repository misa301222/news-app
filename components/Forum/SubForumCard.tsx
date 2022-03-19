import { Box, Button, Container, Divider, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { motion } from 'framer-motion';
import moment from "moment";
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
                //backgroundColor: '#2D3748',
                padding: '1rem',
                borderRadius: '7px',
                cursor: 'pointer',
                marginBottom: '2rem',
                background: `linear-gradient(0deg, rgba(26,32,44,1) 0%, rgba(74,85,104,1) 100%)`,
                boxShadow: '0 0.5rem 0.5rem black',
            }}>
            <Link href={`/forums/seeSubForum/${data.subForumId}`}>
                <Flex>
                    <Box w={'75%'}>
                        <Box bgColor={'gray.500'} p='3' mb='0.5rem' borderRadius={'sm'}>
                            <Heading fontSize={'2xl'} color={'gray.900'} isTruncated>{data.subForumName}</Heading>
                        </Box>

                        <Box ml={'1rem'}>
                            <Text fontWeight={'bold'} isTruncated>- {data.subForumDescription}</Text>
                            <Text fontStyle={'italic'}>SubForum Created by: {data.createdBy}</Text>
                            <Text fontStyle={'italic'}>Created In: {moment(data.dateCreated).format('MM/DD/YYYY')}</Text>
                            <Text>({data.subForumImageURL.length}) Image(s)</Text>
                        </Box>
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