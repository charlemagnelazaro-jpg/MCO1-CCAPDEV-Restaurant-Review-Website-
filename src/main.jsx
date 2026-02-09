import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Home.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import ProfilePage from './ProfilePage'
import RestaurantCard from './RestaurantCard'
const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="pt-15">
        <Outlet />
      </div>
    </>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/profile',
        element: <ProfilePage />
      }
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    {/* */}
  </StrictMode>,
)
