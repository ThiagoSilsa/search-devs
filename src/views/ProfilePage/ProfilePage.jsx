import { useEffect, useState } from 'react'
import { Link as RouterLink, useParams } from 'react-router-dom'

// Chakra UI
import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    HStack,
    Link,
    Spinner,
    Stack,
    Text,
    VStack,
} from '@chakra-ui/react'

// Controller
import GitHubController from '../../controller/GitHubController'

const ProfilePage = () => {
    // Capture username from param
    const { username } = useParams()

    const [user, setUser] = useState(null)
    const [repositories, setRepositories] = useState([])
    const [loading, setLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        const fetchProfileData = async () => {
            if (!username) {
                setErrorMessage('User not found')
                setLoading(false)
                return
            }

            try {
                setLoading(true)
                setErrorMessage('')

                const [profileData, repositoriesData] = await Promise.all([
                    GitHubController.getUserProfile(username),
                    GitHubController.getUserRepositories(username),
                ])

                setUser(profileData)
                setRepositories(repositoriesData)
            } catch (error) {
                setErrorMessage(error.message || 'Unexpected error while loading profile')
            } finally {
                setLoading(false)
            }
        }

        fetchProfileData()
    }, [username])

    if (loading) {
        return (
            <Container minW="100vw" minH="100vh" display="flex" alignItems="center" justifyContent="center">
                <VStack gap={4}>
                    <Spinner size="xl" color="var(--primary-color)" />
                    <Text color="black">Loading profile...</Text>
                </VStack>
            </Container>
        )
    }

    if (errorMessage || !user) {
        return (
            <Container minW="100vw" minH="100vh" display="flex" alignItems="center" justifyContent="center">
                <VStack gap={4}>
                    <Text color="red.500">{errorMessage || 'Could not load user profile'}</Text>
                    <Button as={RouterLink} to="/" bg="var(--primary-color)" color="white" _hover={{ bg: 'var(--primary-color-hover)' }}>
                        Back
                    </Button>
                </VStack>
            </Container>
        )
    }

    return (
        <Container minW="100vw" minH="100vh" bg="white" py={10}>
            <VStack maxW="1200px" mx="auto" align="stretch" gap={6}>
                <Button
                    as={RouterLink}
                    to="/"
                    alignSelf="flex-start"
                    variant="outline"
                    borderColor="var(--border-color)"
                    color="black"
                >
                    Back to search
                </Button>

                <Flex direction={{ base: 'column', md: 'row' }} align="flex-start" gap={8}>
                    <Box
                        w={{ base: 'full', md: '320px' }}
                        border="1px solid var(--border-color)"
                        borderRadius="md"
                        p={6}
                        position={{ base: 'static', md: 'sticky' }}
                        top={6}
                    >
                        <VStack align="stretch" gap={4}>
                            <Box as="img" src={user.avatar_url} alt={user.login} borderRadius="full" w="120px" h="120px" mx="auto" />
                            <VStack align="stretch" gap={1}>
                                <Heading as="h1" size="md" color="black">
                                    {user.name || user.login}
                                </Heading>
                                <Text color="gray.600">@{user.login}</Text>
                            </VStack>

                            {user.bio && <Text color="gray.700">{user.bio}</Text>}

                            <Stack direction="row" gap={6}>
                                <VStack align="flex-start" gap={0}>
                                    <Text fontSize="lg" fontWeight="700" color="black">
                                        {user.followers}
                                    </Text>
                                    <Text color="gray.600">Followers</Text>
                                </VStack>
                                <VStack align="flex-start" gap={0}>
                                    <Text fontSize="lg" fontWeight="700" color="black">
                                        {user.following}
                                    </Text>
                                    <Text color="gray.600">Following</Text>
                                </VStack>
                            </Stack>

                            <HStack justify="space-between">
                                <Text color="gray.600">Public repos</Text>
                                <Text color="black" fontWeight="700">
                                    {user.public_repos}
                                </Text>
                            </HStack>
                        </VStack>
                    </Box>

                    <Box flex="1" w="full">
                        <Heading as="h2" size="lg" color="black" mb={4}>
                            Repositories
                        </Heading>

                        {repositories.length === 0 && (
                            <Text color="gray.600">This user has no public repositories.</Text>
                        )}

                        <VStack align="stretch" gap={3}>
                            {repositories.map((repository) => (
                                <Box key={repository.id} border="1px solid var(--border-color)" borderRadius="md" p={4}>
                                    <HStack justify="space-between" align="flex-start" gap={4}>
                                        <VStack align="stretch" gap={1} flex="1">
                                            <Link
                                                href={repository.html_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                color="var(--secondary-color)"
                                                fontWeight="700"
                                            >
                                                {repository.name}
                                            </Link>
                                            {repository.description && (
                                                <Text color="gray.600" fontSize="sm">
                                                    {repository.description}
                                                </Text>
                                            )}
                                        </VStack>
                                        <Text color="gray.500" fontSize="sm" whiteSpace="nowrap">
                                            {repository.language || 'No language'}
                                        </Text>
                                    </HStack>
                                </Box>
                            ))}
                        </VStack>
                    </Box>
                </Flex>
            </VStack>
        </Container>
    )
}

export default ProfilePage
