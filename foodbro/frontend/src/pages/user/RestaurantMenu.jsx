import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { menuService } from "../../services/authproduct";

const RestaurantMenu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { restaurantId } = useParams();

    useEffect(() => {
        loadMenuItems();
    }, [restaurantId]);

    const loadMenuItems = async () => {
        try {
            const response = await menuService.getMenuItems(restaurantId);
            if (!response || !response.food) {
                throw new Error('Invalid response format');
            }
            setMenuItems(response.food);
            setLoading(false);
        } catch (error) {
            console.error("Error loading menu items:", error);
            setError(error.message || "Failed to load menu items");
            setLoading(false);
        }
    };

    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Restaurant Menu</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuItems.map((item) => (
                    <div
                        key={item._id}
                        className="bg-white rounded-lg shadow-md overflow-hidden"
                    >
                        <img
                            src={item.image || "https://via.placeholder.com/300x200"}
                            alt={item.name}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="text-xl font-semibold">{item.name}</h2>
                                <span className={`px-2 py-1 rounded-full text-sm ${
                                    item.isveg ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                    {item.isveg ? 'Veg' : 'Non-Veg'}
                                </span>
                            </div>
                            <p className="text-gray-600 mb-2">{item.description}</p>
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-bold">₹{item.price}</span>
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RestaurantMenu;