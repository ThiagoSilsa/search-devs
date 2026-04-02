# Search Devs

[https://search-devs-jade.vercel.app/](https://search-devs-jade.vercel.app/)



A web application to search and explore GitHub developer profiles. The project is built with React and Chakra UI, consuming the GitHub API to present profile and repository data.

## Technologies Used

### Languages
![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=000)
![HTML5](https://img.shields.io/badge/-HTML5-E34F26?style=flat&logo=html5&logoColor=fff)
![CSS3](https://img.shields.io/badge/-CSS3-1572B6?style=flat&logo=css3&logoColor=fff)

### Frameworks and Libraries
![React](https://img.shields.io/badge/-React-20232A?style=flat&logo=react&logoColor=61DAFB)
![React Router](https://img.shields.io/badge/-React_Router-CA4245?style=flat&logo=react-router&logoColor=fff)
![Chakra UI](https://img.shields.io/badge/-Chakra_UI-319795?style=flat&logo=chakraui&logoColor=fff)
![Axios](https://img.shields.io/badge/-Axios-5A29E4?style=flat&logo=axios&logoColor=fff)
![Zod](https://img.shields.io/badge/-Zod-3E67B1?style=flat&logo=zod&logoColor=fff)
![i18next](https://img.shields.io/badge/-i18next-26A69A?style=flat&logo=i18next&logoColor=fff)

### Build and Tooling
![Vite](https://img.shields.io/badge/-Vite-646CFF?style=flat&logo=vite&logoColor=fff)
![ESLint](https://img.shields.io/badge/-ESLint-4B32C3?style=flat&logo=eslint&logoColor=fff)
![npm](https://img.shields.io/badge/-npm-CB3837?style=flat&logo=npm&logoColor=fff)

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Steps
1. Clone the repository:
```bash
git clone https://github.com/yourusername/search-devs.git
cd search-devs
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```
3. Setup enviromental variables:
```bash
VITE_GITHUB_TOKEN = ""
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```



## Live Demo

Access the deployed application on Vercel:
[Search Devs on Vercel](https://search-devs-jade.vercel.app/)

## How It Works

### Developer Search
![GitHub Profile Search](/public/gifs/Search.gif)


## URL Search
![GitHub Profile Search](/public/gifs/URLSearch.gif)

### Repository Listing
![GitHub Profile Repository ordering](/public/gifs/RepositoryOrdering.gif)


### Multi-language Support
![GitHub Profile Language Changing](/public/gifs/Language.gif)


### Responsive Layout
![GitHub Profile Language Mobile](/public/gifs/Mobile.gif)

## Project Structure

```text
src/
|-- components/
|   |-- created/
|   `-- ui/
|-- controller/
|-- i18n/
|-- routes/
|-- schemas/
|-- utils/
|-- views/
|   |-- HomePage/
|   `-- ProfilePage/
|-- assets/
|-- global.css
`-- main.jsx
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Starts the development server |
| `npm run build` | Builds the project for production |
| `npm run lint` | Runs lint checks |
| `npm run preview` | Previews the production build locally |

## Environment Variables

```bash
VITE_GITHUB_TOKEN = ""
```
## Author

Created by [Thiago Santos](https://github.com/ThiagoSilsa)
