import HomePage from "../views/HomePage/HomePage"
import PerfilPage from "../views/ProfilePage/ProfilePage"

const routes = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/profile/:username',
    element: <PerfilPage />,
  }
]

export default routes