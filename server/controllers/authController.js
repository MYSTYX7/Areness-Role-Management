const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");

const registerUser = async (req, res) => {
  try {
    const { email, username, role, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?!.*\s).{7,}$/;

    if (!email) {
      return res.json({
        error: "Email is required",
      });
    }
    if (!emailRegex.test(email)) {
      return res.json({
        error: "Invalid email format",
      });
    }
    if (!username) {
      return res.json({
        error: "Username is required",
      });
    }
    if (!role) {
      return res.json({
        error: "Role is required",
      });
    }
    if (!password) {
      return res.json({
        error: "Password is required",
      });
    }
    if (!passwordRegex.test(password)) {
      return res.json({
        error:
          "Password should contain at least 7 characters including one uppercase letter, one lowercase letter, one digit, and one special character.",
      });
    }

    const exist = await User.findOne({ $or: [{ email }, { username }] });

    if (exist) {
      if (exist.email === email) {
        return res.json({ error: `${email} already exists` });
      } else if (exist.username === username) {
        return res.json({ error: `Username @${username} already exists` });
      }
    }

    const hashedPassword = await hashPassword(password);

    const user = await User({
      email,
      username,
      role,
      password: hashedPassword,
    });

    await user.save();

    return res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: "Incorrect Credentials",
      });
    }
    const passwordMatch = await comparePassword(password, user.password);
    if (passwordMatch) {
      jwt.sign(
        {
          email: user.email,
          id: user._id,
          username: user.username,
          role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "10h" },
        (err, token) => {
          if (err) throw err;

          res.cookie("token", token, { secure: true }).json({ token, user });
        }
      );
    } else {
      res.json({ error: "Incorrect Credentials" });
    }
  } catch (error) {
    console.error(error);
  }
};

const getProfile = (req, res) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;

      res.setHeader("x-auth-token", token);

      res.json(user);
    });
  } else {
    res.json(null);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
};
