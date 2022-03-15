import { Box, Button, Checkbox, CheckboxProps, Container, Divider, Flex, FormLabel, Heading, Input, Textarea } from "@chakra-ui/react";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { RiFileEditFill } from "react-icons/ri";
import Swal from "sweetalert2";

interface UserProfile {
    email: string,
    profileImageURL: string,
    coverImageURL: string,
    aboutMe: string,
    privateProfile: boolean,
    totalPosts: number,
    totalMessages: number
}

function EditUserProfile({ data }: any) {
    const [userProfile, setUserProfile] = useState<UserProfile>(data as UserProfile);

    const handleOnChangeProfileImageURL = (event: ChangeEvent<HTMLInputElement>) => {
        setUserProfile(prev => ({ ...prev, profileImageURL: event.target.value }));
    }

    const handleOnChangeCoverImageURL = (event: ChangeEvent<HTMLInputElement>) => {
        setUserProfile(prev => ({ ...prev, coverImageURL: event.target.value }));
    }

    const handleOnChangeAboutMe = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setUserProfile(prev => ({ ...prev, aboutMe: event.target.value }));
    }

    async function updateProfileInfo() {
        const response = await fetch(`/api/userProfile/userProfileAPI`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: userProfile.email,
                profileImageURL: userProfile.profileImageURL,
                coverImageURL: userProfile.coverImageURL,
                aboutMe: userProfile.aboutMe,
                privateProfile: userProfile.privateProfile
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong!');
        }

        return data;
    }

    const handleOnSubmitEditProfile = async (event: SyntheticEvent) => {
        event.preventDefault();

        const response = await updateProfileInfo();
        console.log(response);
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Information Updated Successfully!',
            showConfirmButton: false,
            timer: 900
        });
    }

    return (
        <Box>
            <Container maxW={'container.lg'}>
                <Heading mt={'2rem'} textAlign={'center'}>Edit Your Information <RiFileEditFill></RiFileEditFill></Heading>
                <Divider mb='2rem'></Divider>

                <Box shadow={'2xl'} p='4'>
                    <form onSubmit={handleOnSubmitEditProfile}>
                        <Box mb='2rem'>
                            <FormLabel>
                                Email
                            </FormLabel>
                            <Input value={userProfile.email} disabled></Input>
                        </Box>

                        <Box mb='2rem'>
                            <FormLabel>
                                Profile Image URL
                            </FormLabel>
                            <Input onChange={handleOnChangeProfileImageURL} value={userProfile.profileImageURL}></Input>
                        </Box>

                        <Box mb='2rem'>
                            <FormLabel>
                                Cover Image URL
                            </FormLabel>
                            <Input onChange={handleOnChangeCoverImageURL} value={userProfile.coverImageURL}></Input>
                        </Box>

                        <Box mb='2rem'>
                            <FormLabel>
                                About Me
                            </FormLabel>
                            <Textarea onChange={handleOnChangeAboutMe} value={userProfile.aboutMe} rows={7} resize={'none'}></Textarea>
                        </Box>


                        <Box mb='2rem'>
                            <Flex direction={'row'}>
                                <FormLabel>
                                    Private Profile?
                                </FormLabel>

                                <Checkbox isChecked={userProfile.privateProfile} onChange={(e) => setUserProfile(prev => ({ ...prev, privateProfile: e.target.checked }))}></Checkbox>
                            </Flex>
                        </Box>

                        <Box mb='2rem' textAlign={'center'}>
                            <Button bg={'red.300'} color={'black'} _hover={{ backgroundColor: 'red.500' }} type='submit'>Send</Button>
                        </Box>

                    </form>
                </Box>

            </Container>
        </Box >
    )
}

export default EditUserProfile;