import React, { useState, useEffect } from 'react'
import { navLinks } from "../../constants/index.js";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Navbar = () => {
    const [isUser, setIsUser] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Re-check auth state every time the route changes
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        const role  = localStorage.getItem("userRole");

        setIsAdmin(token !== null && role === "ROLE_ADMIN");
        setIsUser(token !== null && role === "ROLE_USER");
    }, [location.pathname]); // ← re-runs on every page navigation

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userRole");
        localStorage.removeItem("isAdmin");
        localStorage.removeItem("isUser");
        setIsUser(false);
        setIsAdmin(false);
        window.location.href = "/"; // force full reload
    };

    useGSAP(() => {
        const navTween = gsap.timeline({
            scrollTrigger: {
                trigger: 'nav',
                start: 'bottom top'
            }
        });

        navTween.fromTo('nav', { backgroundColor: 'transparent' }, {
            backgroundColor: '#00000050', backdropFilter: 'blur(10px)', duration: 1, ease: 'power1.inOut'
        });
    })

    return (
        <nav>
            <div>
                <a href="#home" className="flex items-center gap-2">
                    <p>Dream Lounge</p>
                </a>
                <ul>
                    {navLinks.map((link) => {
                        // Hide Logon link when already logged in
                        if (link.id === 'logon' && (isUser || isAdmin)) return null;

                        const handleNavClick = () => {
                            if (link.path) {
                                navigate(link.path);
                            } else {
                                if (location.pathname !== '/') {
                                    navigate('/');
                                    setTimeout(() => {
                                        document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' });
                                    }, 100);
                                } else {
                                    document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' });
                                }
                            }
                        };

                        return (
                            <li key={link.id}>
                                <button onClick={handleNavClick}>{link.title}</button>
                            </li>
                        );
                    })}

                    {/* SHOW WHEN LOGGED IN */}
                    {(isUser || isAdmin) && (
                        <li className="flex items-center gap-4">
                            <span className="text-yellow-400 font-semibold">
                                {isAdmin ? "👩 Admin" : "🧑 User"}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="border border-yellow-500 text-yellow-500 px-3 py-1 rounded-md hover:bg-yellow-500 hover:text-black transition text-sm font-semibold"
                            >
                                Log Out
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;