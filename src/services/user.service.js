const User = require("../models/User");
const bcrypt = require("bcryptjs");

const getAllUsers = async () => {
  try {
    const users = await User.find().select("-password");
    if (!Array.isArray(users) || users.length === 0) {
      throw new Error("No users found.");
    }
    return users;
  } catch (error) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
};

const getUserById = async (id) => {
  try {
    const user = await User.findById(id).select("-password");
    if (!user) {
      throw new Error(`User with ID ${id} not found.`);
    }
    return user;
  } catch (error) {
    throw new Error(`Error fetching user: ${error.message}`);
  }
};

const updateUser = async (id, userData) => {
  try {
    const { password, ...rest } = userData;

    let updatePayload = { ...rest };
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatePayload.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(id, updatePayload, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedUser) {
      throw new Error(`User with ID ${id} not found.`);
    }

    return updatedUser;
  } catch (error) {
    throw new Error(`Error updating user: ${error.message}`);
  }
};

const deleteUser = async (id) => {
  try {
    const deletedUser = await User.findByIdAndDelete(id).select("-password");
    if (!deletedUser) {
      throw new Error(`User with ID ${id} not found.`);
    }
    return deletedUser;
  } catch (error) {
    throw new Error(`Error deleting user: ${error.message}`);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
