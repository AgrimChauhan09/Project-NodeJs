import React, { useState,useEffect} from "react";
import {useNavigate} from 'react-router-dom'

const Signup = () => {
    // State variables for name, email, and password
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate=useNavigate();


    useEffect(() => {
        const auth = localStorage.getItem('user'); // Check for user authentication
        if (auth) {
            navigate('/'); // Navigate to the home page if authenticated
        }
    }, [navigate]); // Add `navigate` to the dependency array


    // Function to handle form submission
    const collectData = async () => {
        console.log(name, email, password); // Debugging log
            let response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                body: JSON.stringify({ name, email, password }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            let result = await response.json();
            console.log(result); // Log the response for debugging
            localStorage.setItem("user",JSON.stringify(result));

            if(result){
                navigate('/')
            }
        };
 
    return (
        <div>
            <h1 className="register">Register</h1>
            <input
                className="inputbox"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Name"
            />
            <input
                className="inputbox"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter E-Mail"
            />
            <input
                className="inputbox"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
            />
            <button onClick={collectData} className="appbutton" type="button">
                Signup
            </button>
        </div>
    );
};

export default Signup;
 