const routes = require("express").Router();
const {
  signupUser,
  loginUser,
  getAllUsers,
  getUserById,
  deleteUserById,
} = require("../controllers/UserController");

// Route for user signup
routes.post("/signup", signupUser);

// Route for user login
routes.post("/login", loginUser);

// Route to get all users
routes.get("/users", getAllUsers);

// Route to get a specific user by ID
routes.get("/users/:id", getUserById);

// Route to delete a user by ID
routes.delete("/users/:id", deleteUserById);

module.exports = routes;
