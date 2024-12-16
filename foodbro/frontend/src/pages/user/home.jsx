import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { authService } from "../../services/authuser";

const Home = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        authService.getAllRestaurants()
            .then((res) => {
                setRestaurants(res.restaurants || res.data || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching restaurants:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-center my-8">Welcome to FoodHub</h1>
            {loading ? (
                <p className="text-center text-lg text-gray-500">Loading restaurants...</p>
            ) : restaurants.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {restaurants.map((restaurant) => (
                        <Link
                            to={`/restaurant/${restaurant.id || restaurant._id}`}
                            key={restaurant.id || restaurant._id}
                            className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6"
                        >
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800">{restaurant.fullname}</h2>
                                <p className="text-gray-600">{restaurant.address}</p>
                                <p className="text-gray-500 text-sm">{restaurant.cuisine || "Cuisine not specified"}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <p className="text-center text-lg text-gray-500">No restaurants found</p>
            )}
        </div>
    );
};

export default Home;
