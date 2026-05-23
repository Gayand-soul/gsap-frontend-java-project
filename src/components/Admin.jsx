import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { fetchAllBookings, deleteBookingById, fetchRooms } from "../services/api.js";

const Admin = () => {

    const navigate = useNavigate();

    // ── Auth guard (JWT) ────────────────────────────────────────────────────
    const token = localStorage.getItem("authToken");
    if (!token) return <Navigate to="/" />;

    // ── State ───────────────────────────────────────────────────────────────
    const [reservedRooms, setReservedRooms] = useState([]);
    const [vacantRooms, setVacantRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ── Fetch data on mount ─────────────────────────────────────────────────
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        setError(null);
        try {
            const [bookings, rooms] = await Promise.all([
                fetchAllBookings(token),
                fetchRooms(),
            ]);
            setReservedRooms(bookings);

            // Convert { STANDARD: 2, DELUXE: 1 } → array for the table
            const roomArray = Object.entries(rooms).map(([type, count]) => ({
                id: type,
                room: type.charAt(0) + type.slice(1).toLowerCase(),
                type: type,
                amount: count,
            }));
            setVacantRooms(roomArray);
        } catch (err) {
            setError("Failed to load data. Is the backend running?");
        } finally {
            setLoading(false);
        }
    };

    // ── Delete booking ──────────────────────────────────────────────────────
    const deleteBooking = async (id) => {
        try {
            await deleteBookingById(id, token);
            setReservedRooms((prev) => prev.filter((b) => b.id !== id));
        } catch (err) {
            alert("Failed to delete booking. Please try again.");
        }
    };

    // ── Save / Refresh bookings ─────────────────────────────────────────────
    const saveBooking = async () => {
        try {
            await loadData();
            alert("Bookings refreshed successfully ✦");
        } catch (err) {
            alert("Failed to refresh. Is the backend running?");
        }
    };

    // ── Logout ──────────────────────────────────────────────────────────────
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userRole");
        localStorage.removeItem("isAdmin");
        localStorage.removeItem("isUser");
        window.location.href = "/";
    };



    // ── Render ──────────────────────────────────────────────────────────────
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
                        className="px-6 py-3 rounded-lg border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition mr-6"
                    >
                        Logout
                    </button>

                    {/* GO TO ROOMS BUTTON —*/}
                    <button
                        onClick={() => navigate("/")}
                        className="px-8 py-3 rounded-lg border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition"
                    >
                        Go to Rooms
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

            {/* LOADING STATE */}
            {loading && (
                <p className="text-yellow-400 text-lg mb-8 animate-pulse">
                    Loading data...
                </p>
            )}

            {/* ERROR STATE */}
            {error && (
                <div className="w-full max-w-7xl mb-8 p-4 border border-red-400 rounded-xl text-red-400 text-center">
                    {error}
                    <button
                        onClick={loadData}
                        className="ml-4 underline hover:text-red-300 transition"
                    >
                        Retry
                    </button>
                </div>
            )}

            {/* TABLES CONTAINER */}
            {!loading && !error && (
                <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-10">

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

                        {reservedRooms.length === 0 ? (
                            <p className="text-white/50 text-center py-8">
                                No bookings yet.
                            </p>
                        ) : (
                            <div className="overflow-x-auto">

                                <table className="w-full text-left border-collapse">

                                    <thead>
                                    <tr className="border-b border-yellow-400">
                                        <th className="py-3 pr-4">Guest</th>
                                        <th className="py-3 pr-4">Room</th>
                                        <th className="py-3 pr-4">Check-in</th>
                                        <th className="py-3 pr-4">Check-out</th>
                                        <th className="py-3 text-yellow-400 pr-4">Total Price</th> {/* ← NEW */}
                                        <th className="py-3 pr-4">Action</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {reservedRooms.map((booking) => (
                                        <tr
                                            key={booking.id}
                                            className="border-b border-white/10"
                                        >
                                            <td className="py-4 pr-4">{booking.guestName}</td>
                                            <td className="py-4 pr-4">{booking.roomType}</td>
                                            <td className="py-4 pr-4">{booking.checkIn}</td>
                                            <td className="py-4 pr-4">{booking.checkOut}</td>
                                            <td className="py-4 text-yellow-400 font-semibold pr-4">
                                                ${booking.totalPrice}
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
                        )}

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
                                    <th className="py-3">Room</th>
                                    <th className="py-3">Type</th>
                                    <th className="py-3">Available</th>
                                </tr>
                                </thead>

                                <tbody>
                                {vacantRooms.map((room) => (
                                    <tr
                                        key={room.id}
                                        className="border-b border-white/10"
                                    >
                                        <td className="py-4">{room.room}</td>
                                        <td className="py-4">{room.type}</td>
                                        <td className="py-4">{room.amount}</td>
                                    </tr>
                                ))}
                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>
            )}

        </section>
    );
};

export default Admin;