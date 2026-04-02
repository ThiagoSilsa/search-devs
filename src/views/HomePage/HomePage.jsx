import { useState } from 'react'
import { useTranslation } from 'react-i18next'

// Router
import { Link as RouterLink } from 'react-router-dom'

// Chakra UI
import { Container, VStack, HStack, Input, Button, Box, Text, InputGroup, NativeSelect, Spinner, Flex } from '@chakra-ui/react'

// Icons
import { FiSearch } from 'react-icons/fi'

// Controller
import { useHomePageHook } from './hooks/useHomePageHook'

// Components
import Logo from '../../components/created/Logo'

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
            <HStack position="absolute" top={4} right={4} spacing={2}>
                <Text color="var(--font-color2)" fontSize="sm">
                    {t('common.language')}
                </Text>
                <NativeSelect.Root
                    value={i18n.language.startsWith('pt') ? 'pt' : 'en'}
                    onChange={(e) => i18n.changeLanguage(e.target.value)}
                    w="140px"
                    bg="white"
                    color="var(--font-color2)"
                >
                    <NativeSelect.Field
                        defaultValue={i18n.language == "pt" ? "pt" : "en"}
                    >
                        <option value="en">{t('common.english')}</option>
                        <option value="pt">{t('common.portuguese')}</option>
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                </NativeSelect.Root>
            </HStack>
            <VStack spacing={8} align="center" maxW={"60vw"} w={"full"}>


                <Logo size="lg"
                />

                <Box w="full" maxW="600px">
                    <VStack spacing={1} align="stretch">
                        <Flex direction={{ base: 'column', md: 'row' }} gap={2}>
                            <InputGroup startElement={<FiSearch size={22} />}>
                                <Input
                                    required={true}
                                    placeholder={t('homePage.searchPlaceholder')}
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
                                w={{ base: 'full', md: 'auto' }}
                                bg="var(--primary-color)"
                                color={"white"}
                                _hover={{
                                    bg: 'var(--primary-color-hover)',
                                    transition: 'background-color 0.3s',
                                }}
                                padding={"2px 55px"}
                            >
                                {t('common.search')}
                            </Button>
                        </Flex>

                        <Box minH="20px">
                            {errorMessage && <Text color="red.500" fontSize="sm">{errorMessage}</Text>}
                        </Box>

                        {
                            isLoading ? (
                                <VStack gap={4}>
                                    <Spinner size="xl" color="var(--primary-color)" />
                                    <Text color="black">{t('profilePage.loading.profile')}</Text>
                                </VStack>
                            )
                                : (
                                    users.length > 0 && (
                                        <VStack align="stretch" spacing={3} mt={2}>
                                            {users.map((user) => (
                                                <Box
                                                    key={user.id}
                                                    display="flex"
                                                    flexFlow={{ base: 'column', md: 'row' }}
                                                    alignItems="center"
                                                    justifyContent="space-between"
                                                    border="1px solid var(--border-color)"
                                                    borderRadius="md"
                                                    p={3}
                                                >
                                                    <HStack spacing={3}
                                                        alignSelf={"flex-start"}
                                                    >
                                                        <Box
                                                            as="img"
                                                            src={user.avatar_url}
                                                            alt={user.login}
                                                            w="40px"
                                                            h="40px"
                                                            borderRadius="full"
                                                        />
                                                        <Text color="black" fontWeight="600"

                                                        >{user.login}</Text>
                                                    </HStack>
                                                    <Button
                                                        alignSelf={"flex-end"}
                                                        as={RouterLink}
                                                        to={`/profile/${user.login}`}
                                                        size="sm"
                                                        bg="var(--primary-color)"
                                                        color="white"
                                                        _hover={{ bg: 'var(--primary-color-hover)' }}
                                                    >
                                                        {t('common.view')}
                                                    </Button>
                                                </Box>
                                            ))}
                                        </VStack>
                                    )
                                )
                        }

                    </VStack>
                </Box>
            </VStack>
        </Container>
    )
}

export default HomePage