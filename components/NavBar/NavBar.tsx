import {
    Box,
    Flex,
    Avatar,
    HStack,
    Link,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    Text,
} from '@chakra-ui/react';

import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { ReactNode } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { IoNewspaper } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { FaCompass, FaNewspaper, FaUserAlt, FaUserCircle } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { GrConfigure } from "react-icons/gr";
import { MdForum } from 'react-icons/md';
import { ImHome } from 'react-icons/im';
import { RiArticleFill } from 'react-icons/ri';

const Links = ['Home', 'SignIn', 'Login'];

const NavLink = ({ children }: { children: ReactNode }) => (
    <Link
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        href={`/${children}`}>
        {children}
    </Link>
);

function NavBar(props: any) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { data: session, status }: any = useSession();
    const router = useRouter();

    function logoutHandler() {
        localStorage.clear();
        signOut({
            callbackUrl: '/'
        });
    }

    const handleClickPublish = () => {
        router.push('/publish/publish');
    }

    const handleClickProfile = () => {
        const { email } = session.user;
        router.push(`/profile/${email}`);
    }

    const handleClickSettings = () => {
        router.push('/settings');
    }

    return (
        <>
            <Box bg={useColorModeValue('gray.200', 'gray.900')} px={4} shadow='sm'>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <motion.div
                            whileHover={{
                                color: '#F56565'
                            }}
                            transition={{
                                type: 'spring'
                            }}>
                            <Link href="/" style={{ textDecoration: 'none' }}>
                                <Flex cursor={'pointer'} display={'inline-flex'} alignItems={'center'} fontSize={'4xl'} fontWeight={'bold'}><IoNewspaper></IoNewspaper> <Text>News App</Text></Flex>
                            </Link>
                        </motion.div>
                        <HStack
                            as={'nav'}
                            spacing={4}
                            display={{ base: 'none', md: 'flex' }}>

                            <Link
                                px={2}
                                py={1}
                                rounded={'md'}
                                _hover={{
                                    textDecoration: 'none',
                                    bg: useColorModeValue('gray.300', 'gray.700'),
                                }}
                                href={`/`}>
                                <Text fontWeight={'bold'}><ImHome></ImHome>Home</Text>
                            </Link>

                            <Link
                                px={2}
                                py={1}
                                rounded={'md'}
                                _hover={{
                                    textDecoration: 'none',
                                    bg: useColorModeValue('gray.300', 'gray.700'),
                                }}
                                href={`/publish/explorePublish`}>
                                <Text fontWeight={'bold'}><FaCompass></FaCompass>Explore</Text>
                            </Link>

                            <Link
                                px={2}
                                py={1}
                                rounded={'md'}
                                _hover={{
                                    textDecoration: 'none',
                                    bg: useColorModeValue('gray.300', 'gray.700'),
                                }}
                                href={`/forums/explore`}>
                                <Text fontWeight={'bold'}><MdForum></MdForum>Forums</Text>
                            </Link>

                            <Link
                                px={2}
                                py={1}
                                rounded={'md'}
                                _hover={{
                                    textDecoration: 'none',
                                    bg: useColorModeValue('gray.300', 'gray.700'),
                                }}
                                href={`/users/searchUsers`}>
                                <Text fontWeight={'bold'}><FaUserAlt></FaUserAlt>Users</Text>
                            </Link>

                            <Link
                                px={2}
                                py={1}
                                rounded={'md'}
                                _hover={{
                                    textDecoration: 'none',
                                    bg: useColorModeValue('gray.300', 'gray.700'),
                                }}
                                href={`/article/searchArticle`}>
                                <Text fontWeight={'bold'}><RiArticleFill></RiArticleFill>Articles</Text>
                            </Link>

                            {session || status === 'loading' ?
                                null :
                                <Link
                                    px={2}
                                    py={1}
                                    rounded={'md'}
                                    _hover={{
                                        textDecoration: 'none',
                                        bg: useColorModeValue('gray.200', 'gray.700'),
                                    }}
                                    href={`/login`}>
                                    Login
                                </Link>
                            }

                            {session || status === 'loading' ?
                                null :
                                <Link
                                    px={2}
                                    py={1}
                                    rounded={'md'}
                                    _hover={{
                                        textDecoration: 'none',
                                        bg: useColorModeValue('gray.200', 'gray.700'),
                                    }}
                                    href={`/signUp`}>
                                    SignUp
                                </Link>
                            }
                        </HStack>
                    </HStack>
                    <Flex alignItems={'center'}>
                        {session && (
                            <Menu>
                                <MenuButton
                                    as={Button}
                                    rounded={'full'}
                                    variant={'link'}
                                    cursor={'pointer'}
                                    minW={0}>
                                    <Avatar
                                        size={'sm'}
                                        src={
                                            `${session.user.profileImageURL}`
                                        }
                                    />
                                </MenuButton>
                                <MenuList>
                                    <MenuItem onClick={() => handleClickProfile()} fontWeight={'bold'} fontSize={'md'}><FaUserCircle></FaUserCircle><Text pl={'0.5rem'}>Profile</Text></MenuItem>
                                    <MenuItem onClick={() => handleClickPublish()} fontWeight={'bold'} fontSize={'md'}><FaNewspaper></FaNewspaper> <Text pl={'0.5rem'}>Publish</Text></MenuItem>
                                    <MenuItem onClick={() => handleClickSettings()} fontWeight={'bold'} fontSize={'md'}><GrConfigure></GrConfigure> <Text pl={'0.5rem'}>Settings</Text></MenuItem>
                                    <MenuDivider />
                                    <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                                </MenuList>
                            </Menu>)
                        }
                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            {Links.map((link) => (
                                <NavLink key={link}>{link}</NavLink>
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    )
}

export default NavBar;