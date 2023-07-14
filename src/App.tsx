import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import RootLayout from './pages/RootLayout'
import GameContainer from './components/GameContainer'
import Leaderboard from './pages/Leaderboard'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<GameContainer />} />
      <Route path="leaderboard" element={<Leaderboard />} />
    </Route>
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App
