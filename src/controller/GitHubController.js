import api from './BaseController'

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

            return response.data?.items || []
        } catch (error) {
            throw this.createApiError(error.response)
        }
    }

    async getUserProfile(username) {
        try {
            const response = await api.get(`/users/${encodeURIComponent(username)}`)
            return response.data
        } catch (error) {
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

            return response.data
        } catch (error) {
            throw this.createApiError(error.response)
        }
    }
}

export default new GitHubController()