import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '..', '.env') });

import User from './models/User.js';
import Restaurant from './models/Restaurant.js';
import Review from './models/Review.js';
import connectDB from './config/db.js';

const seedUsers = [
    {
        email: 'carti@example.com',
        password: 'password123',
        name: 'P. Carti',
        location: 'New York City, NY',
        bio: 'Food enthusiast exploring local gems. Always looking for the perfect taco.',
        img: 'https://i.pinimg.com/474x/0e/53/97/0e53973045af09690a585416fba9394c.jpg',
        stats: { reviews: 0, helpfulVotes: 0 },
        role: "user"
    },
    {
        email: 'miko@example.com',
        password: 'miko123',
        name: 'Miko de Lara',
        location: 'Taft Avenue, Manila',
        bio: "DLSU '24 | ID 120. Certified food critic and campus foodie. If it's near Taft, I've tried it.",
        img: 'https://i.pinimg.com/474x/0e/53/97/0e53973045af09690a585416fba9394c.jpg',
        stats: { reviews: 0, helpfulVotes: 0 },
        role: "user"
    },
    {
        email: 'chloe@example.com',
        password: 'chloe123',
        name: 'Chloe Evangelista',
        location: 'Makati City, Philippines',
        bio: 'Lia-Com student by day, foodie by night. Always on the hunt for hidden food gems around the metro.',
        img: 'https://i.pinimg.com/474x/0e/53/97/0e53973045af09690a585416fba9394c.jpg',
        stats: { reviews: 0, helpfulVotes: 0 },
        role: "user"
    },
    {
        email: 'zark@example.com',
        password: 'zark123',
        name: 'Zark Man',
        location: 'Quezon City, Philippines',
        bio: "If the burger is bigger than my face, I'm interested. Professional eater, amateur reviewer. Panalo!",
        img: 'https://i.pinimg.com/474x/0e/53/97/0e53973045af09690a585416fba9394c.jpg',
        stats: { reviews: 0, helpfulVotes: 0 },
        role: "user"
    },
    {
        email: 'sam@example.com',
        password: 'sam123',
        name: 'Sam Rivera',
        location: 'Pasay City, Philippines',
        bio: "Musician, coffee addict, and part-time food blogger. I eat with my ears first — if the vibe is right, the food tastes better.",
        img: 'https://i.pinimg.com/474x/0e/53/97/0e53973045af09690a585416fba9394c.jpg',
        stats: { reviews: 0, helpfulVotes: 0 },
        role: "user"
    },
    {
        email: 'admin@example.com',
        password: 'admin',
        name: 'Admin',
        role: "admin"
    },
    {
        email: 'owner_goodmunch@example.com',
        password: 'owner123',
        name: 'Arthur Goodmunch',
        role: 'owner',
        restaurantName: 'Good Munch'
    },
    {
        email: 'owner_pericos@example.com',
        password: 'owner123',
        name: 'Maria Perico',
        role: 'owner',
        restaurantName: "Perico's"
    },
    {
        email: 'owner_aterica@example.com',
        password: 'owner123',
        name: 'Rica Bacsilog',
        role: 'owner',
        restaurantName: "Ate Rica's Bacsilog"
    },
    {
        email: 'owner_mcdonalds@example.com',
        password: 'owner123',
        name: 'Ronald McDonald',
        role: 'owner',
        restaurantName: "McDonald's"
    },
    {
        email: 'owner_cocobuko@example.com',
        password: 'owner123',
        name: 'Coco Buko',
        role: 'owner',
        restaurantName: 'Coco Buko'
    },
    {
        email: 'owner_potatocorner@example.com',
        password: 'owner123',
        name: 'Spud Corner',
        role: 'owner',
        restaurantName: 'Potato Corner'
    }
];

