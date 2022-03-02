import { Box, Button, Container, Divider, Flex, FormLabel, Heading, Input, Text } from "@chakra-ui/react";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { FaNewspaper } from "react-icons/fa";

function Publish() {
    const [header, setHeader] = useState<string>('');
    const [subHeader, setSubHeader] = useState<string>('');
    const [mainImage, setMainImage] = useState<string>('');
    const [paragraph, setParagraph] = useState<string>('');
    const [articleImage, setArticleImage] = useState<string>('');

    const handleOnChangeHeader = (event: ChangeEvent<HTMLInputElement>) => {
        setHeader(event.target.value);
    }

    const handleOnChangeSubHeader = (event: ChangeEvent<HTMLInputElement>) => {
        setSubHeader(event.target.value);
    }

    const handleOnChangeMainImage = (event: ChangeEvent<HTMLInputElement>) => {
        setMainImage(event.target.value);
    }

    const handleOnChangeParagraph = (event: ChangeEvent<HTMLInputElement>) => {
        setParagraph(event.target.value);
    }

    const handleOnChangeArticleImage = (event: ChangeEvent<HTMLInputElement>) => {
        setArticleImage(event.target.value);
    }

    async function saveArticle(header: string, subHeader: string, mainImage: string, paragraph: string, articleImage: string) {
        let email = localStorage.getItem('email');
        if (email) {
            const response = await fetch(`/api/article/articleAPI`, {
                body: JSON.stringify({
                    header: header,
                    subHeader: subHeader,
                    mainImage: mainImage,
                    paragraph: paragraph,
                    articleImage: articleImage,
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

        const response = await saveArticle(header, subHeader, mainImage, paragraph, articleImage);
        console.log(response);
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
                            <Input onChange={handleOnChangeMainImage}></Input>
                        </Box>

                        <Box mb='2rem'>
                            <FormLabel>Content</FormLabel>
                            <Input onChange={handleOnChangeParagraph}></Input>
                        </Box>

                        <Box mb='2rem'>
                            <FormLabel>Article's Image(s)</FormLabel>
                            <Input onChange={handleOnChangeArticleImage}></Input>
                        </Box>

                        <Box mb='2rem' textAlign={'center'}>
                            <Button type="submit" mx="auto" bg={'red.300'} color={'black'} _hover={{ backgroundColor: 'red.500' }}>Submit</Button>
                        </Box>
                    </form>
                </Box>

            </Container>
        </Box>
    )
}

export default Publish;