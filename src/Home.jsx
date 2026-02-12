import { useState } from 'react'
import RestaurantCard from './RestaurantCard'
import { restaurants } from './restaurant'
import { Link } from 'react-router-dom';
import { reviews, reviewsGoodMunch } from './reviews'
import { ReviewCard } from './components/card-1';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./components/ui/carousel"
import HomePic from './assets/home.jpg'

function Home() {
  restaurants.sort((a, b) => b.rating - a.rating);
  return (
    <div className='m-10 space-y-10'>
      <section className="relative h-[400px] w-full overflow-hidden rounded-xl bg-slate-900 text-white">
        <img 
          src={HomePic}
          alt="Featured" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="relative z-10 flex flex-col items-start justify-center h-full p-12 max-w-2xl space-y-4">
          <h2 className="text-5xl font-extrabold tracking-tight">Brother Bernie's Top Picks</h2>
          <p className="text-lg text-slate-200">
            Discover food spots around the campus, hand-picked by the university president himself.
          </p>
          <a href="https://www.youtube.com/watch?v=1Ir4BefHU4o&list=RD1Ir4BefHU4o&start_radio=1" target="_blank"  rel="noopener noreferrer">
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-bold transition-all">
              Read More
            </button>
          </a>
          
        </div>
      </section>
      <section>
        <h1 className="text-2xl font-bold mb-4">Explore</h1>
        <Carousel className="w-full px-12"> 
          <CarouselContent className="-ml-2">
            {restaurants.map((restaurant, index) => (
              <CarouselItem key={index} className="pl-2 basis-1/2 md:basis-1/3 lg:basis-1/4">
                <Link to={`/review/${encodeURIComponent(restaurant.name)}`}>
                  <RestaurantCard restaurant={restaurant} />
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0" />
          <CarouselNext className="right-0" />
        </Carousel>
      </section>

      <section>
        <h1 className="text-2xl font-bold mb-4">Recent Reviews</h1>
        <Carousel className="w-full px-12">
          <CarouselContent className="-ml-4">
            {reviewsGoodMunch.map((item) => (
              <CarouselItem key={item.id} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                <ReviewCard
                  name={item.name}
                  handle={item.handle}
                  review={item.review}
                  rating={item.rating}
                  imageUrl={item.imageUrl}
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
