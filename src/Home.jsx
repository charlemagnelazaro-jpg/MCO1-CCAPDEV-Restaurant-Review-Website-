import { useState } from 'react'
import RestaurantCard from './RestaurantCard'

function Home() {
  const [count, setCount] = useState(0)

  return (
    <div className='m-5'>
      <p>Hello</p>
      <h1>Explore</h1>
      <div className='flex flex-row gap-2'>
        <RestaurantCard/>
        <RestaurantCard/>
        <RestaurantCard/>
      </div>
    </div>
  )
}

export default Home
