import { useTranslation } from 'react-i18next'

// Router
import { Link as RouterLink, useParams } from 'react-router-dom'

// Chakra UI
import { Button, Container, Flex, VStack } from '@chakra-ui/react'

// Hooks
import { useProfilePageHook } from './hooks/useProfilePageHook'

// Components
import ProfileLoadingState from './components/ProfileLoadingState'
import ProfileErrorState from './components/ProfileErrorState'
import ProfileSidebar from './components/ProfileSidebar'
import RepositoriesSection from './components/RepositoriesSection'


const ProfilePage = () => {
    const { t } = useTranslation()

    // Capture username from param
    const { username } = useParams()

    const {
        user,
        repositories,
        loadingUser,
        loadingRepos,
        errorMessage,
        isUserNotFound,
        hasMoreRepositories,
        sortType,
        sortDirection,
        setSortType,
        setSortDirection,
    } = useProfilePageHook(username, t)

    if (loadingUser && loadingRepos) {
        return <ProfileLoadingState t={t} />
    }

    if (errorMessage || !user) {
        return (
            <ProfileErrorState errorMessage={errorMessage} isUserNotFound={isUserNotFound} username={username} t={t} />
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
                    color="var(--font-color1)"
                    _hover={{
                        bg: 'var(--primary-color-hover)',
                        transition: 'background-color 0.3s',
                        color: 'white',
                    }}
                >
                    {t('common.backToSearch')}
                </Button>

                <Flex direction={{ base: 'column', md: 'row' }} align="flex-start" gap={8}>
                    <ProfileSidebar user={user} t={t} />
                    <RepositoriesSection
                        repositories={repositories}
                        loadingRepos={loadingRepos}
                        hasMoreRepositories={hasMoreRepositories}
                        sortType={sortType}
                        sortDirection={sortDirection}
                        setSortType={setSortType}
                        setSortDirection={setSortDirection}
                        t={t}
                    />
                </Flex>
            </VStack>
        </Container>
    )
}

export default ProfilePage
