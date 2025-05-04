const Author = require("../models/Author");
const Book = require("../models/Book");
const Genre = require("../models/Genre");

const createBook = async (bookData) => {
  try {
    const { authorId, genreId, ...rest } = bookData;

    const author = await Author.findById(authorId);
    if (!author) throw new Error(`Author with ID ${authorId} does not exist.`);

    const genre = await Genre.findById(genreId);
    if (!genre) throw new Error(`Genre with ID ${genreId} does not exist.`);

    const newBook = await Book.create({
      authorId,
      genreId,
      ...rest,
    });

    return newBook;
  } catch (error) {
    throw new Error(`Error creating book: ${error.message}`);
  }
};

const getAllBooks = async () => {
  try {
    const books = await Book.find().populate("authorId").populate("genreIds");

    if (!Array.isArray(books) && books.length === 0) {
      throw new Error("No books found.");
    }

    return books;
  } catch (error) {
    throw new Error(`Error fetching books: ${error.message}`);
  }
};

const getBookById = async (id) => {
  try {
    const book = await Book.findById(id)
      .populate("authorId")
      .populate("genreIds");

    if (!book) throw new Error(`Book with ID ${id} not found.`);

    return book;
  } catch (error) {
    throw new Error(`Error fetching book: ${error.message}`);
  }
};

const getBookByAuthor = async (id) => {
  try {
    const author = await Author.findById(id);
    if (!author) throw new Error(`Author with ID ${id} not found.`);

    const books = await Book.find({ authorId: id })
      .populate("authorId")
      .populate("genreIds");

    if (!Array.isArray(books) && books.length === 0) {
      throw new Error(`No books found for author with ID ${id}.`);
    }

    return books;
  } catch (error) {
    throw new Error(`Error fetching books by author: ${error.message}`);
  }
};

const getBookByGenre = async (id) => {
  try {
    const genre = Genre.findById(id);

    if (!genre) throw new Error(`Genre with ID ${id} not found.`);

    const book = await Book.find({ genreId: id })
      .populate("authorId")
      .populate("genreIds");

    if (!Array.isArray(book) && book.length === 0) {
      throw new Error(`No book found for genre with ID ${id}`);
    }

    return book;
  } catch (error) {
    throw new Error(`Error fetching book : ${error.message}`);
  }
};

const updateBook = async (id, updateData) => {
  try {
    const { authorId, genreId, ...rest } = updateData;

    if (authorId) {
      const author = await Author.findById(authorId);
      if (!author)
        throw new Error(`Author with ID ${authorId} does not exist.`);
    }

    if (genreId) {
      const genre = await Genre.findById(genreId);
      if (!genre) throw new Error(`Genre with ID ${genreId} does not exist.`);
    }

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { authorId, genreId, ...rest },
      { new: true, runValidators: true }
    )
      .populate("authorId")
      .populate("genreIds");

    if (!updatedBook) throw new Error(`Book with ID ${id} not found.`);

    return updatedBook;
  } catch (error) {
    throw new Error(`Error updating book: ${error.message}`);
  }
};

const deleteBook = async (id) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) throw new Error(`Book with ID ${id} not found.`);

    return deletedBook;
  } catch (error) {
    throw new Error(`Error deleting book: ${error.message}`);
  }
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  getBookByAuthor,
  getBookByGenre,
  updateBook,
  deleteBook,
};
