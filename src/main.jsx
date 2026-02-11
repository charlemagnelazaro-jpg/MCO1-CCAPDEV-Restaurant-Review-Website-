import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Home.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import ProfilePage from './ProfilePage'
import RestaurantCard from './RestaurantCard'
import { AuthProvider } from './context/AuthContext'
import RestoReview from './RestoReview'

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
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    {/* */}
  </StrictMode>,
)
