import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleAuthClick = () => {
    if (isLoggedIn) {
      logout();
      navigate('/');
    } else {
      navigate('/auth');
    }
  };

  return (
    <nav className="bg-blue-600 text-white fixed w-full shadow-md z-50">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <div className="text-xl font-bold">MyToDo</div>
        <ul
          className={`md:flex md:items-center gap-6 absolute md:static left-0 top-16 md:top-0 w-full md:w-auto bg-blue-600 md:bg-transparent transition-all duration-300 ${
            isOpen ? 'block' : 'hidden'
          }`}
        >
          <li className="text-lg">
            <a href="/" className="hover:text-yellow-300">
              Home
            </a>
          </li>
          <li className="text-lg">
            <a href="#tasks" className="hover:text-yellow-300">
              Tasks
            </a>
          </li>
          <li className="text-lg">
            <a href="#about" className="hover:text-yellow-300">
              About
            </a>
          </li>
          <li className="text-lg">
            <button onClick={handleAuthClick} className="hover:text-yellow-300">
              {isLoggedIn ? 'Logout' : 'Login'}
            </button>
          </li>
        </ul>
        <div className="text-2xl md:hidden cursor-pointer" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
