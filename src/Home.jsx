import { useState } from 'react'
import RestaurantCard from './RestaurantCard'
import { restaurants } from './restaurant'
function Home() {
  const [count, setCount] = useState(0)
  restaurants.sort((a, b) => b.rating - a.rating);
  return (
    <div className='m-5'>
      <p>Hello</p>
      <h1>Explore</h1>
      <div className='flex flex-row gap-2'>
        {restaurants.map((restaurant, index) => (
          <RestaurantCard key={index} restaurant={restaurant} />
        ))}
      </div>
    </div>
  )
}

export default Home
