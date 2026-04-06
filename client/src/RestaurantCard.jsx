import React from 'react'
import Resto from './assets/resto.jpg'
import Pin from './assets/pin.png'
import { Rating } from './components/rating'

const RestaurantCard = ({ restaurant }) => {
  if (!restaurant) return null;

    
  return (
    <div className="bg-card border rounded-2xl shadow-md overflow-hidden w-full h-full">
        <img src={restaurant.backgroundImg} alt="restaurant" className="w-full h-48 object-cover rounded-t-2xl" />
        <div className="p-4">
        <p className="text-lg font-bold leading-tight mb-1 text-xl">{restaurant.name}</p>
            <div className="flex items-center text-sm text-muted-foreground gap-1 mb-3">
                <img src={Pin} alt="location" className="w-4 h-4 object-contain" />
                <p className="truncate">{restaurant.address}</p>
            </div>
            <div className='flex items-center text-sm text-muted-foreground gap-1 mb-3'>
                <Rating rating={restaurant.avgRating} showValue={false} />
                <p>({restaurant.avgRating})</p>
            </div>  
        </div>
    </div>
  )
}

export default RestaurantCard

