import { useEffect, useState } from 'react'

// Router
import { Link as RouterLink, useParams } from 'react-router-dom'

// Chakra UI
import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    HStack,
    Icon,
    Link,
    Spinner,
    Text,
    VStack,
} from '@chakra-ui/react'

// Controller
import GitHubController from '../../controller/GitHubController'

// Lib
import getDayQuantityText from '../../utils/getComparedDate'

// Icons
import { HiOutlineUserGroup } from 'react-icons/hi'
import { CiHeart, CiMail } from 'react-icons/ci'
import { IoEyeOutline, IoLocationOutline, IoStarOutline } from 'react-icons/io5'
import { FiLink, FiMoreHorizontal } from 'react-icons/fi'
import { LuDot } from 'react-icons/lu'
import { BsBuilding } from 'react-icons/bs'


const ProfilePage = () => {
    // Capture username from param
    const { username } = useParams()

    const [user, setUser] = useState(null)
    const [repositories, setRepositories] = useState([])
    const [loadingUser, setLoadingUser] = useState(true)
    const [loadingRepos, setLoadingRepos] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')
    const [isUserNotFound, setIsUserNotFound] = useState(false)
    const [repoMaxCount, setRepoMaxCount] = useState(10)
    const [isLoadingMoreRepos, setIsLoadingMoreRepos] = useState(false)

    const hasMoreRepositories = user ? repoMaxCount < user.public_repos : false

    // Find user profile and initial repositories on component mount
    useEffect(() => {
        const fetchInitialProfileData = async () => {
            if (!username) {
                setErrorMessage('User not found')
                setLoadingUser(false)
                return
            }

            try {
                setLoadingUser(true)
                setErrorMessage('')
                setIsUserNotFound(false)
                const [profileData] = await Promise.all([
                    GitHubController.getUserProfile(username),
                ])

                setUser(profileData)
            } catch (error) {
                if (error?.status === 404) {
                    setIsUserNotFound(true)
                }
                setErrorMessage(error.message || 'Unexpected error while loading profile')
            } finally {
                setLoadingUser(false)
            }
        }

        fetchInitialProfileData()
    }, [username])

    // Busca pelos repositorios do usuário
    useEffect(() => {
        const fetchInitialProfileData = async () => {
            try {
                setLoadingRepos(true)
                setErrorMessage('')

                const [repositoriesData] = await Promise.all([
                    GitHubController.getUserRepositories(username, 10),
                ])

                setRepositories(repositoriesData)
            } catch (error) {
                setErrorMessage(error.message || 'Unexpected error while loading repositories')
            } finally {
                setLoadingRepos(false)
            }
        }
        fetchInitialProfileData()
    }, [username])

    // Load more repositories when repoMaxCount changes (triggered by scroll)
    useEffect(() => {
        const fetchMoreRepositories = async () => {
            if (!username || repoMaxCount <= 10 || !user) {
                return
            }

            try {
                setIsLoadingMoreRepos(true)
                const repositoriesData = await GitHubController.getUserRepositories(username, repoMaxCount)
                setRepositories(repositoriesData)
            } catch (error) {
                setErrorMessage(error.message || 'Unexpected error while loading repositories')
            } finally {
                setIsLoadingMoreRepos(false)
            }
        }

        fetchMoreRepositories()
    }, [username, repoMaxCount, user])

    // Infinite scroll handler
    useEffect(() => {
        const handleScrollToBottom = () => {
            if (!user || loadingUser || isLoadingMoreRepos || !hasMoreRepositories) {
                return
            }

            const scrollPosition = window.innerHeight + window.scrollY
            const pageEnd = document.documentElement.scrollHeight
            const reachedBottom = scrollPosition >= pageEnd - 48

            if (reachedBottom) {
                setRepoMaxCount((previousCount) => {
                    const nextCount = previousCount + 10
                    return Math.min(nextCount, user.public_repos)
                })
            }
        }

        window.addEventListener('scroll', handleScrollToBottom)

        return () => {
            window.removeEventListener('scroll', handleScrollToBottom)
        }
    }, [hasMoreRepositories, isLoadingMoreRepos, loadingUser, user])

    if (loadingUser && loadingRepos) {
        return (
            <Container minW="100vw" minH="100vh" display="flex" alignItems="center" justifyContent="center" bg="white">
                <VStack gap={4}>
                    <Spinner size="xl" color="var(--primary-color)" />
                    <Text color="black">Loading profile...</Text>
                </VStack>
            </Container>
        )
    }
    if (errorMessage || !user) {
        return (
            <Container minW="100vw" minH="100vh" display="flex" alignItems="center" justifyContent="center" bg={"white"}>
                <VStack gap={4}>
                    <Text color="red.500">{errorMessage || 'Could not load user profile'}</Text>
                    {isUserNotFound && (
                        <Text color="var(--font-color2)" whiteSpace="wrap" wordBreak="break-word">
                            The user "{username}" does not exist on GitHub.
                        </Text>
                    )}
                    <Button as={RouterLink} to="/" bg="var(--primary-color)" color="white" _hover={{ bg: 'var(--primary-color-hover)' }}>
                        Back
                    </Button>
                </VStack>
            </Container>
        )
    }

    return (
        <Container minW="99vw" minH="100vh" bg="white" py={10}>
            <VStack maxW="1200px" mx="auto" align="stretch" gap={6}>
                <Button
                    as={RouterLink}
                    to="/"
                    alignSelf="flex-start"
                    borderColor="var(--border-color)"
                    color="black"
                    _hover={{
                        bg: 'var(--primary-color-hover)',
                        transition: 'background-color 0.3s',
                        color: 'white',
                    }}
                >
                    Back to search
                </Button>

                <Flex direction={{ base: 'column', md: 'row' }} align="flex-start" gap={8} >
                    <Box
                        w={{ base: 'full', md: '320px' }}
                        border="1px solid var(--border-color)"
                        borderRadius="md"
                        p={6}
                        position={{ base: 'static', md: 'sticky' }}
                        top={6}
                    >
                        <VStack align="stretch" gap={4} >
                            <HStack align="center">
                                <Box as="img" src={user.avatar_url} alt={user.login} borderRadius="full" w="55px" />
                                <VStack gap={1} align={"flex-start"}>
                                    <Heading as="h1" size="md" color="var(--font-color1)">
                                        {user.name || user.login}
                                    </Heading>
                                    <Text fontSize={"sm"} color="var(--font-color3)">@{user.login}</Text>
                                </VStack>
                            </HStack>
                            {user.bio && <Text color="var(--font-color2)">{user.bio}</Text>}

                            <VStack align="flex-start" gap={1}>
                                <HStack justify="space-between">
                                    <HiOutlineUserGroup color={"var(--font-color2)"} size={20} />
                                    <Text color="var(--font-color2)">
                                        {user?.followers || '0'} Followers</Text>
                                </HStack>
                                <HStack justify="space-between">
                                    <CiHeart color={"var(--font-color2)"} size={20} />
                                    <Text color="var(--font-color2)">
                                        {user?.following || '0'} Following</Text>
                                </HStack>

                            </VStack>
                            <VStack align="flex-start" gap={2} marginTop={4}>
                                <HStack justify="space-between">
                                    <BsBuilding color={"var(--font-color2)"} size={20} />
                                    <Text color="var(--font-color2)">
                                        {user?.company || 'No public company'}
                                    </Text>
                                </HStack>
                                <HStack justify="space-between">
                                    <IoLocationOutline color={"var(--font-color2)"} size={20} />
                                    <Text color="var(--font-color2)">
                                        {user?.location || 'No public location'}
                                    </Text>
                                </HStack>
                                <HStack justify="space-between">
                                    <FiLink color={"var(--font-color2)"} size={20} />
                                    <Text color="var(--font-color2)" whiteSpace="wrap" wordBreak="break-word">
                                        {user?.blog || 'No public website'}
                                    </Text>
                                </HStack>
                                <HStack justify="space-between">
                                    <CiMail color={"var(--font-color2)"} size={20} />
                                    <Text color="var(--font-color2)" whiteSpace="wrap" wordBreak="break-word">
                                        {user?.email || 'No public email'}
                                    </Text>
                                </HStack>
                            </VStack>
                        </VStack>
                        <VStack marginTop={10}>
                            {
                                user?.blog && (
                                    <Button
                                        as="a"
                                        href={user?.blog}
                                        target="_blank"
                                        rel="noreferrer"
                                        size="md"
                                        bg="var(--primary-color)"
                                        color={"white"}
                                        _hover={{
                                            bg: 'var(--primary-color-hover)',
                                            transition: 'background-color 0.3s',
                                        }}
                                        padding={"2px 55px"}
                                        w={"full"}

                                    >
                                        Contact
                                    </Button>
                                )
                            }
                            {
                                user?.twitter_username && (
                                    <Button
                                        as="a"
                                        href={`https://x.com/${user?.twitter_username}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        size="md"
                                        bg="var(--primary-color)"
                                        color={"white"}
                                        _hover={{
                                            bg: 'var(--primary-color-hover)',
                                            transition: 'background-color 0.3s',
                                        }}
                                        padding={"2px 55px"}
                                        w={"full"}
                                    >
                                        Twitter
                                    </Button>)
                            }
                        </VStack>

                    </Box>

                    <Box flex="1" w="full">
                        <HStack justify="space-between" align="center" mb={4}>
                            <Heading as="h2" size="lg" color="black" mb={4}>
                                Repositories
                            </Heading>
                            !AQUI
                        </HStack>


                        {repositories.length === 0 && (
                            <Text color="gray.600">This user has no public repositories.</Text>
                        )}

                        <VStack align="stretch" gap={3}>
                            {
                                loadingRepos ? (
                                    <HStack justify="center" py={6}>
                                        <Spinner size="lg" color="var(--primary-color)" />
                                        <Text color="var(--font-color2)">Loading repositories...</Text>
                                    </HStack>
                                )
                                    :
                                    (
                                        repositories.map((repository) => (
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
                                                            <Text color="var(--font-color2)" fontSize="sm">
                                                                {repository.description}
                                                            </Text>
                                                        )}
                                                    </VStack>
                                                    <Text color="var(--font-color2)" fontSize="sm" whiteSpace="nowrap">
                                                        {repository.language || 'No language'}
                                                    </Text>
                                                </HStack>
                                                <HStack mt={2} spacing={4}>
                                                    <HStack spacing={1}>
                                                        <IoStarOutline color={"var(--font-color2)"} size={16} />
                                                        <Text color="var(--font-color2)" fontSize="sm">
                                                            {repository.stargazers_count}
                                                        </Text>
                                                    </HStack>
                                                    <HStack spacing={1}>
                                                        <IoEyeOutline color={"var(--font-color2)"} size={16} />
                                                        <Text color="var(--font-color2)" fontSize="sm">
                                                            {repository.watchers_count}
                                                        </Text>
                                                    </HStack>
                                                    <HStack spacing={1}>
                                                        <LuDot color={"var(--font-color2)"} size={16} />
                                                        <Text color="var(--font-color2)" fontSize="sm">
                                                            {repository.updated_at ? "updated " + getDayQuantityText(repository.updated_at) : 'No update date'}
                                                        </Text>
                                                    </HStack>
                                                </HStack>
                                            </Box>
                                        ))
                                    )
                            }

                        </VStack>

                        <VStack mt={6}>
                            {hasMoreRepositories && (
                                <Icon as={FiMoreHorizontal} boxSize={7} color="var(--font-color2)" />
                            )}
                            {!hasMoreRepositories && repositories.length > 0 && (
                                <Text color="var(--font-color2)" fontSize="sm">
                                    No more repositories to load.
                                </Text>
                            )}
                        </VStack>
                    </Box>
                </Flex>
            </VStack>
        </Container>
    )
}

export default ProfilePage
