
import React from 'react';
import {suiteLists} from "../../constants/index.js";


const Suite = () => {
    return(
        <section id="suites" className="noisy">
            <div className="images">
                <img src="/images/suite10.jpg" alt="left-suite" id="c-left-suite"/>
                <img src="/images/suite20.jpg" alt="right-right" id="c-right-suite"/>
                <img src="/images/suite30.jpg" alt="right-middle" id="c-middle-suite"/>
            </div>


            <div className="list">
                <div className="popular">
                    <h2>Most Popular Suites</h2>
                    <ul>
                        {suiteLists.map(({name,detail, price}) => (
                            <li key={name}>
                                <div className="md:me-28">
                                    <h3>{name}</h3>
                                    <p>{detail}</p>
                                </div>
                                <span>{price}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default Suite;