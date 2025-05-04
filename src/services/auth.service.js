const bcrypt = require("bcryptjs");
const User = require("../models/User");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../utils/jwt");

// Register User
const register = async (userData) => {
  const { name, email, password } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
      isActive: true,
    });

    const accessToken = generateAccessToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error registering user: ", error);
    throw new Error("User registration failed.");
  }
};

// Login User
const login = async (email, password) => {
  try {
    const user = await User.findOne({ email });

    if (!user) throw new Error("User not found.");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid password.");

    const accessToken = generateAccessToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return { accessToken, refreshToken, user };
  } catch (error) {
    console.error("Login error:", error.message);
    throw new Error("Login failed.");
  }
};

// Refresh Access Token
const refreshAccessToken = async (refreshToken) => {
  try {
    const decoded = verifyRefreshToken(refreshToken);

    if (typeof decoded !== "object" || !decoded.id) {
      throw new Error("Invalid refresh token.");
    }

    const user = await User.findById(decoded.id);

    if (!user) throw new Error("User not found.");

    const newAccessToken = generateAccessToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return { accessToken: newAccessToken };
  } catch (error) {
    console.error("Error refreshing access token: ", error);
    throw new Error("Failed to refresh access token.");
  }
};

module.exports = { register, login, refreshAccessToken };
