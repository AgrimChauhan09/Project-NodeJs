import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    // State for form inputs
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // To display errors
    const navigate = useNavigate();

    // Redirect if user is already logged in
    useEffect(() => {
        const auth = localStorage.getItem("user");
        if (auth) {
            navigate("/");
        }
    }, [navigate]);

    // Function to handle user registration
    const collectData = async () => {
        setError(""); // Clear previous errors

        if (!name || !email || !password) {
            setError("All fields are required.");
            return;
        }

        try {
            console.log("Sending data:", { name, email, password });

            let response = await fetch("http://localhost:5000/register", {
                method: "POST",
                body: JSON.stringify({ name, email, password }),
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                throw new Error(`Signup failed: ${response.statusText}`);
            }

            let result = await response.json();
            console.log("Signup Result:", result);

            if (result) {
                localStorage.setItem("user", JSON.stringify(result.result));
                localStorage.setItem("token  ", JSON.stringify(result.auth));
                navigate("/");
            }
        } catch (error) {
            console.error("Signup Error:", error);
            setError("Signup failed. Please try again.");
        }
    };

    return (
        <div>
            <h1 className="register">Register</h1>

            {error && <p style={{ color: "red" }}>{error}</p>}

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
