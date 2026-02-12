import React, { createContext, useContext, useState, useEffect } from 'react';

// Import default assets for P. Carti
import dummyProfile from '../assets/dummy_profile.jpg';
import goodMunch from '../assets/good_munch.jpg';
import barnTaft from '../assets/barnTaft.jpg';
import mcdonalds from '../assets/mcdoTaft.jpg';
import resto from '../assets/resto.jpg';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Default "P. Carti" user data
    const defaultUser = {
        email: "carti@example.com",
        password: "password123", 
        name: "P. Carti",
        location: "New York City, NY",
        bio: "Food enthusiast exploring local gems. Always looking for the perfect taco.",
        img: dummyProfile, 
        stats: {
            reviews: 3,
            photos: 115,
            followers: 88
        },
        reviews: [
            {
                id: 1,
                restaurant: "Good Munch",
                rating: 4,
                text: "The food is great and the munch is in fact good but one thing that bothers me is that the wait time is a bit long...",
                time: "5 mins ago",
                image: goodMunch
            },
            {
                id: 2,
                restaurant: "Barn",
                rating: 5,
                text: "Best Sisig ever and really has fun parties woohoo!",
                time: "2 days ago",
                image: barnTaft
            },
            {
                id: 3,
                restaurant: "McDonald's",
                rating: 3,
                text: "Chicken has a lots and big servings. The mcdo app was so goated!",
                time: "1 week ago",
                image: mcdonalds
            }
        ]
    };

    // Additional hardcoded users
    const additionalUsers = [
        {
            email: "miko@example.com",
            password: "miko123",
            name: "Miko de Lara",
            location: "Taft Avenue, Manila",
            bio: "DLSU '24 | ID 120. Certified food critic and campus foodie. If it's near Taft, I've tried it.",
            img: "https://i.pinimg.com/474x/0e/53/97/0e53973045af09690a585416fba9394c.jpg",
            stats: {
                reviews: 4,
                photos: 72,
                followers: 134
            },
            reviews: [
                {
                    id: 1,
                    restaurant: "Good Munch",
                    rating: 5,
                    text: "Absolutely love this place! The chicken adobo rice bowl is unbeatable. Generous portions and the staff is super friendly. My go-to spot between classes.",
                    time: "10 mins ago",
                    image: goodMunch
                },
                {
                    id: 2,
                    restaurant: "Pericos",
                    rating: 5,
                    text: "Best Mexican food near campus hands down. The burritos are massive and the salsa is freshly made. Worth every peso!",
                    time: "1 day ago",
                    image: resto
                },
                {
                    id: 3,
                    restaurant: "Coco Buko",
                    rating: 4,
                    text: "Perfect refreshment spot after a long day. Their buko shake is super creamy. Only wish they had more seating space.",
                    time: "3 days ago",
                    image: resto
                },
                {
                    id: 4,
                    restaurant: "Potato Corner",
                    rating: 4,
                    text: "Can never go wrong with flavored fries! The BBQ flavor hits different at 3 AM after studying. A campus staple.",
                    time: "1 week ago",
                    image: resto
                }
            ]
        },
        {
            email: "chloe@example.com",
            password: "chloe123",
            name: "Chloe Evangelista",
            location: "Makati City, Philippines",
            bio: "Lia-Com student by day, foodie by night. Always on the hunt for hidden food gems around the metro.",
            img: "https://i.pinimg.com/474x/0e/53/97/0e53973045af09690a585416fba9394c.jpg",
            stats: {
                reviews: 3,
                photos: 45,
                followers: 67
            },
            reviews: [
                {
                    id: 1,
                    restaurant: "Barn",
                    rating: 4,
                    text: "Great ambiance and the live band on weekends makes the experience 10x better. The sisig is really good but the drinks are a bit overpriced.",
                    time: "30 mins ago",
                    image: barnTaft
                },
                {
                    id: 2,
                    restaurant: "Good Munch",
                    rating: 4,
                    text: "Solid food for student-friendly prices. The sinigang rice meal is a comfort food classic. Will keep coming back!",
                    time: "2 days ago",
                    image: goodMunch
                },
                {
                    id: 3,
                    restaurant: "McDonald's",
                    rating: 4,
                    text: "The Taft branch is always packed but the service is fast. Their BTS meal was a cultural moment. Reliable as always!",
                    time: "5 days ago",
                    image: mcdonalds
                }
            ]
        },
        {
            email: "zark@example.com",
            password: "zark123",
            name: "Zark Man",
            location: "Quezon City, Philippines",
            bio: "If the burger is bigger than my face, I'm interested. Professional eater, amateur reviewer. Panalo!",
            img: "https://i.pinimg.com/474x/0e/53/97/0e53973045af09690a585416fba9394c.jpg",
            stats: {
                reviews: 3,
                photos: 200,
                followers: 312
            },
            reviews: [
                {
                    id: 1,
                    restaurant: "Good Munch",
                    rating: 5,
                    text: "This place is a hidden gem! The servings are huge and everything tastes home-cooked. The price-to-quality ratio is insane. 10/10 no cap.",
                    time: "1 hour ago",
                    image: goodMunch
                },
                {
                    id: 2,
                    restaurant: "Rita's Bacsilog",
                    rating: 3,
                    text: "The bacsilog is decent but nothing extraordinary. Portions could be bigger for the price. The longganisa was a bit dry. Average overall.",
                    time: "4 days ago",
                    image: resto
                },
                {
                    id: 3,
                    restaurant: "Potato Corner",
                    rating: 5,
                    text: "The GOAT of flavored fries. Sour Cream flavor is elite. I literally buy this every single day. No exaggeration. Campus legend.",
                    time: "1 week ago",
                    image: resto
                }
            ]
        },
        {
            email: "sam@example.com",
            password: "sam123",
            name: "Sam Rivera",
            location: "Pasay City, Philippines",
            bio: "Musician, coffee addict, and part-time food blogger. I eat with my ears first — if the vibe is right, the food tastes better.",
            img: "https://i.pinimg.com/474x/0e/53/97/0e53973045af09690a585416fba9394c.jpg",
            stats: {
                reviews: 3,
                photos: 58,
                followers: 91
            },
            reviews: [
                {
                    id: 1,
                    restaurant: "Barn",
                    rating: 5,
                    text: "THE best hangout spot near campus. Great food, great music, great people. The pulutan platter is perfect for group nights. Chef's kiss!",
                    time: "2 hours ago",
                    image: barnTaft
                },
                {
                    id: 2,
                    restaurant: "McDonald's",
                    rating: 3,
                    text: "It's McDonald's — you know what you're getting. Consistent but never exciting. The Wi-Fi is clutch for late night cramming sessions though.",
                    time: "3 days ago",
                    image: mcdonalds
                },
                {
                    id: 3,
                    restaurant: "Pericos",
                    rating: 4,
                    text: "Underrated spot! The nachos are loaded and the quesadillas are crispy perfection. Chill vibe inside too. Great for a quick bite between classes.",
                    time: "6 days ago",
                    image: resto
                }
            ]
        }
    ];

    useEffect(() => {
        // Initialize from localStorage
        const storedUser = localStorage.getItem('currentUser');
        let usersList = JSON.parse(localStorage.getItem('users') || '[]');

        // Ensure all hardcoded users always exist in localStorage
        const allDefaults = [defaultUser, ...additionalUsers];
        let updated = false;
        allDefaults.forEach(defaultU => {
            if (!usersList.find(u => u.email === defaultU.email)) {
                usersList.push(defaultU);
                updated = true;
            }
        });
        if (updated) {
            localStorage.setItem('users', JSON.stringify(usersList));
        }

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            // Auto-login P. Carti on first visit
            localStorage.setItem('currentUser', JSON.stringify(defaultUser));
            setUser(defaultUser);
        }

        setLoading(false);
    }, []);

    const login = (email, password) => {
        const usersList = JSON.parse(localStorage.getItem('users') || '[]');
        const foundUser = usersList.find(u => u.email === email && u.password === password);

        if (foundUser) {
            setUser(foundUser);
            localStorage.setItem('currentUser', JSON.stringify(foundUser));
            return { success: true };
        } else {
            return { success: false, message: "Invalid email or password" };
        }
    };

    const register = (email, password, name) => {
        const usersList = JSON.parse(localStorage.getItem('users') || '[]');

        if (usersList.find(u => u.email === email)) {
            return { success: false, message: "User already exists" };
        }

        const newUser = {
            email,
            password,
            name: name || "New User",
            location: "Unknown Location",
            bio: "No bio yet.",
            img: "https://i.pinimg.com/474x/0e/53/97/0e53973045af09690a585416fba9394c.jpg", // Default image
            stats: { reviews: 0, photos: 0, followers: 0 },
            reviews: []
        };

        usersList.push(newUser);
        localStorage.setItem('users', JSON.stringify(usersList));

        // Auto login after register
        setUser(newUser);
        localStorage.setItem('currentUser', JSON.stringify(newUser));

        return { success: true };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('currentUser');
    };

    const updateProfile = (updatedData) => {
        const usersList = JSON.parse(localStorage.getItem('users') || '[]');

        // Update current state
        const updatedUser = { ...user, ...updatedData };
        setUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));

        // Update in users list
        const userIndex = usersList.findIndex(u => u.email === user.email);
        if (userIndex !== -1) {
            usersList[userIndex] = updatedUser;
            localStorage.setItem('users', JSON.stringify(usersList));
        }
    };

    const value = {
        user,
        login,
        register,
        logout,
        updateProfile,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
