const Genre = require("../models/Genre");

const createGenre = async (genreData) => {
  try {
    return await Genre.create(genreData);
  } catch (error) {
    throw new Error(`Error creating genre: ${error.message}`);
  }
};

const getAllGenres = async () => {
  try {
    const genres = await Genre.find();

    if (!Array.isArray(genres) || genres.length === 0) {
      throw new Error("No genres found.");
    }

    return genres;
  } catch (error) {
    throw new Error(`Error fetching genres: ${error.message}`);
  }
};

const getGenreById = async (id) => {
  try {
    const genre = await Genre.findById(id);

    if (!genre) {
      throw new Error(`Genre with ID ${id} not found.`);
    }

    return genre;
  } catch (error) {
    throw new Error(`Error fetching genre: ${error.message}`);
  }
};

const updateGenre = async (id, updateData) => {
  try {
    const updatedGenre = await Genre.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedGenre) {
      throw new Error(`Genre with ID ${id} not found.`);
    }

    return updatedGenre;
  } catch (error) {
    throw new Error(`Error updating genre: ${error.message}`);
  }
};

const deleteGenre = async (id) => {
  try {
    const deletedGenre = await Genre.findByIdAndDelete(id);

    if (!deletedGenre) {
      throw new Error(`Genre with ID ${id} not found.`);
    }

    return deletedGenre;
  } catch (error) {
    throw new Error(`Error deleting genre: ${error.message}`);
  }
};

module.exports = {
  createGenre,
  getAllGenres,
  getGenreById,
  updateGenre,
  deleteGenre,
};
