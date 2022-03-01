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

    function logoutHandler() {
        localStorage.clear();
        signOut({
            callbackUrl: '/'
        });
    }

    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
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
                                <Text fontWeight={'bold'}>Home</Text>
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
                                <Text fontWeight={'bold'}>Forums</Text>
                            </Link>

                            {!session && (
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
                                </Link>)
                            }

                            {!session && (
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
                                </Link>)
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
                                    <MenuItem>Link 1</MenuItem>
                                    <MenuItem>Link 2</MenuItem>
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