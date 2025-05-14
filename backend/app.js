const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

const userRoutes = require("./src/routes/UserRoute");
app.use(userRoutes);


mongoose.connect("mongodb://127.0.0.1:27017/Automated_Document").then(() => {
    console.log("Database Connected...");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("Server is running on PORT 3000..."));