import { create } from 'framer-motion/m';
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [restaurants, setRestaurants] = useState([]);
    useEffect(() => {
        const checkSession = async () => {
            try {
                const res = await fetch('/api/check-session', {
                    credentials: 'include'
                });
                const data = await res.json();
                setUser(data.user);

                await getAllRestaurants();
            } catch (error) {
                console.error('Session check failed:', error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkSession();
    }, []);

    // fetch(api/test) - get

    const login = async (email, password, isRestaurant = false) => {
        try {

            // WILL CHECK WHETHER THE USER IS LOGGING IN AS A RESTAURANT OR NOT
            // HAYDEN MAKE ROUTES LIKES THIS
            const endpoint = isRestaurant ? '/api/restaurant/login' : '/api/login';
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();

            if (data.success) {
                setUser(data.user);
                return { success: true };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Login failed:', error);
            return { success: false, message: 'Network error' };
        }
    };

    const register = async (email, password, isRestaurant = false) => {
        try {

            // WILL CHECK WHETHER THE USER IS REGISTERING AS A RESTAURANT OR NOT
            // HAYDEN MAKE ROUTES LIKE THIS
            const endpoint = isRestaurant ? '/api/restaurant/register' : '/api/register';
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();

            if (data.success) {
                setUser(data.user);
                return { success: true };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Register failed:', error);
            return { success: false, message: 'Network error' };
        }
    };

    const logout = async () => {
        try {
            await fetch('/api/logout', {
                method: 'POST',
                credentials: 'include'
            });
        } catch (error) {
            console.error('Logout failed:', error);
        }
        setUser(null);
    };

    const updateProfile = async (updatedData, avatarFile = null) => {
        try {
            let fetchOptions;

            // if avatar file is uplaoded, body will be in terms of form data
            if (avatarFile) {
                const formData = new FormData();
                formData.append('name', updatedData.name);
                formData.append('location', updatedData.location);
                formData.append('bio', updatedData.bio);
                formData.append('avatar', avatarFile);

                fetchOptions = {
                    method: 'PUT',
                    credentials: 'include',
                    body: formData,
                };
            } else {
                // if no avatar file is uploaded, body will be in terms of json
                fetchOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify(updatedData),
                };
            }

            const res = await fetch('/api/profile', fetchOptions);
            const data = await res.json();

            if (data.success) {
                setUser(data.user);
                return { success: true };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Update profile failed:', error);
            return { success: false, message: 'Network error' };
        }
    };

    const createRestaurant = async (name , address) => {
        try {
            const res = await fetch('/api/restaurant/createRestaurant', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ name, address })
            });
            const data = await res.json();

            if (data.success) {
                return { success: true, restaurant: data.restaurant };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Create restaurant failed:', error);
            return { success: false, message: error.message || 'Network error' };
        }
    };

    const getAllRestaurants = async() =>{
        try{
            const res = await fetch('/api/restaurant/getAllRestaurants',{
                method: 'GET',
                headers : {'Content-Type': 'application/json'},
                credentials: 'include'
            });
            const restaurants = await res.json();
            if(restaurants.success){
                setRestaurants(restaurants.restaurants);
                return {success: true, restaurants: restaurants.restaurants}
            } else {
                return {success: false, message: restaurants.message}
            }
        }catch(error){
            return {success: false, message: error.message || 'Network error'}
        }
    }

    const value = {
        user,
        restaurants,
        login,
        register,
        logout,
        updateProfile,
        createRestaurant,
        getAllRestaurants,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
