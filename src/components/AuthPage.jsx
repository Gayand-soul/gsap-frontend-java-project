import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api.js";


const AuthPage = () => {

    // STATES───────────────────────────────────────────────────────────────
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading]   = useState(false);
    const [error, setError]  = useState(null);

    const navigate = useNavigate();

    // LOGIN LOGIC───────────────────────────────────────────────────────────────
    const handleLogin = async () => {

        setError(null);
        setLoading(true);

        try {
            const { token, role } = await loginUser(username, password);

            // Store JWT — used for all protected API calls
            localStorage.setItem("adminToken", token);

            // Clean up old keys from previous version
            localStorage.removeItem("isAdmin");
            localStorage.removeItem("isUser");

            if (role === "ROLE_ADMIN") {
                navigate("/admin");
            } else {
                navigate("/");
            }

        } catch (err) {
            setError("Wrong username or password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Allow Enter key to submit
    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleLogin();
    };

    // ── Render ──────────────────────────────────────────────
    return (

        <section
            id="logon"
            className="w-full min-h-screen flex flex-col md:flex-row items-center justify-center gap-16 px-6"
        >

            {/* LEFT - LOGIN */}
            <div className="flex flex-col items-center justify-center text-center w-full max-w-md">

                <h2 className="text-4xl mb-8">
                    Welcome
                </h2>

                <div className="space-y-4 w-full">

                    {/* ERROR MESSAGE */}
                    {error && (
                        <p className="text-red-400 text-sm border border-red-400 rounded-md py-2 px-4">
                            {error}
                        </p>
                    )}

                    {/* USERNAME */}
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="w-full p-3 border border-gray-300 rounded-md text-center"
                    />

                    {/* PASSWORD */}
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="w-full p-3 border border-gray-300 rounded-md text-center"
                    />

                    {/* SIGN IN */}
                    <button
                        onClick={handleLogin}
                        disabled={loading}
                        className="w-full bg-yellow-500 text-black py-3 rounded-md hover:bg-yellow-400 transition disabled:opacity-50"
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>

                    {/* SIGN UP */}
                    <button
                        className="w-full border border-yellow-500 text-yellow-500 py-3 rounded-md hover:bg-yellow-50 transition"
                    >
                        Sign Up
                    </button>

                </div>

            </div>

            {/* RIGHT - IMAGE */}
            <div className="flex items-center justify-center">

                <img
                    src="/images/smallpics/singleflotte10.jpg"
                    alt="luxury hotel"
                    className="w-72 h-72 md:w-[380px] md:h-[380px] object-cover rounded-full border-4 border-yellow-400 p-2"
                />

            </div>

        </section>
    );
};

export default AuthPage;