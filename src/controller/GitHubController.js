class GitHubController {
    async getUsers(username) {
        // GitHub API endpoint for searching users limited to 10 results
        const response = await fetch(`https://api.github.com/search/users?q=${encodeURIComponent(username)}&per_page=10`)

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
        }
        const data = await response.json()
        return data.items || []
    }
}

export default new GitHubController()