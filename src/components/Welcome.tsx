

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 px-4">
      <h1 className="text-4xl font-bold mb-4 text-blue-900">Welcome to MediCare Companion</h1>
      <p className="text-center max-w-xl text-gray-700 mb-10">
        Your trusted partner in medication management. Choose your role to get started with personalized features.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col justify-between hover:scale-105 transition-transform duration-300">
          <div>
            <h2 className="text-2xl font-semibold text-blue-800 mb-2">I'm a Patient</h2>
            <ul className="list-disc list-inside text-gray-600 mb-6">
              <li>Mark medications as taken</li>
              <li>Upload proof photos (optional)</li>
              <li>View your medication calendar</li>
              <li>Large, easy-to-use interface</li>
            </ul>
          </div>
          <button onClick={() => navigate('/login')} className="bg-blue-600 text-white py-2 px-4 rounded-lg mt-auto hover:bg-blue-700">Continue as Patient</button>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col justify-between hover:scale-105 transition-transform duration-300">
          <div>
            <h2 className="text-2xl font-semibold text-green-800 mb-2">I'm a Caretaker</h2>
            <ul className="list-disc list-inside text-gray-600 mb-6">
              <li>Monitor medication compliance</li>
              <li>Set up notification preferences</li>
              <li>View detailed reports</li>
              <li>Receive email alerts</li>
            </ul>
          </div>
          <button onClick={() => navigate('/login')} className="bg-green-600 text-white py-2 px-4 rounded-lg mt-auto hover:bg-green-700">Continue as Caretaker</button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
