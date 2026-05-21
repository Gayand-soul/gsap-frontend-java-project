import React, { useState, useEffect } from 'react'
import { navLinks } from "../../constants/index.js";
import { Link, useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Navbar = () => {
    const [isUser, setIsUser] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsUser(localStorage.getItem("isUser") === "true");
        setIsAdmin(localStorage.getItem("isAdmin") === "true");
    }, []);

    const handleLogout = () => {
        localStorage.setItem("isUser", "false");
        localStorage.setItem("isAdmin", "false");
        setIsUser(false);
        setIsAdmin(false);
        navigate("/");
    };

    useGSAP(() => {
        const navTween = gsap.timeline({
            scrollTrigger: {
                trigger: 'nav',
                start: 'bottom top'
            }
        });

        navTween.fromTo('nav', { backgroundColor: 'transparent' }, {
            backgroundColor: '#00000050', backgroundFilter: 'blur(10px)', duration: 1, ease: 'power1.inOut'
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

                        return (
                            <li key={link.id}>
                                {link.path
                                    ? <Link to={link.path}>{link.title}</Link>
                                    : <a href={`#${link.id}`}>{link.title}</a>
                                }
                            </li>
                        );
                    })}

                    {/* SHOW WHEN LOGGED IN */}
                    {(isUser || isAdmin) && (
                        <li className="flex items-center gap-4">
                            <span className="text-yellow-400 font-semibold">
                                {isAdmin ? "👩 Admin" : "🧑  User"}
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
    )
}

export default Navbar;