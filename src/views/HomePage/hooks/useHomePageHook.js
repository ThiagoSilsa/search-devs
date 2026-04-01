// Controller
import GitHubController from "../../../controller/GitHubController"

export const useHomePageHook = (
    searchTerm,
    setUsers,
    setErrorMessage,
) => {
    const handleSearch = async (
        
    ) => {
        const query = searchTerm.trim()

        if (!query) {
            setUsers([])
            setErrorMessage('Type a username to search')
            return
        }

        try {
            const users = await GitHubController.getUsers(query)
            setUsers(users)
            if (users.length === 0) {
                setErrorMessage('No results found')
            } else {
                setErrorMessage('')
            }
        } catch (error) {
            setErrorMessage(error.message || 'Unexpected error while searching users')
        }
    }

    return {
        handleSearch,
    }
}