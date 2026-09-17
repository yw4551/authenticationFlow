import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../services/api";

function RegisterPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setError(null);

        try {
            await api("/auth/register", {
                method: "POST",
                body: JSON.stringify({ username, email, password }),
            });

            navigate("/login");
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Registration failed",
            );
        }
    };

    return (
        <div className="auth-page">
            <h1>Register</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Register</button>
            </form>

            {error && <p>{error}</p>}

            <p>
                Already have an account <Link to="/login">Login</Link>
            </p>
        </div>
    );
}

export default RegisterPage;
