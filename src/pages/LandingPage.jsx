import React from "react";
import { motion } from "framer-motion";
import { Stethoscope, UserPlus, ShieldCheck } from "lucide-react";
import illustration from "../assets/illustration.png";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white text-gray-800">
      <main className="grid grid-cols-1 md:grid-cols-2 gap-8 p-10 items-center">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h2 className="text-4xl font-extrabold leading-tight">
            Pneumonia Diagnostic Platform
          </h2>
          <p className="text-lg text-gray-600">
            Fast, reliable, and secure diagnosis platform
          </p>
          <div className="space-x-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium">
              <Link to="/sign-up">
                Get Started
              </Link>
            </button>
            <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 font-medium">
              <Link to="/about-us">
                Learn More
              </Link>
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="hidden md:flex justify-center items-center"
        >
          <img
            src={illustration}
            alt="Chest X-ray Illustration"
            className="max-w-xs md:max-w-sm w-full h-auto object-contain"
          />
        </motion.div>
      </main>

      <section className="p-12 bg-blue-50 grid md:grid-cols-3 gap-8 text-center">
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
          <Stethoscope className="mx-auto mb-4 text-blue-600" size={40} />
          <h3 className="font-semibold text-xl mb-2">Quick Diagnosis</h3>
          <p className="text-gray-600 text-base">
            Fast and accurate results to assist healthcare professionals.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
          <UserPlus className="mx-auto mb-4 text-blue-600" size={40} />
          <h3 className="font-semibold text-xl mb-2">Easy Registration</h3>
          <p className="text-gray-600 text-base">
            Seamless registration for patients and doctors to start using the
            platform.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
          <ShieldCheck className="mx-auto mb-4 text-blue-600" size={40} />
          <h3 className="font-semibold text-xl mb-2">Secure Platform</h3>
          <p className="text-gray-600 text-base">
            Your medical information is stored safely and privately.
          </p>
        </div>
      </section>

      <footer className="bg-white text-center py-6 text-sm text-gray-500 border-t">
        © 2025 PneumoScan. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
