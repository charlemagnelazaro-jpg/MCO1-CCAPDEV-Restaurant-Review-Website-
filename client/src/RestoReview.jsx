import React, { useState } from 'react'
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
import { Button } from '@/components/ui/button';
import { reviews } from './reviews'
import { restaurants } from './restaurant'
import { useParams } from 'react-router-dom'
import SearchBar from './components/SearchBar'
import FilterBar from './components/FilterBar'
import { useAuth } from './context/AuthContext'
import { toast } from 'sonner'



const RestoReview = () => {
    const { name } = useParams();
    const { user } = useAuth();
    const [rating, setRating] = useState(0);
    const [files, setFiles] = useState([]); //array of images as base64 strings 
    const [title, setTitle] = useState("");
    const [comment, setComment] = useState("");
    const [reviewList, setReviewList] = useState(reviews);


    const [searchQuery, setSearchQuery] = useState("");

    const restaurant = restaurants.find(r => r.name === decodeURIComponent(name));

    const fetchReviews = async () => {
        if (!restaurant) return;
        try {
            const response = await fetch('http://localhost:3000/api/review');
            if (response.ok) {
                const data = await response.json();

                // Filter matching reviews if we have restaurant context
                const restaurantReviews = data.filter(
                    review => review.restaurant === restaurant?._id || restaurant?.id || review.restaurant
                ).map(item => ({
                    id: item._id,
                    name: item.user?.name || "Anonymous", // needs populate on backend ideally, but fine as fallback
                    review: item.comment,
                    rating: item.rating,
                    imageUrl: item.user?.img || "https://i.pinimg.com/474x/0e/53/97/0e53973045af09690a585416fba9394c.jpg",
                    handle: item.title || restaurant?.name,
                    images: item.images
                }));

                setReviewList(restaurantReviews.reverse()); // Show newest first
            }
        } catch (error) {
            console.error("Failed to load reviews:", error);
        }
    };

    // Fetch reviews from the backend on load
    React.useEffect(() => {
        fetchReviews();
    }, [restaurant]);


    const filteredReviews = reviewList.filter((r) =>
        (r.name && r.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (r.review && r.review.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    //handle missing restaurant
    if (!restaurant) return <div>Restaurant not found.</div>;

    //function for drag and drop files
    const handleDrop = async (acceptedFiles) => {
        //convert the files to base664
        const base64Promises = acceptedFiles.map((file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve({
                    name: file.name,
                    base64: reader.result
                });
                reader.onerror = (error) => reject(error);
            });
        });

        //append to files state
        try {
            const base64Strings = await Promise.all(base64Promises);
            setFiles((prev) => [...(prev || []), ...base64Strings]);
        } catch (error) {
            console.error("Error converting files to base64:", error);
        }
    };
    //posting review
    const handlePostReview = async (e) => {
        e.preventDefault()

        //handle missing fields
        if (!user) {
            toast.error("Please log in to post a review.");
            return;
        }
        if (rating === 0) {
            toast.error("Please select a rating.");
            return;
        }
        if (!title.trim()) {
            toast.error("Please add a title.");
            return;
        }
        if (!comment.trim()) {
            toast.error("Please write a comment.");
            return;
        }


        try {
            // post review to backend
            const response = await fetch('http://localhost:3000/api/review', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: user._id || user.id || "000000000000000000000000", // Fallback if no user id
                    title: title.trim(),
                    restaurant: restaurant._id || "000000000000000000000000", // Fallback if no restaurant id
                    rating: rating,
                    comment: comment.trim(),
                    images: files ? files.map(f => f.base64) : [] // base64 strings
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Backend error:", errorData);
                toast.error("Failed to post review: " + (errorData.error || 'Unknown error'));
            } else {
                const savedReview = await response.json();
                toast.success("Review posted successfully!");
                // Trigger refetch from backend instead of local append to guarantee DB state
                fetchReviews();

                //Revert to default
                setRating(0);
                setTitle("");
                setComment("");
                setFiles([]);
            }



            setFiles([]);

        } catch (error) {
            console.error("Fetch error:", error);
            toast.error(error.message || "An error occurred while posting review.");
        }
    };

    const getImageUrl = (path) => {
        return new URL(path, import.meta.url).href;
    };

    return (
        <form onSubmit={handlePostReview}>
            <div className="max-w-5xl mx-auto p-6 font-sans text-slate-800">

                <div className="mb-8">
                    <div className="h-64 w-full overflow-hidden rounded-xl mb-4">
                        <img src={getImageUrl(restaurant.image)} className="w-full h-full object-cover" alt={restaurant.name} />
                    </div>

                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-bold">{restaurant.name}</h1>
                        <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded border border-yellow-200">
                                <img src={Star} width='16px' alt="Star" />
                                <span className="font-semibold">{restaurant.rating.toFixed(1)}</span>
                                <span className="text-slate-500">(124 reviews)</span>
                            </div>
                            <div className="flex items-center gap-1 text-slate-600">
                                <img src={Pin} width='16px' alt="Location" />
                                <p>{restaurant.location}, Manila</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between gap-8">

                    <div className="md:col-span-2 flex-1 space-y-6">
                        <div className="flex items-center justify-between border-b pb-2">
                            <h2 className="text-xl font-bold w-full">Community Reviews</h2>

                            <div className='flex items-center gap-4'>
                                <FilterBar onChange={(e) => setSearchQuery(e.target.value)} />
                                <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-sm font-medium">
                                    {filteredReviews.length}
                                </span>

                            </div>

                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-4">
                                {filteredReviews.map((item) => (
                                    <ReviewCard
                                        key={item.id}
                                        {...item}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-80">
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
                                    <label className="block text-sm font-medium mb-1.5">Title</label>
                                    <Textarea
                                        className="min-h-[50px]"
                                        placeholder='Title'
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1.5">Comments</label>
                                    <Textarea
                                        className="min-h-[100px]"
                                        placeholder='Type your feedback here...'
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1.5">Add Photos</label>
                                    <Dropzone
                                        maxSize={1024 * 1024 * 10}
                                        minSize={1024}
                                        maxFiles={5}
                                        accept={{ 'image/*': [] }}
                                        onDrop={handleDrop}
                                        src={files}
                                        onError={console.error}
                                    >
                                        <DropzoneEmptyState />
                                        <DropzoneContent />
                                    </Dropzone>
                                </div>

                                <Button
                                    className='w-full bg-green-600 hover:bg-green-700 text-white'
                                    type="submit"
                                >
                                    Post Review
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default RestoReview;