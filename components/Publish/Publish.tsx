import { Box, Button, Container, Divider, Flex, FormLabel, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, useDisclosure } from "@chakra-ui/react";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { BsFillImageFill, BsParagraph } from "react-icons/bs";
import { FaNewspaper, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

interface Article {
    articleHeader: string,
    articleSubHeader: string,
    articleMainImageURL: string[],
    articleParagraph: string[],
    articleImageURL: string[],
    datePublished: Date,
    createdBy: string
}

function Publish() {
    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
    const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();

    const { isOpen: isArticleImageEditOpen, onOpen: onArticleImageEditOpen, onClose: onArticleImageEditClose } = useDisclosure();
    const { isOpen: isArticleImageAddOpen, onOpen: onArticleImageAddOpen, onClose: onArticleImageAddClose } = useDisclosure();

    const { isOpen: isParagraphEditOpen, onOpen: onParagraphEditOpen, onClose: onParagraphEditClose } = useDisclosure();
    const { isOpen: isParagraphAddOpen, onOpen: onParagraphAddOpen, onClose: onParagraphAddClose } = useDisclosure();

    const [article, setArticle] = useState<Article>({
        articleHeader: '',
        articleSubHeader: '',
        articleMainImageURL: [''],
        articleParagraph: [''],
        articleImageURL: [''],
        datePublished: new Date(),
        createdBy: ''
    });

    const [imagesMainURL, setImagesMainURL] = useState<string[]>([]);
    const [imageMainURLText, setImageMainURLText] = useState<string>('');

    const [articleImagesURL, setArticleImagesURL] = useState<string[]>([]);
    const [articleImageURLText, setArticleImageURLText] = useState<string>('');

    const [articleParagraphs, setArticleParagraphs] = useState<string[]>([]);
    const [articleParagraphText, setArticleParagraphText] = useState<string>('');

    const handleOnChangeHeader = (event: ChangeEvent<HTMLInputElement>) => {
        setArticle(prev => ({ ...prev, articleHeader: event.target.value }));
    }

    const handleOnChangeSubHeader = (event: ChangeEvent<HTMLInputElement>) => {
        setArticle(prev => ({ ...prev, articleSubHeader: event.target.value }));
    }

    const handleOnImageURLTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        setImageMainURLText(event.target.value);
    }

    const handleOnArticleImageURLTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        setArticleImageURLText(event.target.value);
    }

    const handleOnSubmitNewImageURL = (event: SyntheticEvent) => {
        event.preventDefault();

        if (imagesMainURL.includes(imageMainURLText)) {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'That link already exists!',
                showConfirmButton: true,
            }).then(() => {

            });
        } else {
            setImagesMainURL(prev => [...prev, imageMainURLText]);

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Image Added!',
                showConfirmButton: true,
            }).then(() => {
                onAddClose();
            });
        }
    }

    const handleOnSubmitNewArticleImageURL = (event: SyntheticEvent) => {
        event.preventDefault();

        if (articleImagesURL.includes(articleImageURLText)) {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'That link already exists!',
                showConfirmButton: true,
            }).then(() => {

            });
        } else {
            setArticleImagesURL(prev => [...prev, articleImageURLText]);

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Image Added!',
                showConfirmButton: true,
            }).then(() => {
                onArticleImageAddClose();
            });
        }
    }

    const handleOnChangeArticleParagraphText = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setArticleParagraphText(event.target.value);
    }

    const handleOnSubmitNewParagraph = (event: SyntheticEvent) => {
        event.preventDefault();

        setArticleParagraphs(prev => [...prev, articleParagraphText]);
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Paragraph Added!',
            showConfirmButton: true,
        }).then(() => {
            onParagraphAddClose();
        });
    }

    const handleOnClickDeleteImageURL = (element: string) => {
        let newArray: string[] = [];
        for (let i = 0; i < imagesMainURL.length; i++) {
            if (imagesMainURL[i] !== element) {
                newArray.push(imagesMainURL[i]);
            }
        }

        setImagesMainURL(newArray);
    }

    const handleOnClickDeleteArticleImageURL = (element: string) => {
        let newArray: string[] = [];
        for (let i = 0; i < articleImagesURL.length; i++) {
            if (articleImagesURL[i] !== element) {
                newArray.push(articleImagesURL[i]);
            }
        }

        setArticleImagesURL(newArray);
    }

    const handleOnClickDeleteParagraph = (element: string) => {
        let newArray: string[] = [];
        for (let i = 0; i < articleParagraphs.length; i++) {
            if (articleParagraphs[i] !== element) {
                newArray.push(articleParagraphs[i]);
            }
        }

        setArticleParagraphs(newArray);
    }

    async function saveArticle(header: string, subHeader: string, mainImage: string[], paragraph: string[], articleImage: string[]) {
        let email = localStorage.getItem('email');
        if (email) {
            const datePublished = new Date();
            const response = await fetch(`/api/article/articleAPI`, {
                body: JSON.stringify({
                    header: header,
                    subHeader: subHeader,
                    mainImage: mainImage,
                    paragraph: paragraph,
                    articleImage: articleImage,
                    datePublished: datePublished,
                    email: email
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST'
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong!');
            }

            return data;
        }
    }

    const handleOnSubmitNewArticle = async (event: SyntheticEvent) => {
        event.preventDefault();

        Swal.fire({
            title: 'Publish New Article',
            text: "Do you wish to puslish the Article?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await saveArticle(article.articleHeader, article.articleSubHeader, imagesMainURL, articleParagraphs, articleImagesURL);
                console.log(response);
                if (response) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Article Added Succesfully!',
                        showConfirmButton: true,
                    }).then(() => {

                    });
                }
            }
        });
    }

    return (
        <Box>
            <Container maxW={'container.xl'} mt='2rem'>
                <Heading>Publish New Article <FaNewspaper></FaNewspaper></Heading>
                <Divider></Divider>

                <Box p='5' shadow={'xl'} mt='2rem'>
                    <form onSubmit={handleOnSubmitNewArticle}>
                        <Box mb='2rem'>
                            <FormLabel>Header</FormLabel>
                            <Input onChange={handleOnChangeHeader}></Input>
                        </Box>

                        <Box mb='2rem'>
                            <FormLabel>Sub Header</FormLabel>
                            <Input onChange={handleOnChangeSubHeader}></Input>
                        </Box>

                        <Box mb='2rem'>
                            <FormLabel>Main Image(s)</FormLabel>
                            <Box border={"1px"} borderColor={'black'} borderRadius={'md'} p={'2'}>
                                <Flex direction={'row'} alignItems='baseline'>
                                    <Box width={'30%'}>
                                        <Flex direction={'row'} justifyContent={'space-evenly'}>
                                            <Button onClick={() => onAddOpen()} color={'white'} shadow={'lg'} _hover={{ backgroundColor: 'blue.500' }} backgroundColor={'blue.300'}>Add</Button>
                                            <Button disabled={imagesMainURL.length < 1} onClick={() => onEditOpen()} color={'white'} shadow={'lg'} _hover={{ backgroundColor: 'gray.700' }} backgroundColor={'gray.600'}>Show</Button>
                                        </Flex>
                                    </Box>
                                    <Box width={'70%'} textAlign='center'>
                                        <Heading fontSize={'xl'}>There is Currently {imagesMainURL.length} Main image(s) added.</Heading>
                                    </Box>
                                </Flex>
                            </Box>
                        </Box>

                        <Box mb='2rem'>
                            <FormLabel>Content</FormLabel>
                            <Box border={"1px"} borderColor={'black'} borderRadius={'md'} p={'2'}>
                                <Flex direction={'row'} alignItems='baseline'>
                                    <Box width={'30%'}>
                                        <Flex direction={'row'} justifyContent={'space-evenly'}>
                                            <Button onClick={() => onParagraphAddOpen()} color={'white'} shadow={'lg'} _hover={{ backgroundColor: 'blue.500' }} backgroundColor={'blue.300'}>Add</Button>
                                            <Button disabled={articleParagraphs.length < 1} onClick={() => onParagraphEditOpen()} color={'white'} shadow={'lg'} _hover={{ backgroundColor: 'gray.700' }} backgroundColor={'gray.600'}>Show</Button>
                                        </Flex>
                                    </Box>
                                    <Box width={'70%'} textAlign='center'>
                                        <Heading fontSize={'xl'}>There is Currently {articleParagraphs.length} Paragraph(s) added.</Heading>
                                    </Box>
                                </Flex>
                            </Box>
                        </Box>

                        <Box mb='2rem'>
                            <FormLabel>Article's Image(s)</FormLabel>
                            <Box border={"1px"} borderColor={'black'} borderRadius={'md'} p={'2'}>
                                <Flex direction={'row'} alignItems='baseline'>
                                    <Box width={'30%'}>
                                        <Flex direction={'row'} justifyContent={'space-evenly'}>
                                            <Button onClick={() => onArticleImageAddOpen()} color={'white'} shadow={'lg'} _hover={{ backgroundColor: 'blue.500' }} backgroundColor={'blue.300'}>Add</Button>
                                            <Button disabled={articleImagesURL.length < 1} onClick={() => onArticleImageEditOpen()} color={'white'} shadow={'lg'} _hover={{ backgroundColor: 'gray.700' }} backgroundColor={'gray.600'}>Show</Button>
                                        </Flex>
                                    </Box>
                                    <Box width={'70%'} textAlign='center'>
                                        <Heading fontSize={'xl'}>There is Currently {articleImagesURL.length} Article image(s) added.</Heading>
                                    </Box>
                                </Flex>
                            </Box>
                        </Box>

                        <Box mb='2rem' textAlign={'center'}>
                            <Button type="submit" mx="auto" bg={'red.300'} color={'black'} _hover={{ backgroundColor: 'red.500' }}>Submit</Button>
                        </Box>
                    </form>
                </Box>

            </Container>

            <Modal onClose={onEditClose} size={'3xl'} isOpen={isEditOpen}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader bg={'gray.700'} fontSize={'2xl'} color={'white'}><BsFillImageFill></BsFillImageFill> Edit Main Image URL</ModalHeader>
                    <ModalCloseButton color={'white'} />
                    <ModalBody>
                        <Container>
                            <Heading mb='1rem' fontSize={'2xl'}>Current URLS</Heading>

                            {
                                imagesMainURL?.map((element: string, index: number) => (
                                    <Box key={index} mb='1rem'>
                                        <Flex>
                                            <Input value={element} disabled></Input>
                                            <Button onClick={() => handleOnClickDeleteImageURL(element)} color={'white'} shadow={'lg'} _hover={{ backgroundColor: 'red.700' }} backgroundColor={'red.600'}><FaTrashAlt></FaTrashAlt></Button>
                                        </Flex>
                                    </Box>
                                ))
                            }
                        </Container>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onEditClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal onClose={onAddClose} size={'xl'} isOpen={isAddOpen}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader bg={'gray.700'} fontSize={'2xl'} color={'white'}><BsFillImageFill></BsFillImageFill> Add New Main Image</ModalHeader>
                    <ModalCloseButton color={'white'} />
                    <ModalBody>
                        <Container>
                            <form onSubmit={handleOnSubmitNewImageURL}>
                                <Box mb='1rem'>
                                    <FormLabel>
                                        Image URL
                                    </FormLabel>
                                </Box>

                                <Box mb='2rem'>
                                    <Input onChange={handleOnImageURLTextChange} placeholder={'Insert an URL'}></Input>
                                </Box>

                                <Box textAlign={'center'}>
                                    <Button disabled={!imageMainURLText} color={'white'} shadow={'lg'} _hover={{ backgroundColor: 'blue.500' }} backgroundColor={'blue.300'} type='submit'>Add</Button>
                                </Box>
                            </form>
                        </Container>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onAddClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal onClose={onArticleImageEditClose} size={'3xl'} isOpen={isArticleImageEditOpen}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader bg={'gray.700'} fontSize={'2xl'} color={'white'}><BsFillImageFill></BsFillImageFill> Edit Article Image URL</ModalHeader>
                    <ModalCloseButton color={'white'} />
                    <ModalBody>
                        <Container>
                            <Heading mb='1rem' fontSize={'2xl'}>Current URLS</Heading>

                            {
                                articleImagesURL?.map((element: string, index: number) => (
                                    <Box key={index} mb='1rem'>
                                        <Flex>
                                            <Input value={element} disabled></Input>
                                            <Button onClick={() => handleOnClickDeleteArticleImageURL(element)} color={'white'} shadow={'lg'} _hover={{ backgroundColor: 'red.700' }} backgroundColor={'red.600'}><FaTrashAlt></FaTrashAlt></Button>
                                        </Flex>
                                    </Box>
                                ))
                            }
                        </Container>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onArticleImageEditClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal onClose={onArticleImageAddClose} size={'xl'} isOpen={isArticleImageAddOpen}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader bg={'gray.700'} fontSize={'2xl'} color={'white'}><BsFillImageFill></BsFillImageFill> Add New Article Image</ModalHeader>
                    <ModalCloseButton color={'white'} />
                    <ModalBody>
                        <Container>
                            <form onSubmit={handleOnSubmitNewArticleImageURL}>
                                <Box mb='1rem'>
                                    <FormLabel>
                                        Article Image URL
                                    </FormLabel>
                                </Box>

                                <Box mb='2rem'>
                                    <Input onChange={handleOnArticleImageURLTextChange} placeholder={'Insert an URL'}></Input>
                                </Box>

                                <Box textAlign={'center'}>
                                    <Button disabled={!articleImageURLText} color={'white'} shadow={'lg'} _hover={{ backgroundColor: 'blue.500' }} backgroundColor={'blue.300'} type='submit'>Add</Button>
                                </Box>
                            </form>
                        </Container>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onArticleImageAddClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>



            <Modal onClose={onParagraphEditClose} size={'3xl'} isOpen={isParagraphEditOpen}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader bg={'gray.700'} fontSize={'2xl'} color={'white'}><BsParagraph></BsParagraph> Edit Paragraph</ModalHeader>
                    <ModalCloseButton color={'white'} />
                    <ModalBody>
                        <Container>
                            <Heading mb='1rem' fontSize={'2xl'}>Current Paragraph</Heading>
                            {
                                articleParagraphs?.map((element: string, index: number) => (
                                    <Box key={index} mb='1rem'>
                                        <Flex>
                                            <Textarea rows={5} resize={'none'} value={element} disabled></Textarea>
                                            <Button onClick={() => handleOnClickDeleteParagraph(element)} color={'white'} shadow={'lg'} _hover={{ backgroundColor: 'red.700' }} backgroundColor={'red.600'}><FaTrashAlt></FaTrashAlt></Button>
                                        </Flex>
                                    </Box>
                                ))
                            }
                        </Container>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onParagraphEditClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal onClose={onParagraphAddClose} size={'xl'} isOpen={isParagraphAddOpen}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader bg={'gray.700'} fontSize={'2xl'} color={'white'}><BsParagraph></BsParagraph> Add New Paragraph</ModalHeader>
                    <ModalCloseButton color={'white'} />
                    <ModalBody>
                        <Container>
                            <form onSubmit={handleOnSubmitNewParagraph}>
                                <Box mb='1rem'>
                                    <FormLabel>
                                        Paragraph
                                    </FormLabel>
                                </Box>

                                <Box mb='2rem'>
                                    <Textarea onChange={handleOnChangeArticleParagraphText} placeholder={'Type a Paragraph...'} rows={10}></Textarea>
                                </Box>

                                <Box textAlign={'center'}>
                                    <Button disabled={!articleParagraphText} color={'white'} shadow={'lg'} _hover={{ backgroundColor: 'blue.500' }} backgroundColor={'blue.300'} type='submit'>Add</Button>
                                </Box>
                            </form>
                        </Container>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onParagraphAddClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </Box>
    )
}

export default Publish;