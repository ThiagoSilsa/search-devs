import axios from 'axios'

const token = import.meta.env.VITE_GITHUB_TOKEN
const headers = token ? { Authorization: `Bearer ${token}` } : {}

const api = axios.create({
    baseURL: 'https://api.github.com',
    headers,
})

export default api