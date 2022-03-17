import { Box, Container, Divider, Flex, Heading, Img, Text } from "@chakra-ui/react";
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
                    whileInView={{
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

            <Container maxW={'container.xl'} mt={'2rem'} mb={'10rem'}>
                <Heading mb={'1rem'} textAlign={'center'}>Welcome to our vast Database of Information!</Heading>
                <Divider borderColor={'black'} mb={'5rem'}></Divider>

                <motion.div
                    style={{
                        width: '80rem',
                        height: '30rem',
                        boxShadow: '0 .5rem 1rem black',
                        margin: '0 auto'
                    }}
                    initial={{
                        translateX: '5rem',
                        opacity: 0.5
                    }}
                    whileInView={{
                        translateX: '0rem',
                        opacity: 1,
                        transition: {
                            duration: 2,
                            delay: 0.3,
                            type: 'spring',
                        }
                    }}
                >
                    <Flex h={'30rem'}>
                        <Box w={'35%'}>
                            <Img h={'100%'} bgSize={'cover'} src='static/images/News.jpg' />
                        </Box>

                        <Box w={'65%'} p={'5'} alignItems={'stretch'}>
                            <Heading textAlign={'center'}>We love to Know Things</Heading>
                            <Divider borderColor={'black'} mb={'2rem'}></Divider>
                            <Flex direction={'column'} alignItems={'center'}>
                                <Text fontWeight={'bold'}>So We Obiously think everyone need to know.</Text>
                            </Flex>
                        </Box>
                    </Flex>
                </motion.div>
            </Container>

            <Container maxW={'container.xl'} mt={'2rem'} mb={'10rem'}>
                {/* TODO GET SOME ARTICLES AND SHOW THEM HERE */}
            </Container>

        </Box >
    )
}

export default Start;