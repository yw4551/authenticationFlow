import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../services/api";

interface LoginResponse {
    token: string;
}

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const setToken = useAuthStore((state) => state.setToken);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError(null);

        try {
            const data = await api<LoginResponse>("/auth/login", {
                method: "POST",
                body: JSON.stringify({ email, password }),
            });

            setToken(data.token);
            navigate("/users");
        } catch (error) {
            setError(error instanceof Error ? error.message : "Login failed");
        }
    };

    return (
        <div className="auth-page">
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
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
                <button type="submit">Login</button>
            </form>

            {error && <p>{error}</p>}

            <p>
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </div>
    );
}

export default LoginPage;
