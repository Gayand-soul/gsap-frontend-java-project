
import React from 'react';
import { ScrollTrigger, SplitText } from "gsap/all";
import gsap from "gsap";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Suite from "./components/Suite.jsx";
import DoubleRoom from "./components/DoubleRoom.jsx";
import SingleRoom from "./components/SingleRoom.jsx";
import FindUs from "./components/FindUs.jsx";
import AuthPage from "./components/AuthPage.jsx";


gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
    return (
        <main>
            <Navbar />
            <Hero />
            <div className={"h-dvh bg-black"}/>
            <Suite />
            <DoubleRoom />
            <SingleRoom />
            <FindUs />
            <AuthPage />

        </main>
    )
}

export default App


