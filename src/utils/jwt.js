const jwt = require("jsonwebtoken");

// Default sign options
const DEFAULT_SIGN_OPTIONS = {
  expiresIn: "1h", 
};

// Generate Access Token
function generateAccessToken(payload, options = DEFAULT_SIGN_OPTIONS) {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined in the environment variables.");
  }

  return jwt.sign(payload, secret, options);
}

// Generate Refresh Token
function generateRefreshToken(payload, options = { expiresIn: "30d" }) {
  const secret = process.env.REFRESH_TOKEN_SECRET;

  if (!secret) {
    throw new Error(
      "REFRESH_TOKEN_SECRET is not defined in the environment variables."
    );
  }

  return jwt.sign(payload, secret, options);
}

// Verify Access Token
function verifyAccessToken(token) {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined in the environment variables.");
  }

  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error("Invalid or expired access token.");
  }
}

// Verify Refresh Token
function verifyRefreshToken(token) {
  const secret = process.env.REFRESH_TOKEN_SECRET;

  if (!secret) {
    throw new Error(
      "REFRESH_TOKEN_SECRET is not defined in the environment variables."
    );
  }

  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error("Invalid or expired refresh token.");
  }
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
