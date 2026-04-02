import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

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
    NativeSelect,
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
    const { t, i18n } = useTranslation()

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
    const [sortType, setSortType] = useState('updated')
    const [sortDirection, setSortDirection] = useState('desc')

    const hasMoreRepositories = user ? repoMaxCount < user.public_repos : false


    // Find user profile and initial repositories on component mount
    useEffect(() => {
        const fetchInitialProfileData = async () => {
            if (!username) {
                setErrorMessage(t('profilePage.errors.userNotFound'))
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
                setErrorMessage(error.message || t('profilePage.errors.profileLoad'))
            } finally {
                setLoadingUser(false)
            }
        }

        fetchInitialProfileData()
    }, [username, t])

    // Busca pelos repositorios do usuário
    useEffect(() => {
        const fetchInitialProfileData = async () => {
            try {
                setLoadingRepos(true)
                setErrorMessage('')

                const [repositoriesData] = await Promise.all([
                    GitHubController.getUserRepositories(username, 10, sortType, sortDirection),
                ])

                setRepositories(repositoriesData)
            } catch (error) {
                setErrorMessage(error.message || t('profilePage.errors.repositoriesLoad'))
            } finally {
                setLoadingRepos(false)
            }
        }
        fetchInitialProfileData()
    }, [username, sortType, sortDirection, t])

    // Load more repositories when repoMaxCount changes (triggered by scroll)
    useEffect(() => {
        const fetchMoreRepositories = async () => {
            if (!username || repoMaxCount <= 10 || !user) {
                return
            }

            try {
                setIsLoadingMoreRepos(true)
                const repositoriesData = await GitHubController.getUserRepositories(username, repoMaxCount, sortType, sortDirection)
                setRepositories(repositoriesData)
            } catch (error) {
                setErrorMessage(error.message || t('profilePage.errors.repositoriesLoad'))
            } finally {
                setIsLoadingMoreRepos(false)
            }
        }

        fetchMoreRepositories()
    }, [username, repoMaxCount, user, sortType, sortDirection, t])

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
                    <Text color="black">{t('profilePage.loading.profile')}</Text>
                </VStack>
            </Container>
        )
    }
    if (errorMessage || !user) {
        return (
            <Container minW="100vw" minH="100vh" display="flex" alignItems="center" justifyContent="center" bg={"white"}>
                <VStack gap={4}>
                    <Text color="red.500">{errorMessage || t('profilePage.errors.profileFallback')}</Text>
                    {isUserNotFound && (
                        <Text color="var(--font-color2)" whiteSpace="wrap" wordBreak="break-word">
                            {t('profilePage.errors.userDoesNotExist', { username })}
                        </Text>
                    )}
                    <Button as={RouterLink} to="/" bg="var(--primary-color)" color="white" _hover={{ bg: 'var(--primary-color-hover)' }}>
                        {t('common.back')}
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
                    {t('common.backToSearch')}
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
                                        {t('profilePage.stats.followers', { count: user?.followers || 0 })}
                                    </Text>
                                </HStack>
                                <HStack justify="space-between">
                                    <CiHeart color={"var(--font-color2)"} size={20} />
                                    <Text color="var(--font-color2)">
                                        {t('profilePage.stats.following', { count: user?.following || 0 })}
                                    </Text>
                                </HStack>

                            </VStack>
                            <VStack align="flex-start" gap={2} marginTop={4}>
                                <HStack justify="space-between">
                                    <BsBuilding color={"var(--font-color2)"} size={20} />
                                    <Text color="var(--font-color2)">
                                        {user?.company || t('profilePage.fallback.company')}
                                    </Text>
                                </HStack>
                                <HStack justify="space-between">
                                    <IoLocationOutline color={"var(--font-color2)"} size={20} />
                                    <Text color="var(--font-color2)">
                                        {user?.location || t('profilePage.fallback.location')}
                                    </Text>
                                </HStack>
                                <HStack justify="space-between">
                                    <FiLink color={"var(--font-color2)"} size={20} />
                                    <Text color="var(--font-color2)" whiteSpace="wrap" wordBreak="break-word">
                                        {user?.blog || t('profilePage.fallback.website')}
                                    </Text>
                                </HStack>
                                <HStack justify="space-between">
                                    <CiMail color={"var(--font-color2)"} size={20} />
                                    <Text color="var(--font-color2)" whiteSpace="wrap" wordBreak="break-word">
                                        {user?.email || t('profilePage.fallback.email')}
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
                                        {t('common.contact')}
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
                                        {t('common.twitter')}
                                    </Button>)
                            }
                        </VStack>

                    </Box>

                    <Box flex="1" w="full">
                        <Flex direction={{ base: 'column', md: 'row' }} gap={2} justify={"space-between"}>
                            <Heading as="h2" size="lg" color="black" mb={4}>
                                {t('profilePage.title')}
                            </Heading>
                            <HStack spacing={3}>
                                <NativeSelect.Root
                                    value={sortType}
                                    onChange={(e) => setSortType(e.target.value)}
                                    w="150px"
                                    bg="white"
                                    color={"var(--font-color2)"}
                                >
                                    <NativeSelect.Field
                                    >
                                        <option value="updated">{t('profilePage.sort.updated')}</option>
                                        <option value="created">{t('profilePage.sort.created')}</option>
                                        <option value="pushed">{t('profilePage.sort.pushed')}</option>
                                        <option value="full_name">{t('profilePage.sort.fullName')}</option>
                                    </NativeSelect.Field>
                                    <NativeSelect.Indicator />
                                </NativeSelect.Root>
                                <NativeSelect.Root
                                    value={sortDirection}
                                    onChange={(e) => setSortDirection(e.target.value)}
                                    w="120px"
                                    bg="white"
                                    color={"var(--font-color2)"}
                                >
                                    <NativeSelect.Field
                                    >
                                        <option value="asc">{t('profilePage.sort.asc')}</option>
                                        <option value="desc">{t('profilePage.sort.desc')}</option>
                                    </NativeSelect.Field>
                                    <NativeSelect.Indicator />
                                </NativeSelect.Root>
                            </HStack>
                        </Flex>


                        {repositories.length === 0 && (
                            <Text color="gray.600">{t('profilePage.states.noRepositories')}</Text>
                        )}

                        <VStack align="stretch" gap={3}>
                            {
                                loadingRepos ? (
                                    <HStack justify="center" py={6}>
                                        <Spinner size="lg" color="var(--primary-color)" />
                                        <Text color="var(--font-color2)">{t('profilePage.loading.repositories')}</Text>
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
                                                        {repository.language || t('profilePage.fallback.language')}
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
                                                            {repository.updated_at
                                                                ? t('profilePage.updatedWithDate', { value: getDayQuantityText(repository.updated_at) })
                                                                : t('profilePage.fallback.noUpdateDate')}
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
                                    {t('profilePage.states.noMoreRepositories')}
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
