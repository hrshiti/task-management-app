
import React, { useState } from 'react';
// import '../styles/Login.css'; 
import { Link, useNavigate } from 'react-router-dom';
import { loginSuccess } from '../redux/authSlice';
import { useDispatch } from 'react-redux';


const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
const dispatch = useDispatch();
 const navigate = useNavigate();
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login Data:', formData);
    
     const response = await fetch("https://task-management-app-1-aw93.onrender.com/authApi/login", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",

    },
    body: JSON.stringify(formData),
    
  })
const data = await response.json();
    if(response.ok){
     
      
        console.log("login successful");
        alert("login successful");
        setFormData({
            email: '',
            password: ''
        });
        dispatch(loginSuccess({
      token: data.token,
      role: data.user.role,
      user: data.user
    }));
 if (data.user.role === "admin") {
    navigate("/admin-dashboard");
  } else if (data.user.role === "teacher") {
    navigate("/teacher-dashboard");
  } else {
    navigate("/student-dashboard");
  }
}
    else{
        console.error("Login failed");
        alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login to Your Account
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-4">
          Don’t have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
