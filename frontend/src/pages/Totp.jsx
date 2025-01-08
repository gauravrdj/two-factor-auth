import React, { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import {toast} from 'sonner'
const OtpInputPage = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
const navigate = useNavigate();
  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/^\d$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      // Focus next input if value is entered
      if (value && index < otp.length - 1) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const totp = Number(otp.join(""));
    try{
    const res = await axios.post('http://localhost:3000/api/verify/totp', {
        token : totp
    },
  {
    headers:{
      Authorization : localStorage.getItem('token')
    }
  })
  // alert(`${res.data.msg}`)
  toast.success(`${res.data.msg}`);
  if(res.status===200){
    navigate('/dashboard')
  }
}
catch(e){
  // alert("Not verified")
  toast.info("Entered otp is not correct 🤦‍♂️");
}
    // alert(`OTP entered: ${otp.join("")}`);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center mb-4">Enter OTP</h2>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="flex space-x-2 mb-4">
            {otp.map((value, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                value={value}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                maxLength={1}
                className="w-12 h-12 text-center text-xl border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            ))}
          </div>
          <button
          type="submit"
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
          <button
            type="button"
            // onClick={handleLostAccess}
              onClick={async ()=>{
                const res = await axios.get('http://localhost:3000/forget', {
                  headers:{
                    Authorization: localStorage.getItem('token')
                  }
                });
                 toast.info(`${res.data.msg}`);
                localStorage.clear();
                navigate('/')
              }}
            className="mt-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Lost Access to TOTP?
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpInputPage;
