import React from 'react';
import { Routes, Route } from "react-router-dom";
import { ScrollTrigger, SplitText } from "gsap/all";
import gsap from "gsap";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Suite from "./components/Suite.jsx";
import DoubleRoom from "./components/DoubleRoom.jsx";
import SingleRoom from "./components/SingleRoom.jsx";
import FindUs from "./components/FindUs.jsx";
import AuthPage from "./components/AuthPage.jsx";
import Admin from "./components/Admin.jsx";
import Booking from './components/Booking.jsx';

gsap.registerPlugin(ScrollTrigger, SplitText);


// HOME PAGE
const HomePage = () => {

    return (

        <main>

            <Navbar />

            <Hero />

            <div className={"h-dvh bg-black"} />

            <Suite />

            <DoubleRoom />

            <SingleRoom />

            <FindUs />

        </main>
    );
};


const App = () => {

    return (

        <Routes>

            {/* HOME */}
            <Route path="/" element={<HomePage />} />

            {/* LOGIN */}
            <Route path="/login" element={<AuthPage />} />

            {/* ADMIN */}
            <Route path="/admin" element={<Admin />} />

            {/* Booking Page */}
            <Route path="/booking/:roomType" element={<Booking />} />

        </Routes>

    );
};

export default App;