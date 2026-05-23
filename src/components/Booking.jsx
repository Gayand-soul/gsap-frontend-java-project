
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { roomData } from "../../constants/index.js";
import { createBooking } from "../services/api.js";


const Booking = () => {
    const { roomType } = useParams();
    const navigate = useNavigate();

    const room = roomData[roomType];

    const [form, setForm] = useState({
        name: '', email: '', checkin: '', checkout: '', guests: 1,
    });
    const [submitted, setSubmitted] = useState(false);

    if (!room) {
        return (
            <section className="noisy min-h-dvh flex items-center justify-center bg-black">
                <div className="text-center space-y-6">
                    <h2 className="font-modern-negra text-5xl text-yellow-400">Room not found</h2>
                    <button
                        onClick={() => navigate(-1)}
                        className="border border-yellow-400 text-yellow-400 px-6 py-2 rounded-full hover:bg-yellow-400 hover:text-black transition-colors duration-200"
                    >
                        ← Go Back
                    </button>
                </div>
            </section>
        );
    }

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    // Map URL slug → backend RoomType enum value
    const mapRoomType = (slug) => {
        const suites = [
            "secret-garden-heaven-suite",
            "the-maharaja-lake-suite",
            "the-glittering-sea-loft",
        ];
        const doubleRooms = [
            "zen-garden-double-room",
            "hikari-nature-room",
            "the-kyoto-light-room",
        ];
        const singleRooms = [
            "crimson-silk-single-room",
            "red-lantern-serenity-room",
            "imperial-rouge-single-room",
        ];

        if (suites.includes(slug))       return "Suite";
        if (doubleRooms.includes(slug))  return "DoubleRoom";
        if (singleRooms.includes(slug))  return "SingleRoom";

        return slug; // fallback
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("authToken");

            const payload = {
                guestName:      form.name,
                roomType:       mapRoomType(roomType),
                numberOfGuests: Number(form.guests),
                checkIn:        form.checkin,
                checkOut:       form.checkout,
            };

            console.log("Sending payload:", payload);

            await createBooking(payload, token);
            setSubmitted(true);
        } catch (err) {
            console.error("Server response:", err.response?.data);
            alert("Booking failed. Please check your details and try again.");
        }
    };

    // Calculate nights between checkin and checkout
    const calcNights = () => {
        if (!form.checkin || !form.checkout) return null;
        const diff = new Date(form.checkout) - new Date(form.checkin);
        const nights = Math.round(diff / (1000 * 60 * 60 * 24));
        return nights > 0 ? nights : null;
    };
    const nights = calcNights();
    const priceNum = parseInt(room.price.replace(/\D/g, ''));
    const total = nights ? `$${priceNum * nights}` : '—';

    return (
        <section className="noisy min-h-dvh w-full bg-black text-white px-5 md:px-16 2xl:px-32 py-10">

            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="border border-yellow-400 text-yellow-400 px-5 py-2 rounded-full text-sm
                           hover:bg-yellow-400 hover:text-black transition-colors duration-200 mb-10"
            >
                ← Back
            </button>

            {/* Page Title */}
            <h1 className="font-modern-negra text-5xl md:text-6xl text-yellow-400 text-center mb-14 tracking-wide">
                Room Reservation
            </h1>

            {/* ROW 1: Image left — Room details right */}
            <div className="flex flex-col md:flex-row gap-12 items-start mb-16">

                {/* LEFT: Image with gold frame + type badge + suite name below */}
                <div className="w-full md:w-1/2 shrink-0 flex flex-col items-center">
                    <div className="border-4 border-yellow-400 rounded-xl p-2 w-full">
                        <img
                            src={room.image}
                            alt={room.name}
                            className="w-full h-[920px] md:h-[940px] object-cover rounded-lg"
                        />
                    </div>
                    <span className="mt-5 inline-block text-xs tracking-widest uppercase
                                     text-yellow-400 border-2 border-yellow-400 bg-yellow-400/10
                                     px-6 py-2 rounded-full font-semibold">
                        {room.type}
                    </span>
                    <h2 className="font-modern-negra text-2xl md:text-3xl text-white text-center mt-3">
                        {room.name}
                    </h2>
                </div>

                {/* RIGHT: Room details */}
                <div className="w-full md:w-1/2 space-y-6 pt-2">
                    <h3 className="font-modern-negra text-3xl md:text-4xl text-white">
                        About This Room
                    </h3>
                    <p className="text-white leading-relaxed text-base">{room.detail}</p>
                    <p className="text-yellow-400 text-2xl font-semibold">
                        {room.price}
                        <span className="text-white/50 text-sm font-normal ml-1">/ night</span>
                    </p>
                    <ul className="space-y-3 pt-2">
                        {[
                            'Free high-speed Wi-Fi',
                            'Daily housekeeping',
                            'Breakfast included',
                            '24h concierge service',
                            'Late checkout on request',
                        ].map((a) => (
                            <li key={a} className="flex items-center gap-3 text-white text-sm">
                                <span className="text-yellow-400 text-base">✦</span>
                                {a}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* DIVIDER */}
            <div className="border-t border-yellow-400/30 mb-16" />

            {/* ROW 2: Booking Form + Confirmation Card side by side */}
            <div className="flex flex-col md:flex-row justify-center gap-8">

                {/* Booking Form */}
                <div className="w-full md:w-[480px] bg-white/5 border border-white/10 rounded-2xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <h2 className="font-modern-negra text-3xl md:text-4xl text-white text-center mb-8">
                            Reserve Your Stay
                        </h2>

                        {/* Full Name */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-white/60">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Your name"
                                required
                                disabled={submitted}
                                className="bg-white/5 border border-white/20 text-white rounded-lg px-4 py-3
                                           focus:outline-none focus:border-yellow-400 transition-colors duration-200
                                           placeholder:text-white/30 disabled:opacity-50"
                            />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-white/60">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="your@email.com"
                                required
                                disabled={submitted}
                                className="bg-white/5 border border-white/20 text-white rounded-lg px-4 py-3
                                           focus:outline-none focus:border-yellow-400 transition-colors duration-200
                                           placeholder:text-white/30 disabled:opacity-50"
                            />
                        </div>

                        {/* Check-in / Check-out */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm text-white/60">Check-in</label>
                                <input
                                    type="date"
                                    name="checkin"
                                    value={form.checkin}
                                    onChange={handleChange}
                                    required
                                    disabled={submitted}
                                    className="bg-white/5 border border-white/20 text-white rounded-lg px-4 py-3
                                               focus:outline-none focus:border-yellow-400 transition-colors duration-200
                                               [color-scheme:dark] disabled:opacity-50"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm text-white/60">Check-out</label>
                                <input
                                    type="date"
                                    name="checkout"
                                    value={form.checkout}
                                    onChange={handleChange}
                                    required
                                    disabled={submitted}
                                    className="bg-white/5 border border-white/20 text-white rounded-lg px-4 py-3
                                               focus:outline-none focus:border-yellow-400 transition-colors duration-200
                                               [color-scheme:dark] disabled:opacity-50"
                                />
                            </div>
                        </div>

                        {/* Guests */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-white/60">Guests</label>
                            <select
                                name="guests"
                                value={form.guests}
                                onChange={handleChange}
                                disabled={submitted}
                                className="bg-white/5 border border-white/20 text-white rounded-lg px-4 py-3
                                           focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400
                                           accent-yellow-400 transition-colors duration-200 disabled:opacity-50"
                            >
                                {[1, 2, 3, 4].map(n => (
                                    <option key={n} value={n} className="bg-black text-white">
                                        {n} guest{n > 1 ? 's' : ''}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={submitted}
                            className="w-full bg-yellow-400 text-black font-bold py-4 rounded-xl mt-4
                                       hover:bg-yellow-300 transition-colors duration-200 tracking-wide text-base
                                       disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            {submitted ? 'Reservation Confirmed ✦' : 'Confirm Reservation'}
                        </button>
                    </form>
                </div>

                {/* Confirmation Card — appears beside form after submit */}
                {submitted && (
                    <div className="w-full md:w-[480px] bg-white/5 border border-yellow-400/40 rounded-2xl p-8
                                    flex flex-col justify-between">

                        {/* Card Header */}
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <span className="text-yellow-400 text-2xl">✦</span>
                                <h2 className="font-modern-negra text-3xl text-yellow-400">
                                    Confirmation Details
                                </h2>
                            </div>

                            {/* Guest info */}
                            <div className="space-y-5">
                                <div className="flex flex-col gap-1 border-b border-white/10 pb-4">
                                    <span className="text-xs text-white/40 uppercase tracking-widest">Guest Name</span>
                                    <span className="text-white font-semibold text-base">{form.name}</span>
                                </div>

                                <div className="flex flex-col gap-1 border-b border-white/10 pb-4">
                                    <span className="text-xs text-white/40 uppercase tracking-widest">Email</span>
                                    <span className="text-white font-semibold text-base">{form.email}</span>
                                </div>

                                <div className="grid grid-cols-2 gap-4 border-b border-white/10 pb-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs text-white/40 uppercase tracking-widest">Check-in</span>
                                        <span className="text-white font-semibold text-base">{form.checkin}</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs text-white/40 uppercase tracking-widest">Check-out</span>
                                        <span className="text-white font-semibold text-base">{form.checkout}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1 border-b border-white/10 pb-4">
                                    <span className="text-xs text-white/40 uppercase tracking-widest">Total Guests</span>
                                    <span className="text-white font-semibold text-base">
                                        {form.guests} guest{form.guests > 1 ? 's' : ''}
                                    </span>
                                </div>

                                <div className="flex flex-col gap-1 border-b border-white/10 pb-4">
                                    <span className="text-xs text-white/40 uppercase tracking-widest">Room</span>
                                    <span className="text-white font-semibold text-base">{room.name}</span>
                                    <span className="text-white/40 text-xs">{room.type}</span>
                                </div>
                            </div>
                        </div>

                        {/* Price Summary */}
                        <div className="mt-8 bg-yellow-400/10 border border-yellow-400/30 rounded-xl p-5 space-y-2">
                            <div className="flex justify-between text-sm text-white/60">
                                <span>{room.price} × {nights ?? '—'} night{nights !== 1 ? 's' : ''}</span>
                                <span>{total}</span>
                            </div>
                            <div className="flex justify-between text-sm text-white/60">
                                <span>Taxes & fees</span>
                                <span>Included</span>
                            </div>
                            <div className="border-t border-yellow-400/30 pt-3 flex justify-between">
                                <span className="text-white font-bold text-base">Total</span>
                                <span className="text-yellow-400 font-bold text-xl">{total}</span>
                            </div>
                        </div>

                        {/* Back button */}
                        <button
                            onClick={() => navigate(-1)}
                            className="mt-6 w-full border border-yellow-400 text-yellow-400 py-3 rounded-xl
                                       hover:bg-yellow-400 hover:text-black transition-colors duration-200 font-semibold"
                        >
                            Back to Rooms
                        </button>
                    </div>
                )}
            </div>

        </section>
    );
};

export default Booking;