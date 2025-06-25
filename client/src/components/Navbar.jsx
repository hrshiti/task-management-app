import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); 
    navigate("/login"); 
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-xl font-bold text-blue-600">TaskManager</Link>

          <div className="hidden md:flex gap-6 items-center">
            <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
            {!token ? (
              <>
                <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
                <Link
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
              >
                Logout
              </button>
            )}
          </div>

          
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

   
      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4">
          <Link to="/" className="block py-2 text-gray-700 hover:text-blue-600">Home</Link>
          {!token ? (
            <>
              <Link to="/login" className="block py-2 text-gray-700 hover:text-blue-600">Login</Link>
              <Link
                to="/register"
                className="block py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-center"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="block w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded text-center"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
