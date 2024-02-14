const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "https://areness-role-manager-fe.onrender.com",
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(process.env.MONGO_URL, {})
  .then(() => console.log("Database Connected"))
  .catch(() => {
    console.log("Error", error);
  });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use("/", require("./routes/authRoutes"));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
