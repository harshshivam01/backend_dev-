import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { authService } from "../services/authuser";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
    authService
      .login(formData)
      .then((res) => {
        if (res.user.role === "admin") {
          navigate("/dashboard", { replace: true });
        } else if (res.user.role === "superadmin") {
          navigate("/superadmin", { replace: true });
        } else {
          navigate("/home");
        }
       
        console.log("Login Successful:", res);
      })
      .catch((err) => {
        console.log("Login Error:", err);
      });

    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Illustration Side */}
          <div className="hidden md:block">
            <img
              src="/api/placeholder/500/400"
              alt="Login Illustration"
              className="w-full rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Login Form */}
          <div className="bg-white p-8 rounded-xl shadow-2xl border border-gray-100">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                Welcome Back
              </h2>
              <p className="text-gray-500 mt-2">
                Login to continue your culinary adventure
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
                    required
                  />
                </div>
                <div className="text-right mt-2">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg hover:opacity-90 transition duration-300 flex items-center justify-center space-x-2"
              >
                <span>Log In</span>
              </button>
            </form>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