const seedRestaurants = [
    {
        name: 'Good Munch',
        address: 'Agno Food Complex',
        avgRating: 4.5,
        totalReviews: 142,
        backgroundImg: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c'
    },
    {
        name: "Perico's",
        address: "Razon's Building",
        avgRating: 4.8,
        totalReviews: 89,
        backgroundImg: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1'
    },
    {
        name: "Ate Rica's Bacsilog",
        address: 'Agno Food Complex',
        avgRating: 3.2,
        totalReviews: 215,
        backgroundImg: 'https://images.unsplash.com/photo-1525351484163-7529414344d8'
    },
    {
        name: "McDonald's",
        address: 'Malapit sa LRT',
        avgRating: 4.0,
        totalReviews: 530,
        backgroundImg: 'https://images.unsplash.com/photo-1550547660-d9450f859349'
    },
    {
        name: 'Coco Buko',
        address: 'Agno Food Complex',
        avgRating: 4.7,
        totalReviews: 67,
        backgroundImg: 'https://static.vecteezy.com/system/resources/thumbnails/013/566/744/small/a-glass-of-sweet-coconut-water-coconut-fragrance-photo.jpg'
    },
    {
        name: 'Potato Corner',
        address: 'Blowmen',
        avgRating: 4.3,
        totalReviews: 310,
        backgroundImg: 'https://images.unsplash.com/photo-1576107232684-1279f390859f'
    }
];

