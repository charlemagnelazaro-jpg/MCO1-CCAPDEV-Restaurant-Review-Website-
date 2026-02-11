import React, { useState } from 'react'
import Resto from './assets/resto.jpg'
import Star from './assets/star.png'
import Pin from './assets/pin.png'
import { ReviewCard } from './components/card-1'
import { Rating } from './components/rating'
import { Textarea } from './components/ui/textarea'
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from './components/ui/dropzone'
import { Button } from '@/components/ui/button'; // Adjusted import to standard shadcn path

const RestoReview = () => {
    const [rating, setRating] = useState(0);
    const [files, setFiles] = useState(null);

    const handleDrop = (acceptedFiles) => {
        setFiles(acceptedFiles);
    }

  return (
    <div className="max-w-5xl mx-auto p-6 font-sans text-slate-800">
        
        {/* Header Section */}
        <div className="mb-8">
            <div className="h-64 w-full overflow-hidden rounded-xl mb-4">
                <img src={Resto} className="w-full h-full object-cover" alt="Restaurant"/>
            </div>
            
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold">Good Munch</h1>
                <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded border border-yellow-200">
                        <img src={Star} width='16px' alt="Star"/>
                        <span className="font-semibold">5.0</span>
                        <span className="text-slate-500">(124 reviews)</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-600">
                        <img src={Pin} width='16px' alt="Location"/>
                        <p>Agno Food Complex, Manila</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="flex flex-row justify-between">
            
            <div className="md:col-span-2 space-y-6">
                <div className="flex items-center justify-between border-b pb-2">
                    <h2 className="text-xl font-bold">Community Reviews</h2>
                    <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-sm font-medium">124</span>
                </div>
                
                <div className="flex flex-col gap-4">
                    <ReviewCard
                        name="Miko de Lara"
                        handle="DLSU '24 | ID 120"
                        review="The undisputed king of Agno. That T-bone steak with extra garlic rice is the only thing that gets me through back-to-back majors. Don't forget the gravy!"
                        rating={5.0}
                        imageUrl="https://i.pinimg.com/474x/0e/53/97/0e53973045af09690a585416fba9394c.jpg"
                    />

                    <ReviewCard
                        name="Chloe Evangelista"
                        handle="Lia-Com Student"
                        review="Good Munch is literally my childhood! Best value for money near Taft. The serving size is huge, though the line during 12:45 PM break can be a bit crazy. Totally worth the wait."
                        rating={4.5}
                        imageUrl="https://i.pinimg.com/474x/0e/53/97/0e53973045af09690a585416fba9394c.jpg"
                    />

                    <ReviewCard
                        name="Justin Tiu"
                        handle="Verified Foodie"
                        review="Reliable, fast (usually), and hits the spot every time. It's the ultimate comfort food after a long day at Andrew Building. Pro tip: pair the pork chops with their signature sauce."
                        rating={5.0}
                        imageUrl="https://i.pinimg.com/474x/0e/53/97/0e53973045af09690a585416fba9394c.jpg"
                    />
                </div>
            </div>

            <div>
                <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm sticky top-4">
                    <h2 className="text-lg font-bold mb-4">Write a Review</h2>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1.5">Rate</label>
                            <div className="flex justify-start">
                                <Rating 
                                    editable={true} 
                                    rating={rating} 
                                    onRatingChange={setRating} 
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1.5">Comments</label>
                            <Textarea 
                                className="min-h-[100px]" 
                                placeholder='Type your feedback here...'
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1.5">Add Photos</label>
                            <Dropzone
                                maxSize={1024 * 1024 * 10}
                                minSize={1024}
                                maxFiles={10}
                                accept={{ 'image/*': [] }}
                                onDrop={handleDrop}
                                src={files}
                                onError={console.error}
                            >
                                <DropzoneEmptyState />
                                <DropzoneContent />
                            </Dropzone>
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