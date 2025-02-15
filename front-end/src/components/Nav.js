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

            <img 
            alt="logo"
            className='logo'
             src ='https://cdn.iconscout.com/icon/free/png-512/free-leetcode-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-vol-4-pack-logos-icons-2944960.png?f=webp&w=512'/>

           {auth ? <ul className="nav-ul">
                <li><Link to="/">Products</Link></li>
                <li><Link to="/add">Add Products</Link></li>
                <li><Link to="/update">Update Products</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/Login">Login</Link></li>
                <li> <Link onClick={logout} to="/signup">Log Out {(JSON.parse(auth).name)}</Link></li>
                </ul>
                :
                <ul className="nav-ul nav-right">
                    <li><Link to ="/signup">Sign Up</Link></li>
                    <li><Link to ="/login">Login</Link></li>
                </ul>
            }
        </div>
    );
};

export default Nav;