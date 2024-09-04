import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
export const AuthContext = createContext()

export function AuthProvider({ children }) {
    const ls = localStorage.getItem('auth')
    const [user, setUser] = useState(ls ? JSON.parse(atob(ls)) : null);
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const saved = ls ? JSON.parse(atob(ls)) : null;
        if (saved) {
            setUser(saved);
        }
        getCategories()
    }, [])

    function getCategories() {
        axios.get('/categories').then(response => {
            if (response.status === 200) {
                // Handle fetched data here
                setCategories(response.data.categories)
            } else {
                // Handle error here
                console.error('Failed to fetch data')
            }
        }).catch(error => {
            console.error(error)
        })
    }

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('auth');
    }

    // const handleBooking = async (booking) => {
    //     if (user?.username && user.role === 'user') {
    //         booking.user = user.username;
    //         axios.post('/set_booking', booking).then(response => {
    //             if (response.data.status === 200) alert(response.data.message);
    //             else alert('Something went wrong while booking. Please try again later.');
    //         }).catch(error => alert(error.message))
    //     } else if (user?.username && user.role !== 'user') {
    //         alert('Only users can make bookings.');
    //     } else {
    //         alert('Please sign in to make a booking.');
    //     }
    // }

    return (
        <AuthContext.Provider value={{
            user, setUser, handleLogout, categories, getCategories
        }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    return useContext(AuthContext)
};

export default useAuth;