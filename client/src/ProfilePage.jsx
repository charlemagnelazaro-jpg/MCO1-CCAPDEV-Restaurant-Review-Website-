import React, { useEffect, useRef, useState } from 'react'
import { EditProfile } from '@/components/ui/edit-profile'
import { Card, CardContent, CardHeader, CardTitle } from './components/card'
import { Avatar, AvatarImage, AvatarFallback } from './components/avatar'
import { Button } from './components/button'
import { MapPin, UtensilsCrossed } from 'lucide-react'
import AnimatedLoadingSkeleton from './components/ui/animated-loading-skeleton'
import gsap from 'gsap'
import profileCover from './assets/profile_cover.jpg'
import { useAuth } from './context/AuthContext'
import { Link } from 'react-router-dom'

const ProfilePage = () => {
  const containerRef = useRef(null)
  const { user, updateProfile } = useAuth();
  const [recentReviews, setRecentReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  useEffect(() => {
    const fetchUserReviews = async () => {
      if (!user) return;
      setReviewsLoading(true);
      try {
        const userId = user._id || user.id;
        if (!userId) return;

        const response = await fetch(`/api/review/user/${userId}`);
        if (response.ok) {
          const data = await response.json();
          const mappedReviews = data.map(item => ({
            id: item._id,
            restaurant: item.restaurant?.name || "Unknown Restaurant",
            rating: item.rating,
            image: (item.images && item.images.length > 0) ? item.images[0] : null,
            authorImage: item.user?.img || user.img,
            text: item.comment,
            time: new Date(item.createdAt).toLocaleDateString()
          }));
          setRecentReviews(mappedReviews);
        }
      } catch (error) {
        console.error("Failed to fetch user reviews:", error);
      } finally {
        setReviewsLoading(false);
      }
    };

    fetchUserReviews();
  }, [user]);

  useEffect(() => {
    // Only run animation if user exists
    if (!user) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })


      tl.from(".profile-banner", {
        y: -50,
        opacity: 0,
        duration: 1.2,
        scale: 1.05
      })


      tl.from(".profile-info-container", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2
      }, "-=0.8")


      tl.from(".profile-avatar", {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)"
      }, "-=0.6")


      tl.from(".profile-text > *", {
        x: -20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1
      }, "-=0.4")


      tl.from(".profile-action", {
        x: 20,
        opacity: 0,
        duration: 0.5
      }, "-=0.4")


      tl.from(".profile-content-section > *", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2
      }, "-=0.2")

    }, containerRef)

    return () => ctx.revert()
  }, [user]) // Re-run if user loads

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please Log In</h2>
          <p className="mb-4">You need to be logged in to view your profile.</p>
          <Link to="/">
            <Button>Go to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (user.role === 'admin' || user.role === 'owner') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
          <p className="mb-4">You do not have permission to view this page.</p>
          <Link to="/">
            <Button>Go back</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-background pb-10 overflow-hidden">

      <div className="profile-banner h-64 w-full bg-cover bg-center relative" style={{ backgroundImage: `url(${profileCover})` }}>
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <div className="profile-info-container relative -mt-20 mb-8 flex flex-col md:flex-row gap-6 items-end md:items-end p-4">
          <Avatar className="profile-avatar w-40 h-40 border-4 border-background shadow-xl z-10 rounded-full">
            <AvatarImage src={user.img} alt={user.name} />
            <AvatarFallback>{user.name ? user.name.charAt(0) : "U"}</AvatarFallback>
          </Avatar>

          <div className="profile-text flex-1 text-center md:text-left mb-2">
            <h1 className="text-4xl font-bold text-foreground">{user.name}</h1>
            <div className="flex items-center justify-center md:justify-start text-muted-foreground mt-2 text-lg">
              <MapPin className="w-5 h-5 mr-1" />
              <span>{user.location}</span>
            </div>
          </div>

          <div className="profile-action mb-4 w-full md:w-auto">
            <EditProfile
              profile={user}
              setProfile={updateProfile}
              trigger={
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-8 py-6 text-lg w-full md:w-auto font-semibold shadow-lg transition-transform hover:scale-105">
                  Edit Profile
                </Button>
              }
            />
          </div>
        </div>

        <div className="profile-content-section grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="space-y-6">

            <Card className="hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <CardTitle>About Me</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{user.bio}</p>
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-semibold">Reviews:</span>
                    <span>{recentReviews.length > 0 ? recentReviews.length : user.stats.reviews}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-semibold">Upvotes:</span>
                    <span>{Math.max(0, user.stats.helpfulVotes || 0)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>


          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>

            <div className="w-full">
              {reviewsLoading ? (
                <div className="flex items-center justify-center py-16 text-muted-foreground">
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mr-3" />
                  Loading reviews...
                </div>
              ) : recentReviews.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 px-6 text-center bg-white dark:bg-card rounded-xl shadow-sm border border-border">
                  <UtensilsCrossed className="w-14 h-14 text-muted-foreground/40 mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-1">No reviews yet</h3>
                  <p className="text-muted-foreground text-sm mb-6">You haven't written any reviews yet. Start exploring restaurants and share your experience!</p>
                  <Link to="/">
                    <Button className="rounded-xl px-6">
                      Start Exploring
                    </Button>
                  </Link>
                </div>
              ) : (
                <AnimatedLoadingSkeleton reviews={recentReviews} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
