const mongoose = require('mongoose');
 const bcrypt = require('bcryptjs');
 const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },  
    number: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    role: {
    type: String,
    enum: ['student', 'teacher', 'admin'],
    default: 'student'
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
})
userSchema.pre('save', async function(next) {
    const user = this;
    if (!user.isModified('password')) {
       next()
       
    }
    try {
         const salt = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, salt);
        user.password = hash_password;
    } catch (error) {
        console.error("Error hashing password:", error);
        next(error);
        
    }
    next();
});
userSchema.methods.generateAuthToken = async function() {
    try {
        return jwt.sign({ 
            user: this._id,
            email: this.email,
            role: this.role,
             isAdmin: this.isAdmin 
            },
             process.env.JWT_SECRET, {
            expiresIn: '30d' 
        });
    } catch (error) {
        console.error("Error generating auth token:", error);
        throw new Error("Failed to generate auth token");
        
    }
}

const User = mongoose.model("User", userSchema);
module.exports = User;

