import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Corrected `useNavigation` to `useNavigate`

const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate(); // `useNavigate` is the correct hook for navigation

    const logout = () => {
        localStorage.clear(); // Clear all data from localStorage
        navigate('/signup'); // Navigate to the signup page
    };

    return (
        <div>
            <ul className="nav-ul">
                <li><Link to="/">Products</Link></li>
                <li><Link to="/add">Add Products</Link></li>
                <li><Link to="/update">Update Products</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/Login">Login</Link></li>
                <li>
                    {auth ? (
                        <Link onClick={logout} to="/signup">Log Out</Link>
                    ) : (
                        <Link to="/signup">Sign Up</Link>
                    )}</li> 
            </ul> 
        </div>
    );
};

export default Nav;
