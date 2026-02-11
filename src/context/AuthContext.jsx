import React, { createContext, useContext, useState, useEffect } from 'react';

// Import default assets for P. Carti
import dummyProfile from '../assets/dummy_profile.jpg';
import goodMunch from '../assets/good_munch.jpg';
import barnTaft from '../assets/barnTaft.jpg';
import mcdonalds from '../assets/mcdoTaft.jpg';

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
        password: "password123", // Default password for testing
        name: "P. Carti",
        location: "New York City, NY",
        bio: "Food enthusiast exploring local gems. Always looking for the perfect taco.",
        img: dummyProfile, // Note: This will only work if the import structure is maintained or if we handle image paths differently in a real backend.
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

    useEffect(() => {
        // Initialize from localStorage
        const storedUser = localStorage.getItem('currentUser');
        const usersList = JSON.parse(localStorage.getItem('users') || '[]');

        // Seed P. Carti if no users exist
        if (usersList.length === 0) {
            usersList.push(defaultUser);
            localStorage.setItem('users', JSON.stringify(usersList));
            // Automatically log in P. Carti for the first run if desired, or leave logged out.
            // Let's preserve the "logged in" feel by checking if we want to auto-login the default user.
            // For now, we won't force login, but the user "exists".
            // actually, the user asked to "preserve" the records.
            // PROPOSAL: If no current user, SET P. Carti as current user initially so the transition is seamless.
            if (!storedUser) {
                localStorage.setItem('currentUser', JSON.stringify(defaultUser));
                setUser(defaultUser);
            }
        }

        if (storedUser) {
            setUser(JSON.parse(storedUser));
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
            img: dummyProfile, // Default image
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
