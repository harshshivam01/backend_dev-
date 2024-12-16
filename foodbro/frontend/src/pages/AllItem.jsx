import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Ensure Link is imported
import { menuService } from "../services/authproduct";
import { authService } from "../services/authuser";

const AllProductsPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = authService.getUser();
    if (user && user.role === "admin") {
      setIsAdmin(true);
    }
    loadMenuItems();
  }, []);

  const loadMenuItems = async () => {
    const userId = authService.getUserId();
    console.log("Current userId:", userId);
    console.log("Current user data:", authService.getUser());

    if (!userId) {
      setError("Please login again to view items");
      setLoading(false);
      return;
    }

    try {
      console.log("Making API request with userId:", userId);
      const response = await menuService.getMenuItems(userId);
      console.log("API Response:", response);

      if (!response || !response.food) {
        throw new Error("Invalid response format");
      }

      setMenuItems(response.food || []);
    } catch (err) {
      console.error("Error loading menu items:", err);
      setError(err.message || "Failed to load menu items");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Menu</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={item.image || "https://via.placeholder.com/300x200"}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    item.isveg
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {item.isveg ? "Veg" : "Non-Veg"}
                </span>
              </div>
              <p className="text-gray-600 mb-2">{item.description}</p>
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-bold">₹{item.price}</span>
                {item.discountPercentage > 0 && (
                  <span className="text-green-600">
                    {item.discountPercentage}% OFF
                  </span>
                )}
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-1">★</span>
                  <span>{item.rating}</span>
                </div>
                {isAdmin ? (
                  <div className="flex gap-2">
                    <Link
                      to={`/edit/${item._id}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                    >
                      Edit
                    </Link>
                    <Link
                      to={`/delete/${item._id}`}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-300"
                    >
                      Delete
                    </Link>
                  </div>
                ) : (
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProductsPage;
