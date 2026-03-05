import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const res = await fetch('/api/check-session', {
                    credentials: 'include'
                });
                const data = await res.json();
                setUser(data.user);
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
