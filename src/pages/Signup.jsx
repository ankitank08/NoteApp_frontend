import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      if (!email || !name) return setMessage("Name and Email are required");
      const res = await API.post("/auth/send-otp", { email });
      setMessage(res.data.message);
      setStep(2);
    } catch (err) {
      setMessage(err.response?.data?.error || "Error sending OTP");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      if (!otp || !name) return setMessage("All fields are required");
      const res = await API.post("/auth/verify-otp", { email, otp, name });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setMessage("OTP verified! Redirecting...");
      console.log("Verified user:", res.data.user);
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      setMessage(err.response?.data?.error || "Invalid OTP");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Signup</h2>
      {step === 1 && (
        <>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded mb-3"
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded mb-3"
          />
          <button onClick={handleSendOtp} className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Send OTP
          </button>
        </>
      )}
      {step === 2 && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-2 border rounded mb-3"
          />
          <button onClick={handleVerifyOtp} className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
            Verify OTP
          </button>
        </>
      )}
      {message && <p className="text-sm text-red-500 mt-3">{message}</p>}
      <p className="mt-4 text-sm">
        Already have an account? <a href="/login" className="text-blue-600 underline">Login</a>
      </p>
    </div>
  );
}
