import React, { useEffect, useRef } from 'react'
import { EditProfile } from '@/components/ui/edit-profile'
import { Card, CardContent, CardHeader, CardTitle } from './components/card'
import { Avatar, AvatarImage, AvatarFallback } from './components/avatar'
import { Button } from './components/button'
import { MapPin } from 'lucide-react'
import AnimatedLoadingSkeleton from './components/ui/animated-loading-skeleton'
import gsap from 'gsap'
import profileCover from './assets/profile_cover.jpg'
import { useAuth } from './context/AuthContext'
import { Link } from 'react-router-dom'

const ProfilePage = () => {
  const containerRef = useRef(null)
  const { user, updateProfile } = useAuth();

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
                    <span>{user.stats.reviews}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-semibold">Photos:</span>
                    <span>{user.stats.photos}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-semibold">Followers:</span>
                    <span>{user.stats.followers}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>


          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>

            <div className="w-full">
              <AnimatedLoadingSkeleton reviews={user.reviews} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
