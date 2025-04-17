import React from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen text-gray-800">
      {/* Hero Section */}
      <section className="text-center py-16 px-6">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-4"
        >
          About PneumoScan
        </motion.h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We are committed to transforming pneumonia diagnosis through advanced digital healthcare solutions — fast, reliable, and secure.
        </p>
      </section>

      {/* Mission & Values */}
      <section className="grid md:grid-cols-2 gap-10 px-10 py-16 items-center bg-white">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-blue-600">Our Mission</h2>
          <p className="text-gray-700 text-base leading-relaxed">
            At PneumoScan, our mission is to make pneumonia diagnosis more accessible and efficient for both patients and healthcare professionals. We believe in leveraging technology to reduce diagnostic delays and improve treatment outcomes.
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-blue-600">Our Values</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Empowering patients and doctors with intelligent tools</li>
            <li>Ensuring data security and privacy</li>
            <li>Providing quick and accurate diagnosis support</li>
            <li>Building a trustworthy and easy-to-use platform</li>
          </ul>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-10 bg-blue-50 text-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">Meet the Team</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          PneumoScan is developed by a team of passionate developers, medical experts, and AI researchers dedicated to advancing healthcare technology in Pakistan and beyond.
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          {/* Add team members if needed */}
          <div className="bg-white shadow-md rounded-xl p-6 w-64">
            <h4 className="text-lg font-semibold">Dr. X</h4>
            <p className="text-gray-600 text-sm">Doctor</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-16 bg-white">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Ready to experience faster and smarter diagnostics?
        </h3>
        <button className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium">
          Get Started
        </button>
      </section>

      <footer className="bg-white text-center py-6 text-sm text-gray-500 border-t">
        © 2025 PneumoScan. All rights reserved.
      </footer>
    </div>
  );
};

export default AboutUs;
