
import React, {useRef} from 'react';
import { useGSAP } from '@gsap/react';
import { SplitText } from "gsap/all";
import gsap from 'gsap';
import {useMediaQuery} from "react-responsive";



const Hero = () => {

    useGSAP(() => {
        const heroSplit = new SplitText('.title', {type: 'chars, words'});
        const paragraphSplit = new SplitText('.subtitle', {type: 'lines'});


        gsap.from(heroSplit.chars, {
            yPercent: 100,
            duration: 1.8,
            ease: 'expo.out',
            stagger:0.16
        });
        //subtitles motion
        gsap.from(paragraphSplit.lines, {
            opacity:0,
            yPercent:100,
            duration: 1.8,
            ease: 'expo.out',
            stagger:0.06,
            delay: 1,
        });

        gsap.timeline({
            scrollTrigger:{
                trigger:'#hero',
                start:'top top',
                end: 'bottom top',
                scrub: true,
            }
        })
            .to('.right-leaf', {y:200}, 0)
            .to('left-leaf', {y:-200}, 0)

    }, []);


    return (
        <>
            <section id='hero' className='noisy'>
                <h1 className="title">Tranquil</h1>

                <div className="body">
                    <div className="content">
                        <div className="space-y-5 hidden md:block">
                            <p>Rest. Relax. Recharge.</p>
                            <p className="subtitle">
                                Wake up Somewhere <br/> Wonderful
                            </p>
                        </div>

                        {/* CENTER IMAGE */}
                        <div className="hero-center-image">
                            <img
                                src="/images/smallpics/Bamboo.jpg"
                                alt="bamboo"
                            />
                        </div>

                        <div className="view-suites">
                            <p className="subtitle">
                                From peaceful nights to comfortable mornings — our rooms offer everything you need to feel at home.
                            </p>
                            <a href="#suites">View Suites</a>

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Hero

