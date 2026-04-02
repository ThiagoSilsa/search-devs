import api from './BaseController'

// Schemas
import userProfileSchema, {
    repositoryListSchema,
    userSearchResponseSchema,
} from '../schemas/gitHubSchemas'

class GitHubController {
    createApiError(errorResponse) {
        const status = errorResponse?.status || 500
        const statusText = errorResponse?.statusText || 'Unexpected error'
        const apiMessage = errorResponse?.data?.message

        const error = new Error(apiMessage || `GitHub API error: ${status} ${statusText}`)
        error.status = status
        return error
    }

    async getUsers(username) {
        try {
            const response = await api.get('/search/users', {
                params: {
                    q: username,
                    per_page: 10,
                },
            })

            const parsedUsers = userSearchResponseSchema.safeParse(response.data)
            return parsedUsers.data.items
        } catch (error) {
            if (error instanceof Error && error.message === 'Invalid GitHub users response') {
                throw error
            }
            throw this.createApiError(error.response)
        }
    }

    async getUserProfile(username) {
        try {
            const response = await api.get(`/users/${encodeURIComponent(username)}`)

            const parsedProfile = userProfileSchema.safeParse(response.data)

            return parsedProfile.data
        } catch (error) {
            if (error instanceof Error && error.message === 'Invalid GitHub profile response') {
                throw error
            }
            throw this.createApiError(error.response)
        }
    }

    async getUserRepositories(username, repoMaxCount = 10, sort = 'updated', direction = 'desc') {
        try {
            const response = await api.get(`/users/${encodeURIComponent(username)}/repos`, {
                params: {
                    sort,
                    direction,
                    per_page: repoMaxCount,
                },
            })

            const parsedRepositories = repositoryListSchema.safeParse(response.data)

            return parsedRepositories.data
        } catch (error) {
            if (error instanceof Error && error.message === 'Invalid GitHub repositories response') {
                throw error
            }
            throw this.createApiError(error.response)
        }
    }
}

export default new GitHubController()