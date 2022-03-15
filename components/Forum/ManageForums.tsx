import { Box, Button, Container, Divider, Flex, FormLabel, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, useDisclosure } from "@chakra-ui/react";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { MdForum } from "react-icons/md";
import { motion } from 'framer-motion';
import Swal from "sweetalert2";
import { FcDisclaimer } from "react-icons/fc";

interface ForumCategory {
    forumCategoryId: number,
    forumCategoryName: string,
    forumCategoryDescription: string
}

interface SubForum {
    subForumId: number,
    subForumName: string,
    subForumDescription: string,
    subForumImageURL: string[],
    dateCreated: Date,
    createdBy: string,
    forumCategoryId: number
}

interface SubForumReply {
    subForumReplyDescription: string,
    createdBy: string,
    subForumId: number
}

function ManageForums({ data }: any) {
    const [forumCategories, setForumCategories] = useState<ForumCategory[]>(data as ForumCategory[]);
    const [newForumCategory, setNewForumCategory] = useState<ForumCategory>({
        forumCategoryId: 0,
        forumCategoryName: '',
        forumCategoryDescription: '',
    });
    const [editForumCategory, setEditForumCategory] = useState<ForumCategory>({
        forumCategoryId: 0,
        forumCategoryName: '',
        forumCategoryDescription: '',
    });

    const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();

    const handleOnChangeForumCategoryName = (event: ChangeEvent<HTMLInputElement>) => {
        setNewForumCategory(prev => ({ ...prev, forumCategoryName: event.target.value }));
    }

    const handleOnChangeForumCategoryDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setNewForumCategory(prev => ({ ...prev, forumCategoryDescription: event.target.value }));
    }

    const handleOnChangeEditForumCategoryName = (event: ChangeEvent<HTMLInputElement>) => {
        setEditForumCategory(prev => ({ ...prev, forumCategoryName: event.target.value }));
    }

    const handleOnChangeEditForumCategoryDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setEditForumCategory(prev => ({ ...prev, forumCategoryDescription: event.target.value }));
    }

    const handleOnClickEditForumCategory = (forumCategory: ForumCategory) => {
        onEditOpen();
        setEditForumCategory(prev => ({
            ...prev,
            forumCategoryId: forumCategory.forumCategoryId,
            forumCategoryName: forumCategory.forumCategoryName,
            forumCategoryDescription: forumCategory.forumCategoryDescription
        }));
    }

    async function getAllSubForumsByForumCategoryId(forumCategoryId: number) {
        const response = await fetch(`/api/subForum/getSubForumsByForumCategoryId/${forumCategoryId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET',
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong!');
        }

        return data;
    }

    async function deleteAllSubForumRepliesBySubForumIdList(subForumId: number[]) {
        const response = await fetch(`/api/subForumReply/deleteSubForumReplyBySubForumIdList/subForumReplyAPI/`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                subForumIdList: subForumId
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong!');
        }

        return data;
    }

    async function deleteAllSubForumByForumCategoryId(forumCategoryId: number) {
        const response = await fetch(`/api/subForum/getSubForumsByForumCategoryId/${forumCategoryId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'DELETE'
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong!');
        }

        return data;
    }

    async function deleteForumCategoryById(forumCategoryId: number) {
        const response = await fetch(`/api/forumCategory/getForumCategoryByForumCategoryId/${forumCategoryId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'DELETE'
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong!');
        }

        return data;
    }

    const handleOnClickDeleteForumCategory = async (forumCategoryId: number) => {
        const response: SubForum[] = await getAllSubForumsByForumCategoryId(forumCategoryId);
        let subForumsId: number[] = [];
        for (let i = 0; i < response.length; i++) {
            subForumsId[i] = response[i].subForumId;
        }

        const responseDeleteSubForumReply = await deleteAllSubForumRepliesBySubForumIdList(subForumsId);
        console.log(responseDeleteSubForumReply);

        const responseDeleteSubForum = await deleteAllSubForumByForumCategoryId(forumCategoryId);
        console.log(responseDeleteSubForum);

        const responseDeleteForumCategory = await deleteForumCategoryById(forumCategoryId);
        console.log(responseDeleteForumCategory);

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Forum Category Deleted Succesfully!',
            showConfirmButton: true,
        }).then(async () => {
            const response = await getAllForumCategories();
            setForumCategories(response);
            onEditClose();
        });
    }

    async function getForumCategoryByName(forumCategoryName: string) {
        const response = await fetch(`/api/forumCategory/getForumCategoryByName/${forumCategoryName}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET'
        });

        try {
            const data = await response.json();
            return data;
        } catch (error) {
            return null;
        }
    }

    async function saveForumCategory(forumCategoryName: string, forumCategoryDescription: string) {
        const response = await fetch(`/api/forumCategory/forumCategoryAPI`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                forumCategoryName: forumCategoryName,
                forumCategoryDescription: forumCategoryDescription
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong!');
        }

        return data;
    }

    async function getAllForumCategories() {
        const response = await fetch(`/api/forumCategory/forumCategoryAPI`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET'
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong!');
        }

        return data;
    }

    async function updateForumCategory() {        
        const response = await fetch(`/api/forumCategory/forumCategoryAPI`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'PUT',
            body: JSON.stringify({
                forumCategoryId: editForumCategory.forumCategoryId,
                forumCategoryName: editForumCategory.forumCategoryName,
                forumCategoryDescription: editForumCategory.forumCategoryDescription
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong!');
        }

        return data;
    }

    const handleOnSubmitNewForumCategory = async (event: SyntheticEvent) => {
        event.preventDefault();
        let forumCategoryName = newForumCategory.forumCategoryName;
        const response = await getForumCategoryByName(forumCategoryName);

        if (response) {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'There is already a forum with that name!',
                showConfirmButton: true,
            });
        } else {
            const response = await saveForumCategory(newForumCategory.forumCategoryName, newForumCategory.forumCategoryDescription);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Forum Category Saved Succesfully!',
                showConfirmButton: false,
                timer: 900
            }).then(async () => {
                const response = await getAllForumCategories();
                setForumCategories(response);
            });
        }
    }

    const handleOnSubmitEditForumCategory = async (event: SyntheticEvent) => {
        event.preventDefault();
        let forumCategoryName = editForumCategory.forumCategoryName;
        const response: ForumCategory = await getForumCategoryByName(forumCategoryName);

        if (response && editForumCategory.forumCategoryId !== response.forumCategoryId) {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'There is already a forum with that name!',
                showConfirmButton: true,
            });
        } else {
            const response = await updateForumCategory();
            console.log(response);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Forum Category Updated Succesfully!',
                showConfirmButton: false,
                timer: 900
            }).then(async () => {
                const response = await getAllForumCategories();
                setForumCategories(response);
                onEditClose();
            });
        }
    }

    return (
        <Box>
            <Container maxW={'container.xl'}>
                <Heading mt={'2rem'} textAlign={'center'}>Manage Forums <MdForum></MdForum></Heading>
                <Divider mb={'2rem'}></Divider>
                <Box textAlign={'end'} mb={'2rem'}>
                    <Button type="button" onClick={onAddOpen}>Add New Forum</Button>
                </Box>
                <Text fontWeight={'bold'} textAlign={'center'} color={'gray.600'} mb={'2rem'}>Click Any Forum to manage...</Text>
                <Flex wrap={'wrap'} gap={'2rem'} justifyContent={'center'}>
                    {
                        forumCategories?.map((element: ForumCategory, index: number) => (
                            <motion.div
                                style={{
                                    color: 'white',
                                    width: '25rem',
                                    height: '8rem',
                                    backgroundColor: '#2D3748',
                                    borderRadius: '13px',
                                    cursor: 'pointer'
                                }}
                                whileHover={{
                                    scale: 1.1
                                }}
                                animate={{
                                    type: 'spring'
                                }}
                                key={index}
                                onClick={() => handleOnClickEditForumCategory(element)}
                            >
                                <Flex>
                                    <Box w={'30%'}>
                                        <Flex direction={'column'} justifyContent={'center'} alignItems={"center"}>
                                            <Box mt={'1rem'}>
                                                <MdForum fontSize={'6rem'}></MdForum>
                                            </Box>
                                        </Flex>
                                    </Box>

                                    <Box w={'70%'}>
                                        <Container>
                                            <Heading mt='1rem' fontSize={'xl'} textAlign='center'>{element.forumCategoryName}</Heading>
                                            <Divider></Divider>
                                            <Text noOfLines={3}>{element.forumCategoryDescription}</Text>
                                        </Container>
                                    </Box>
                                </Flex>
                            </motion.div>
                        ))
                    }
                </Flex>
            </Container>

            <Modal onClose={onAddClose} size={'xl'} isOpen={isAddOpen}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader bg={'gray.700'} fontSize={'2xl'} color={'white'}><MdForum></MdForum> Add New Forum Category</ModalHeader>
                    <ModalCloseButton color={'white'} />
                    <ModalBody>
                        <Container>
                            <form onSubmit={handleOnSubmitNewForumCategory}>
                                <Box mt={'1rem'} mb='1rem'>
                                    <FormLabel>
                                        Forum Category Name <span style={{
                                            color: 'red'
                                        }}>*</span>
                                    </FormLabel>
                                </Box>

                                <Box mb='2rem'>
                                    <Input onChange={handleOnChangeForumCategoryName} type={'text'} placeholder={'Type the name of the category...'} />
                                </Box>

                                <Box mb={'1rem'}>
                                    <FormLabel>
                                        Forum Category Description
                                    </FormLabel>

                                    <Textarea onChange={handleOnChangeForumCategoryDescription} rows={5} placeholder={'Type the description of the category...'} resize={'none'}></Textarea>
                                </Box>

                                <Box textAlign={'center'}>
                                    <Button disabled={!newForumCategory.forumCategoryName} color={'white'} shadow={'lg'} _hover={{ backgroundColor: 'blue.500' }} backgroundColor={'blue.300'} type='submit'>Add</Button>
                                </Box>
                            </form>
                        </Container>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onAddClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal onClose={onEditClose} size={'xl'} isOpen={isEditOpen}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader bg={'gray.700'} fontSize={'2xl'} color={'white'}><MdForum></MdForum> Edit Forum Category</ModalHeader>
                    <ModalCloseButton color={'white'} />
                    <ModalBody>
                        <Container>
                            <form onSubmit={handleOnSubmitEditForumCategory}>
                                <Box mt={'1rem'} mb='1rem'>
                                    <FormLabel>
                                        Forum Category Name <span style={{
                                            color: 'red'
                                        }}>*</span>
                                    </FormLabel>
                                </Box>

                                <Box mb='2rem'>
                                    <Input value={editForumCategory.forumCategoryName} onChange={handleOnChangeEditForumCategoryName} type={'text'} placeholder={'Type the name of the category...'} />
                                </Box>

                                <Box mb={'1rem'}>
                                    <FormLabel>
                                        Forum Category Description
                                    </FormLabel>

                                    <Textarea value={editForumCategory.forumCategoryDescription} onChange={handleOnChangeEditForumCategoryDescription} rows={5} placeholder={'Type the description of the category...'} resize={'none'}></Textarea>
                                </Box>

                                <Box textAlign={'center'}>
                                    <Button disabled={!editForumCategory.forumCategoryName} color={'white'} shadow={'lg'} _hover={{ backgroundColor: 'blue.500' }} backgroundColor={'blue.300'} type='submit'>Edit</Button>
                                </Box>
                            </form>
                        </Container>

                        <Divider mt={'2rem'}></Divider>

                        <Container backgroundColor={"gray.800"} mt={'2rem'} p={'5'} borderRadius={'md'}>
                            <Heading textAlign={'center'} color={'red.600'} fontSize={'xl'}> <FcDisclaimer></FcDisclaimer>Danger Zone<FcDisclaimer></FcDisclaimer></Heading>
                            <Divider borderColor={'white'} mt={'1rem'}></Divider>
                            <Text textAlign={'center'} color={'white'}>If you want to delete this forum, it will delete all subforums with all the information. Proceed only if you know what you're doing.</Text>
                            <Box textAlign={'center'} mt={'2rem'}>
                                <Button onClick={async () => handleOnClickDeleteForumCategory(editForumCategory.forumCategoryId)} color={'white'} shadow={'lg'} _hover={{ backgroundColor: 'red.500' }} backgroundColor={'red.300'} type='button'>DELETE</Button>
                            </Box>
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

export default ManageForums;