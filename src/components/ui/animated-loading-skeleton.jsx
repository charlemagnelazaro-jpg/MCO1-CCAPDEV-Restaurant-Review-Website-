import React from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/avatar'

const AnimatedLoadingSkeleton = ({ reviews = [] }) => {
    // Provide default reviews if none are passed (or use placeholders if loading)
    const displayReviews = reviews.length > 0 ? reviews : []

    const frameVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
    }

    const cardVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: (i) => ({
            y: 0,
            opacity: 1,
            transition: { delay: i * 0.1, duration: 0.4 }
        })
    }

    return (
        <motion.div
            className="w-full mx-auto p-6 bg-white dark:bg-card rounded-xl shadow-lg border border-border"
            variants={frameVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-zinc-900 dark:to-zinc-800 p-8">

                {/* Grid of reviews */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                    {displayReviews.map((review, i) => (
                        <motion.div
                            key={review.id}
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            custom={i}
                            whileHover={{ scale: 1.02 }}
                            className="bg-white dark:bg-card rounded-lg shadow-sm p-4 border border-border flex flex-col h-full relative z-0"
                        >
                            {/* Review Content */}
                            <div className="flex items-center gap-3 mb-3">
                                <Avatar className="w-8 h-8">
                                    <AvatarImage src={review.image || "https://github.com/shadcn.png"} />
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                                <div className="overflow-hidden">
                                    <h3 className="text-sm font-semibold truncate">{review.restaurant}</h3>
                                    <div className="flex text-yellow-500">
                                        {[...Array(5)].map((_, starIndex) => (
                                            <Star
                                                key={starIndex}
                                                size={12}
                                                fill={starIndex < review.rating ? "currentColor" : "none"}
                                                className={starIndex < review.rating ? "text-yellow-500" : "text-gray-300"}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Image if available */}
                            {review.image && (
                                <div className="h-32 w-full rounded-md mb-3 overflow-hidden">
                                    <img src={review.image} alt={review.restaurant} className="w-full h-full object-cover" />
                                </div>
                            )}

                            <p className="text-xs text-muted-foreground line-clamp-3 mb-2 flex-grow">
                                {review.text}
                            </p>

                            <div className="text-[10px] text-gray-400 mt-auto">
                                {review.time}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}

export default AnimatedLoadingSkeleton
