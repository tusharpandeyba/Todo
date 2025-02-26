import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem("token", data.token);
            alert("Login successful!");
            navigate("/dashboard"); // Redirect to dashboard
        } else {
            alert(data.message || "Invalid username or password!");
        }
    };

    return (
        <div className="login-container">
            <div className="login-header">
                <h1>Welcome to Todo List Application</h1>
                <h2>Login</h2>
            </div>

            <div className="form-container">
                <form className="login-form" onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="login-button">
                        Login
                    </button>
                </form>

                <div className="register-link-container">
                    <div className="divider">
                        <span>Don't have an account?</span>
                    </div>
                    <a href="/register" className="register-link">
                        Register here
                    </a>
                </div>
            </div>

            <style jsx>{`
                .login-container {
                    min-height: 100vh;
                    background-color: #f9fafb;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    padding: 0 20px;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                }

                .login-header {
                    text-align: center;
                    margin-bottom: 2rem;
                }

                .login-header h1 {
                    font-size: 1.875rem;
                    font-weight: 800;
                    color: #111827;
                    margin-bottom: 0.5rem;
                }

                .login-header h2 {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #374151;
                }

                .form-container {
                    background-color: white;
                    border-radius: 8px;
                    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
                    padding: 2rem;
                    max-width: 28rem;
                    margin: 0 auto;
                    width: 100%;
                }

                .login-form {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .form-group label {
                    font-size: 0.875rem;
                    font-weight: 500;
                    color: #374151;
                }

                .form-group input {
                    padding: 0.625rem 0.75rem;
                    border: 1px solid #d1d5db;
                    border-radius: 0.375rem;
                    font-size: 0.875rem;
                    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
                }

                .form-group input:focus {
                    outline: none;
                    border-color: #4f46e5;
                    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
                }

                .login-button {
                    background-color: #4f46e5;
                    color: white;
                    font-weight: 500;
                    padding: 0.625rem 1.25rem;
                    border: none;
                    border-radius: 0.375rem;
                    cursor: pointer;
                    transition: background-color 0.15s ease-in-out;
                }

                .login-button:hover {
                    background-color: #4338ca;
                }

                .register-link-container {
                    margin-top: 1.5rem;
                    text-align: center;
                }

                .divider {
                    position: relative;
                    margin: 1.5rem 0;
                }

                .divider::before {
                    content: "";
                    position: absolute;
                    top: 50%;
                    left: 0;
                    right: 0;
                    height: 1px;
                    background-color: #e5e7eb;
                }

                .divider span {
                    position: relative;
                    padding: 0 0.75rem;
                    background-color: white;
                    color: #6b7280;
                    font-size: 0.875rem;
                }

                .register-link {
                    color: #4f46e5;
                    font-weight: 500;
                    text-decoration: none;
                    transition: color 0.15s ease-in-out;
                }

                .register-link:hover {
                    color: #4338ca;
                    text-decoration: underline;
                }

                @media (max-width: 640px) {
                    .form-container {
                        padding: 1.5rem;
                    }
                    
                    .login-header h1 {
                        font-size: 1.5rem;
                    }
                    
                    .login-header h2 {
                        font-size: 1.25rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default LoginPage;