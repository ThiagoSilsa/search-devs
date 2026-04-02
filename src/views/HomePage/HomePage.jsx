import { useState } from 'react'
import { useTranslation } from 'react-i18next'

// Chakra UI
import { Box, Container, Text, VStack } from '@chakra-ui/react'

// Controller
import { useHomePageHook } from './hooks/useHomePageHook'

// Components
import Logo from '../../components/created/Logo'
import LanguageSelect from './components/LanguageSelect'
import SearchBar from './components/SearchBar'
import UsersList from './components/UsersList'

const HomePage = () => {
    const { t, i18n } = useTranslation()

    const [searchTerm, setSearchTerm] = useState('')
    const [users, setUsers] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    // Hooks
    const { handleSearch } = useHomePageHook(searchTerm, setUsers, setErrorMessage, setIsLoading, t)

    return (
        <Container
            bg={"white"}
            minW={"100vw"}
            minH={"100vh"}
            pt={{ base: 20, md: 0 }}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            position="relative"
        >
            <LanguageSelect t={t} i18n={i18n} />
            <VStack spacing={8} align="center" maxW={"60vw"} w={"full"}>


                <Logo size="lg"
                />

                <Box w="full" maxW="600px">
                    <VStack spacing={1} align="stretch">
                        <SearchBar
                            searchTerm={searchTerm}
                            errorMessage={errorMessage}
                            setSearchTerm={setSearchTerm}
                            setErrorMessage={setErrorMessage}
                            handleSearch={handleSearch}
                            t={t}
                        />

                        <Box minH="20px">
                            {errorMessage && <Text color="red.500" fontSize="sm">{errorMessage}</Text>}
                        </Box>

                        <UsersList isLoading={isLoading} users={users} t={t} />

                    </VStack>
                </Box>
            </VStack>
        </Container>
    )
}

export default HomePage