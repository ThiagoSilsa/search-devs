import { useState } from 'react'

// Router
import { Link as RouterLink } from 'react-router-dom'

// Chakra UI
import { Container, VStack, Heading, HStack, Input, Button, Box, Text, InputGroup } from '@chakra-ui/react'

// Icons
import { FiSearch } from 'react-icons/fi'

// Controller
import { useHomePageHook } from './hooks/useHomePageHook'

const HomePage = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [users, setUsers] = useState([])
    const [errorMessage, setErrorMessage] = useState('')

    // Hooks
    const { handleSearch } = useHomePageHook(searchTerm, setUsers, setErrorMessage)

    return (
        <Container bg={"white"} minW={"100vw"} minH={"100vh"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <VStack spacing={8} align="center" maxW={"60vw"} w={"full"}>
                <Heading
                    as="h1"
                    fontSize="70px"
                    size={"7xl"}
                    textAlign="center"
                    fontFamily="'Nunito', sans-serif"
                    fontWeight={"400"}
                    marginBottom={"20px"}
                >
                    <Text as="span" color="var(--secondary-color)">Search </Text>
                    <Text as="span" color="var(--primary-color)">d_evs</Text>
                </Heading>

                <Box w="full" maxW="600px">
                    <VStack spacing={1} align="stretch">
                        <HStack spacing={2}>
                            <InputGroup startElement={<FiSearch size={22} />}>
                                <Input
                                    required={true}
                                    placeholder="Search"
                                    size="lg"
                                    borderColor="var(--border-color)"
                                    value={searchTerm}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSearch()
                                        }
                                    }}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value)
                                        if (errorMessage) setErrorMessage('')
                                    }}
                                    _focus={{
                                        borderColor: 'var(--primary-color)',
                                        boxShadow: '0 0 0 1px var(--primary-color)'
                                    }}
                                    color={"black"}
                                />
                            </InputGroup>
                            <Button
                                onClick={handleSearch}
                                size="md"
                                bg="var(--primary-color)"
                                color={"white"}
                                _hover={{
                                    bg: 'var(--primary-color-hover)',
                                    transition: 'background-color 0.3s',
                                }}
                                padding={"2px 55px"}
                            >
                                Search
                            </Button>
                        </HStack>

                        <Box minH="20px">
                            {errorMessage && <Text color="red.500" fontSize="sm">{errorMessage}</Text>}
                        </Box>

                        {users.length > 0 && (
                            <VStack align="stretch" spacing={3} mt={2}>
                                {users.map((user) => (
                                    <Box
                                        key={user.id}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="space-between"
                                        border="1px solid var(--border-color)"
                                        borderRadius="md"
                                        p={3}
                                    >
                                        <HStack spacing={3}>
                                            <Box
                                                as="img"
                                                src={user.avatar_url}
                                                alt={user.login}
                                                w="40px"
                                                h="40px"
                                                borderRadius="full"
                                            />
                                            <Text color="black" fontWeight="600">{user.login}</Text>
                                        </HStack>
                                        <Button
                                            as={RouterLink}
                                            to={`/profile/${user.login}`}
                                            size="sm"
                                            bg="var(--primary-color)"
                                            color="white"
                                            _hover={{ bg: 'var(--primary-color-hover)' }}
                                        >
                                            View
                                        </Button>
                                    </Box>
                                ))}
                            </VStack>
                        )}
                    </VStack>
                </Box>
            </VStack>
        </Container>
    )
}

export default HomePage