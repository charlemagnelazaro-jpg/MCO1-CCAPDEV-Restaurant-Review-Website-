import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Home.jsx'
import { createBrowserRouter, RouterProvider, Navigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import ProfilePage from './ProfilePage'
import RestaurantCard from './RestaurantCard'
import { AuthProvider, useAuth } from './context/AuthContext'
import RestoReview from './RestoReview'
import RestoReviewResponse from './RestoReviewResponse'
import { Toaster } from './components/sonner'

const Layout = () => {
  const { user, restaurants } = useAuth();
  const location = useLocation();

  if (user?.role === 'owner' && restaurants?.length > 0) {
    const ownerRestaurant = restaurants.find(r => r._id === user.restaurantID);
    if (ownerRestaurant) {
      const allowedPath = `/review/${encodeURIComponent(ownerRestaurant.name)}`;
      
      // Decode the URIs for safe comparison (this handles spacing and special characters correctly)
      const currentDecoded = decodeURIComponent(location.pathname);
      const allowedDecoded = decodeURIComponent(allowedPath);

      if (currentDecoded !== allowedDecoded) {
        return <Navigate to={allowedPath} replace />;
      }
    }
  }

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
      },
      {
        path: '/review/:restaurant',
        element: <RestoReview />
      },
      {
        path: '/reviewResponse/:name',
        element: <RestoReviewResponse />
      }
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster position="bottom-right" theme="light" />
    </AuthProvider>
    {/* */}
  </StrictMode>,
)
