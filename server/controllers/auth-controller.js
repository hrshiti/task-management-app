const User = require("../models/auth-model");
const bcrypt = require('bcryptjs');

const register = async (req, res, next) => {
    try {
        const { username, email, number, password, role } = req.body
        if (!username || !email || !number || !password) {
            console.error("Missing required fields");
            return res.status(400).json({ message: "All fields are required" });
        }
       
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            console.error("User already exists");
            return res.status(400).json({ message: "User already exists" });
        }
        
        const newUser = await User.create({
            username,
            email,
            number,
            password,
            role: role || 'student',
        })
        const token = await newUser.generateAuthToken();
        console.log("User registered successfully:", newUser);
        res.status(201).json({ message: "User registered successfully", token, user: newUser });
    } catch (error) {
        next(error);

    }

}


const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            console.error("Missing required fields");
            return res.status(400).json({ message: "All fields are required" });
        }

        const userexist = await User.findOne({ email });
        if (!userexist) {
            console.error("User does not exist");
            return res.status(400).json({ message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, userexist.password);
        if (!isMatch) {
            console.error("Invalid credentials");
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = await userexist.generateAuthToken(); 
        console.log("User logged in successfully:", userexist);

        res.status(200).json({
            message: "User logged in successfully",
    
            user: {
                _id: userexist._id,
                email: userexist.email,
                username: userexist.username,
                number: userexist.number,
                isAdmin: userexist.isAdmin,
                 role: userexist.role, 
            },
            token,
        });
    } catch (error) {
        next(error); 
        console.error("Error during login:", error.message);
    }
};


const getUserData = async (req, res) => {
    try {
        const userData = await User.find({}, "-password"); 
        if (!userData || userData.length === 0) {
            console.error("No user data found");
            return res.status(404).json({ message: "No user data found" });
        }
        console.log("User data fetched successfully:", userData);
        res.status(200).json(userData);
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User updated", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
    register,
    login,
    getUserData,
    deleteUser,
    updateUser

}