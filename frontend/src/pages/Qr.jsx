import React, { useEffect, useState } from "react";
import qrcode from "qrcode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {toast} from 'sonner'

const QrCodeComponent = () => {
    const navigate = useNavigate();
  const [url, setUrl] = useState("");

  useEffect(() => {
    console.log(localStorage.getItem("token"));
    axios
      .get("https://two-factor-auth-ed42.onrender.com/api/enable/totp", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        const otpUrl = res.data.detail.otpauth_url;
        qrcode.toDataURL(otpUrl, (err, data_url) => {
          if (!err) {
            setUrl(data_url);
          } else {
            // console.error("Error generating QR Code:", err);
            toast.error('Error generating QR Code')
          }
        });
      })
      .catch((e) => {
        // console.error("Error fetching OTP URL:", e);
        // alert("Something went wrong");
        toast.error('Something went wrong');
      });
  }, []);

  const handleProceed = () => {
    // alert("Proceed button clicked! Add your logic here.");
    navigate('/verify/totp')
    // Add navigation logic or further actions here.
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-lg rounded-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Scan the QR Code
        </h2>
        {url ? (
          <img
            src={url}
            alt="QR Code"
            className="mb-4 w-48 h-48 object-cover mx-auto"
          />
        ) : (
          <div className="flex items-center justify-center mb-4">
            <p className="text-gray-500">Loading QR Code...</p>
          </div>
        )}
        <p className="text-gray-600 text-center mb-6">
          Use an authenticator app like Google Authenticator or Authy to scan
          the QR code and retrieve your TOTP.
        </p>
        <button
          onClick={handleProceed}
          className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default QrCodeComponent;
