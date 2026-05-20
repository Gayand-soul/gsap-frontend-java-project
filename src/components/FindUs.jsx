
import React from 'react';

const FindUs = () => {
    return (
        <section
            id="findUS"
            className="w-full min-h-screen flex flex-col items-center justify-center px-6 md:px-16 py-16"
        >

            {/* TITLE */}
            <h2 className="text-4xl md:text-6xl mb-10 text-center">
                Find Us
            </h2>

            {/* IMAGE */}
            <div className="mb-10 p-2 rounded-full border-4 border-yellow-400">
                <img
                    src="/images/smallpics/frontpagepic10.jpg"
                    alt="hotel view"
                    className="w-155 h-155 md:w-198 md:h-198 object-cover rounded-full"
                />
            </div>

            {/* TEXT */}
            <div className="text-center space-y-8">

                <div>
                    <h3 className="uppercase text-lg mb-2">Address</h3>
                    <p>Golden Horizon Boutique Hotel</p>
                    <p>Seaside Avenue 12</p>
                    <p>Gothenburg, Sweden</p>
                </div>

                <div>
                    <h3 className="uppercase text-lg mb-2">Opening Hours</h3>
                    <p>Monday – Sunday</p>
                    <p>24/7 Reception</p>
                </div>

                <div>
                    <h3 className="uppercase text-lg mb-2">Contact</h3>
                    <p>Phone: +46 31 123 456</p>
                    <p>Email: info@goldenhorizon.com</p>
                </div>

            </div>

        </section>
    );
};

export default FindUs;