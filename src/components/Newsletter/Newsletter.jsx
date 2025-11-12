import React, { useState } from "react";
import Swal from "sweetalert2";

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const handleSubmit = () => {
        if (!email) {
            Swal.fire({
                icon: "warning",
                title: "Please enter your email",
                showConfirmButton: true,
                confirmButtonColor: "#16a34a"
            });
            return;
        }
        Swal.fire({
            icon: "success",
            title: "Subscribed Successfully!",
            text: "You’ll receive our latest updates soon.",
            showConfirmButton: true,
            confirmButtonColor: "#16a34a"
        });
        setEmail("");
    }
    return (
        <section className="py-10 lg:py-20">
            <div className="container text-center">
                <h2 className="text-4xl font-bold text-green-600 mb-3">Join Our <span className="text-gray-800">Newsletter</span></h2>
                <p className="text-gray-600 mb-10 max-w-2xl mx-auto">Stay updated with the latest agro news, market trends, and KrishiLink updates.
                    Be the first to know about new opportunities!</p>
                <div className="bg-white shadow-md rounded-2xl border border-gray-100 p-6 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
                    <input value={email} required onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your email address" className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:border-green-600 focus:ring-1 focus:ring-green-200 outline-none transition" />
                    <button onClick={handleSubmit} className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-all duration-300 cursor-pointer">Subscribe</button>
                </div>
                <div className="mt-10 flex justify-center items-center gap-3 text-sm text-gray-500">
                    <span className="w-10 h-px bg-gray-300"></span>We care about your privacy — unsubscribe anytime<span className="w-10 h-px bg-gray-300"></span>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
