import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {

    // STATES
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    // LOGIN LOGIC
    const handleLogin = () => {

        // ADMIN LOGIN
        if(email === "admin@mail.com" && password === "admin007") {

            localStorage.setItem("isAdmin", "true");
            localStorage.setItem("isUser", "false");

            navigate("/admin");

            return;
        }

        // USER LOGIN
        if(email === "user@mail.com" && password === "user123") {

            localStorage.setItem("isUser", "true");
            localStorage.setItem("isAdmin", "false");

            navigate("/");
            //force to reload window
            window.location.reload();
            return;
        }

        // WRONG LOGIN
        alert("Wrong email or password");
    };

    return (

        <section
            id="logon"
            className="w-full min-h-screen flex flex-col md:flex-row items-center justify-center gap-16 px-6"
        >

            {/* LEFT - LOGIN / SIGNUP */}
            <div className="flex flex-col items-center justify-center text-center w-full max-w-md">

                <h2 className="text-4xl mb-8">
                    Welcome
                </h2>

                <div className="space-y-4 w-full">

                    {/* EMAIL */}
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md text-center"
                    />

                    {/* PASSWORD */}
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md text-center"
                    />

                    {/* SIGN IN */}
                    <button
                        onClick={handleLogin}
                        className="w-full bg-yellow-500 text-black py-3 rounded-md hover:bg-yellow-400 transition"
                    >
                        Sign In
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