const seedReviews = [
    {
        restaurantName: 'Good Munch',
        userEmail: 'carti@example.com',
        title: 'Best lunch spot!',
        comment: 'I eat here every day. The serving size is massive.',
        rating: 5,
        timeOffset: 1000 * 60 * 60 * 5,
        replyText: 'Wow, thanks for coming every day! We appreciate your loyalty.'
    },
    {
        restaurantName: 'Good Munch',
        userEmail: 'miko@example.com',
        title: 'Pretty affordable',
        comment: 'For the price, you cannot complain much.',
        rating: 4,
        timeOffset: 1000 * 60 * 60 * 24 * 2
    },
    {
        restaurantName: 'Good Munch',
        userEmail: 'chloe@example.com',
        title: 'Good but crowded',
        comment: 'Line was too long during lunch break, but food is decent.',
        rating: 3,
        timeOffset: 1000 * 60 * 60 * 24 * 7 * 3
    },
    {
        restaurantName: 'Good Munch',
        userEmail: 'zark@example.com',
        title: 'Tastes like home',
        comment: 'Reminds me of my mom’s cooking, very comforting.',
        rating: 5,
        timeOffset: 1000 * 60 * 60 * 24 * 30 * 2
    },
    {
        restaurantName: 'Good Munch',
        userEmail: 'sam@example.com',
        title: 'Quick and tasty',
        comment: 'If you are in a rush, this is the place to be.',
        rating: 4,
        timeOffset: 1000 * 60 * 60 * 24 * 365
    },
    {
        restaurantName: "Perico's",
        userEmail: 'sam@example.com',
        title: 'Hidden gem',
        comment: 'Tucked away but definitely worth finding.',
        rating: 5,
        timeOffset: 1000 * 60 * 60 * 5,
        replyText: 'Thank you! We love being a hidden gem for students.'
    },
    {
        restaurantName: "Perico's",
        userEmail: 'carti@example.com',
        title: 'Super clean',
        comment: 'The tables are always clean and the staff is nice.',
        rating: 5,
        timeOffset: 1000 * 60 * 60 * 24 * 2
    },
    {
        restaurantName: "Perico's",
        userEmail: 'miko@example.com',
        title: 'Awesome value',
        comment: 'I bought a full meal for so cheap!',
        rating: 4,
        timeOffset: 1000 * 60 * 60 * 24 * 7 * 3
    },
    {
        restaurantName: "Perico's",
        userEmail: 'chloe@example.com',
        title: 'Will definitely return',
        comment: 'I will bring my friends here next week.',
        rating: 5,
        timeOffset: 1000 * 60 * 60 * 24 * 30 * 2
    },
    {
        restaurantName: "Perico's",
        userEmail: 'zark@example.com',
        title: 'My favorite so far',
        comment: 'Out of all spots near school, this takes the cake.',
        rating: 5,
        timeOffset: 1000 * 60 * 60 * 24 * 365
    },
    {
        restaurantName: "Ate Rica's Bacsilog",
        userEmail: 'zark@example.com',
        title: 'A true classic',
        comment: 'Nothing beats bacsilog after an early class.',
        rating: 5,
        timeOffset: 1000 * 60 * 60 * 5,
        replyText: 'Enjoy your classes! Thank you for starting your day with us.'
    },
    {
        restaurantName: "Ate Rica's Bacsilog",
        userEmail: 'sam@example.com',
        title: 'A bit too greasy',
        comment: 'I felt the oil was a bit much this time around.',
        rating: 3,
        timeOffset: 1000 * 60 * 60 * 24 * 2
    },
    {
        restaurantName: "Ate Rica's Bacsilog",
        userEmail: 'carti@example.com',
        title: 'Perfect for breakfast',
        comment: 'Started my morning right with this meal.',
        rating: 4,
        timeOffset: 1000 * 60 * 60 * 24 * 7 * 3
    },
    {
        restaurantName: "Ate Rica's Bacsilog",
        userEmail: 'miko@example.com',
        title: 'Overrated',
        comment: 'I don’t get the hype, it’s just okay.',
        rating: 2,
        timeOffset: 1000 * 60 * 60 * 24 * 30 * 2
    },
    {
        restaurantName: "Ate Rica's Bacsilog",
        userEmail: 'chloe@example.com',
        title: 'Hits the spot',
        comment: 'Whenever I crave bacon, I go straight here.',
        rating: 4,
        timeOffset: 1000 * 60 * 60 * 24 * 365
    },
    {
        restaurantName: "McDonald's",
        userEmail: 'chloe@example.com',
        title: 'Standard fast food',
        comment: 'It is what it is, you know what to expect.',
        rating: 3,
        timeOffset: 1000 * 60 * 60 * 5,
        replyText: 'We appreciate the honest feedback! See you again.'
    },
    {
        restaurantName: "McDonald's",
        userEmail: 'zark@example.com',
        title: 'Fries were cold',
        comment: 'Got my order but the fries were not fresh.',
        rating: 2,
        timeOffset: 1000 * 60 * 60 * 24 * 2
    },
    {
        restaurantName: "McDonald's",
        userEmail: 'sam@example.com',
        title: 'Fast and reliable',
        comment: 'When you have 10 minutes before class, this saves you.',
        rating: 4,
        timeOffset: 1000 * 60 * 60 * 24 * 7 * 3
    },
    {
        restaurantName: "McDonald's",
        userEmail: 'carti@example.com',
        title: 'Classic burger',
        comment: 'You can never go wrong with a cheeseburger.',
        rating: 4,
        timeOffset: 1000 * 60 * 60 * 24 * 30 * 2
    },
    {
        restaurantName: "McDonald's",
        userEmail: 'miko@example.com',
        title: 'Always crowded',
        comment: 'Good luck finding a seat during noon.',
        rating: 3,
        timeOffset: 1000 * 60 * 60 * 24 * 365
    },
    {
        restaurantName: 'Coco Buko',
        userEmail: 'miko@example.com',
        title: 'Refreshing drinks',
        comment: 'This is exactly what I needed on a sunny day.',
        rating: 5,
        timeOffset: 1000 * 60 * 60 * 5,
        replyText: 'Stay cool! Thanks for visiting us.'
    },
    {
        restaurantName: 'Coco Buko',
        userEmail: 'chloe@example.com',
        title: 'Perfect for the heat',
        comment: 'Nothing cools you down like a fresh buko shake.',
        rating: 5,
        timeOffset: 1000 * 60 * 60 * 24 * 2
    },
    {
        restaurantName: 'Coco Buko',
        userEmail: 'zark@example.com',
        title: 'A bit too sweet',
        comment: 'Make sure to ask for less sugar, but otherwise okay.',
        rating: 3,
        timeOffset: 1000 * 60 * 60 * 24 * 7 * 3
    },
    {
        restaurantName: 'Coco Buko',
        userEmail: 'sam@example.com',
        title: 'Love the coconut',
        comment: 'The coconut bits add a really nice texture.',
        rating: 4,
        timeOffset: 1000 * 60 * 60 * 24 * 30 * 2
    },
    {
        restaurantName: 'Coco Buko',
        userEmail: 'carti@example.com',
        title: 'My daily drink',
        comment: 'I buy one every afternoon, highly recommended!',
        rating: 5,
        timeOffset: 1000 * 60 * 60 * 24 * 365
    },
    {
        restaurantName: 'Potato Corner',
        userEmail: 'miko@example.com',
        title: 'Flavorful',
        comment: 'They never skimp on the powder, which is great.',
        rating: 4,
        timeOffset: 1000 * 60 * 60 * 24 * 2
    },
    {
        restaurantName: 'Potato Corner',
        userEmail: 'chloe@example.com',
        title: 'Small portions',
        comment: 'I wish the jumbo size was actually jumbo.',
        rating: 2,
        timeOffset: 1000 * 60 * 60 * 24 * 7 * 3
    },
    {
        restaurantName: 'Potato Corner',
        userEmail: 'zark@example.com',
        title: 'A classic snack',
        comment: 'It’s been around forever for a reason.',
        rating: 4,
        timeOffset: 1000 * 60 * 60 * 24 * 30 * 2
    },
    {
        restaurantName: 'Potato Corner',
        userEmail: 'sam@example.com',
        title: 'Cheese flavor is the best',
        comment: 'I always get the cheese! Can’t live without it.',
        rating: 5,
        timeOffset: 1000 * 60 * 60 * 24 * 365
    }
];

