
import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const [user,setUser]= useState({
        username: '',
        email: '',
        number: '',
        password: ''
    })
    const navigate = useNavigate();
    const onSubmitHandler=async (e)=>{
    e.preventDefault();
    console.log("User data submitted:", user);
    const response = await fetch("https://task-management-app-1-aw93.onrender.com/authApi/register", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",

    },
    body: JSON.stringify(user),

    })
    if(response.ok){
        console.log("Registration successful");
        alert("Registration successful");
        setUser({
            username: '',
            email: '',
            number: '',
            password: ''
        });
navigate("/login");
    }

}
    const onChangeHandler=(e)=>{
        const { name, value } = e.target;
      setUser((prev)=>({...prev, [name]:value}))
      
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>
        <form className="space-y-4">
          <input
          name='username'
            type="text"
            value={user.username}
            onChange={onChangeHandler}
            placeholder="Username"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
          value={user.email}
          onChange={onChangeHandler}
          name='email'
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            value={user.number}
            onChange={onChangeHandler}
          name='number'
            type="text"
            placeholder="Phone Number"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            value={user.password}
            onChange={onChangeHandler}
            name='password'
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
          onClick={onSubmitHandler}
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
