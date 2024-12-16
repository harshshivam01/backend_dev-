import React, { useState,useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { authService } from '../services/authuser';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isadmin, setIsadmin] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const user = authService.getUser();
    if(user && user.role === "admin"){
      setIsadmin(true);
    }
  }, []);

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
         {isadmin ? (
           <Link to="/dashboard" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
           FoodBro
         </Link>
          
         ):(
          <Link to="/home" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
          FoodBro
          </Link>
         )}
       

        <div className="hidden md:flex space-x-6 items-center">

          <Link to="/about" className="text-gray-700 hover:text-purple-600">About</Link>
          <Link to="/contact" className="text-gray-700 hover:text-purple-600">Contact</Link>
          
          
          {authService.isAdmin() && (
            <>
              <Link to="/dashboard/additem" className="text-gray-700 hover:text-purple-600">Add Item</Link>
              <Link to="/dashboard/allitems" className="text-gray-700 hover:text-purple-600">Show Item</Link>
            </>
          )}
          
          <div className="flex space-x-4">
            {!authService.isLoggedIn() ? (
              <>
                <Link to="/login" className="px-4 py-2 text-purple-600 border border-purple-300 rounded-lg hover:bg-purple-50">
                  Log In
                </Link>
                <Link to="/signup" className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90">
                  Sign Up
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-purple-600 border border-purple-300 rounded-lg hover:bg-purple-50"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;