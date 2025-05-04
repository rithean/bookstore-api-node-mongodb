const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Book title is required"],
      trim: true,
      maxLength: [100, "Book title cannot be more than 100 characters"],
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
      required: [true, "Author ID is required"],
    },
    genreIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Genre",
        required: true,
      },
    ],
    year: {
      type: Number,
      required: [true, "Publication year is required"],
      min: [1000, "Year must be at least 1000"],
      max: [new Date().getFullYear(), "Year cannot be in the future"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

bookSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});
bookSchema.pre(
  ["findOneAndUpdate", "updateOne", "findByIdAndUpdate"],
  function (next) {
    this.set({ updatedAt: Date.now() });
    next();
  }
);

module.exports = mongoose.model("Book", bookSchema);
