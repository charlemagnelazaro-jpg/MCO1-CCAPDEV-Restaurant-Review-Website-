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
import { useParams } from 'react-router-dom'
import SearchBar from './components/SearchBar'
import FilterBar from './components/FilterBar'
import { useAuth } from './context/AuthContext'
import { toast } from 'sonner'



const RestoReview = () => {
    const { restaurant } = useParams();
    const { user, restaurants, incrementUserReviewCount } = useAuth();
    const [rating, setRating] = useState(0);
    const [files, setFiles] = useState([]); //array of images as base64 strings 
    const [title, setTitle] = useState("");
    const [comment, setComment] = useState("");
    const [reviewList, setReviewList] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedReview, setSelectedReview] = useState(null);
    const [replyText, setReplyText] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editingReviewId, setEditingReviewId] = useState(null);
    const [aiSummary, setAiSummary] = useState(null);
    const [isSummaryLoading, setIsSummaryLoading] = useState(false);

    const fetchReviews = async () => {
        if (!restaurant) return;
        try {
            const response = await fetch(`/api/review/restaurant/${restaurant}`);
            if (response.ok) {
                const data = await response.json();

                const restaurantReviews = data.map(item => ({
                    id: item._id,
                    authorId: item.user?._id || item.user?.id || item.user,
                    name: item.user?.name,
                    review: item.comment,
                    rating: item.rating,
                    imageUrl: item.user?.img || "https://i.pinimg.com/474x/0e/53/97/0e53973045af09690a585416fba9394c.jpg",
                    handle: item.title || restaurant,
                    images: item.images,
                    upvotes: item.upvotes || [],
                    downvotes: item.downvotes || [],
                    totalVoteCount: item.totalVoteCount || 0,
                    reply: item.reply?.text,
                    createdAt: item.createdAt,
                    isEdited: item.isEdited
                }));

                setReviewList(restaurantReviews);
            }
        } catch (error) {
            console.error("Failed to load reviews:", error);
        }
    };

    const fetchAiSummary = async () => {
        if (!restaurant) return;
        setIsSummaryLoading(true);
        try {
            const response = await fetch(`/api/restaurant/summary/${restaurant}`);
            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    setAiSummary(data.summary);
                }
            }
        } catch (error) {
            console.error("Failed to load AI summary:", error);
        } finally {
            setIsSummaryLoading(false);
        }
    };

    //fetch reviews from the backend on load
    React.useEffect(() => {
        fetchReviews();
        fetchAiSummary();
    }, [restaurant]);


    const filteredReviews = reviewList.filter((r) =>
        (r.name && r.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (r.review && r.review.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    //handle missing restaurant
    if (!restaurant) return <div>Restaurant not found.</div>;

    const handleEditReviewClick = (reviewItem) => {
        setIsEditing(true);
        setEditingReviewId(reviewItem.id);
        setRating(reviewItem.rating);
        setTitle(reviewItem.handle === restaurant ? "" : reviewItem.handle);
        setComment(reviewItem.review);
        setFiles([]);
    };

    const handleDeleteReviewClick = async (reviewId) => {
        if (!window.confirm("Are you sure you want to delete this review?")) return;
        const toastId = toast.loading("Deleting review...");
        try {
            const response = await fetch(`/api/review/${reviewId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                toast.success("Review deleted successfully", { id: toastId });
                fetchReviews();
                if (editingReviewId === reviewId) {
                    cancelEdit();
                }
                await fetch(`/api/review/updateAvgRating/${restaurant}`, {
                    method: 'PATCH',
                });
            } else {
                const err = await response.json();
                toast.error(err.error || "Failed to delete", { id: toastId });
            }
        } catch (err) {
            toast.error("Error deleting review", { id: toastId });
        }
    };

    const cancelEdit = () => {
        setIsEditing(false);
        setEditingReviewId(null);
        setRating(0);
        setTitle("");
        setComment("");
        setFiles([]);
    };

    //function for drag and drop files
    const handleDrop = async (acceptedFiles) => {
        //convert the files to base64
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


        const toastId = toast.loading(isEditing ? "Updating review..." : "Uploading review...");

        try {
            const endpoint = isEditing ? `/api/review/${editingReviewId}` : '/api/review';
            const method = isEditing ? 'PUT' : 'POST';

            // post review to backend
            const response = await fetch(endpoint, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: user._id || user.id,
                    title: title.trim(),
                    restaurant: restaurant,
                    rating: rating,
                    comment: comment.trim(),
                    images: isEditing ? undefined : (files ? files.map(f => f.base64) : []) // base64 strings
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Backend error:", errorData);
                toast.error("Failed to post review: " + (errorData.error || 'Unknown error'), { id: toastId });
            } else {
                const savedReview = await response.json();
                toast.success(isEditing ? "Review updated successfully!" : "Review posted successfully!", { id: toastId });
                // trigger refetch from backend instead of local append to guarantee DB state
                fetchReviews();
                // update the review count without having to refresh
                if (!isEditing) incrementUserReviewCount();
                //update average rating
                const updateAvgRatingResponse = await fetch(`/api/review/updateAvgRating/${restaurant}`, {
                    method: 'PATCH',
                });
                if (!updateAvgRatingResponse.ok) {
                    const errorData = await updateAvgRatingResponse.json();
                    console.error("Backend error:", errorData);
                    toast.error("Failed to update average rating: " + (errorData.error || 'Unknown error'));
                }
                //Revert to default
                cancelEdit();
            }



            setFiles([]);

        } catch (error) {
            console.error("Fetch error:", error);
            toast.error(error.message || "An error occurred while posting review.");
        }
    };

    const handlePostReply = async (e) => {
        e.preventDefault();

        if (!selectedReview) return;
        if (!replyText.trim()) {
            toast.error("Please write a reply.");
            return;
        }

        try {
            const response = await fetch(`/api/review/reply/${selectedReview}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user._id || user.id,
                    replyText: replyText.trim()
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                toast.error("Failed to post reply: " + (errorData.error || 'Unknown error'));
            } else {
                toast.success("Reply posted successfully!");
                fetchReviews();
                setReplyText("");
                setSelectedReview(null);
            }
        } catch (error) {
            console.error("Fetch error:", error);
            toast.error("An error occurred while posting reply.");
        }
    };

    const getImageUrl = (path) => {
        return new URL(path, import.meta.url).href;
    };

    const restaurantObj = restaurants?.find((r) => r.name === restaurant) || {
        name: restaurant,
        backgroundImg: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
        avgRating: 0,
        totalReviews: 0,
        address: "Loading..."
    };

    return (
        <form onSubmit={handlePostReview}>
            <div className="max-w-5xl mx-auto p-6 font-sans text-slate-800">

                <div className="mb-8">
                    <div className="h-64 w-full overflow-hidden rounded-xl mb-4">
                        <img src={restaurantObj.backgroundImg} className="w-full h-full object-cover" alt={restaurantObj.name} />
                    </div>

                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-bold">{restaurantObj.name}</h1>
                        <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded border border-yellow-200">
                                <img src={Star} width='16px' alt="Star" />
                                <span className="font-semibold">{restaurantObj.avgRating}</span>
                                <span className="text-slate-500">({restaurantObj.totalReviews} reviews)</span>
                            </div>
                            <div className="flex items-center gap-1 text-slate-600">
                                <img src={Pin} width='16px' alt="Location" />
                                <p>{restaurantObj.address}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between gap-8">

                    <div className="md:col-span-2 flex-1 space-y-6">
                        <div className="flex items-center justify-between border-b pb-2">
                            <h2 className="text-xl font-bold w-full">
                                {user?.role === 'owner' ? "Select a Review to Reply" : "Community Reviews"}
                            </h2>

                            <div className='flex items-center gap-4'>
                                <FilterBar onChange={(e) => setSearchQuery(e.target.value)} />
                                <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-sm font-medium">
                                    {filteredReviews.length}
                                </span>

                            </div>

                        </div>

                        <div className="flex flex-col gap-4">
                            {/* AI summary */}
                            {aiSummary && (
                                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-5 mb-2 shadow-sm relative overflow-hidden">
                                    <div className="absolute top-[-20px] right-[-20px] p-4 opacity-[0.03] pointer-events-none">
                                        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><path d="M12 3v18" /><path d="m3 12 18 0" /><path d="m18 18-12-12" /><path d="m6 18 12-12" /></svg>
                                    </div>
                                    <div className="flex items-center gap-2 mb-3 text-green-800 font-bold relative z-10">
                                        <h3 className="text-lg tracking-tight">AI Review Summary</h3>
                                        <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full border border-green-200 ml-2 uppercase tracking-wide">Daily Analysis</span>
                                    </div>
                                    <p className="text-green-900/85 leading-relaxed text-sm z-10 relative font-medium">
                                        {aiSummary}
                                    </p>
                                </div>
                            )}
                            {isSummaryLoading && (
                                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-2 shadow-sm animate-pulse">
                                    <div className="h-6 bg-slate-200 rounded w-1/4 mb-4"></div>
                                    <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
                                    <div className="h-4 bg-slate-200 rounded w-5/6 mb-2"></div>
                                </div>
                            )}

                            <div className="flex flex-col gap-4">
                                {filteredReviews.map((item) => (
                                    <ReviewCard
                                        key={item.id}
                                        currentUser={user}
                                        isSelected={selectedReview === item.id}
                                        onSelect={setSelectedReview}
                                        onEdit={() => handleEditReviewClick(item)}
                                        onDelete={() => handleDeleteReviewClick(item.id)}
                                        {...item}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {user?.role !== 'admin' ? (<div className="w-full md:w-80">
                        {user?.role === 'owner' ? ( //user is an owner
                            <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm sticky top-4">
                                <h2 className="text-lg font-bold mb-4">
                                    {selectedReview ? `Reply to ${reviewList.find(r => r.id === selectedReview)?.name}` : "Select a Review"}
                                </h2>

                                <div className="space-y-4">
                                    {selectedReview && (
                                        <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-sm mb-4">
                                            <p className="text-green-800 font-bold mb-1 text-[10px] uppercase tracking-wider">Replying to:</p>
                                            <p className="text-slate-600 italic leading-relaxed">
                                                "{reviewList.find(r => r.id === selectedReview)?.review}"
                                            </p>
                                        </div>
                                    )}

                                    <div>
                                        <label className="block text-sm font-medium mb-1.5">Your Reply</label>
                                        <Textarea //reply input
                                            className="min-h-[150px]"
                                            placeholder="Write your response to this review..."
                                            value={replyText}
                                            onChange={(e) => setReplyText(e.target.value)}
                                            disabled={!selectedReview}
                                        />
                                    </div>

                                    <Button
                                        className='w-full bg-green-600 hover:bg-green-700 text-white disabled:bg-green-400 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                                        type="button"
                                        onClick={handlePostReply}
                                        disabled={!selectedReview || !replyText.trim()}
                                    >
                                        <img src={Star} className="w-4 h-4 brightness-0 invert opacity-80" alt="" />
                                        Post Reply
                                    </Button>

                                </div>
                            </div>
                        ) : (//user is not an owner
                            <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm sticky top-4">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg font-bold">{isEditing ? "Edit Review" : "Write a Review"}</h2>
                                    {isEditing && (
                                        <Button variant="ghost" size="sm" type="button" onClick={cancelEdit} className="text-slate-500 hover:text-slate-700 h-8 px-2 z-[60]">Cancel</Button>
                                    )}
                                </div>

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

                                    {!isEditing && (
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
                                    )}

                                    <Button
                                        className='w-full bg-green-600 hover:bg-green-700 text-white'
                                        type="submit"
                                    >
                                        {isEditing ? "Update Review" : "Post Review"}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>) : (<div></div>)}

                </div>
            </div>
        </form>
    )
}

export default RestoReview;