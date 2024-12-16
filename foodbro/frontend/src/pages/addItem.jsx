import  { useState } from "react";
import { menuService } from "../services/authproduct";
import { authService } from "../services/authuser";

const AddProductPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    isveg: true,
    image: "",
    details: "",
    discountPercentage: 0,
    availableQty: "",
});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const userId = authService.getUserId();
        console.log('Current userId before adding item:', userId);
        
        if (!userId) {
            throw new Error('Please login again to add items');
        }
        
        const response = await menuService.addMenuItem(formData);
        console.log('Item added successfully:', response);
        // Reset form
        setFormData({
            name: "",
            price: "",
            description: "",
            category: "",
            isveg: true,
            image: "",
            details: "",
            discountPercentage: 0,
            availableQty: "",
        });
    } catch (error) {
        console.error('Failed to add item:', error);
        alert(error.message || 'Failed to add item');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 via-yellow-300 to-orange-500 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-2xl opacity-95">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Add New Product
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter product price"
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Enter product category"
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>

          {/* Vegetarian Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="isveg"
              checked={formData.isveg}
              onChange={handleChange}
              className="h-5 w-5 text-green-500"
            />
            <label className="ml-2 text-sm text-gray-700">
              Vegetarian Product
            </label>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image URL
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Enter image URL (optional)"
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          {/* Details */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Details
            </label>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              placeholder="Enter additional details (optional)"
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          {/* Discount Percentage */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Discount Percentage
            </label>
            <input
              type="number"
              name="discountPercentage"
              value={formData.discountPercentage}
              onChange={handleChange}
              placeholder="Enter discount percentage (optional)"
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          {/* Available Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Available Quantity
            </label>
            <input
              type="number"
              name="availableQty"
              value={formData.availableQty}
              onChange={handleChange}
              placeholder="Enter available quantity"
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 rounded-lg shadow-md hover:opacity-90"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
