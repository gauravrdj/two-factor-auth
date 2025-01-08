import React from "react";
import { useNavigate } from "react-router-dom";

const TotpCard = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Enhance Your Account Security
        </h2>
        <p className="text-gray-600 mb-6">
          Enable Time-based One-Time Password (TOTP) to add an extra layer of
          security to your account.
        </p>
        <div className="flex gap-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition" onClick={()=>{
            navigate('/scan/qr')
          }}>
            Enable TOTP
          </button>
          <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition" onClick={()=>{
            navigate('/dashboard')
          }}>
            Skip for Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TotpCard;
