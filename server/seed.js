import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '..', '.env') });

import User from './models/User.js';
import connectDB from './config/db.js';

//prompt engineered users (NEED TO DELETE AND MODIFY ONCE MORE SCHEMAS ARE DONE)

const seedUsers = [
    {
        email: 'carti@example.com',
        password: 'password123',
        name: 'P. Carti',
        location: 'New York City, NY',
        bio: 'Food enthusiast exploring local gems. Always looking for the perfect taco.',
        img: 'https://i.pinimg.com/474x/0e/53/97/0e53973045af09690a585416fba9394c.jpg',
        stats: { reviews: 3, photos: 115, followers: 88 }
    },
    {
        email: 'miko@example.com',
        password: 'miko123',
        name: 'Miko de Lara',
        location: 'Taft Avenue, Manila',
        bio: "DLSU '24 | ID 120. Certified food critic and campus foodie. If it's near Taft, I've tried it.",
        img: 'https://i.pinimg.com/474x/0e/53/97/0e53973045af09690a585416fba9394c.jpg',
        stats: { reviews: 4, photos: 72, followers: 134 }
    },
    {
        email: 'chloe@example.com',
        password: 'chloe123',
        name: 'Chloe Evangelista',
        location: 'Makati City, Philippines',
        bio: 'Lia-Com student by day, foodie by night. Always on the hunt for hidden food gems around the metro.',
        img: 'https://i.pinimg.com/474x/0e/53/97/0e53973045af09690a585416fba9394c.jpg',
        stats: { reviews: 3, photos: 45, followers: 67 }
    },
    {
        email: 'zark@example.com',
        password: 'zark123',
        name: 'Zark Man',
        location: 'Quezon City, Philippines',
        bio: "If the burger is bigger than my face, I'm interested. Professional eater, amateur reviewer. Panalo!",
        img: 'https://i.pinimg.com/474x/0e/53/97/0e53973045af09690a585416fba9394c.jpg',
        stats: { reviews: 3, photos: 200, followers: 312 }
    },
    {
        email: 'sam@example.com',
        password: 'sam123',
        name: 'Sam Rivera',
        location: 'Pasay City, Philippines',
        bio: "Musician, coffee addict, and part-time food blogger. I eat with my ears first — if the vibe is right, the food tastes better.",
        img: 'https://i.pinimg.com/474x/0e/53/97/0e53973045af09690a585416fba9394c.jpg',
        stats: { reviews: 3, photos: 58, followers: 91 }
    }
];

const seed = async () => {
    try {
        await connectDB();


        await User.deleteMany({});
        console.log('Cleared existing users');


        for (const userData of seedUsers) {
            const user = new User(userData);
            await user.save();
            console.log(`Seeded user: ${user.name} (${user.email})`);
        }

        console.log('\nSeeding complete!');
        process.exit(0);
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

seed();
