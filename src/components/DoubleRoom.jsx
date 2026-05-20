
import React from 'react';
import { doubleRoomLists } from '../../constants/index.js' ;


const DoubleRoom = () => {

    return(
        <section id="doubleRooms" className="noisy">
            <div className="images">
                <img src="/images/doubleRoom20.jpg" alt="left double room" id="c-left-doubleRoom"/>
                <img src="/images/doubleRoom10.jpg" alt="middle double room" id="c-middle-doubleRoom"/>
                <img src="/images/doubleRoom30.jpg" alt="right double room" id="c-right-doubleRoom"/>
            </div>

            <div className="list">
                <div className="popular">
                    <h2>Japanese-Inspired Double Rooms</h2>
                    <ul>
                        {doubleRoomLists.map(( {name, detail, price}) => (
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

export default DoubleRoom;