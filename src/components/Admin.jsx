import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import {
    reservedRoomsData,
    vacantRoomsData
} from "../../constants";

const Admin = () => {

    const navigate = useNavigate();

    // ADMIN PROTECTION
    const isAdmin = localStorage.getItem("isAdmin");

    if(isAdmin !== "true") {
        return <Navigate to="/" />;
    }

    // STATE
    const [reservedRooms, setReservedRooms] = useState(reservedRoomsData);

    const vacantRooms = vacantRoomsData;

    // DELETE BOOKING
    const deleteBooking = (id) => {

        setReservedRooms(
            reservedRooms.filter((booking) => booking.id !== id)
        );
    };

    // SAVE BOOKING
    const saveBooking = () => {

        alert("Booking saved successfully");
    };

    // LOGOUT
    const handleLogout = () => {

        localStorage.removeItem("isAdmin");

        navigate("/");
    };

    return (

        <section
            id="admin"
            className="w-full min-h-screen flex flex-col items-center justify-center px-6 py-16"
        >

            {/* TOP SECTION */}
            <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-10 mb-16">

                {/* LEFT TITLE */}
                <div className="text-center md:text-left">

                    <h1 className="text-4xl md:text-6xl mb-4">
                        Admin Dashboard
                    </h1>

                    <p className="text-lg opacity-80 mb-6">
                        Manage room reservations and availability.
                    </p>

                    {/* LOGOUT BUTTON */}
                    <button
                        onClick={handleLogout}
                        className="px-6 py-3 rounded-lg border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition"
                    >
                        Logout
                    </button>

                </div>

                {/* RIGHT IMAGE */}
                <div className="flex items-center justify-center">

                    <img
                        src="/images/smallpics/logonpicture10.jpg"
                        alt="admin hotel"
                        className="w-52 h-52 md:w-64 md:h-64 object-cover rounded-full border-4 border-yellow-400 p-2"
                    />

                </div>

            </div>

            {/* TABLES CONTAINER */}
            <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-10">

                {/* RESERVED ROOMS */}
                <div className="border border-yellow-400 rounded-2xl p-6 backdrop-blur-sm">

                    <div className="flex items-center justify-between mb-6">

                        <h2 className="text-2xl md:text-3xl">
                            Reserved Rooms
                        </h2>

                        <button
                            onClick={saveBooking}
                            className="px-4 py-2 rounded-lg bg-yellow-400 text-black hover:bg-yellow-300 transition"
                        >
                            Save
                        </button>

                    </div>

                    <div className="overflow-x-auto">

                        <table className="w-full text-left border-collapse">

                            <thead>

                            <tr className="border-b border-yellow-400">

                                <th className="py-3">
                                    Room
                                </th>

                                <th className="py-3">
                                    Reserved Dates
                                </th>

                                <th className="py-3">
                                    Action
                                </th>

                            </tr>

                            </thead>

                            <tbody>

                            {reservedRooms.map((booking) => (

                                <tr
                                    key={booking.id}
                                    className="border-b border-white/10"
                                >

                                    <td className="py-4">
                                        {booking.room}
                                    </td>

                                    <td className="py-4">
                                        {booking.date}
                                    </td>

                                    <td className="py-4">

                                        <button
                                            onClick={() => deleteBooking(booking.id)}
                                            className="px-4 py-2 rounded-lg border border-red-400 text-red-400 hover:bg-red-400 hover:text-white transition"
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))}

                            </tbody>

                        </table>

                    </div>

                </div>

                {/* VACANT ROOMS */}
                <div className="border border-yellow-400 rounded-2xl p-6 backdrop-blur-sm">

                    <h2 className="text-2xl md:text-3xl mb-6">
                        Vacant Rooms
                    </h2>

                    <div className="overflow-x-auto">

                        <table className="w-full text-left border-collapse">

                            <thead>

                            <tr className="border-b border-yellow-400">

                                <th className="py-3">
                                    Room
                                </th>

                                <th className="py-3">
                                    Type
                                </th>

                                <th className="py-3">
                                    Available
                                </th>

                            </tr>

                            </thead>

                            <tbody>

                            {vacantRooms.map((room) => (

                                <tr
                                    key={room.id}
                                    className="border-b border-white/10"
                                >

                                    <td className="py-4">
                                        {room.room}
                                    </td>

                                    <td className="py-4">
                                        {room.type}
                                    </td>

                                    <td className="py-4">
                                        {room.amount}
                                    </td>

                                </tr>

                            ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </section>
    );
};

export default Admin;