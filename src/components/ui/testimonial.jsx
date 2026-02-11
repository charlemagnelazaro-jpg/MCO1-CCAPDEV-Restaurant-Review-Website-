import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ArrowLeft, ArrowRight } from "lucide-react"

const TestimonialCarousel = React.forwardRef(
    (
        { className, testimonials, showArrows = true, showDots = true, ...props },
        ref,
    ) => {
        const [currentIndex, setCurrentIndex] = React.useState(0)
        const [exitX, setExitX] = React.useState(0)

        const handleDragEnd = (event, info) => {
            if (Math.abs(info.offset.x) > 100) {
                setExitX(info.offset.x)
                setTimeout(() => {
                    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
                    setExitX(0)
                }, 200)
            }
        }

        return (
            <div
                ref={ref}
                className={cn(
                    "h-96 w-full flex items-center justify-center py-10",
                    className
                )}
                {...props}
            >
                <div className="relative w-full max-w-2xl h-80 px-4"> {/* Responsive width */}
                    {testimonials.map((testimonial, index) => {
                        const isCurrentCard = index === currentIndex
                        const isPrevCard =
                            index === (currentIndex + 1) % testimonials.length
                        const isNextCard =
                            index === (currentIndex + 2) % testimonials.length

                        if (!isCurrentCard && !isPrevCard && !isNextCard) return null

                        return (
                            <motion.div
                                key={testimonial.id}
                                className={cn(
                                    "absolute w-full h-full rounded-2xl cursor-grab active:cursor-grabbing",
                                    "bg-white shadow-xl border border-border",
                                    "dark:bg-card dark:shadow-[2px_2px_4px_rgba(0,0,0,0.4),-1px_-1px_3px_rgba(255,255,255,0.1)]",
                                )}
                                style={{
                                    zIndex: isCurrentCard ? 3 : isPrevCard ? 2 : 1,
                                }}
                                drag={isCurrentCard ? "x" : false}
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.7}
                                onDragEnd={isCurrentCard ? handleDragEnd : undefined}
                                initial={{
                                    scale: 0.95,
                                    opacity: 0,
                                    y: isCurrentCard ? 0 : isPrevCard ? 8 : 16,
                                    rotate: isCurrentCard ? 0 : isPrevCard ? -2 : -4,
                                }}
                                animate={{
                                    scale: isCurrentCard ? 1 : 0.95,
                                    opacity: isCurrentCard ? 1 : isPrevCard ? 0.6 : 0.3,
                                    x: isCurrentCard ? exitX : 0,
                                    y: isCurrentCard ? 0 : isPrevCard ? 8 : 16,
                                    rotate: isCurrentCard ? exitX / 20 : isPrevCard ? -2 : -4,
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 20,
                                }}
                            >
                                {showArrows && isCurrentCard && (
                                    <div className="absolute inset-x-0 top-2 flex justify-between px-4 z-10">
                                        <span
                                            className="p-2 cursor-pointer text-gray-400 hover:text-gray-600 dark:text-muted-foreground dark:hover:text-primary transition-colors"
                                            onClick={() => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                                        >
                                            <ArrowLeft className="w-6 h-6" />
                                        </span>
                                        <span
                                            className="p-2 cursor-pointer text-gray-400 hover:text-gray-600 dark:text-muted-foreground dark:hover:text-primary transition-colors"
                                            onClick={() => setCurrentIndex((prev) => (prev + 1) % testimonials.length)}
                                        >
                                            <ArrowRight className="w-6 h-6" />
                                        </span>
                                    </div>
                                )}

                                <div className="p-6 flex flex-col items-center gap-4 h-full">
                                    <img
                                        src={testimonial.avatar}
                                        alt={testimonial.name}
                                        className="w-16 h-16 rounded-full object-cover border-2 border-background shadow-sm"
                                    />
                                    <div className="text-center">
                                        <h3 className="text-lg font-semibold text-foreground">
                                            {testimonial.name}
                                        </h3>
                                        {testimonial.rating && (
                                            <div className="flex justify-center text-yellow-500 text-xs">
                                                {"★".repeat(testimonial.rating)}
                                            </div>
                                        )}
                                    </div>

                                    <p className="text-center text-sm text-muted-foreground line-clamp-4">
                                        {testimonial.description}
                                    </p>
                                </div>
                            </motion.div>
                        )
                    })}
                    {showDots && (
                        <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-2">
                            {testimonials.map((_, index) => (
                                <div
                                    key={index}
                                    className={cn(
                                        "w-2 h-2 rounded-full transition-colors",
                                        index === currentIndex
                                            ? "bg-primary"
                                            : "bg-muted-foreground/30",
                                    )}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        )
    },
)
TestimonialCarousel.displayName = "TestimonialCarousel"

export { TestimonialCarousel }
