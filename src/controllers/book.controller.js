const HttpStatus = require("http-status");
const { successResponse, errorResponse } = require("../utils/response");
const {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
} = require("../services/book.service");
const {
  createBookSchema,
  updateBookSchema,
} = require("../validations/book.validation");

const createBookController = async (req, res) => {
  try {
    const { error } = createBookSchema.validate(req.body);

    if (error) {
      return errorResponse(
        res,
        HttpStatus.BAD_REQUEST,
        "Validation error: Invalid data provided.",
        error.details
      );
    }

    const bookData = req.body;
    await createBook(bookData);

    return successResponse(
      res,
      HttpStatus.CREATED,
      "Book created successfully."
    );
  } catch (error) {
    return errorResponse(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      error.message || "An unexpected error occurred while creating the book.",
      error
    );
  }
};

const getAllBooksController = async (req, res) => {
  try {
    const books = await getAllBooks();
    return successResponse(res, HttpStatus.OK, books);
  } catch (error) {
    return errorResponse(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      error.message || "An unexpected error occurred while fetching the books.",
      error
    );
  }
};

const getBookByIdController = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await getBookById(bookId);
    return successResponse(res, HttpStatus.OK, book);
  } catch (error) {
    return errorResponse(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      error.message || "An unexpected error occurred while fetching the book.",
      error
    );
  }
};

const updateBookController = async (req, res) => {
  try {
    const { error } = updateBookSchema.validate(req.body);

    if (error) {
      return errorResponse(
        res,
        HttpStatus.BAD_REQUEST,
        "Validation error: Invalid data provided.",
        error.details
      );
    }

    const bookId = req.params.id;
    const bookData = req.body;

    await updateBook(bookId, bookData);
    return successResponse(res, HttpStatus.OK, "Book updated successfully.");
  } catch (error) {
    return errorResponse(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      error.message || "An unexpected error occurred while updating the book.",
      error
    );
  }
};

const deleteBookController = async (req, res) => {
  try {
    const bookId = req.params.id;

    await deleteBook(bookId);
    return successResponse(res, HttpStatus.OK, "Book deleted successfully.");
  } catch (error) {
    return errorResponse(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      error.message || "An unexpected error occurred while deleting the book.",
      error
    );
  }
};

module.exports = {
  createBookController,
  getAllBooksController,
  getBookByIdController,
  updateBookController,
  deleteBookController,
};
