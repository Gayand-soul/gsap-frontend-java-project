
import React from 'react';
import { singleRoomLists } from "../../constants/index.js";
import {useNavigate} from "react-router-dom";


const toSlug =(name)=> name.toLowerCase().replace(/\s+/g, '-');

const SingleRoom = () => {

    const navigate = useNavigate();

    return (
        <section id="singleRooms" className="noisy">
            <div className="images">
                <img src="/images/SingleRed30.jpg" alt="left single room" id="c-left-singleRoom"/>
                <img src="/images/SingleRed20.jpg" alt="middle single room" id="c-middle-singleRoom"/>
                <img src="/images/SingleRed40.jpg" alt="right single room" id="c-right-singleRoom"/>
            </div>

            <div className="list">
                <div className="popular">
                    <h2>Cozy Solo Stays with Character</h2>
                    <ul>
                        {singleRoomLists.map(({name, detail, price,}) => (
                            <li key={name}>
                                <div className="md:me-28">
                                    <h3
                                        onClick={() => navigate(`/booking/${toSlug(name)}`)}
                                        style={{ cursor: 'pointer' }}
                                        className="hover:underline underline-offset-4">
                                        {name}
                                    </h3>
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

export default SingleRoom;