const seed = async () => {
    try {
        await connectDB();

        await User.deleteMany({});
        console.log('Cleared existing users');
        await Restaurant.deleteMany({});
        console.log('Cleared restaurants');
        await Review.deleteMany({});
        console.log('Cleared reviews');

        const restaurantMap = {};
        for (const restaurantData of seedRestaurants) {
            const restaurant = new Restaurant(restaurantData);
            await restaurant.save();
            restaurantMap[restaurant.name] = restaurant._id;
            console.log(`Seeded Restaurant: ${restaurant.name}`);
        }

        const userMap = {};
        for (const userData of seedUsers) {
            if (userData.role === 'owner' && userData.restaurantName) {
                userData.restaurantID = restaurantMap[userData.restaurantName];
            }

            const user = new User(userData);
            await user.save();
            userMap[user.email] = user._id;
            console.log(`Seeded user: ${user.name} (${user.email})`);
        }

        const allUserIds = Object.values(userMap);
        for (const reviewData of seedReviews) {
            const reviewDate = new Date(Date.now() - reviewData.timeOffset);

            let replyData = { text: "" };
            if (reviewData.replyText) {
                replyData = {
                    text: reviewData.replyText,
                    createdAt: new Date(reviewDate.getTime() + 1000 * 60 * 60 * 2)
                };
            }

            const authorId = userMap[reviewData.userEmail];
            const possibleVoters = allUserIds.filter(id => String(id) !== String(authorId));
            const shuffledUsers = possibleVoters.sort(() => 0.5 - Math.random());

            const upvotesCount = Math.floor(Math.random() * 4); // 0 to 3 upvotes
            const downvotesCount = Math.floor(Math.random() * 3); // 0 to 2 downvotes

            const upvotes = shuffledUsers.slice(0, upvotesCount);
            const downvotes = shuffledUsers.slice(upvotesCount, upvotesCount + downvotesCount);

            const review = new Review({
                user: authorId,
                restaurant: restaurantMap[reviewData.restaurantName],
                title: reviewData.title,
                rating: reviewData.rating,
                comment: reviewData.comment,
                createdAt: reviewDate,
                updatedAt: reviewDate,
                reply: replyData,
                upvotes: upvotes,
                downvotes: downvotes
            });

            await review.save();
        }
        console.log(`Seeded ${seedReviews.length} reviews successfully.`);

        console.log('\nSeeding complete!');
        process.exit(0);
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

seed();
