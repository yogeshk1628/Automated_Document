const User = require("../models/UserModel");
const bcrypt = require("bcrypt");

// Signup User
const signupUser = async (req, res) => {
    try {
      const { fullName, email, phone, password, acceptTerms } = req.body;
  
      // Check if email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }
  
      // ✅ Hash password before saving
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create new user with hashed password
      const newUser = new User({
        fullName,
        email,
        phone,
        password: hashedPassword,
        acceptTerms,
      });
  
      await newUser.save();
  
      res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  

  

// Login User
const loginUser = async (req, res) => {
    try {
      // console.log("Received login request:", req.body);
  
      const email = req.body.email;
      const password = req.body.password;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      res.status(200).json({ message: "Login successful", user });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  


  

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update user by ID
const updateUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const updateFields = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


// Delete user by ID
const deleteUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { signupUser, loginUser, getAllUsers, getUserById, updateUserById, deleteUserById };
