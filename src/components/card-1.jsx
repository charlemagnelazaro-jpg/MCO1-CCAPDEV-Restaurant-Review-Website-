import * as React from "react";
import { ChevronDown, ChevronUp, Star } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils"; // Assuming 'cn' utility from shadcn setup
import { Button } from "./ui/button";
const ReviewCard = React.forwardRef(({ name, handle, review, rating, imageUrl, className }, ref) => {
  // Animation variants for framer-motion
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={cn(
        "bg-card text-card-foreground border rounded-xl p-6 shadow-sm w-full max-w-md",
        className
      )}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      // ARIA attributes for accessibility
      role="article"
      aria-labelledby="review-author"
      aria-describedby="review-content">
      {/* Card Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={imageUrl}
            alt={`Avatar of ${name}`}
            className="w-12 h-12 rounded-full object-cover" />
          <div>
            <h3 id="review-author" className="text-lg font-semibold">
              {name}
            </h3>
            <p className="text-sm text-muted-foreground">{handle}</p>
          </div>
        </div>
        {/* Rating Section */}
        <div className="flex items-center gap-1 text-lg font-bold">
          <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
          <span>{rating.toFixed(1)}</span>
        </div>
      </div>
      {/* Card Body */}
      <p id="review-content" className="mt-4 text-sm text-muted-foreground">
        {review}
      </p>
      <br></br>
      <div className="inline-flex -space-x-px rounded-lg shadow-sm shadow-black/5 rtl:space-x-reverse">
        <Button
          className="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10"
          variant="outline"
          size="icon"
          aria-label="Upvote"
        >
          <ChevronUp size={10} strokeWidth={2} aria-hidden="true" />
        </Button>
        <span className="flex items-center border border-input px-3 text-sm font-medium">235</span>
        <Button
          className="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10"
          variant="outline"
          size="icon"
          aria-label="Downvote"
        >
          <ChevronDown size={10} strokeWidth={2} aria-hidden="true" />
        </Button>
      </div>
    </motion.div>
  );
});

ReviewCard.displayName = "ReviewCard";

export { ReviewCard };