// Controller
import GitHubController from "../../../controller/GitHubController"

export const useHomePageHook = (
    searchTerm,
    setUsers,
    setErrorMessage,
    t,
) => {
    const handleSearch = async (

    ) => {
        const query = searchTerm.trim()

        if (!query) {
            setUsers([])
            setErrorMessage(t('homePage.errors.emptySearch'))
            return
        }

        try {
            const users = await GitHubController.getUsers(query)
            setUsers(users)
            if (users.length === 0) {
                setErrorMessage(t('homePage.errors.noResults'))
            } else {
                setErrorMessage('')
            }
        } catch (error) {
            setErrorMessage(error.message || t('homePage.errors.unexpected'))
        }
    }

    return {
        handleSearch,
    }
}