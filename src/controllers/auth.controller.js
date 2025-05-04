const HttpStatus = require("http-status");
const {
  register,
  login,
  refreshAccessToken,
} = require("../services/auth.service");
const { successResponse, errorResponse } = require("../utils/response");
const { registerSchema } = require("../validations/auth.validation");

const registerController = async (req, res) => {
  try {
    const { error } = registerSchema.validate(req.body);

    if (err) {
      return errorResponse(
        res,
        HttpStatus.BAD_REQUEST,
        error.details.map((e) => e.message).join(",")
      );
    }

    const { name, email, password } = req.body;

    await register({ name, email, password });
    return successResponse(
      res,
      HttpStatus.CREATED,
      "User registered successfully."
    );
  } catch (error) {
    console.error("Error registering user:", error);
    return errorResponse(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      error.message || "Registration failed.",
      error
    );
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { accessToken, refreshToken, user } = await login(email, password);

    return successResponse(res, HttpStatus.OK, "Login successful", {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    return errorResponse(
      res,
      HttpStatus.UNAUTHORIZED,
      error.message || "Login failed.",
      error
    );
  }
};

const refreshController = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const { accessToken } = await refreshAccessToken(refreshToken);

    return successResponse(res, HttpStatus.OK, "Token refreshed successfully", {
      accessToken,
    });
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return errorResponse(
      res,
      HttpStatus.UNAUTHORIZED,
      error.message || "Token refresh failed.",
      error
    );
  }
};

module.exports = {
  registerController,
  loginController,
  refreshController,
};
