import React from "react";
import { UploadCloud, ScanSearch, PhoneCall } from "lucide-react";

const HowItWorks = () => {
  return (
    <section className="px-6 md:px-12 py-16 bg-white text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-12">How It Works</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-blue-50 p-6 rounded-2xl shadow hover:shadow-md transition">
          <UploadCloud className="mx-auto mb-4 text-blue-600" size={40} />
          <h3 className="font-semibold text-xl mb-2">1. Upload X-ray</h3>
          <p className="text-gray-600">
            Take or upload a chest X-ray image securely through our platform.
          </p>
        </div>

        <div className="bg-blue-50 p-6 rounded-2xl shadow hover:shadow-md transition">
          <ScanSearch className="mx-auto mb-4 text-blue-600" size={40} />
          <h3 className="font-semibold text-xl mb-2">2. Get Diagnosis</h3>
          <p className="text-gray-600">
            Receive a quick diagnostic report that you can review or share with a doctor.
          </p>
        </div>

        <div className="bg-blue-50 p-6 rounded-2xl shadow hover:shadow-md transition">
          <PhoneCall className="mx-auto mb-4 text-blue-600" size={40} />
          <h3 className="font-semibold text-xl mb-2">3. Consult a Doctor</h3>
          <p className="text-gray-600">
            If needed, get connected with a medical professional for further consultation.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
