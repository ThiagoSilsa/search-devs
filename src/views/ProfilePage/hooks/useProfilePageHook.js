import { useEffect, useState } from 'react'

import GitHubController from '../../../controller/GitHubController'

export const useProfilePageHook = (username, t) => {
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
                const profileData = await GitHubController.getUserProfile(username)
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

    useEffect(() => {
        const fetchRepositories = async () => {
            try {
                setLoadingRepos(true)
                setErrorMessage('')

                const repositoriesData = await GitHubController.getUserRepositories(username, 10, sortType, sortDirection)

                setRepositories(repositoriesData)
            } catch (error) {
                setErrorMessage(error.message || t('profilePage.errors.repositoriesLoad'))
            } finally {
                setLoadingRepos(false)
            }
        }

        fetchRepositories()
    }, [username, sortType, sortDirection, t])

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

    return {
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
    }
}
