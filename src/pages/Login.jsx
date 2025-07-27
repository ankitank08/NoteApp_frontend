import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/google-login`,
          {
            tokenId: tokenResponse.access_token,
            name: name,
          }
        );

        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      } catch (err) {
        setMessage("Google login failed");
      }
    },
    onError: () => {
      setMessage("Google Login Failed");
    },
  });

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>

      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      <button
        onClick={() => login()}
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Login with Google
      </button>

      {message && <p className="mt-3 text-red-500 text-sm">{message}</p>}

      <p className="mt-4 text-sm text-center">
        Or{" "}
        <a href="/" className="text-blue-600 underline">
          Signup Using OTP
        </a>
      </p>
    </div>
  );
}
