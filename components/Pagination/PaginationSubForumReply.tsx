import { Box, Button, Container, Divider, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

function PaginationSubForumReply({ data, RenderComponent, pageLimit, dataLimit }: any) {
    const [pages] = useState(Math.round(data.length / dataLimit));
    const [currentPage, setCurrentPage] = useState<number>(1);
    const navigate = useRouter();

    function goToNextPage() {
        setCurrentPage((page) => page + 1);
    }

    function goToPreviousPage() {
        setCurrentPage((page) => page - 1);
    }

    function changePage(event: any) {
        const pageNumber = Number(event.target.textContext);
        setCurrentPage(pageNumber);
    }

    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit;
        const endIndex = startIndex + dataLimit;
        return data.slice(startIndex, endIndex);
    };

    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
        return new Array(pageLimit).fill(undefined).map((_, idx) => start + idx + 1);
    };

    return (
        <Box maxW={'90%'} mx='auto' color={'white'}>
            <Flex direction={'column'} minH={'55rem'}>
                {
                    // subForums.map((element: SubForum, index: number) => (
                    getPaginatedData().map((element: any, index: any) => (
                        <RenderComponent key={index} data={element} />
                    ))
                }
            </Flex>

            <Container mb={'5rem'} maxW={'container.sm'}>
                <Flex direction={'row'} justifyContent={'space-evenly'}>
                    <Button backgroundColor={'gray.600'}
                        _disabled={{
                            backgroundColor: 'gray.300'
                        }}
                        _hover={{
                            backgroundColor: 'gray.900',
                            _disabled: {
                                bgColor: 'gray.300',
                                cursor: 'not-allowed'
                            }
                        }} disabled={currentPage === 1} onClick={goToPreviousPage}>Prev</Button>
                    <Button backgroundColor={'gray.600'}
                        _disabled={{
                            backgroundColor: 'gray.300'
                        }}
                        _hover={{
                            backgroundColor: 'gray.900',
                            _disabled: {
                                bgColor: 'gray.300',
                                cursor: 'not-allowed'
                            }
                        }} disabled={(currentPage - 1) >= pages} onClick={goToNextPage}>Next</Button>
                </Flex>
            </Container>
        </Box>
    )
}

export default PaginationSubForumReply;