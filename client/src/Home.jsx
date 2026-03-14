import { useState } from 'react'
import RestaurantCard from './RestaurantCard'
import { Link } from 'react-router-dom';
import { ReviewCard } from './components/card-1';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./components/ui/carousel"
import HomePic from './assets/home.jpg'
import { useAuth } from './context/AuthContext'; 
import { useEffect } from 'react';
function Home() {
  const { user, restaurants, getAllRestaurants } = useAuth();
  const [reviewList, setReviewList] = useState([]);

  const fetchReviews = async () => {
          try {
              const response = await fetch(`http://localhost:3000/api/review/`);
              if (response.ok) {
                  const data = await response.json();
  
                  const reviews = data.map(item => ({
                      id: item._id,
                      authorId: item.user?._id || item.user?.id || item.user,
                      restaurant: item.restaurant?.name,
                      name: item.user?.name,
                      review: item.comment,
                      rating: item.rating,
                      imageUrl: item.user?.img || "https://i.pinimg.com/474x/0e/53/97/0e53973045af09690a585416fba9394c.jpg",
                      handle: item.title || restaurant,
                      images: item.images,
                      upvotes: item.upvotes || [],
                      downvotes: item.downvotes || [],
                      totalVoteCount: item.totalVoteCount || 0,
                      reply: item.reply?.text
                  }));
  
                  setReviewList(reviews);
              }
          } catch (error) {
              console.error("Failed to load reviews:", error);
          }
      };
  
  useEffect(() => {
    getAllRestaurants();
    fetchReviews();
  }, []);

  const sortedRestaurants = [...restaurants].sort((a, b) => b.avgRating - a.avgRating);

  return (
    <div className='m-10 space-y-10'>
      
      <section className="relative h-[400px] mx-12 overflow-hidden rounded-xl bg-slate-900 text-white">
        <img 
          src={HomePic}
          alt="Featured" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        
        <div className="relative z-10 flex flex-col items-start justify-center h-full px-8 max-w-2xl space-y-4">
          <h2 className="text-5xl font-extrabold tracking-tight">Brother Bernie's Top Picks</h2>
          <p className="text-lg text-slate-200">
            Discover food spots around the campus, hand-picked by the university president himself.
          </p>
          <a href="https://www.youtube.com/watch?v=1Ir4BefHU4o" target="_blank" rel="noopener noreferrer">
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-bold transition-all">
              Read More
            </button>
          </a>
        </div>
      </section>

      <section>
        <h1 className="text-2xl font-bold mb-4 px-12">Explore</h1>
        <Carousel className="w-full px-12"> 
          <CarouselContent className="-ml-2">
            {sortedRestaurants.length > 0 ? (
              sortedRestaurants.map((restaurant, index) => (
                <CarouselItem key={restaurant._id || index} className="pl-2 basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <Link to={`/review/${encodeURIComponent(restaurant.name)}`}>
                    <RestaurantCard restaurant={restaurant} />
                  </Link>
                </CarouselItem>
              ))
            ) : (
              <div className="px-12 py-10 text-gray-400">No Restaurants...</div>
            )}
          </CarouselContent>
          <CarouselPrevious className="left-0" />
          <CarouselNext className="right-0" />
        </Carousel>
      </section>

      <section>
        <h1 className="text-2xl font-bold mb-4 px-12">Recent Reviews</h1>
        <Carousel className="w-full px-12">
          <CarouselContent className="-ml-4">
            {reviewList.map((item) => (
              <CarouselItem key={item.id} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                <ReviewCard
                  currentUser={user}
                  {...item}
                  inHome={true}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0" />
          <CarouselNext className="right-0" />
        </Carousel>
      </section>
    </div>
  )
}

export default Home
