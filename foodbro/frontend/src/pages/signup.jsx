import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, User, Lock, Phone, MapPin, UserCheck, UserPlus, ShoppingBag, Tag, Camera } from "lucide-react";
import { authService } from "../services/authuser";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0); // 0: Role Selection, 1: Basic Details, 2: Additional Details
  const [selectedRole, setSelectedRole] = useState("");
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    role: "",
    image: null,
    cuisines: [],
    discountPercentage: "",
    restaurantName: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    setFormData((prev) => ({
      ...prev,
      role: role,
    }));
    setStep(1);
  };

  const handleNext = () => {
    const requiredFields = selectedRole === 'admin' 
      ? ['fullname', 'username', 'email', 'password', 'restaurantName']
      : ['fullname', 'username', 'email', 'password'];

    const allFieldsFilled = requiredFields.every(field => formData[field]);

    if (allFieldsFilled) {
      setStep(2);
    } else {
      alert("Please fill all required fields!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const submitData = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null && formData[key] !== undefined) {
        if (key === 'cuisines') {
          submitData.append(key, JSON.stringify(formData[key]));
        } else {
          submitData.append(key, formData[key]);
        }
      }
    });

    authService.register(submitData)
      .then((res) => {
        console.log("Registration Successful:", res);
        navigate("/login", { replace: true });
      })
      .catch((err) => {
        console.error("Registration Error:", err);
        alert("Registration failed. Please try again.");
      });
  };

  const handleCuisineChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      cuisines: checked 
        ? [...(prev.cuisines || []), value]
        : (prev.cuisines || []).filter(cuisine => cuisine !== value)
    }));
  };

  const cuisineOptions = [
    'Italian', 'Chinese', 'Indian', 'Mexican', 'Japanese', 
    'French', 'Thai', 'Greek', 'Mediterranean', 'American'
  ];

  return (
    <div className="min-h-[calc(100vh)] bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100">
      <div className="container mx-auto px-4 py-8 flex justify-center items-center">
        <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-2xl border border-gray-100">
          {step === 0 && (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-6">
                Choose Your Account Type
              </h2>
              <div className="flex justify-center space-x-4">
                <button 
                  onClick={() => handleRoleSelection('customer')}
                  className="flex flex-col items-center p-4 border-2 border-purple-200 rounded-lg hover:border-purple-500 transition"
                >
                  <User className="h-12 w-12 text-purple-500 mb-2" />
                  <span className="font-semibold">Customer</span>
                  <span className="text-sm text-gray-500">Basic account for ordering</span>
                </button>
                <button 
                  onClick={() => handleRoleSelection('admin')}
                  className="flex flex-col items-center p-4 border-2 border-purple-200 rounded-lg hover:border-purple-500 transition"
                >
                  <ShoppingBag className="h-12 w-12 text-purple-500 mb-2" />
                  <span className="font-semibold">Restaurant Admin</span>
                  <span className="text-sm text-gray-500">Manage your restaurant</span>
                </button>
              </div>
            </div>
          )}

          {step === 1 && (
            <form className="space-y-4">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                  {selectedRole === 'admin' ? 'Restaurant Admin Details' : 'Create Your Account'}
                </h2>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full pl-3 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:outline-none"
                  required
                />
              </div>

              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  className="w-full pl-3 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:outline-none"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className="w-full pl-3 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:outline-none"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  className="w-full pl-3 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:outline-none"
                  required
                />
              </div>

              {/* Restaurant Name (for admin) */}
              {selectedRole === 'admin' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Restaurant Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="restaurantName"
                    value={formData.restaurantName}
                    onChange={handleChange}
                    placeholder="Enter your restaurant name"
                    className="w-full pl-3 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:outline-none"
                    required
                  />
                </div>
              )}

              <button
                type="button"
                onClick={handleNext}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg hover:opacity-90 transition duration-300"
              >
                Next
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                  {selectedRole === 'admin' ? 'Restaurant Details' : 'Additional Information'}
                </h2>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1234567890"
                  className="w-full pl-3 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:outline-none"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Your address"
                  className="w-full pl-3 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:outline-none"
                />
              </div>

              {/* Admin Specific Fields */}
              {selectedRole === 'admin' && (
                <>
                  {/* Restaurant Image */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Restaurant Image
                    </label>
                    <input
                      type="file"
                      name="image"
                      onChange={handleChange}
                      accept="image/*"
                      className="w-full pl-3 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:outline-none"
                    />
                  </div>

                  {/* Cuisines */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cuisines Offered
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {cuisineOptions.map((cuisine) => (
                        <label key={cuisine} className="inline-flex items-center">
                          <input
                            type="checkbox"
                            name="cuisines"
                            value={cuisine}
                            checked={(formData.cuisines || []).includes(cuisine)}
                            onChange={handleCuisineChange}
                            className="form-checkbox h-4 w-4 text-purple-600"
                          />
                          <span className="ml-2 text-sm">{cuisine}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Discount */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Discount Percentage
                    </label>
                    <input
                      type="number"
                      name="discountPercentage"
                      value={formData.discountPercentage}
                      onChange={handleChange}
                      min="0"
                      max="100"
                      placeholder="Enter discount percentage"
                      className="w-full pl-3 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:outline-none"
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg hover:opacity-90 transition duration-300"
              >
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
