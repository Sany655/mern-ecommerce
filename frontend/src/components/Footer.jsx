import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-100 py-8">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                {/* Logo and Motto */}
                <div>
                    {/* <img src="/path/to/logo.png" alt="Sunnah Corner" className="mx-auto md:mx-0 mb-4" /> */}
                    <Link className="text-xl font-bold text-orange-500" to={'/'}>Sunnah Corner</Link>
                    <p className="text-sm text-gray-700">
                        Online Based Premium Islamic Lifestyle Shop. <br />
                        Our motto is “Ad dawah bit-teezarah”. Dawah by business.
                    </p>
                </div>

                {/* Payment Methods and Contact Information */}
                <div className="md:text-center">
                    <div className="mb-4">
                        <h5 className="text-lg font-semibold text-gray-800 mb-2">We Accept</h5>
                        <div className="flex justify-center space-x-2">
                            <img src="/images/bkash.jpg" alt="bkash" className="h-8" />
                        </div>
                    </div>

                </div>

                {/* Download App */}
                <div className="md:text-right text-sm text-gray-700">
                    <h5 className="text-lg font-semibold text-gray-800 mb-2">Contact Us</h5>
                    <p>📞 (+88) 01646-790153</p>
                    <p>✉️ contact@sunnahcorner.com</p>
                </div>
            </div>
            <div className="container mx-auto text-center mt-8 border-t pt-4">
                <div className="flex justify-center space-x-4 mb-4">
                    <a href="https://facebook.com" className="text-gray-600 hover:text-gray-800">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="https://instagram.com" className="text-gray-600 hover:text-gray-800">
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a href="https://linkedin.com" className="text-gray-600 hover:text-gray-800">
                        <i className="fab fa-linkedin-in"></i>
                    </a>
                </div>
                <p className="text-sm text-gray-700">
                    Best Islamic Lifestyle Brand in Bangladesh | sunnahcorner.com | Designed by: Theme Freesia | © 2024 WordPress
                </p>
            </div>
        </footer>
    );
};

export default Footer;
