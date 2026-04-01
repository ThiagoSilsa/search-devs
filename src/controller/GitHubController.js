class GitHubController {
    createApiError(response) {
        const error = new Error(`GitHub API error: ${response.status} ${response.statusText}`)
        error.status = response.status
        return error
    }

    async getUsers(username) {
        // GitHub API endpoint for searching users limited to 10 results
        const response = await fetch(`https://api.github.com/search/users?q=${encodeURIComponent(username)}&per_page=10`)

        if (!response.ok) {
            throw this.createApiError(response)
        }
        const data = await response.json()
        return data.items || []
    }

    async getUserProfile(username) {
        const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`)

        if (!response.ok) {
            throw this.createApiError(response)
        }

        return response.json()
    }

    async getUserRepositories(username) {
        const response = await fetch(
            `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=10`
        )

        if (!response.ok) {
            throw this.createApiError(response)
        }

        return response.json()
    }
}

export default new GitHubController()