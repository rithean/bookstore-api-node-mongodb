const Author = require("../models/Author");

const createAuthor = async (authorData) => {
  try {
    return await Author.create(authorData);
  } catch (error) {
    throw new Error(`Error creating author: ${error.message}`);
  }
};

const getAllAuthors = async () => {
  try {
    const authors = await Author.find();
    if (!Array.isArray(authors) || authors.length === 0) {
      throw new Error("No authors found.");
    }
    return authors;
  } catch (error) {
    throw new Error(`Error fetching authors: ${error.message}`);
  }
};

const getAuthorById = async (id) => {
  try {
    const author = await Author.findById(id);
    if (!author) {
      throw new Error(`Author with ID ${id} not found.`);
    }
    return author;
  } catch (error) {
    throw new Error(`Error fetching author: ${error.message}`);
  }
};

const updateAuthor = async (id, updateData) => {
  try {
    const updatedAuthor = await Author.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!updatedAuthor) {
      throw new Error(`Author with ID ${id} not found.`);
    }
    return updatedAuthor;
  } catch (error) {
    throw new Error(`Error updating author: ${error.message}`);
  }
};

const deleteAuthor = async (id) => {
  try {
    const deletedAuthor = await Author.findByIdAndDelete(id);
    if (!deletedAuthor) {
      throw new Error(`Author with ID ${id} not found.`);
    }
    return deletedAuthor;
  } catch (error) {
    throw new Error(`Error deleting author: ${error.message}`);
  }
};

module.exports = {
  createAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
};
