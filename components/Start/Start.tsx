import { Box, Container, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { motion } from 'framer-motion';
import { FaNewspaper } from "react-icons/fa";
import { GiNewspaper } from 'react-icons/gi'
import { IoNewspaperSharp } from "react-icons/io5";

function Start() {
    const { data: session, status } = useSession();

    return (
        <Box>
            <Box style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(static/images/News.jpg)`,
                backgroundSize: 'cover',
                backgroundPosition: 'cover',
                height: '50rem',
                paddingTop: '15rem',
            }}>
                <motion.div
                    style={{
                        minHeight: '25rem',
                        maxWidth: '50rem',
                        margin: '0 auto',
                        color: 'white',
                        backdropFilter: 'blur(5px)',
                        borderRadius: '13px',
                        borderWidth: '1px',
                        // borderColor: 'white'
                    }}
                    initial={{
                        translateX: '5rem',
                        opacity: 0.5
                    }}
                    animate={{
                        translateX: '0rem',
                        opacity: 1,
                        transition: {
                            duration: 2,
                            delay: 0.3,
                            type: 'spring',
                        }
                    }}

                    viewport={{
                        once: false
                    }}

                    whileHover={{
                        scale: 1.1,
                    }}
                    transition={{
                        duration: 1,
                        type: 'spring',
                    }}>
                    <Flex direction={'column'} justifyContent={'center'}>
                        <Box p='5'>
                            <Heading mb={'0.5rem'} color={'gray.200'} textAlign={'center'}>Welcome!</Heading>
                            <Divider></Divider>
                        </Box>
                        <Box p='5'>
                            <Text textAlign={'center'} fontWeight={'bold'} fontSize='lg'>Welcome to News App where you can meet wonderful people and publish some interesting articles!</Text>
                        </Box>
                        <Flex direction={'row'} justifyContent='space-evenly' fontSize={'5rem'} color='black'>
                            <Box bgColor={'gray.200'} p='3' borderRadius={'lg'} w={'10rem'} textAlign={'center'}>
                                <FaNewspaper></FaNewspaper>
                            </Box>
                            <Box bgColor={'gray.200'} p='3' borderRadius={'lg'} w={'10rem'} textAlign={'center'}>
                                <GiNewspaper></GiNewspaper>
                            </Box>
                            <Box bgColor={'gray.200'} p='3' borderRadius={'lg'} w={'10rem'} textAlign={'center'}>
                                <IoNewspaperSharp></IoNewspaperSharp>
                            </Box>
                        </Flex>
                    </Flex>
                </motion.div>
            </Box>

            <Container maxW={'container.xl'} mt={'2rem'}>
                    <Heading textAlign={'center'}>Welcome to our vast Database of Information!</Heading>



            </Container>

        </Box >
    )
}

export default Start;