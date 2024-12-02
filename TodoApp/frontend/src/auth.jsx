import { useState } from "react";
import { authService } from './services/authService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

export default function Auth() {
  const [fullname, setFullName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginPage, setIsLoginPage] = useState(true);
  const navigate = useNavigate();
  const { login } = useAuth();

  function handleLogin(e) {
    e.preventDefault();
    authService.login({ username, password })
      .then((res) => {
        login(res.token);
        navigate('/');
      })
      .catch((err) => {
        console.log("Login Error:", err);
      });
  }

  function handleSignup(e) {
    e.preventDefault();
    const userDetail = { fullname, username, email, password };
    authService.register(userDetail)
      .then((res) => {
        login(res.token);
        navigate('/');
      })
      .catch((err) => {
        console.log("Sign Up Error:", err);
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={isLoginPage ? handleLogin : handleSignup}
        className="w-96 bg-gray-800 shadow-lg rounded-lg p-8"
      >
        <div className="relative w-full flex mb-6">
          <h1 className="text-2xl font-bold w-full text-center text-white">
            {isLoginPage ? "Login" : "Sign Up"}
          </h1>
          <div
            onClick={() => setIsLoginPage(!isLoginPage)}
            className="absolute top-0 right-0 bg-gray-700 text-white text-sm rounded-full px-4 py-2 cursor-pointer hover:bg-gray-600 transition-colors"
          >
            {isLoginPage ? "Sign Up" : "Login"}
          </div>
        </div>
        <div className="space-y-4">
          {!isLoginPage && (
            <input
              type="text"
              placeholder="Enter Full Name"
              value={fullname}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-3 bg-gray-700 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
            />
          )}
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full p-3 bg-gray-700 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
          />
          {!isLoginPage && (
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-gray-700 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
            />
          )}
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-gray-700 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
          />
        </div>
        <button
          type="submit"
          className="mt-6 w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-colors transform hover:-translate-y-0.5 active:translate-y-0"
        >
          {isLoginPage ? "Login" : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
