import * as React from "react";
import { createPortal } from "react-dom";
import { ChevronDown, ChevronUp, Star, Reply } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const ReviewCard = React.forwardRef(({
  id,
  authorId,
  restaurant,
  name,
  handle,
  review,
  rating,
  imageUrl,
  reply,
  images = [],
  className,
  upvotes = [],
  downvotes = [],
  totalVoteCount = 0,
  currentUser,
  isSelected,
  onSelect,
  createdAt,
  inHome = false
}, ref) => {

  

  const [expandedImage, setExpandedImage] = React.useState(null);

  const initialUserVote = React.useMemo(() => {
    if (!currentUser) return null;
    const userId = currentUser._id || currentUser.id;
    if (upvotes.includes(userId)) return "upvote";
    if (downvotes.includes(userId)) return "downvote";
    return null;
  }, [currentUser, upvotes, downvotes]);

  const [voteCount, setVoteCount] = React.useState(totalVoteCount);
  const [userVote, setUserVote] = React.useState(initialUserVote);
  const { updateUserHelpfulVotes } = useAuth();

  //check if the current user is the maker of the review they are voting on
  const isOwnReview = React.useMemo(() => {
    if (!currentUser || !authorId) return false;
    const currentUserId = currentUser._id || currentUser.id;
    return authorId === currentUserId;
  }, [currentUser, authorId]);

  const handleVoteApiCall = async (newVoteType) => {
    if (!currentUser) return;
    const userId = currentUser._id || currentUser.id;
    try {
      await fetch(`http://localhost:3000/api/review/vote/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: userId, voteType: newVoteType })
      });

      if (isOwnReview) {
        updateUserHelpfulVotes();
      }

    } catch (e) {
      console.error(e);
    }
  };

  const handleUpvote = () => {
    if (!currentUser) {
      alert("Please login to vote.");
      return;
    }
    if (userVote === "upvote") {
      setVoteCount(voteCount - 1);
      setUserVote(null);
      handleVoteApiCall("none");
    } else if (userVote === "downvote") {
      setVoteCount(voteCount + 2);
      setUserVote("upvote");
      handleVoteApiCall("upvote");
    } else {
      setVoteCount(voteCount + 1);
      setUserVote("upvote");
      handleVoteApiCall("upvote");
    }
  };

  const handleDownvote = () => {
    if (!currentUser) {
      alert("Please login to vote.");
      return;
    }
    if (userVote === "downvote") {
      setVoteCount(voteCount + 1);
      setUserVote(null);
      handleVoteApiCall("none");
    } else if (userVote === "upvote") {
      setVoteCount(voteCount - 2);
      setUserVote("downvote");
      handleVoteApiCall("downvote");
    } else {
      setVoteCount(voteCount - 1);
      setUserVote("downvote");
      handleVoteApiCall("downvote");
    }
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const replyVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3, delay: 0.2 }
    }
  };

  const isOwner = currentUser?.role === 'owner';

  const displayRestaurant = () =>{
    if (inHome){
      return <div className="text-lg text-muted-foreground uppercase font-medium mb-2">
          {restaurant}
        </div>
    }
  }

  const getRecency = (createdAt) => {
    if (!createdAt) return '';
    const now = new Date();
    const postDate = new Date(createdAt);
    
    if (isNaN(postDate)) return '';
    
    const diffInSeconds = Math.floor((now - postDate) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60
    };

    if (diffInSeconds < 60) {
      return 'just now';
    }

    for (const [unit, seconds] of Object.entries(intervals)) {
      const value = Math.floor(diffInSeconds / seconds);
      if (value >= 1) {
        return `${value} ${unit}${value > 1 ? 's' : ''} ago`;
      }
    }
    
    return '';
  };

  return (
    
    <motion.div
      ref={ref}
      className={cn(
        "bg-card text-card-foreground border rounded-xl p-6 shadow-sm w-full max-w-md h-fit relative",
        isOwner && isSelected ? "border-green-500 bg-green-50" : "",
        isOwner && !isSelected ? "cursor-pointer hover:border-green-500/50 transition-colors" : "",
        className
      )}
      onClick={() => isOwner && onSelect && onSelect(id)}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      role="article"
      aria-labelledby="review-author"
    >
      {displayRestaurant()}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={imageUrl}
            alt={`Avatar of ${name}`}
            className="w-12 h-12 rounded-full object-cover border border-border"
          />
          <div>
            <h3 id="review-author" className="text-lg font-semibold leading-tight">
              {name}
            </h3>
            <p className="text-md font-bold">{handle}</p>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-md text-sm font-bold border border-yellow-200/50">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="text-yellow-700 dark:text-yellow-500">{rating.toFixed(1)}</span>
        </div>
      </div>

      <div className="relative">
        {reply && (
          <div className="absolute left-6 top-4 bottom-0 w-0.5 bg-muted -ml-[25px] z-0" />
        )}

        <p id="review-content" className="mt-4 text-sm leading-relaxed text-foreground/90 relative z-10">
          {review}
        </p>

        {images && images.length > 0 && (
          <div className="mt-4 relative z-10 w-full pl-6 pr-6">
            <Carousel opts={{ align: "start" }} className="w-full max-w-sm mx-auto">
              <CarouselContent>
                {images.map((imgSrc, index) => (
                  <CarouselItem key={index} className="basis-1/2 md:basis-1/3">
                    <div className="p-1">
                      <img
                        src={imgSrc}
                        alt={`Review attachment ${index + 1}`}
                        className="w-full h-24 object-cover rounded-md cursor-pointer border hover:opacity-90 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedImage(imgSrc);
                        }}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {images.length > 2 && (
                <>
                  <CarouselPrevious className="w-6 h-6 -left-3" />
                  <CarouselNext className="w-6 h-6 -right-3" />
                </>
              )}
            </Carousel>
          </div>
        )}
      </div>

      {document && createPortal(
        <AnimatePresence>
          {expandedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
              onClick={(e) => {
                e.stopPropagation();
                setExpandedImage(null);
              }}
            >
              <div className="relative max-w-4xl max-h-[90vh] w-full">
                <img
                  src={expandedImage}
                  alt="Expanded review image"
                  className="w-full h-full object-contain rounded-lg"
                />
                <button
                  className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedImage(null);
                  }}
                >
                  ✕
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      <AnimatePresence>
        {reply && (
          <motion.div
            variants={replyVariants}
            initial="hidden"
            animate="visible"
            className="mt-4 ml-4 p-4 rounded-lg bg-muted/40 border-l-2 border-primary/40 relative z-10"
          >
            <div className="flex items-center gap-2 mb-1">
              <Reply className="w-3 h-3 text-primary rotate-180" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                Response from Restaurant
              </span>
            </div>
            <p className="text-sm text-muted-foreground italic leading-snug">
              "{reply}"
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-6 flex items-center justify-between">
        <div className="inline-flex -space-x-px rounded-lg shadow-sm shadow-black/5">
          <Button
            type="button"
            className={cn(`rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10 ${userVote === 'upvote' ? 'hover:bg-green-100 bg-green-100 hover:border-green-300 hover:text-green-700 text-green-700' : ''}`)}
            variant="outline"
            size="sm"
            aria-label="Upvote"
            onClick={handleUpvote}
          >
            <ChevronUp size={14} strokeWidth={2.5} />
          </Button>
          <span className="flex items-center border-y border-input px-3 text-xs font-semibold bg-background">
            {voteCount}
          </span>
          <Button
            type="button"
            className={cn(`rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10 ${userVote === 'downvote' ? 'hover:bg-red-100 bg-red-100 hover:border-red-300 hover:text-red-700 text-red-700' : ''}`)}
            variant="outline"
            size="sm"
            aria-label="Downvote"
            onClick={handleDownvote}
          >
            <ChevronDown size={14} strokeWidth={2.5} />
          </Button>
        </div>

        <time className="text-[11px] text-muted-foreground uppercase font-medium">
          {getRecency(createdAt)}
        </time>

        {isOwner && isSelected && (
          <div className="absolute bottom-2 right-6 text-green-600 text-sm font-semibold flex items-center gap-1">
            <div className="w-2.5 h-2.5 bg-green-600 rounded-sm"></div> Selected
          </div>
        )}
      </div>
    </motion.div>
  );
});

ReviewCard.displayName = "ReviewCard";

export { ReviewCard };