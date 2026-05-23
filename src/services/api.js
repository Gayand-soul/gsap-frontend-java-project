
import axios from 'axios';
import AuthPage from '../components/AuthPage.jsx';

const BASE_URL = "http://localhost:8080/api";

// ─── Auth ────────────────────────────────────────────────────────────────────

// Single login for both admin and user — role comes back from JWT decode
export const loginUser = async (username, password) => {
    const params = new URLSearchParams({ username, password });
    const res = await axios.post(`${BASE_URL}/auth/login`, params);

    // Both token and role come straight from the response body
    const { token, role } = res.data;

// Save role separately so Navbar can read it
    localStorage.setItem("authToken", token);
    localStorage.setItem("userRole", role);

    return { token, role };
};

// ─── Rooms ───────────────────────────────────────────────────────────────────

// Returns { STANDARD: 3, DELUXE: 2, ... }
export const fetchRooms = async () => {
    const res = await axios.get(`${BASE_URL}/rooms`);
    return res.data;
};

// ─── Bookings ────────────────────────────────────────────────────────────────

// Returns all bookings (admin only — needs JWT)
export const fetchAllBookings = async (token) => {
    const res = await axios.get(`${BASE_URL}/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

// Create a booking (user)
export const createBooking = async (bookingData, token) => {
    const res = await axios.post(`${BASE_URL}/bookings`, bookingData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

// Delete a booking (admin only — needs JWT)
export const deleteBookingById = async (id, token) => {
    await axios.delete(`${BASE_URL}/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};