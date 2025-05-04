const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../services/user.service");
const { successResponse, errorResponse } = require("../utils/response");
const HttpStatus = require("http-status");

const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsers();
    return successResponse(res, HttpStatus.OK, users);
  } catch (error) {
    return errorResponse(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      error.message || "An unexpected error occurred while fetching the users.",
      error
    );
  }
};

const getUserByIdController = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await getUserById(userId);

    return successResponse(res, HttpStatus.OK, user);
  } catch (error) {
    return errorResponse(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      error.message || "An unexpected error occurred while fetching the user.",
      error
    );
  }
};

const updateUserController = async (req, res) => {
  try {
    const userId = req.params.id;
    const userData = req.body;

    await updateUser(userId, userData);
    return successResponse(res, HttpStatus.OK, "User updated successfully");
  } catch (error) {
    return errorResponse(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      error.message || "An unexpected error occurred while updating the user.",
      error
    );
  }
};

const deleteUserController = async (req, res) => {
  try {
    const userId = req.params.id;
    await deleteUser(userId);
    return successResponse(res, HttpStatus.OK, "User deleted successfully.");
  } catch (error) {
    return errorResponse(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      error.message || "An unexpected error occurred while deleting the user.",
      error
    );
  }
};

module.exports = {
  getAllUsersController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
};
