import { Box, Button, Container, Divider, Flex, FormLabel, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Textarea, useDisclosure } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { BsFillImageFill } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import { MdTopic } from "react-icons/md";
import Swal from "sweetalert2";

interface ForumCategory {
    forumCategoryId: number,
    forumCategoryName: string,
    forumCategoryDescription: string
}

interface SubForum {
    subForumName: string,
    subForumDescription: string,
    subForumImageURL: string[],
    dateCreated: Date,
    createdBy: string,
    forumCategoryId: number
}

function NewSubForum({ data }: any) {
    const { data: session, status }: any = useSession();
    const [forumCategories, setForumCategories] = useState<ForumCategory[]>(data as ForumCategory[]);
    const [imagesURL, setImagesURL] = useState<string[]>([]);
    const [imageURLText, setImageURLText] = useState<string>('');
    const router = useRouter();
    const { forumCategoryId } = router.query;

    const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();

    const [subForum, setSubForum] = useState<SubForum>({
        subForumName: '',
        subForumDescription: '',
        subForumImageURL: [''],
        dateCreated: new Date,
        createdBy: '',
        forumCategoryId: forumCategoryId ? Number(forumCategoryId) : 0
    });

    const handleOnChangeSubForumName = (event: ChangeEvent<HTMLInputElement>) => {
        setSubForum(prev => ({ ...prev, subForumName: event.target.value }));
    }

    const handleOnChangeSubForumDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setSubForum(prev => ({ ...prev, subForumDescription: event.target.value }));
    }

    const handleOnSubmitNewImageURL = (event: SyntheticEvent) => {
        event.preventDefault();

        if (imagesURL.includes(imageURLText)) {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'That link already exists!',
                showConfirmButton: true,
            }).then(() => {

            });
        } else {
            setImagesURL(prev => [...prev, imageURLText]);

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

    const handleOnChangeImageURLText = (event: ChangeEvent<HTMLInputElement>) => {
        setImageURLText(event.target.value);
    }

    const handleOnDeleteImageURL = (element: string) => {
        let newArray: string[] = [];
        for (let i = 0; i < imagesURL.length; i++) {
            if (imagesURL[i] !== element) {
                newArray.push(imagesURL[i]);
            }
        }

        setImagesURL(newArray);
    }

    async function saveSubTopic(subForum: SubForum) {
        const response = await fetch(`/api/subForum/subForumAPI`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                subForumName: subForum.subForumName,
                subForumDescription: subForum.subForumDescription,
                subForumImageURL: subForum.subForumImageURL,
                dateCreated: subForum.dateCreated,
                createdBy: subForum.createdBy,
                forumCategoryId: subForum.forumCategoryId
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong!');
        }

        return data;
    }

    const handleOnSubmitNewTopic = async (event: SyntheticEvent) => {
        event.preventDefault();
        let newSubForum: SubForum = subForum;
        let imagesArray: string[] = [];
        newSubForum.dateCreated = new Date();
        newSubForum.createdBy = session.user.email;

        for (let i = 0; i < imagesURL.length; i++) {
            if (imagesURL[i] !== '') {
                imagesArray.push(imagesURL[i]);
            }
        }
        newSubForum.subForumImageURL = imagesArray;


        if (newSubForum.createdBy) {
            await saveSubTopic(newSubForum).then(response => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'SubForum Created Successfully!',
                    showConfirmButton: true,
                }).then(() => {
                    router.push(`/forums/enterForum/${response.forumCategoryId}`);
                });
            });
        }
    }

    return (
        <Box>
            <Container maxW={'container.lg'} mt={'2rem'}>
                <Heading textAlign={'center'}>New Topic <MdTopic></MdTopic></Heading>
                <Divider></Divider>

                <Box mt={'2rem'} p='5' shadow={"2xl"}>
                    <form onSubmit={handleOnSubmitNewTopic}>
                        <Box mb='2rem'>
                            <FormLabel>Topic's Name</FormLabel>
                            <Input onChange={handleOnChangeSubForumName} type={'text'} />
                        </Box>

                        <Box mb='2rem'>
                            <FormLabel>Description</FormLabel>
                            <Textarea onChange={handleOnChangeSubForumDescription} rows={5} resize={'none'} />
                        </Box>

                        <Box mb='2rem'>
                            <FormLabel>Image(s)</FormLabel>
                            <Box border={"1px"} borderColor={'black'} borderRadius={'md'} p={'2'}>
                                <Flex direction={'row'} alignItems='baseline'>
                                    <Box width={'30%'}>
                                        <Flex direction={'row'} justifyContent={'space-evenly'}>
                                            <Button onClick={() => onAddOpen()} color={'white'} shadow={'lg'} _hover={{ backgroundColor: 'blue.500' }} backgroundColor={'blue.300'}>Add</Button>
                                            <Button disabled={imagesURL.length < 1} onClick={() => onEditOpen()} color={'white'} shadow={'lg'} _hover={{ backgroundColor: 'gray.700' }} backgroundColor={'gray.600'}>Show</Button>
                                        </Flex>
                                    </Box>
                                    <Box width={'70%'} textAlign='center'>
                                        <Heading fontSize={'xl'}>There is Currently {imagesURL.length} Image(s) added.</Heading>
                                    </Box>
                                </Flex>
                            </Box>
                        </Box>

                        <Box mb='2rem'>
                            <Select value={subForum.forumCategoryId} onChange={(e) => setSubForum(prev => ({ ...prev, forumCategoryId: Number(e.target.value) }))}>
                                <option value={0}>Select An Option</option>
                                {
                                    forumCategories?.map((element: ForumCategory, index: number) => (
                                        <option key={index} value={element.forumCategoryId}>{element.forumCategoryId} - {element.forumCategoryName} ({element.forumCategoryDescription})</option>
                                    ))
                                }
                            </Select>
                        </Box>

                        <Box mb='2rem' textAlign={'center'}>
                            <Button type="submit" disabled={subForum.forumCategoryId === 0 || !subForum.subForumName} mx="auto" bg={'red.300'} color={'black'} _hover={{ backgroundColor: 'red.500' }}>Submit</Button>
                        </Box>

                    </form>
                </Box>
            </Container>

            <Modal onClose={onAddClose} size={'xl'} isOpen={isAddOpen}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader bg={'gray.700'} fontSize={'2xl'} color={'white'}><BsFillImageFill></BsFillImageFill> Add New Article Image</ModalHeader>
                    <ModalCloseButton color={'white'} />
                    <ModalBody>
                        <Container>
                            <form onSubmit={handleOnSubmitNewImageURL}>
                                <Box mb='1rem'>
                                    <FormLabel>
                                        Article Image URL
                                    </FormLabel>
                                </Box>

                                <Box mb='2rem'>
                                    <Input onChange={handleOnChangeImageURLText} placeholder={'Insert an URL'}></Input>
                                </Box>

                                <Box textAlign={'center'}>
                                    <Button disabled={!handleOnChangeImageURLText} color={'white'} shadow={'lg'} _hover={{ backgroundColor: 'blue.500' }} backgroundColor={'blue.300'} type='submit'>Add</Button>
                                </Box>
                            </form>
                        </Container>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onAddClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>


            <Modal onClose={onEditClose} size={'3xl'} isOpen={isEditOpen}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader bg={'gray.700'} fontSize={'2xl'} color={'white'}><BsFillImageFill></BsFillImageFill> Edit Images URL</ModalHeader>
                    <ModalCloseButton color={'white'} />
                    <ModalBody>
                        <Container>
                            <Heading mb='1rem' fontSize={'2xl'}>Current Paragraph</Heading>
                            {
                                imagesURL?.map((element: string, index: number) => (
                                    <Box key={index} mb='1rem'>
                                        <Flex>
                                            <Input value={element} disabled></Input>
                                            <Button onClick={() => handleOnDeleteImageURL(element)} color={'white'} shadow={'lg'} _hover={{ backgroundColor: 'red.700' }} backgroundColor={'red.600'}><FaTrashAlt></FaTrashAlt></Button>
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

        </Box>
    )
}

export default NewSubForum;