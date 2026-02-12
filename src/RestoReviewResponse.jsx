import React, { useState } from 'react'
import Star from './assets/star.png'
import Pin from './assets/pin.png'
import { ReviewCard } from './components/card-1'
import { Rating } from './components/rating'
import { Textarea } from './components/ui/textarea'
import { Button } from '@/components/ui/button';
import { reviews } from './reviews'
import { restaurants } from './restaurant' 
import { useParams } from 'react-router-dom' 
import SearchBar from './components/SearchBar'

const RestoReview = () => {
    const { name } = useParams(); 
    const [rating, setRating] = useState(0);

    const restaurant = restaurants.find(r => r.name === decodeURIComponent(name));
    
    const singleReview = reviews[0];

    const getImageUrl = (path) => {
        return new URL(path, import.meta.url).href;
    };

  return (
    <div className="max-w-5xl mx-auto p-6 font-sans text-slate-800">
        
        <div className="mb-8">
            <div className="h-64 w-full overflow-hidden rounded-xl mb-4">
                <img src={getImageUrl(restaurant?.image)} className="w-full h-full object-cover" alt={restaurant?.name}/>
            </div>
            
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold">{restaurant?.name}</h1>
                <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded border border-yellow-200">
                        <img src={Star} width='16px' alt="Star"/>
                        <span className="font-semibold">{restaurant?.rating.toFixed(1)}</span>
                        <span className="text-slate-500">(124 reviews)</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-600">
                        <img src={Pin} width='16px' alt="Location"/>
                        <p>{restaurant?.location}, Manila</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-8">
            
            <div className="md:col-span-2 flex-1 space-y-6">
                <div className="flex items-center justify-between border-b pb-2">
                    <h2 className="text-xl font-bold w-full">Featured Review</h2>
                    <div className='flex items-center gap-4'>
                    </div>
                </div>
                
                <div className="flex flex-col gap-4">
                    {singleReview && (
                        <ReviewCard
                            key={singleReview.id}
                            name={singleReview.name}
                            handle={singleReview.handle}
                            review={singleReview.review}
                            rating={singleReview.rating}
                            imageUrl={singleReview.imageUrl}
                        />
                    )}
                </div>
            </div>

            <div className="w-full md:w-80">
                <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm sticky top-4">
                    <h2 className="text-lg font-bold mb-4">Write a Reply</h2>
                    
                    <div className="space-y-4">
                        <div>
                            <Textarea 
                                className="min-h-[100px]" 
                                placeholder='Type your feedback here...'
                            />
                        </div>

                        <Button className='w-full bg-green-600 hover:bg-green-700 text-white'>
                            Post Review
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default RestoReview