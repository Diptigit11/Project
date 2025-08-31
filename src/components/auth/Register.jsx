import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: fname,
          lastName: lname,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      // ✅ Store token to log in immediately
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // ✅ Optionally store user info if needed
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect to interview page (or wherever)
      navigate("/");
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen font-sans">
      <form
        onSubmit={handleRegister}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border-t-4 border-yellow-400"
      >
        <h3 className="text-2xl font-bold text-center mb-6 text-[#012A4A]">
          Create an Account
        </h3>

        {error && (
          <p className="text-red-500 text-center mb-4 font-medium">{error}</p>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">First name</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="First name"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Last name</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Last name"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email address</label>
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#012A4A] py-2 rounded-lg font-bold uppercase tracking-wide hover:from-yellow-300 hover:to-yellow-400 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Sign Up
        </button>

        <p className="mt-4 text-center text-gray-600">
          Already registered?{" "}
          <a
            href="/login"
            className="text-yellow-500 hover:underline font-medium"
          >
            Login
          </a>
        </p>
      </form>
    </div>
  );
}

export default Register;
