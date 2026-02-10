import React, { useState, useEffect, useRef } from 'react'
import { EditProfile } from '@/components/ui/edit-profile'
import { Card, CardContent, CardHeader, CardTitle } from './components/card'
import { Avatar, AvatarImage, AvatarFallback } from './components/avatar'
import { Button } from './components/button'
import { MapPin } from 'lucide-react'
import AnimatedLoadingSkeleton from './components/ui/animated-loading-skeleton'
import gsap from 'gsap'
import dummyProfile from './assets/dummy_profile.jpg'
import profileCover from './assets/profile_cover.jpg'

const ProfilePage = () => {
  const containerRef = useRef(null)

  useEffect(() => {
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
  }, [])

  // random data
  const [user, setUser] = useState({
    name: "P. Carti",
    location: "New York City, NY",
    bio: "Food enthusiast exploring local gems. Always looking for the perfect taco.",
    img: dummyProfile,
    stats: {
      reviews: 42,
      photos: 115,
      followers: 88
    },
    reviews: [
      {
        id: 1,
        restaurant: "Good Munch",
        rating: 4,
        text: "The food is great and the munch is in fact good but one thing that bothers me is that the wait time is a bit long...",
        time: "5 mins ago",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: 2,
        restaurant: "Burger Joint",
        rating: 5,
        text: "Best burger in town! Juicy, flavorful, and the fries are to die for. Definitely coming back.",
        time: "2 days ago",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: 3,
        restaurant: "Pasta Place",
        rating: 3,
        text: "The pasta was okay, but the service was slow. Ambience is nice though.",
        time: "1 week ago",
        image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
      }
    ]
  })


  return (
    <div ref={containerRef} className="min-h-screen bg-background pb-10 overflow-hidden">

      <div className="profile-banner h-64 w-full bg-cover bg-center relative" style={{ backgroundImage: `url(${profileCover})` }}>
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <div className="profile-info-container relative -mt-20 mb-8 flex flex-col md:flex-row gap-6 items-end md:items-end p-4">
          <Avatar className="profile-avatar w-40 h-40 border-4 border-background shadow-xl z-10 rounded-full">
            <AvatarImage src={user.img} alt={user.name} />
            <AvatarFallback>PC</AvatarFallback>
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
              setProfile={setUser}
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
